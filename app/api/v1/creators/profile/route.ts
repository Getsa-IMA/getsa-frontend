import { currentUser, auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/config';

export async function GET(request: NextRequest) {
    try {
        console.log('Profile API called');
        const authHeader = request.headers.get('authorization');
        console.log('Auth header exists:', !!authHeader);

        // Get the current user
        const { userId } = await auth();

        console.log('Current user ID:', userId);

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Forward the request to the actual backend
        const backendResponse = await fetch(`${API_BASE}/creators/profile`, {
            method: 'GET',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
        });

        console.log('Backend response status:', backendResponse.status);

        if (backendResponse.ok) {
            const data = await backendResponse.json();
            console.log('Backend data received:', data);
            
            // The backend might return { success: true, data: { ... } } or similar
            // Ensure the response structure matches what the frontend expects
            if (data.success && data.data) {
                return NextResponse.json({
                    exists: true,
                    ...data.data // Spread the profile data fields
                });
            } else if (data.exists === false || !data.data) {
                return NextResponse.json({
                    message: "No user found, please fill the form",
                    exists: false
                });
            }
            
            return NextResponse.json({
                exists: true,
                ...data
            });
        } else if (backendResponse.status === 404) {
            return NextResponse.json({
                message: "No user found, please fill the form",
                exists: false
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch profile from backend' },
            { status: backendResponse.status }
        );

    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        console.log('Profile API PUT called');
        const authHeader = request.headers.get('authorization');
        const body = await request.json();

        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Forward the request to the actual backend
        const backendResponse = await fetch(`${API_BASE}/creators/profile`, {
          method: 'PUT',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log('Backend PUT response status:', backendResponse.status);

        const contentType = backendResponse.headers.get("content-type");
        let responseData;

        if (contentType && contentType.includes("application/json")) {
            responseData = await backendResponse.json();
        } else {
            responseData = { message: await backendResponse.text() };
        }

        return NextResponse.json(responseData, { status: backendResponse.status });

    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        console.log('Profile API PUT called');
        const authHeader = request.headers.get('authorization');
        const body = await request.json();

        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Forward the request to the actual backend
        const backendResponse = await fetch(`${API_BASE}/creators/profile`, {
          method: 'PUT',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log('Backend POST response status:', backendResponse.status);

        const contentType = backendResponse.headers.get("content-type");
        let responseData;

        if (contentType && contentType.includes("application/json")) {
            responseData = await backendResponse.json();
        } else {
            responseData = { message: await backendResponse.text() };
        }

        return NextResponse.json(responseData, { status: backendResponse.status });

    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


