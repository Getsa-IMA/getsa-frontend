import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/config';

export async function POST(request: NextRequest) {
    try {
        console.log('Social Links API proxy called');
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
        const backendResponse = await fetch(`${API_BASE}/creators/social-links`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log('Backend Social Links response status:', backendResponse.status);

        const contentType = backendResponse.headers.get("content-type");
        let responseData;

        if (contentType && contentType.includes("application/json")) {
            responseData = await backendResponse.json();
        } else {
            responseData = { message: await backendResponse.text() };
        }

        return NextResponse.json(responseData, { status: backendResponse.status });

    } catch (error) {
        console.error('Error updating social links:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
