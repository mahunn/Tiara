import { NextRequest, NextResponse } from 'next/server';
import { saveOrder } from '@/lib/supabase';
import { Order } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: Order = await req.json();

    if (!body.customer || !body.customer.fullName || !body.customer.phone || !body.customer.address) {
      return NextResponse.json(
        { success: false, error: 'সবগুলো আবশ্যক তথ্য পূরণ করুন' },
        { status: 400 }
      );
    }

    const result = await saveOrder(body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        orderId: result.orderId,
        message: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'অর্ডার প্রক্রিয়া করা যায়নি' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('API order route error:', error);
    return NextResponse.json(
      { success: false, error: 'সার্ভার ত্রুটি হয়েছে' },
      { status: 500 }
    );
  }
}
