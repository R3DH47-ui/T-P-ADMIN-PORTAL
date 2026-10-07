import { NextResponse } from 'next/server';
import { getPlacedStudentsList } from '@/lib/placementStats';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get('sort') || 'latest';
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    const items = await getPlacedStudentsList({ sort, limit });
    return NextResponse.json({
      success: true,
      items,
      count: items.length,
      nextCursor: null,
    });
  } catch (err) {
    console.error('Failed to get placed students:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve placed students list', details: err.message },
      { status: 500 }
    );
  }
}
