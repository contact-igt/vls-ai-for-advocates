import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET;
    console.log("keyId", keyId);
    console.log("keySecret", keySecret);
    // Fallback mock order for local testing when keys are not configured or are placeholders
    if (!keyId || !keySecret || keyId === "rzp_test_placeholder_key_id" || keySecret === "placeholder_secret_key") {
      console.warn("Using mock Razorpay order because keys are placeholder/missing.");
      return NextResponse.json({
        id: `order_mock_${Date.now()}`,
        entity: "order",
        amount: Math.round(Number(amount) * 100),
        amount_paid: 0,
        amount_due: Math.round(Number(amount) * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        status: "created",
        attempts: 0,
        notes: [],
        created_at: Math.floor(Date.now() / 1000)
      });
    }

    const auth = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Create order API error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
