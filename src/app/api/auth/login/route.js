import { NextResponse } from 'next/server';
import { getUserByEmail, getUserByRollNo } from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';
import { sanitizeUser } from '@/lib/middleware';

export async function POST(req) {
  try {
    const body = await req.json();
    const { identifier, email, roll_number, password } = body;

    const lookupTerm = (identifier || email || roll_number || '').trim();
    if (!lookupTerm) {
      return NextResponse.json(
        { error: 'Email or Roll Number is required to sign in.' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    // Try finding by email first, then by roll number
    let user = await getUserByEmail(lookupTerm);
    if (!user) {
      user = await getUserByRollNo(lookupTerm);
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials. User does not exist.' },
        { status: 401 }
      );
    }

    // Verify password hash
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials. Incorrect password.' },
        { status: 401 }
      );
    }

    // CRITICAL ACCESS CONTROL: Check student status
    if (user.role !== 'ADMIN') {
      if (user.status === 'PENDING') {
        return NextResponse.json(
          {
            error: 'Your account is awaiting admin approval',
            status: 'PENDING',
            message: 'Your registration has been submitted and is currently being verified by the university administrator.',
            user: {
              full_name: user.full_name,
              roll_number: user.roll_number,
              email: user.email,
              department: user.department,
              year_semester: user.year_semester,
              created_at: user.created_at,
            },
          },
          { status: 403 }
        );
      }

      if (user.status === 'REJECTED') {
        return NextResponse.json(
          {
            error: 'Your registration was rejected',
            status: 'REJECTED',
            reason: user.rejection_reason || 'Administrative decision. Please contact the university registrar.',
            user: {
              full_name: user.full_name,
              roll_number: user.roll_number,
              email: user.email,
              reviewed_at: user.reviewed_at,
            },
          },
          { status: 403 }
        );
      }

      if (user.status !== 'APPROVED') {
        return NextResponse.json(
          {
            error: 'Account access is not permitted at this time.',
            status: user.status,
          },
          { status: 403 }
        );
      }
    }

    // Generate JWT token with user identity and status
    const token = await generateToken({
      id: user.id,
      email: user.email,
      roll_number: user.roll_number,
      role: user.role,
      status: user.status,
    });

    const safeUser = sanitizeUser(user);

    return NextResponse.json({
      success: true,
      message: 'Login successful.',
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Internal server error during login', details: err.message },
      { status: 500 }
    );
  }
}
