import { NextResponse } from 'next/server';
import { updateProfile } from '@/lib/db';
import { withAuth, sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

/**
 * GET /api/profile — Fetch current authenticated user's profile
 * Protected: Only accessible if status === 'APPROVED'
 */
async function getProfileHandler(req) {
  try {
    const user = req.user;
    return NextResponse.json({
      success: true,
      profile: sanitizeUser(user),
    });
  } catch (err) {
    console.error('Get profile error:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve profile', details: err.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/profile — Edit authenticated user's own profile
 * Protected: Only accessible if status === 'APPROVED'
 */
async function putProfileHandler(req) {
  try {
    const user = req.user;
    const body = await req.json();

    const updated = await updateProfile(user.id, body);
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully.',
      profile: sanitizeUser(updated),
    });
  } catch (err) {
    console.error('Update profile error:', err);
    return NextResponse.json(
      { error: 'Failed to update profile', details: err.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getProfileHandler, { requireApproved: true });
export const PUT = withAuth(putProfileHandler, { requireApproved: true });
