import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.user_id;
    const courseId = session.metadata?.course_id;

    if (userId && courseId) {
      const supabase = await createClient();

      await supabase.from("orders").insert({
        user_id: userId,
        course_id: courseId,
        stripe_session_id: session.id,
      });

      await supabase.from("enrollments").insert({
        user_id: userId,
        course_id: courseId,
      });
    }
  }

  return NextResponse.json({ received: true });
}
