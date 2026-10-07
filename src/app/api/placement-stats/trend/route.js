import { NextResponse } from 'next/server';
import { getPlacementTrend } from '@/lib/placementStats';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getPlacementTrend();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (err) {
    console.error('Failed to get placement trend:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve historical placement trend data', details: err.message },
      { status: 500 }
    );
  }
}
