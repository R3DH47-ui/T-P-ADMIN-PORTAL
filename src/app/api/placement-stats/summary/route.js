import { NextResponse } from 'next/server';
import { getPlacementSummary } from '@/lib/placementStats';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const cohort = searchParams.get('academicYear') || searchParams.get('cohort') || 'AY 2024–25';

    const data = await getPlacementSummary(cohort);
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (err) {
    console.error('Failed to get placement summary:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve placement statistics summary', details: err.message },
      { status: 500 }
    );
  }
}
