import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Admin signup is permanently disabled.
 * Only the two pre-authorized administrators (Raj Kumar, Sagrika) can access the portal.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Administrator registration is disabled. Only pre-authorized accounts can access this portal.',
      code: 'SIGNUP_DISABLED',
    },
    { status: 403 }
  );
}
