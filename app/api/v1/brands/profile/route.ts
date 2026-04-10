import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/config';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const backendResponse = await fetch(`${API_BASE}/brands/profile`, {
            method: 'GET',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
        });

        if (backendResponse.ok) {
            const data = await backendResponse.json();
            return NextResponse.json(data);
        } else if (backendResponse.status === 404) {
            return NextResponse.json({
                success: true,
                exists: false,
                message: "Profile not found"
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch profile from backend' },
            { status: backendResponse.status }
        );

    } catch (error) {
        console.error('Error fetching brand profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const body = await request.json();
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Try POST first, if it fails with 404 or method not allowed, we can suggest PUT
        console.log('Sending brand profile data to backend:', body);
        const backendResponse = await fetch(`${API_BASE}/brands/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const contentType = backendResponse.headers.get("content-type");
        let responseData;

        if (contentType && contentType.includes("application/json")) {
            responseData = await backendResponse.json();
        } else {
            const text = await backendResponse.text();
            console.error('Backend returned non-JSON:', text);
            responseData = { success: false, message: text || 'Backend error' };
        }

        return NextResponse.json(responseData, { status: backendResponse.status });

    } catch (error) {
        console.error('Error creating brand profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const body = await request.json();
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const backendResponse = await fetch(`${API_BASE}/brands/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const contentType = backendResponse.headers.get("content-type");
        let responseData;

        if (contentType && contentType.includes("application/json")) {
            responseData = await backendResponse.json();
        } else {
            responseData = { success: false, message: await backendResponse.text() || 'Backend error' };
        }

        return NextResponse.json(responseData, { status: backendResponse.status });

    } catch (error) {
        console.error('Error updating brand profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
