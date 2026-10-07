import { NextResponse } from 'next/server';
import { getAdminByName, getAdminByEmail, createAdmin } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';
import { sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role = 'ADMIN' } = body;

    if (!name || !password) {
      return NextResponse.json(
        { error: 'Administrator name and password are required.', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    // Check if administrator already exists by name
    const existingByName = await getAdminByName(name);
    if (existingByName) {
      return NextResponse.json(
        { error: 'An administrator with this name already exists. You can sign in using this account.', code: 'NAME_EXISTS' },
        { status: 409 }
      );
    }

    if (email) {
      const existingByEmail = await getAdminByEmail(email);
      if (existingByEmail) {
        return NextResponse.json(
          { error: 'An administrator with this institutional email already exists.', code: 'EMAIL_EXISTS' },
          { status: 409 }
        );
      }
    }

    const password_hash = await hashPassword(password);
    const newAdmin = await createAdmin({
      full_name: name.trim(),
      email: (email || `${name.trim().toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in`).toLowerCase(),
      password_hash,
      role,
      status: 'ACTIVE',
    });

    const safeAdmin = sanitizeUser(newAdmin);
    const token = await generateToken({
      id: safeAdmin.id,
      adminId: safeAdmin.id,
      full_name: safeAdmin.full_name,
      role: safeAdmin.role,
    }, 86400 * 30);

    return NextResponse.json({
      success: true,
      message: 'Administrator registered and verified successfully.',
      token,
      admin: safeAdmin,
    });
  } catch (err) {
    console.error('Admin signup error:', err);
    return NextResponse.json(
      { error: 'Failed to create administrator account.', details: err.message },
      { status: 500 }
    );
  }
}
