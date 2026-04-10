import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/config';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const backendResponse = await fetch(`${API_BASE}/brands/social-links/${id}`, {
            method: 'GET',
        });

        if (backendResponse.ok) {
            const data = await backendResponse.json();
            return NextResponse.json(data);
        }

        return NextResponse.json(
            { error: 'Failed to fetch social links' },
            { status: backendResponse.status }
        );

    } catch (error) {
        console.error('Error fetching social links:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const authHeader = request.headers.get('authorization');
        const body = await request.json();
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const backendResponse = await fetch(`${API_BASE}/brands/social-links/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: backendResponse.status });

    } catch (error) {
        console.error('Error updating brand social link:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
