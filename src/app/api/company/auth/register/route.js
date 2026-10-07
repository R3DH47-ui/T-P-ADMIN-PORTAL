import { NextResponse } from 'next/server';
import { getCompanyByEmail, createCompany } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';
import { sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const { company_name, recruiter_name, email, password, industry, logo_url, avatar_url } = body;

    if (!email || !password || !company_name) {
      return NextResponse.json(
        { error: 'Company Name, Official Email, and Password are required.', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if company already registered
    const existing = await getCompanyByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        {
          error: 'An account with this corporate email already exists. Please sign in.',
          code: 'EMAIL_ALREADY_EXISTS',
        },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newCompany = await createCompany({
      company_name: company_name.trim(),
      recruiter_name: (recruiter_name || company_name).trim(),
      email: normalizedEmail,
      password_hash: passwordHash,
      auth_provider: 'email',
      industry: (industry || 'Corporate Recruitment').trim(),
      avatar_url: logo_url || avatar_url || null,
    });

    const safeCompany = sanitizeUser(newCompany);

    const expiresInSeconds = 86400 * 14; // 14 days
    const token = await generateToken({
      id: safeCompany.id,
      companyId: safeCompany.id,
      email: safeCompany.email,
      company_name: safeCompany.company_name,
      role: 'COMPANY',
    }, expiresInSeconds);

    const response = NextResponse.json({
      success: true,
      message: 'Company registration successful.',
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
    console.error('Company register error:', err);
    return NextResponse.json(
      { error: 'Failed to register company.', details: err.message },
      { status: 500 }
    );
  }
}
