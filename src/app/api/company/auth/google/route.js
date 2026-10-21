import { NextResponse } from 'next/server';
import { getCompanyByEmail, createCompany } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import { sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, avatar_url, company_name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Google account email is required.', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    let company = await getCompanyByEmail(normalizedEmail);
    let isNewRegistration = false;

    if (!company) {
      // Auto-register company in the database
      isNewRegistration = true;

      // Infer company name from domain or user input
      let derivedCompanyName = company_name?.trim();
      if (!derivedCompanyName) {
        const domain = normalizedEmail.split('@')[1] || '';
        const domainBase = domain.split('.')[0] || '';
        if (domainBase && domainBase !== 'gmail' && domainBase !== 'outlook' && domainBase !== 'yahoo') {
          derivedCompanyName = domainBase.charAt(0).toUpperCase() + domainBase.slice(1);
        } else {
          derivedCompanyName = (name || 'Corporate Partner') + ' Talent';
        }
      }

      company = await createCompany({
        company_name: derivedCompanyName,
        recruiter_name: (name || derivedCompanyName).trim(),
        email: normalizedEmail,
        password_hash: null, // Google OAuth
        auth_provider: 'google',
        industry: 'Corporate Talent Acquisition',
        avatar_url: avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(derivedCompanyName)}&background=4285F4&color=fff&bold=true`,
      });
    }

    if (company.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'This corporate partner account is currently disabled.', code: 'ACCOUNT_DISABLED' },
        { status: 403 }
      );
    }

    const safeCompany = sanitizeUser(company);

    const expiresInSeconds = 86400 * 30; // 30 days
    const token = await generateToken({
      id: safeCompany.id,
      companyId: safeCompany.id,
      email: safeCompany.email,
      company_name: safeCompany.company_name,
      role: 'COMPANY',
    }, expiresInSeconds);

    const response = NextResponse.json({
      success: true,
      message: isNewRegistration
        ? 'Company registered and authenticated with Google.'
        : 'Google sign-in successful.',
      isNew: isNewRegistration,
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
    console.error('Company Google auth error:', err);
    return NextResponse.json(
      { error: 'Google authentication failed.', details: err.message },
      { status: 500 }
    );
  }
}
