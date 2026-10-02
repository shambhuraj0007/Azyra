"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Zap,
  Film,
  DollarSign,
  TrendingUp,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Eye,
  Video,
} from "lucide-react";
import { BountyPool } from "@/lib/bountiesData";

interface ClipSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bounties: BountyPool[];
  targetBountyId?: string | null;
  onSubmitClip: (bountyId: string, videoUrl: string, views: number, payout: number) => void;
}

export default function ClipSubmissionModal({
  isOpen,
  onClose,
  bounties,
  targetBountyId,
  onSubmitClip,
}: ClipSubmissionModalProps) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState("");
  const [platform, setPlatform] = useState<"TikTok" | "Reels" | "Shorts" | "X / Twitter">("TikTok");
  const [viewCount, setViewCount] = useState<number>(25000);
  const [hashtagsVerified, setHashtagsVerified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedBounty = bounties.find((b) => b.id === selectedId) || bounties[0];

  useEffect(() => {
    if (targetBountyId) {
      setSelectedId(targetBountyId);
    } else if (bounties.length > 0) {
      setSelectedId(bounties[0].id);
    }
  }, [targetBountyId, bounties, isOpen]);

  if (!isOpen) return null;

  // Pay-Per-1K-Views CPM Calculation Logic
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
      onSubmitClip(selectedBounty.id, videoUrl, viewCount, finalPayout);
      setIsSubmitting(false);
      setSuccessMessage(`🎉 VIDEO VERIFIED! Earnings of $${finalPayout.toFixed(2)} credited to your AZYRA escrow balance.`);

      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0D0B1F] border border-pink-500/40 rounded-3xl shadow-2xl shadow-pink-950/60 text-slate-100 overflow-hidden my-8">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 font-bold">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg">AZYRA Clips Content Rewards</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase">
                  Pay-Per-1K-Views (CPM)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Submit your live video link &amp; claim instant payouts per 1,000 views
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMessage ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">{successMessage}</h2>
            <p className="text-sm text-slate-300">
              Your video link has been logged and views are tracked in real-time. Payout credited instantly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 relative z-10">
            {/* Target Bounty Selection */}
            <div>
              <label className="block text-xs font-mono uppercase text-pink-300 font-bold mb-2">
                Select AZYRA Clips Bounty Campaign *
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#080714] border border-pink-500/40 text-white text-sm focus:outline-none focus:border-pink-400"
              >
                {bounties.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.startup} - {b.title} (${b.cpmRate.toFixed(2)}/1K Views · Pool: ${b.remainingBudget.toLocaleString()} left)
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Bounty Details Card */}
            {selectedBounty && (
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5">
                    <span className="text-base">{selectedBounty.logo}</span>
                    <span>{selectedBounty.startup} Campaign Requirements:</span>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    ${selectedBounty.cpmRate.toFixed(2)} CPM Rate ($/1K views)
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block">Min Threshold</span>
                    <span className="text-white font-bold">{selectedBounty.minViewsThreshold.toLocaleString()} views</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block">Max Video Cap</span>
                    <span className="text-amber-300 font-bold">${selectedBounty.maxCapPerVideo} / video</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block">Remaining Budget</span>
                    <span className="text-pink-400 font-bold">${selectedBounty.remainingBudget.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pt-1">
                  <span className="text-slate-400">Required Hashtags:</span>
                  <div className="flex gap-1.5">
                    {selectedBounty.hashtags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20 font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={selectedBounty.rawAssetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-mono pt-1 font-semibold"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Download Raw VOD Footage &amp; Clip Assets Drive →</span>
                </a>
              </div>
            )}

            {/* Video URL & Platform Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                  Published Video URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.tiktok.com/@creator/video/12345678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                    Social Platform *
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080714] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
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
                    <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      min={0}
                      value={viewCount}
                      onChange={(e) => setViewCount(Number(e.target.value))}
                      placeholder="e.g. 50000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white font-mono font-bold text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pay-Per-1K-Views Live CPM Earnings Calculator Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-pink-300 font-bold flex items-center gap-1.5 uppercase">
                  <TrendingUp className="w-4 h-4 text-pink-400" />
                  AZYRA CPM Earnings Calculator
                </span>
                <span className="text-slate-400">
                  Formula: ({viewCount.toLocaleString()} / 1,000) × ${selectedBounty?.cpmRate.toFixed(2)}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-xs text-slate-400 block">Calculated Escrow Payout:</span>
                  <span className="text-3xl font-black font-mono text-emerald-400">
                    ${finalPayout.toFixed(2)} USD
                  </span>
                </div>

                <div className="text-right">
                  {isCapped && (
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold block">
                      ⚠️ Video Capped at ${selectedBounty?.maxCapPerVideo} Max
                    </span>
                  )}
                  {!meetsMin && (
                    <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-mono font-bold block">
                      ⚠️ Below Min Threshold ({selectedBounty?.minViewsThreshold.toLocaleString()} views)
                    </span>
                  )}
                  {meetsMin && !isCapped && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold block">
                      ✓ Verified Payout Ready
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-1.5 text-xs text-slate-300 font-mono bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hashtagsVerified}
                  onChange={(e) => setHashtagsVerified(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span>I confirm required hashtags ({selectedBounty?.hashtags.join(" ")}) are tagged in post.</span>
              </label>
              <p className="text-[11px] text-slate-400 pt-1">• AZYRA automatically verifies views and releases payouts upon link submission.</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !meetsMin || !hashtagsVerified}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-pink-500/25 transition flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Verifying Social Metrics &amp; Transferring Escrow...</span>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Submit Video Link &amp; Claim ${finalPayout.toFixed(2)} Payout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
