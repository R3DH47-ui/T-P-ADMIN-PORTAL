/**
 * Authentication and Cryptography Utility
 * Uses standard Web Crypto API (supported natively in Node.js 18+ and Next.js Edge/Server runtime)
 */

const JWT_SECRET = process.env.JWT_SECRET || 'rimt-university-super-secret-key-2026-production';

/**
 * Convert string to Uint8Array
 */
function stringToBytes(str) {
  return new TextEncoder().encode(str);
}

/**
 * Convert buffer/Uint8Array to hex string
 */
function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Base64 URL encode Uint8Array or binary string
 */
function bytesToBase64Url(bytes) {
  let binary = '';
  const len = bytes.length;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = typeof btoa === 'function' 
    ? btoa(binary) 
    : Buffer.from(binary, 'binary').toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function textToBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  return bytesToBase64Url(bytes);
}

/**
 * Base64 URL decode to Uint8Array
 */
function base64UrlToBytes(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = typeof atob === 'function'
    ? atob(base64)
    : Buffer.from(base64, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function base64UrlToText(str) {
  const bytes = base64UrlToBytes(str);
  return new TextDecoder().decode(bytes);
}

/**
 * Hash password with salt using PBKDF2 or SHA-256 HMAC
 */
export async function hashPassword(password, salt = 'rimt-salt-key') {
  if (!password) throw new Error('Password is required');
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password + ':' + salt),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 10000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  return bufferToHex(derivedKey);
}

/**
 * Verify password against stored hash
 */
export async function verifyPassword(password, storedHash, salt = 'rimt-salt-key') {
  if (!password || !storedHash) return false;
  const computedHash = await hashPassword(password, salt);
  return computedHash === storedHash;
}

/**
 * Generate standard HMAC-SHA256 JWT Token
 */
export async function generateToken(payload, expiresInSeconds = 86400) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = textToBase64Url(JSON.stringify(header));
  const encodedPayload = textToBase64Url(JSON.stringify(fullPayload));
  const message = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    stringToBytes(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, stringToBytes(message));
  const encodedSignature = bytesToBase64Url(new Uint8Array(signatureBuffer));

  return `${message}.${encodedSignature}`;
}

/**
 * Verify and decode HMAC-SHA256 JWT Token
 */
export async function verifyToken(token) {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const message = `${encodedHeader}.${encodedPayload}`;

    const key = await crypto.subtle.importKey(
      'raw',
      stringToBytes(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const rawSignature = base64UrlToBytes(encodedSignature);
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      rawSignature,
      stringToBytes(message)
    );

    if (!isValid) return null;

    const payload = JSON.parse(base64UrlToText(encodedPayload));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired token
    }

    return payload;
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
}
