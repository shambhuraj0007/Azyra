"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Rocket,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Building2,
  Loader2,
  Mail,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

export default function JoinPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const [role, setRole] = useState<"startup" | "creator">("startup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("AI Productivity");
  const [loading, setLoading] = useState(false);

  // Email Verification State via Nodemailer
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);

  const [dbStatus, setDbStatus] = useState<{
    mongoConnected: boolean;
    dbName?: string;
    mongoError?: string | null;
    googleConfigured?: boolean;
    googleClientIdSnippet?: string | null;
  } | null>(null);

  useEffect(() => {
    fetch("/api/db-status")
      .then((res) => res.json())
      .then((data) => setDbStatus(data))
      .catch(() =>
        setDbStatus({
          mongoConnected: false,
          mongoError: "Failed to connect to db-status API",
        })
      );
  }, []);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/discover");
    }
  }, [sessionStatus, router]);

  const handleGoogleJoin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/discover" });
  };

  const handleSendOtp = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address first.");
      return;
    }
    setSendingOtp(true);
    setOtpMessage(null);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setOtpMessage(data.message);
      } else {
        alert(data.error || "Failed to send verification email.");
      }
    } catch {
      alert("Error contacting verification service.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 5) {
      alert("Please enter the 6-digit verification code sent to your email.");
      return;
    }
    setVerifyingOtp(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      const data = await res.json();
      if (data.success) {
        setIsEmailVerified(true);
        setOtpMessage("✓ Email address verified successfully!");
      } else {
        alert(data.error || "Invalid code.");
      }
    } catch {
      alert("Error verifying code.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password: "defaultPassword123",
      role,
      redirect: false,
      callbackUrl: "/discover",
    });

    if (result?.ok) {
      alert(`Welcome to AZYRA! Registered as ${fullName} (${role}).`);
      router.push("/discover");
    } else {
      alert("Registration failed. Please check your information.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-indigo-600/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

        <div className="w-full max-w-lg relative z-10">
          <div className="rounded-3xl p-8 bg-[#0F0C22] border border-purple-500/30 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Join the Growth Ecosystem
              </div>
              <h1 className="text-3xl font-black text-white">Create Your AZYRA Account</h1>
              <p className="text-xs text-slate-400 mt-1">
                Where Startups Get Seen &amp; Creators Get Discovered
              </p>
            </div>

            {/* Account Role Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setRole("startup")}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  role === "startup"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>I&apos;m a Startup</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("creator")}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  role === "creator"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>I&apos;m a Creator</span>
              </button>
            </div>

            {/* DB & Google OAuth Readiness Indicator */}
            {dbStatus && (
              <div className="mb-6 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">MongoDB Database:</span>
                  {dbStatus.mongoConnected ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Update URI in .env
                    </span>
                  )}
                </div>

                {!dbStatus.mongoConnected && (
                  <p className="text-[11px] text-amber-300 leading-tight pt-1">
                    ⚠️ Please update <code className="bg-black/50 px-1 rounded text-indigo-300">MONGO_URI</code> in <code className="bg-black/50 px-1 rounded text-indigo-300">.env</code> to store user profiles in MongoDB.
                  </p>
                )}
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleJoin}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-white font-semibold text-sm transition-all flex items-center justify-center gap-3 shadow-md group hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.08]" />
              </div>
              <span className="relative bg-[#0F0C22] px-3 text-xs font-mono uppercase text-slate-400">
                or Nodemailer email verification
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                  {role === "startup" ? "Startup / Product Name" : "Full Name / Handle"}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={role === "startup" ? "e.g. NovaAI" : "e.g. Alex Morgan (@alexdev)"}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Email + Nodemailer Send Code Button */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                  Work Email Address
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      disabled={isEmailVerified}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-purple-500 disabled:opacity-70"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || isEmailVerified}
                    className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {sendingOtp ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : isEmailVerified ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span>Send OTP</span>
                    )}
                  </button>
                </div>
              </div>

              {/* OTP Input Field */}
              {otpSent && !isEmailVerified && (
                <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/40 animate-in fade-in duration-200 space-y-2">
                  <label className="block text-xs font-mono uppercase text-purple-200 font-semibold flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                    Enter 6-Digit Email Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="123456"
                      className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-purple-500/50 text-white font-mono tracking-widest text-center text-lg focus:outline-none focus:border-purple-400"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={verifyingOtp}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow hover:opacity-95 transition flex items-center gap-1"
                    >
                      {verifyingOtp ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Verify Code"}
                    </button>
                  </div>
                </div>
              )}

              {/* Status Message */}
              {otpMessage && (
                <p className="text-xs font-mono text-purple-300 bg-purple-500/10 p-2.5 rounded-xl border border-purple-500/20 leading-relaxed">
                  {otpMessage}
                </p>
              )}

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                  {role === "startup" ? "Website URL" : "Primary Channel / Social URL"}
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={role === "startup" ? "https://yourstartup.com" : "https://youtube.com/@channel"}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                  Primary Focus / Niche
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0918] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="AI Productivity">AI &amp; Productivity</option>
                  <option value="Developer Tools">Developer Tools &amp; Cloud</option>
                  <option value="SaaS & Analytics">SaaS &amp; Telemetry</option>
                  <option value="Fintech & Web3">Fintech &amp; Web3</option>
                  <option value="Design & Media">Design &amp; UI/UX</option>
                  <option value="Other">Other...</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-xs text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold ml-1">
                  Log in to AZYRA →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
