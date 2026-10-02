"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INITIAL_WHOP_BOUNTIES, WhopBountyPool } from "@/lib/bountiesData";
import {
  ArrowLeft,
  Film,
  Zap,
  TrendingUp,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Video,
  DollarSign,
  ShieldCheck,
  Lock,
  Sparkles,
} from "lucide-react";

function SubmitClipForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialBountyId = searchParams.get("bountyId");

  const [bounties, setBounties] = useState<WhopBountyPool[]>(INITIAL_WHOP_BOUNTIES);
  const [selectedId, setSelectedId] = useState<string>(initialBountyId || bounties[0]?.id || "");
  const [videoUrl, setVideoUrl] = useState("");
  const [platform, setPlatform] = useState<"TikTok" | "Reels" | "Shorts" | "X / Twitter">("TikTok");
  const [viewCount, setViewCount] = useState<number>(25000);
  const [hashtagsVerified, setHashtagsVerified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedBounty = bounties.find((b) => b.id === selectedId) || bounties[0];

  useEffect(() => {
    if (initialBountyId && bounties.some((b) => b.id === initialBountyId)) {
      setSelectedId(initialBountyId);
    }
  }, [initialBountyId, bounties]);

  // Pay-Per-1K-Views CPM Calculation
  const calculatePayout = () => {
    if (!selectedBounty) return { rawPayout: 0, finalPayout: 0, isCapped: false, meetsMin: false };

    const cpm = selectedBounty.cpmRate;
    const rawPayout = (viewCount / 1000) * cpm;
    const meetsMin = viewCount >= selectedBounty.minViewsThreshold;
    const isCapped = rawPayout > selectedBounty.maxCapPerVideo;
    const finalPayout = meetsMin
      ? Math.min(rawPayout, selectedBounty.maxCapPerVideo, selectedBounty.remainingBudget)
      : 0;

    return { rawPayout, finalPayout, isCapped, meetsMin };
  };

  const { rawPayout, finalPayout, isCapped, meetsMin } = calculatePayout();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoUrl || !videoUrl.startsWith("http")) {
      alert("Please enter a valid social video URL (TikTok, Instagram Reel, YouTube Short, or X post).");
      return;
    }

    if (!meetsMin) {
      alert(`Minimum view threshold for this bounty is ${selectedBounty.minViewsThreshold.toLocaleString()} views.`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setBounties((prev) =>
        prev.map((b) =>
          b.id === selectedId
            ? {
                ...b,
                remainingBudget: Math.max(0, b.remainingBudget - finalPayout),
                totalViewsGenerated: b.totalViewsGenerated + viewCount,
              }
            : b
        )
      );

      setIsSubmitting(false);
      setSuccessMessage(`🎉 VIDEO VERIFIED! Escrow payout of $${finalPayout.toFixed(2)} USD transferred to your balance.`);

      setTimeout(() => {
        router.push("/campaigns");
      }, 2500);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      {/* Top Breadcrumb Navigation */}
      <div className="mb-8">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-pink-400" />
          <span>Back to Campaigns Marketplace</span>
        </Link>
      </div>

      <div className="rounded-3xl p-6 sm:p-10 bg-[#0D0B1F] border border-pink-500/30 shadow-2xl shadow-pink-950/60 relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Portal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08] mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 font-bold">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">Whop Clips Submission Portal</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase">
                  Pay-Per-1K-Views
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Submit live video URL, verify metrics, and claim instant escrow payouts per 1,000 views
              </p>
            </div>
          </div>
        </div>

        {successMessage ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-white">{successMessage}</h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your video link has been verified against platform metrics. Redirecting back to campaigns marketplace...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Bounty Selection */}
            <div>
              <label className="block text-xs font-mono uppercase text-pink-300 font-extrabold mb-2">
                1. Select Whop Clips Bounty Campaign *
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#070612] border border-pink-500/40 text-white font-semibold text-sm focus:outline-none focus:border-pink-400 shadow-inner"
              >
                {bounties.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.startup} - {b.title} (${b.cpmRate.toFixed(2)}/1K Views · Pool: ${b.remainingBudget.toLocaleString()} USD left)
                  </option>
                ))}
              </select>
            </div>

            {/* Campaign Rules & Raw Asset Drive Card */}
            {selectedBounty && (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-white font-bold flex items-center gap-2 text-sm">
                    <span className="text-lg">{selectedBounty.logo}</span>
                    <span>{selectedBounty.startup} Campaign Requirements</span>
                  </span>
                  <span className="text-emerald-400 font-black text-sm">
                    ⚡ ${selectedBounty.cpmRate.toFixed(2)} CPM Rate ($/1K views)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-mono">
                  <div className="p-3 rounded-xl bg-black/50 border border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block uppercase">Min View Threshold</span>
                    <span className="text-white font-bold text-sm">{selectedBounty.minViewsThreshold.toLocaleString()} views</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block uppercase">Max Video Payout Cap</span>
                    <span className="text-amber-300 font-bold text-sm">${selectedBounty.maxCapPerVideo} / video</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block uppercase">Remaining Escrow Pool</span>
                    <span className="text-pink-400 font-bold text-sm">${selectedBounty.remainingBudget.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Required Hashtags:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBounty.hashtags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20 font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={selectedBounty.rawAssetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-mono font-bold"
                  >
                    <Video className="w-4 h-4" />
                    <span>Download Raw VOD Assets Drive →</span>
                  </a>
                </div>
              </div>
            )}

            {/* 2. Video URL & Metrics Input */}
            <div className="space-y-6 pt-2">
              <label className="block text-xs font-mono uppercase text-pink-300 font-extrabold">
                2. Video Submission Details
              </label>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                  Published Video URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.tiktok.com/@creator/video/12345678"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                    Social Platform *
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070612] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
                  >
                    <option value="TikTok">TikTok</option>
                    <option value="Reels">Instagram Reels</option>
                    <option value="Shorts">YouTube Shorts</option>
                    <option value="X / Twitter">X / Twitter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                    Current Verified View Count *
                  </label>
                  <div className="relative">
                    <Eye className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      min={0}
                      value={viewCount}
                      onChange={(e) => setViewCount(Number(e.target.value))}
                      placeholder="e.g. 50000"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white font-mono font-bold text-base focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Whop Pay-Per-1K-Views Earnings Calculator Panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/40 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-pink-300 font-bold flex items-center gap-2 uppercase tracking-wide">
                  <TrendingUp className="w-4 h-4 text-pink-400" />
                  Live Whop CPM Payout Calculator
                </span>
                <span className="text-slate-400">
                  ({viewCount.toLocaleString()} / 1,000) × ${selectedBounty?.cpmRate.toFixed(2)}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-xs text-slate-400 block">Calculated Escrow Payout:</span>
                  <span className="text-4xl font-black font-mono text-emerald-400">
                    ${finalPayout.toFixed(2)} USD
                  </span>
                </div>

                <div className="text-right">
                  {isCapped && (
                    <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold block">
                      ⚠️ Video Capped at ${selectedBounty?.maxCapPerVideo} Max
                    </span>
                  )}
                  {!meetsMin && (
                    <span className="px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold block">
                      ⚠️ Below Min Threshold ({selectedBounty?.minViewsThreshold.toLocaleString()} views)
                    </span>
                  )}
                  {meetsMin && !isCapped && (
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold block">
                      ✓ Verified Payout Ready
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 text-xs text-slate-300 font-mono bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hashtagsVerified}
                  onChange={(e) => setHashtagsVerified(e.target.checked)}
                  className="w-4 h-4 rounded text-pink-600 focus:ring-pink-500"
                />
                <span className="font-semibold text-white">
                  I confirm required hashtags ({selectedBounty?.hashtags.join(" ")}) are tagged in the video caption.
                </span>
              </label>
              <p className="text-[11px] text-slate-400 pl-6">• Whop API automatically verifies views and transfers funds directly to your wallet balance.</p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !meetsMin || !hashtagsVerified}
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-extrabold text-sm tracking-wide uppercase shadow-xl shadow-pink-500/25 transition flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Verifying Social Metrics &amp; Transferring Escrow...</span>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Submit Video &amp; Claim ${finalPayout.toFixed(2)} Escrow Payout</span>
                  </>
                )}
              </button>

              <Link
                href="/campaigns"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-slate-300 font-bold text-xs text-center transition"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function SubmitClipPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-pink-600/30 selection:text-pink-200">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-slate-400 font-mono">Loading portal...</div>}>
          <SubmitClipForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
