import { NextResponse } from 'next/server';
import { getCompanyByEmail } from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';
import { sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, remember_me } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Corporate email and password are required.', code: 'MISSING_CREDENTIALS' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const company = await getCompanyByEmail(normalizedEmail);

    if (!company) {
      return NextResponse.json(
        {
          error: 'No registered company found with this email. Please register first.',
          code: 'COMPANY_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    if (company.password_hash) {
      const isValid = await verifyPassword(password, company.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid corporate email or password.', code: 'INVALID_CREDENTIALS' },
          { status: 401 }
        );
      }
    }

    if (company.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'This corporate partner account is currently deactivated.', code: 'ACCOUNT_DISABLED' },
        { status: 403 }
      );
    }

    const safeCompany = sanitizeUser(company);

    const expiresInSeconds = remember_me ? 86400 * 30 : 86400 * 7;
    const token = await generateToken({
      id: safeCompany.id,
      companyId: safeCompany.id,
      email: safeCompany.email,
      company_name: safeCompany.company_name,
      role: 'COMPANY',
    }, expiresInSeconds);

    const response = NextResponse.json({
      success: true,
      message: 'Sign in successful.',
      token,
      company: safeCompany,
    });

    response.cookies.set('company_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: expiresInSeconds,
    });

    return response;
  } catch (err) {
    console.error('Company login error:', err);
    return NextResponse.json(
      { error: 'Authentication failed.', details: err.message },
      { status: 500 }
    );
  }
}
