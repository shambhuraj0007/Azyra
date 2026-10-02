// In-memory OTP storage fallback with timestamp
const otpCache = new Map<string, { otp: string; expiresAt: number }>();

export function storeOTP(email: string, otp: string) {
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpCache.set(email.toLowerCase().trim(), { otp, expiresAt });
}

export function verifyOTP(email: string, inputOtp: string): { valid: boolean; reason?: string } {
  const key = email.toLowerCase().trim();
  const cached = otpCache.get(key);

  if (!cached) {
    return { valid: false, reason: "No verification code requested for this email." };
  }

  if (Date.now() > cached.expiresAt) {
    otpCache.delete(key);
    return { valid: false, reason: "Verification code has expired. Please request a new one." };
  }

  if (cached.otp !== inputOtp.trim()) {
    return { valid: false, reason: "Incorrect verification code. Please check your email." };
  }

  // Clear upon successful verification
  otpCache.delete(key);
  return { valid: true };
}
