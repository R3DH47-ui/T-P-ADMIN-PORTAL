import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'gytf7gmz';
const API_KEY = process.env.CLOUDINARY_API_KEY || '233416524174115';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'uwqAmphXoW1FdrfjpbkluUbpl_A';

/**
 * POST /api/company/upload-logo
 * Uploads company logo directly to Cloudinary (folder: 'company-logos')
 * Supports multipart/form-data and JSON with base64 data.
 */
export async function POST(req) {
  try {
    if (!API_SECRET) {
      return NextResponse.json(
        { error: 'Cloudinary API Secret is not configured on the server.' },
        { status: 500 }
      );
    }

    let fileData = null;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file');

      if (!file) {
        return NextResponse.json({ error: 'No file provided in form data.' }, { status: 400 });
      }

      // Convert file to base64 data URI for Cloudinary upload
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mime = file.type || 'image/png';
      fileData = `data:${mime};base64,${buffer.toString('base64')}`;
    } else {
      const body = await req.json().catch(() => ({}));
      fileData = body.file || body.dataUrl || body.image;
    }

    if (!fileData || typeof fileData !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing image payload. Please provide a valid image.' },
        { status: 400 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'company-logos';

    // Cloudinary signature: sort parameters alphabetically
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    // Post to Cloudinary REST API
    const cloudinaryParams = new URLSearchParams();
    cloudinaryParams.append('file', fileData);
    cloudinaryParams.append('api_key', API_KEY);
    cloudinaryParams.append('timestamp', String(timestamp));
    cloudinaryParams.append('folder', folder);
    cloudinaryParams.append('signature', signature);

    const cldResponse = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: cloudinaryParams,
    });

    const cldData = await cldResponse.json();

    if (!cldResponse.ok || !cldData.secure_url) {
      console.error('Cloudinary upload error:', cldData);
      return NextResponse.json(
        { error: cldData?.error?.message || 'Failed to upload logo to Cloudinary' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      url: cldData.secure_url,
      public_id: cldData.public_id,
      format: cldData.format,
      bytes: cldData.bytes,
      width: cldData.width,
      height: cldData.height,
    });
  } catch (err) {
    console.error('Company logo upload exception:', err);
    return NextResponse.json(
      { error: 'Server error processing logo upload', details: err.message },
      { status: 500 }
    );
  }
}
