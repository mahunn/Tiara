import { NextRequest, NextResponse } from 'next/server';
import { 
  getOrdersServer, 
  createOrderServer, 
  updateOrderStatusServer, 
  deleteOrderServer 
} from '@/lib/orderStore';
import { isAdminRequest } from '@/lib/adminAuth';
import { Order } from '@/types';

// GET: Fetch all orders (Admin only)
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json(
      { success: false, error: 'অননুমোদিত এক্সেস। প্রথমে এডমিন লগইন করুন।' },
      { status: 401 }
    );
  }

  try {
    const orders = await getOrdersServer();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('API GET orders error:', error);
    return NextResponse.json(
      { success: false, error: 'অর্ডার লিস্ট আনতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

// POST: Create a new order (Customer checkout)
export async function POST(req: NextRequest) {
  try {
    const body: Order = await req.json();

    if (!body.customer || !body.customer.fullName || !body.customer.phone || !body.customer.address) {
      return NextResponse.json(
        { success: false, error: 'সবগুলো আবশ্যক তথ্য (নাম, ফোন, ঠিকানা) পূরণ করুন' },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'কোনো পণ্য নির্বাচন করা হয়নি' },
        { status: 400 }
      );
    }

    const result = await createOrderServer(body);

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      order: result.order,
      message: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে',
    });
  } catch (error) {
    console.error('API POST orders error:', error);
    return NextResponse.json(
      { success: false, error: 'অর্ডার সেভ করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

// PATCH: Update order status (Admin only)
export async function PATCH(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json(
      { success: false, error: 'অননুমোদিত এক্সেস। এডমিন লগইন প্রয়োজন।' },
      { status: 401 }
    );
  }

  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'অর্ডার আইডি এবং স্ট্যাটাস আবশ্যক' },
        { status: 400 }
      );
    }

    const ok = await updateOrderStatusServer(orderId, status);
    if (ok) {
      return NextResponse.json({ success: true, message: 'স্ট্যাটাস আপডেট সফল হয়েছে' });
    } else {
      return NextResponse.json({ success: false, error: 'স্ট্যাটাস আপডেট করা যায়নি' }, { status: 500 });
    }
  } catch (error) {
    console.error('API PATCH orders error:', error);
    return NextResponse.json({ success: false, error: 'সার্ভার ত্রুটি হয়েছে' }, { status: 500 });
  }
}

// DELETE: Delete an order (Admin only)
export async function DELETE(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json(
      { success: false, error: 'অননুমোদিত এক্সেস। এডমিন লগইন প্রয়োজন।' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'অর্ডার আইডি আবশ্যক' },
        { status: 400 }
      );
    }

    const ok = await deleteOrderServer(orderId);
    if (ok) {
      return NextResponse.json({ success: true, message: 'অর্ডার মুছে ফেলা হয়েছে' });
    } else {
      return NextResponse.json({ success: false, error: 'অর্ডার মুছতে সমস্যা হয়েছে' }, { status: 500 });
    }
  } catch (error) {
    console.error('API DELETE orders error:', error);
    return NextResponse.json({ success: false, error: 'সার্ভার ত্রুটি হয়েছে' }, { status: 500 });
  }
}
