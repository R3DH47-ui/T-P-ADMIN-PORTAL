import { NextResponse } from 'next/server';
import { getRequests } from '@/lib/db';
import { withAuth, sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'PENDING';

    const requests = await getRequests({ status });
    const safeRequests = sanitizeUser(requests);

    return NextResponse.json({
      success: true,
      count: safeRequests.length,
      filter: status,
      requests: safeRequests,
    });
  } catch (err) {
    console.error('Fetch requests error:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve registration requests', details: err.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler, { requiredRole: 'ADMIN' });
