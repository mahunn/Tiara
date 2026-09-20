import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const isAuth = isAdminRequest(req);
  return NextResponse.json({
    authenticated: isAuth,
  });
}
