import { NextResponse } from "next/server";

// Forwards newsletter sign-ups to the email provider configured in
// NEWSLETTER_WEBHOOK_URL (e.g. a Mailchimp/Brevo form endpoint, Zapier or
// Google Apps Script webhook). Until it is set, sign-ups are refused honestly
// rather than silently dropped.
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const hook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!hook) {
    return NextResponse.json(
      { message: "Our newsletter isn't open yet — message us on WhatsApp to hear about new arrivals." },
      { status: 503 },
    );
  }

  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "website", at: new Date().toISOString() }),
  }).catch(() => null);

  if (!res?.ok) {
    return NextResponse.json({ message: "We couldn't subscribe you just now. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ message: "Thank you! You're on the list." });
}
