"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  X,
  Share2,
  Copy,
  Check,
  Gift,
  Coins,
  TrendingUp,
  Sparkles,
  Zap,
  Users,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import {
  getStoredWallet,
  creditsToDollars,
  UserWallet,
  CREDITS_PER_DOLLAR,
} from "@/lib/walletStore";

interface ShareEarnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareEarnModal({ isOpen, onClose }: ShareEarnModalProps) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "founder@startup.com";

  const [wallet, setWallet] = useState<UserWallet | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const w = getStoredWallet(userEmail);
      setWallet(w);
    }

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<UserWallet>;
      if (customEvent.detail) {
        setWallet(customEvent.detail);
      }
    };

    window.addEventListener("azyra-wallet-updated", handleUpdate);
    return () => window.removeEventListener("azyra-wallet-updated", handleUpdate);
  }, [isOpen, userEmail]);

  if (!isOpen) return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "https://azyra.io";
  const referralLink = `${origin}/join?ref=${wallet?.referralCode || "AZYRA-GROWTH"}`;
  const shareText = encodeURIComponent(
    `🚀 Join me on AZYRA — the attention marketplace for startups & creators. Use my invite link to get 1,000 bonus credits ($1.00 USD) towards ranking #1 on the leaderboard!\n\n${referralLink}`
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const balanceCredits = wallet?.credits || 0;
  const balanceDollars = creditsToDollars(balanceCredits);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090C1A] border border-amber-500/30 shadow-2xl shadow-amber-950/60 p-6 sm:p-8 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#080B17] rounded-[14px] flex items-center justify-center">
              <Gift className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Share &amp; Earn Credits
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                1000 = $1.00
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Redeemable directly as wallet balance to outbid competitors on the leaderboard!
            </p>
          </div>
        </div>

        {/* Wallet Balance Hero Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#120F24] to-indigo-500/15 border border-amber-500/30 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-slate-300 uppercase block font-semibold flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              Your Available Wallet Balance
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-white font-mono">
                {balanceCredits.toLocaleString()}
              </span>
              <span className="text-xs text-amber-300 font-bold uppercase font-mono">
                Credits
              </span>
              <span className="text-slate-500 font-mono text-sm">•</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                ${balanceDollars.toFixed(2)} USD
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">
              Total Earned
            </span>
            <span className="text-sm font-mono font-bold text-amber-300">
              {(wallet?.totalEarned || 0).toLocaleString()} Credits
            </span>
          </div>
        </div>

        {/* Flipkart-Style Application Info */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6 flex items-center gap-3 text-xs text-slate-300">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="font-bold text-white block">Flipkart-Style Wallet Checkout:</span>
            <span>
              Apply your credits at checkout on <strong className="text-amber-300">/outbid</strong> to reduce cash payment. 1,000 credits deducts $1.00 directly from your outbid price!
            </span>
          </div>
        </div>

        {/* Unique Referral Link Box */}
        <div className="mb-6 space-y-2">
          <label className="block text-xs font-mono text-slate-300 font-bold uppercase">
            Your Unique Referral Invite Link:
          </label>
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/[0.12] focus-within:border-amber-500">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 bg-transparent px-3 text-xs sm:text-sm font-mono text-slate-200 outline-none truncate select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono transition flex items-center gap-1.5 shrink-0 shadow"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1-Click Social Sharing */}
        <div className="mb-6">
          <span className="text-[11px] font-mono text-slate-400 uppercase block font-semibold mb-2">
            Share Directly:
          </span>
          <div className="grid grid-cols-4 gap-2">
            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition text-center"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X (Twitter)</span>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition text-center"
            >
              <span className="font-bold text-[#0A66C2]">in</span>
              <span>LinkedIn</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition text-center"
            >
              <span className="text-emerald-400">💬</span>
              <span>WhatsApp</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.org/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Join AZYRA with bonus credits!")}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition text-center"
            >
              <span className="text-sky-400">✈️</span>
              <span>Telegram</span>
            </a>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-left">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] font-mono text-amber-400 font-bold block">STEP 1</span>
            <span className="text-xs font-bold text-white block mt-0.5">Share Link</span>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Invite startup founders and creators with your unique link.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block">STEP 2</span>
            <span className="text-xs font-bold text-white block mt-0.5">They Get $1.00</span>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              They receive 1,000 bonus credits instantly upon signup.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] font-mono text-indigo-400 font-bold block">STEP 3</span>
            <span className="text-xs font-bold text-white block mt-0.5">You Get $2.00</span>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              You receive 2,000 credits ($2.00) in your wallet for every referral!
            </p>
          </div>
        </div>

        {/* Recent Wallet Activity */}
        {wallet && wallet.transactions.length > 0 && (
          <div className="border-t border-white/[0.08] pt-4">
            <span className="text-[11px] font-mono text-slate-400 uppercase block font-semibold mb-2">
              Recent Credits Activity:
            </span>
            <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 text-xs font-mono scrollbar-thin scrollbar-thumb-white/10">
              {wallet.transactions.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <span className="text-slate-300 truncate max-w-[280px]">
                    {tx.description}
                  </span>
                  <span
                    className={`font-bold shrink-0 ${
                      tx.credits > 0 ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {tx.credits > 0 ? `+${tx.credits.toLocaleString()}` : tx.credits.toLocaleString()} ({tx.credits > 0 ? `+$${tx.dollarValue.toFixed(2)}` : `-$${Math.abs(tx.dollarValue).toFixed(2)}`})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
