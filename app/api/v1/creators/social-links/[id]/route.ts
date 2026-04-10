import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/config';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: creatorId } = await params;
        console.log(`Fetching social links for creator: ${creatorId}`);

        // Call the backend public endpoint
        const backendResponse = await fetch(`${API_BASE}/creators/social-links/${creatorId}`, {
            method: 'GET',
        });

        console.log(`Backend response for social links GET: ${backendResponse.status}`);

        if (backendResponse.status === 404) {
            return NextResponse.json({ message: 'No social links found' }, { status: 404 });
        }

        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            return NextResponse.json({ error: errorText }, { status: backendResponse.status });
        }

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Error fetching social links:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
