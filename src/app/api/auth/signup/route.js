import { NextResponse } from 'next/server';
import { getUserByEmail, getUserByRollNo, createStudent } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { sanitizeUser } from '@/lib/middleware';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      full_name,
      roll_number,
      department,
      year_semester,
      email,
      password,
    } = body;

    // Field-level validations
    if (!full_name || full_name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Full name must be at least 2 characters long.' },
        { status: 400 }
      );
    }

    if (!roll_number || roll_number.trim().length < 3) {
      return NextResponse.json(
        { error: 'Valid Roll Number is required (e.g., RIMT-22-CSE-001).' },
        { status: 400 }
      );
    }

    if (!department || department.trim().length < 2) {
      return NextResponse.json(
        { error: 'Department selection is required.' },
        { status: 400 }
      );
    }

    if (!year_semester || year_semester.trim().length < 2) {
      return NextResponse.json(
        { error: 'Year / Semester selection is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Uniqueness checks
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    const existingRoll = await getUserByRollNo(roll_number);
    if (existingRoll) {
      return NextResponse.json(
        { error: 'An account with this Roll Number already exists.' },
        { status: 409 }
      );
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Save with status: PENDING
    const student = await createStudent({
      full_name,
      roll_number,
      department,
      year_semester,
      email,
      password_hash,
    });

    const safeStudent = sanitizeUser(student);

    // Notice: Do NOT return an access token upon signup!
    return NextResponse.json(
      {
        success: true,
        message: 'Registration submitted successfully. Your account is pending Admin approval.',
        status: 'PENDING',
        user: safeStudent,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json(
      { error: 'Internal server error during registration', details: err.message },
      { status: 500 }
    );
  }
}
