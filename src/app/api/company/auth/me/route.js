import { NextResponse } from 'next/server';
import { withAuth, sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

async function handler(req) {
  try {
    return NextResponse.json({
      success: true,
      company: sanitizeUser(req.user),
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to retrieve company session.', details: err.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler, { requiredRole: 'COMPANY' });
