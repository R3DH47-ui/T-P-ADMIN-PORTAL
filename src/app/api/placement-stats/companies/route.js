import { NextResponse } from 'next/server';
import { getHiringCompaniesWithScholars } from '@/lib/placementStats';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const companies = await getHiringCompaniesWithScholars();
    return NextResponse.json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (err) {
    console.error('Failed to get hiring companies:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve hiring companies', details: err.message },
      { status: 500 }
    );
  }
}
