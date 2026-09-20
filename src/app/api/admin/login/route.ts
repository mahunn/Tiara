import { NextRequest, NextResponse } from 'next/server';
import { 
  verifyAdminPassword, 
  createAdminSessionToken, 
  ADMIN_COOKIE_NAME 
} from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'ভুল পাসওয়ার্ড বা পিন। সঠিক পাসওয়ার্ড দিন।' },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken();
    const response = NextResponse.json({
      success: true,
      token,
      message: 'এডমিন লগইন সফল হয়েছে',
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { success: false, error: 'লগইন সার্ভার ত্রুটি হয়েছে' },
      { status: 500 }
    );
  }
}
