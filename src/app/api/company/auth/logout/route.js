import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Corporate session ended successfully.',
  });

  response.cookies.delete('company_token');
  return response;
}
