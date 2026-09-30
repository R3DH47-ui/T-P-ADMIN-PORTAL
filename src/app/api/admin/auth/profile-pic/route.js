import { NextResponse } from 'next/server';
import { withAuth, sanitizeUser } from '@/lib/middleware';
import { updateAdmin, getAdminById } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function handler(req) {
  try {
    let profilePicUrl = null;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      profilePicUrl = body.profile_pic_url;
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') || formData.get('image');

      if (file && typeof file === 'object' && file.name) {
        // Validate MIME type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            { error: 'Only JPG, PNG, and WebP image formats are permitted.', code: 'INVALID_IMAGE_TYPE' },
            { status: 400 }
          );
        }

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: 'Profile image size must not exceed 5MB.', code: 'IMAGE_TOO_LARGE' },
            { status: 400 }
          );
        }

        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        profilePicUrl = `data:${file.type};base64,${base64}`;
      } else {
        const urlField = formData.get('profile_pic_url');
        if (urlField) profilePicUrl = urlField.toString();
      }
    }

    if (!profilePicUrl) {
      return NextResponse.json(
        { error: 'No image file or URL was provided.', code: 'MISSING_IMAGE' },
        { status: 400 }
      );
    }

    const updated = await updateAdmin(req.user.id, { profile_pic_url: profilePicUrl });
    const freshAdmin = await getAdminById(req.user.id);

    return NextResponse.json({
      success: true,
      message: 'Profile picture updated successfully.',
      profile_pic_url: profilePicUrl,
      admin: sanitizeUser(freshAdmin || updated),
    });
  } catch (err) {
    console.error('Profile pic upload error:', err);
    return NextResponse.json(
      { error: 'Failed to update profile picture.', details: err.message },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler, { requiredRole: 'ADMIN' });
