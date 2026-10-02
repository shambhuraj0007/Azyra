import { NextResponse } from "next/server";
import { sendVerificationCode } from "@/lib/mailer";
import { storeOTP } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Generate 6-digit numeric OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in OTP cache
    storeOTP(email, otp);

    // Send email via Nodemailer
    const mailResult = await sendVerificationCode(email, otp);

    return NextResponse.json({
      success: true,
      message: mailResult.simulated
        ? "Verification OTP generated & logged to server terminal (SMTP password needed for live inbox delivery)."
        : `Verification email sent via Nodemailer to ${email}.`,
      simulated: mailResult.simulated,
      otpForTesting: mailResult.simulated ? otp : undefined,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
