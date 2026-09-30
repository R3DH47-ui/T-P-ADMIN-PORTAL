/**
 * Security Middleware & Guards
 * Handles JWT token verification, role enforcement, and live database status checks.
 * Guarantees that if an Admin revokes or rejects a user, they are immediately locked out.
 */

import { NextResponse } from 'next/server.js';
import { verifyToken } from './auth.js';
import { getUserById, getAdminById } from './db.js';

/**
 * Helper to extract bearer token from cookies or authorization header
 */
export function extractToken(req) {
  // Check cookie (from NextRequest cookies or parsed cookie header)
  if (req.cookies && typeof req.cookies.get === 'function') {
    const adminToken = req.cookies.get('admin_token')?.value;
    if (adminToken) return adminToken;
  }

  const rawCookieHeader = req.headers?.get?.('cookie');
  if (rawCookieHeader) {
    const match = rawCookieHeader.match(/admin_token=([^;]+)/);
    if (match && match[1]) return decodeURIComponent(match[1].trim());
  }

  const authHeader = req.headers?.get?.('authorization') || req.headers?.get?.('Authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return authHeader ? authHeader.trim() : null;
}

/**
 * Higher-Order Route Handler with Auth and Status Guard
 */
export function withAuth(handler, { requiredRole = null, requireApproved = true } = {}) {
  return async function (req, context) {
    try {
      const token = extractToken(req);

      // Check for internal Admin Portal request or master token
      const isPortalAdmin = process.env.NODE_ENV === 'development'
        && (token === 'rimt-admin-master-token' || req.headers?.get?.('x-admin-portal') === 'true');

      if (isPortalAdmin) {
        req.user = {
          id: 'a0000000-0000-0000-0000-000000000001',
          full_name: 'Raj Kumar',
          email: null,
          role: 'ADMIN',
          status: 'ACTIVE',
        };
        return handler(req, context);
      }

      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required. Missing token.', code: 'UNAUTHORIZED' },
          { status: 401 }
        );
      }

      const decoded = await verifyToken(token);
      if (!decoded) {
        return NextResponse.json(
          { error: 'Invalid or expired authentication token.', code: 'INVALID_TOKEN' },
          { status: 401 }
        );
      }

      // Check if user is an Administrator
      const adminId = decoded.adminId || decoded.id;
      const liveAdmin = await getAdminById(adminId);

      if (liveAdmin) {
        if (liveAdmin.status !== 'ACTIVE') {
          return NextResponse.json(
            { error: 'This admin account has been deactivated.', code: 'ACCOUNT_DISABLED' },
            { status: 403 }
          );
        }

        if (requiredRole && liveAdmin.role !== requiredRole && liveAdmin.role !== 'SUPER_ADMIN') {
          return NextResponse.json(
            { error: `Forbidden. Requires ${requiredRole} privileges.`, code: 'FORBIDDEN_ROLE' },
            { status: 403 }
          );
        }

        const { password_hash, ...safeAdmin } = liveAdmin;
        req.user = safeAdmin;
        return handler(req, context);
      }

      // If not an admin, check student record
      const liveUser = await getUserById(decoded.id);
      if (!liveUser) {
        return NextResponse.json(
          { error: 'User account not found.', code: 'USER_NOT_FOUND' },
          { status: 404 }
        );
      }

      // Role check for students
      if (requiredRole && liveUser.role !== requiredRole) {
        return NextResponse.json(
          { error: `Forbidden. Requires ${requiredRole} privileges.`, code: 'FORBIDDEN_ROLE' },
          { status: 403 }
        );
      }

      // Status check for students
      if (requireApproved && liveUser.role !== 'ADMIN') {
        if (liveUser.status === 'PENDING') {
          return NextResponse.json(
            {
              error: 'Your account is currently under review by university administration.',
              status: 'PENDING',
              code: 'ACCOUNT_PENDING',
            },
            { status: 403 }
          );
        }

        if (liveUser.status === 'REJECTED') {
          return NextResponse.json(
            {
              error: 'Your student registration was rejected.',
              status: 'REJECTED',
              reason: liveUser.rejection_reason || 'Administrative decision',
              code: 'ACCOUNT_REJECTED',
            },
            { status: 403 }
          );
        }

        if (liveUser.status === 'REVOKED') {
          return NextResponse.json(
            {
              error: 'Portal access has been revoked by university administration.',
              status: 'REVOKED',
              reason: liveUser.revocation_reason || 'Administrative decision',
              code: 'ACCOUNT_REVOKED',
            },
            { status: 403 }
          );
        }

        if (liveUser.status !== 'APPROVED') {
          return NextResponse.json(
            { error: 'Account not approved for portal access.', code: 'UNAUTHORIZED_STATUS' },
            { status: 403 }
          );
        }
      }

      // Attach sanitized user to request context
      const { password_hash, ...safeUser } = liveUser;
      req.user = safeUser;

      return handler(req, context);
    } catch (err) {
      console.error('Middleware execution error:', err);
      return NextResponse.json(
        { error: 'Internal server security error', details: err.message },
        { status: 500 }
      );
    }
  };
}

/**
 * Strip password_hash from any user object or list of users
 */
export function sanitizeUser(user) {
  if (!user) return null;
  if (Array.isArray(user)) {
    return user.map((u) => {
      const { password_hash, ...safe } = u;
      return safe;
    });
  }
  const { password_hash, ...safe } = user;
  return safe;
}
