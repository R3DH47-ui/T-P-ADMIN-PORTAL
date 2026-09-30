import { NextResponse } from 'next/server';
import { getUserById, getStudentDossier, updateStudentDossier } from '@/lib/db';
import { withAuth, sanitizeUser } from '@/lib/middleware';

export const dynamic = 'force-dynamic';

/**
 * GET: Retrieve comprehensive student LinkedIn-style dossier
 * Includes bio, name, documents, projects, profile, phone, and academic score
 */
async function getHandler(req, { params }) {
  try {
    const { id } = params;
    const dossier = await getStudentDossier(id);

    if (!dossier) {
      return NextResponse.json(
        { error: 'Student request or scholar dossier not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      request: sanitizeUser(dossier),
      dossier: sanitizeUser(dossier),
    });
  } catch (err) {
    console.error('Fetch request details error:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve request details', details: err.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH: Admin update for student dossier (bio, phone, headline, cgpa, projects)
 */
async function patchHandler(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const updated = await updateStudentDossier(id, body);
    if (!updated) {
      return NextResponse.json(
        { error: 'Student record not found for update.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Scholar dossier updated successfully.',
      dossier: sanitizeUser(updated),
    });
  } catch (err) {
    console.error('Update student dossier error:', err);
    return NextResponse.json(
      { error: 'Failed to update student dossier', details: err.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler, { requiredRole: 'ADMIN' });
export const PATCH = withAuth(patchHandler, { requiredRole: 'ADMIN' });
