import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const result = verifyOTP(email, otp);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, error: result.reason || "Invalid code." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email address successfully verified!",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
