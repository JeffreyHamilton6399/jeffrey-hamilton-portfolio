import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name, email, and a message." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please enter your name." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (message.trim().length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please write a message of at least 10 characters." },
        { status: 400 }
      );
    }

    // In a production app you'd persist this to a database or send an email.
    // For now we log it on the server so the submission is captured.
    console.log("[contact] new message", {
      name,
      email,
      message,
      at: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: `Thanks, ${name.trim().split(" ")[0]}! Your message was received — I'll get back to you soon.`,
    });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
