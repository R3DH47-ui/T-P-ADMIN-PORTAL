import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Email check is disabled. Admin accounts are fixed and do not use email-based login.
 */
export async function POST() {
  return NextResponse.json(
    { error: 'Email-based admin lookup is disabled.', code: 'FEATURE_DISABLED' },
    { status: 403 }
  );
}
