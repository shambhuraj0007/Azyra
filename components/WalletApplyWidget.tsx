"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Coins,
  CheckCircle2,
  Gift,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  getStoredWallet,
  creditsToDollars,
  UserWallet,
  CREDITS_PER_DOLLAR,
} from "@/lib/walletStore";
import ShareEarnModal from "./ShareEarnModal";

interface WalletApplyWidgetProps {
  bidAmount: number; // In dollars
  onDiscountChange: (discountDollars: number, creditsUsed: number) => void;
  targetListingName?: string;
}

export default function WalletApplyWidget({
  bidAmount,
  onDiscountChange,
  targetListingName,
}: WalletApplyWidgetProps) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "founder@startup.com";

  const [wallet, setWallet] = useState<UserWallet | null>(null);
  const [isApplied, setIsApplied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    const w = getStoredWallet(userEmail);
    setWallet(w);

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<UserWallet>;
      if (customEvent.detail) {
        setWallet(customEvent.detail);
      }
    };

    window.addEventListener("azyra-wallet-updated", handleUpdate);
    return () => window.removeEventListener("azyra-wallet-updated", handleUpdate);
  }, [userEmail]);

  const availableCredits = wallet?.credits || 0;
  const availableDollars = creditsToDollars(availableCredits);

  // Maximum credits that can be applied to this bid:
  // Cannot exceed bid amount (e.g. if bid is $10, max is $10 = 10,000 credits)
  // Cannot exceed available credits
  const maxApplicableDollars = Math.min(bidAmount, availableDollars);
  const maxApplicableCredits = Math.min(
    availableCredits,
    Math.round(maxApplicableDollars * CREDITS_PER_DOLLAR)
  );

  const handleToggle = (checked: boolean) => {
    setIsApplied(checked);
    if (checked) {
      onDiscountChange(maxApplicableDollars, maxApplicableCredits);
    } else {
      onDiscountChange(0, 0);
    }
  };

  // Recalculate discount if bidAmount changes while applied
  useEffect(() => {
    if (isApplied) {
      const newMaxDollars = Math.min(bidAmount, availableDollars);
      const newMaxCredits = Math.min(
        availableCredits,
        Math.round(newMaxDollars * CREDITS_PER_DOLLAR)
      );
      onDiscountChange(newMaxDollars, newMaxCredits);
    }
  }, [bidAmount, availableDollars, availableCredits, isApplied, onDiscountChange]);

  const payableAmount = Math.max(0, bidAmount - (isApplied ? maxApplicableDollars : 0));

  return (
    <>
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#120E24] via-[#090C1A] to-[#0A0D1E] p-4 sm:p-5 shadow-lg relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Coins className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                AZYRA Wallet Balance
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  1,000 = $1.00
                </span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="text-[11px] font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 underline underline-offset-2"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Share &amp; Earn More</span>
          </button>
        </div>

        {/* Flipkart-Style Checkbox & Apply Box */}
        <div className="py-3">
          {availableCredits > 0 ? (
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={isApplied}
                onChange={(e) => handleToggle(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-amber-500 bg-black border-amber-500/50 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-amber-500"
              />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white group-hover:text-amber-300 transition">
                    Apply {maxApplicableCredits.toLocaleString()} Credits to save ${maxApplicableDollars.toFixed(2)} on this bid
                  </span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    -${maxApplicableDollars.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Available Balance: <strong className="text-slate-200">{availableCredits.toLocaleString()} Credits</strong> (${availableDollars.toFixed(2)} USD)
                </p>
              </div>
            </label>
          ) : (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                You currently have 0 credits in your wallet.
              </span>
              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono hover:bg-amber-500/30 transition"
              >
                + Earn 2,000 Credits
              </button>
            </div>
          )}
        </div>

        {/* Live Flipkart-style Price Summary */}
        <div className="pt-3 border-t border-white/[0.08] text-xs font-mono space-y-1.5">
          <div className="flex justify-between text-slate-400">
            <span>Rank Bid Amount (Full Leaderboard Value):</span>
            <span className="text-white font-bold">${bidAmount.toFixed(2)}</span>
          </div>

          {isApplied && maxApplicableDollars > 0 && (
            <div className="flex justify-between text-emerald-400 font-bold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Wallet Credits Applied ({maxApplicableCredits.toLocaleString()} credits):
              </span>
              <span>-${maxApplicableDollars.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-2 border-t border-white/[0.06] text-sm">
            <span className="font-bold text-white">Net Out-of-Pocket Payment:</span>
            <div className="text-right">
              <span className="text-lg font-black text-amber-400">
                ${payableAmount.toFixed(2)} USD
              </span>
              {isApplied && maxApplicableDollars > 0 && (
                <span className="text-[10px] text-emerald-400 block font-normal">
                  You saved ${maxApplicableDollars.toFixed(2)} with AZYRA Wallet!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShareEarnModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </>
  );
}
