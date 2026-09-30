import { NextResponse } from 'next/server';
import { getAdminByName } from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';
import { sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, password, remember_me } = body;

    if (!name || !password) {
      return NextResponse.json(
        { error: 'Administrator name and password are required.', code: 'MISSING_CREDENTIALS' },
        { status: 400 }
      );
    }

    const admin = await getAdminByName(name);
    if (!admin) {
      // Generic error to prevent enumeration
      return NextResponse.json(
        { error: 'Invalid administrator name or password.', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid administrator name or password.', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    if (admin.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'This administrative account is disabled.', code: 'ACCOUNT_DISABLED' },
        { status: 403 }
      );
    }

    const safeAdmin = sanitizeUser(admin);

    const expiresInSeconds = remember_me ? 86400 * 30 : 86400 * 7;
    const token = await generateToken({
      id: safeAdmin.id,
      adminId: safeAdmin.id,
      full_name: safeAdmin.full_name,
      role: safeAdmin.role,
    }, expiresInSeconds);

    const response = NextResponse.json({
      success: true,
      message: 'Sign in successful.',
      token,
      admin: safeAdmin,
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: expiresInSeconds,
    });

    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: 'Authentication failed.', details: err.message },
      { status: 500 }
    );
  }
}
