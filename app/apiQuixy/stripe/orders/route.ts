import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const orders = await stripe.checkout.sessions.list();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
