"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Rocket,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/discover" });
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/discover",
    });

    if (result?.ok) {
      router.push("/discover");
    } else {
      alert("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-indigo-600/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="rounded-3xl p-8 bg-[#0C101F] border border-indigo-500/30 shadow-2xl backdrop-blur-xl">
            {/* Logo Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20">
                  <div className="w-full h-full bg-white rounded-[11px] p-1.5 flex items-center justify-center">
                    <Image
                      src="/logo-mark.png"
                      alt="AZYRA"
                      width={28}
                      height={28}
                      priority
                      className="w-auto h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <span className="text-2xl font-black tracking-tight text-white font-sans">AZYRA</span>
              </Link>
              <h1 className="text-2xl font-black text-white">Welcome Back</h1>
              <p className="text-xs text-slate-400 mt-1">
                Log in to access your startup dashboard &amp; creator deals
              </p>
            </div>

            {/* DB & Environment Readiness Badge */}
            {dbStatus && (
              <div className="mb-6 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">MongoDB Status:</span>
                  {dbStatus.mongoConnected ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected ({dbStatus.dbName})
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Update URI in .env
                    </span>
                  )}
                </div>

                {!dbStatus.mongoConnected && (
                  <p className="text-[11px] text-amber-300/90 leading-tight">
                    💡 Please update <code className="bg-black/50 px-1 py-0.5 rounded text-indigo-300">MONGO_URI</code> in your workspace <code className="bg-black/50 px-1 py-0.5 rounded text-indigo-300">.env</code> file.
                  </p>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                  <span className="text-slate-400">Google OAuth Client:</span>
                  {dbStatus.googleConfigured ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                    </span>
                  ) : (
                    <span className="text-amber-400 font-bold">Needs Client ID</span>
                  )}
                </div>
              </div>
            )}

            {/* Google OAuth Login Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
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
              <span className="relative bg-[#0C101F] px-3 text-xs font-mono uppercase text-slate-400">
                or email login
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@startup.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Log In to AZYRA</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-xs text-slate-400">
                Don&apos;t have an AZYRA account?{" "}
                <Link href="/join" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1">
                  Join AZYRA →
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
