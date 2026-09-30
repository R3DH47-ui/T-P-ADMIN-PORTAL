import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { getAdminById, updateAdmin } from '@/lib/db';
import { verifyPassword, hashPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

async function handler(req) {
  try {
    const body = await req.json();
    const { current_password, new_password } = body;

    if (!current_password || !new_password) {
      return NextResponse.json(
        { error: 'Current password and new password are required.', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    const admin = await getAdminById(req.user.id);
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin account not found.', code: 'ADMIN_NOT_FOUND' },
        { status: 404 }
      );
    }

    const isMatch = await verifyPassword(current_password, admin.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Current password is incorrect.', code: 'INVALID_CURRENT_PASSWORD' },
        { status: 400 }
      );
    }

    if (!PASSWORD_REGEX.test(new_password)) {
      return NextResponse.json(
        { 
          error: 'New password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character.', 
          code: 'WEAK_PASSWORD' 
        },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(new_password);
    await updateAdmin(admin.id, { password_hash: newHash });

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (err) {
    console.error('Change password error:', err);
    return NextResponse.json(
      { error: 'Failed to update password.', details: err.message },
      { status: 500 }
    );
  }
}

export const PATCH = withAuth(handler, { requiredRole: 'ADMIN' });
