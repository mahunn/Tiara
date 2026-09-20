import crypto from 'crypto';
import { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'tiara2026';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'tiara_modest_fashion_secret_admin_key_2026';
export const ADMIN_COOKIE_NAME = 'tiara_admin_session';
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Verifies entered password against the configured admin password.
 */
export function verifyAdminPassword(password: string): boolean {
  if (!password) return false;
  const trimmed = password.trim();
  // Support configured password and fallback tiara2026
  return (
    trimmed === ADMIN_PASSWORD ||
    trimmed === 'tiara2026' ||
    (process.env.NODE_ENV !== 'production' && trimmed === 'tiara')
  );
}

/**
 * Creates a signed session token: timestamp.signature
 */
export function createAdminSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(`admin:${timestamp}`)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Validates a session token signature and checks if expired.
 */
export function verifyAdminSessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration (7 days)
  if (Date.now() - timestamp > SESSION_MAX_AGE_MS) {
    return false;
  }

  // Verify HMAC signature
  const expectedSignature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(`admin:${timestampStr}`)
    .digest('hex');

  // Constant-time comparison
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
}

/**
 * Check if request has valid admin credentials via cookie or Authorization header.
 */
export function isAdminRequest(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookie && verifyAdminSessionToken(cookie)) {
    return true;
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const bearerToken = authHeader.substring(7).trim();
    if (verifyAdminSessionToken(bearerToken)) {
      return true;
    }
  }

  return false;
}
