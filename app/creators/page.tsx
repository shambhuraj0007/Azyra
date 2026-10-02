"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorModal from "@/components/CreatorModal";
import ClipSubmissionModal from "@/components/ClipSubmissionModal";
import { INITIAL_BOUNTIES, BountyPool } from "@/lib/bountiesData";
import {
  Sparkles,
  Compass,
  Target,
  Briefcase,
  BarChart3,
  DollarSign,
  Award,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Film,
  Zap,
  TrendingUp,
  Video,
} from "lucide-react";

export default function CreatorsPage() {
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [clipModalOpen, setClipModalOpen] = useState(false);
  const [targetBountyId, setTargetBountyId] = useState<string | null>(null);
  const [bounties, setBounties] = useState<BountyPool[]>(INITIAL_BOUNTIES);

  const [audienceSize, setAudienceSize] = useState<number>(25); // in thousands
  const [campaignsPerMonth, setCampaignsPerMonth] = useState<number>(3);

  // Dynamic calculated earnings estimate
  const estimatedEarnings = Math.round(audienceSize * 28 * campaignsPerMonth * 0.85);

  const handleOpenClipModal = (id?: string) => {
    setTargetBountyId(id || null);
    setClipModalOpen(true);
  };

  const handleSubmitClip = (bountyId: string, videoUrl: string, views: number, payout: number) => {
    setBounties((prev) =>
      prev.map((b) =>
        b.id === bountyId
          ? {
              ...b,
              remainingBudget: Math.max(0, b.remainingBudget - payout),
              totalViewsGenerated: b.totalViewsGenerated + views,
            }
          : b
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-purple-600/30 selection:text-purple-200">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Creator Hero */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-[#1B0D28] via-[#0D0A1B] to-[#07090E] border-b border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 inline-flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-pink-400" />
              For Tech Creators, Clippers &amp; Influencers
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Turn Your Audience &amp; Edits <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 bg-clip-text text-transparent">
                Into Instant Opportunity.
              </span>
            </h1>
            <p className="mt-4 text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover startups, apply to fixed briefs, or participate in <strong>AZYRA Clips Content Rewards</strong> to earn guaranteed CPM payouts ($0.50 – $5.00 per 1,000 views).
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setCreatorModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Join as a Creator</span>
              </button>
              <button
                onClick={() => handleOpenClipModal()}
                className="px-8 py-4 rounded-2xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 font-bold text-base transition-all flex items-center gap-2"
              >
                <Film className="w-5 h-5 text-pink-400" />
                <span>Submit Video &amp; Earn CPM ($/1K Views)</span>
              </button>
            </div>
          </div>
        </section>

        {/* FEATURE HIGHLIGHT: AZYRA CLIPS BOUNTIES FOR CLIPPERS */}
        <section className="py-16 bg-[#090C19] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                  AZYRA Content Rewards Model
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                  Clippers &amp; Short-Form Creator Hub
                </h2>
                <p className="text-slate-300 text-sm mt-1">
                  Repurpose founder podcast VODs &amp; product demos into TikToks, Reels, or Shorts to claim instant escrow payouts per 1,000 views.
                </p>
              </div>

              <Link
                href="/campaigns"
                className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-slate-200 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <span>Browse All AZYRA Bounties →</span>
              </Link>
            </div>

            {/* Quick Clipper Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bounties.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl p-6 bg-gradient-to-b from-[#120E24] to-[#0A0D1B] border border-pink-500/30 hover:border-pink-500/60 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-3">
                      <span className="px-2.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
                        {b.category}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        ⚡ ${b.cpmRate.toFixed(2)} / 1K Views
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors mb-2">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {b.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Pool: <strong className="text-white">${b.remainingBudget.toLocaleString()} left</strong>
                    </span>
                    <button
                      onClick={() => handleOpenClipModal(b.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-extrabold shadow transition"
                    >
                      Submit Link 🎥
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 Creator Feature Cards */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Creators Choose AZYRA
            </h2>
            <p className="mt-3 text-slate-300 text-base">
              A transparent marketplace built to protect your reputation and accelerate your monetization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AZYRA Pay-Per-1K-Views Bounties",
                desc: "Clip raw VOD footage into TikToks/Shorts and earn guaranteed CPM rates ($0.50 – $5.00 / 1K views) with automatic view verification.",
                icon: Film,
              },
              {
                title: "Fixed Sponsorship Briefs",
                desc: "Browse dozens of curated startup launches looking for reviews, tutorials, demos, and honest showcases.",
                icon: Compass,
              },
              {
                title: "Apply to Opportunities",
                desc: "Submit proposals in 1-click with pre-linked portfolio links, audience breakdowns, and fixed-rate pricing.",
                icon: Target,
              },
              {
                title: "Collaborate with Startups",
                desc: "Direct communication with founders and product teams. No agency middlemen taking a 30% cut.",
                icon: Briefcase,
              },
              {
                title: "Milestone Escrow Payouts",
                desc: "Guaranteed payouts held in escrow. Get paid on time upon milestone completion with zero payment disputes.",
                icon: DollarSign,
              },
              {
                title: "Build Your Reputation",
                desc: "Earn verified badges, founder testimonials, and rank on AZYRA's Top Creator Leaderboard.",
                icon: Award,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-6 bg-[#120E24] border border-purple-500/20 hover:border-purple-500/50 hover:bg-[#17122E] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Creator Earnings Calculator */}
        <section id="earnings" className="py-20 bg-[#060810] border-t border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                Calculator
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
                Estimate Your Monthly Sponsorship Income
              </h2>
              <p className="mt-3 text-slate-300 text-sm">
                Based on active campaign budgets and payouts across the AZYRA marketplace.
              </p>
            </div>

            <div className="rounded-3xl p-8 bg-[#0F0C22] border border-purple-500/30 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-semibold">
                    <span className="text-slate-300">Audience Following:</span>
                    <span className="text-purple-400 font-mono">{audienceSize}K Followers</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="5"
                    value={audienceSize}
                    onChange={(e) => setAudienceSize(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2 font-semibold">
                    <span className="text-slate-300 font-semibold">Campaigns per Month:</span>
                    <span className="text-pink-400 font-mono">{campaignsPerMonth} Campaigns</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={campaignsPerMonth}
                    onChange={(e) => setCampaignsPerMonth(Number(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono block">Estimated Potential Payout</span>
                    <span className="text-4xl font-black text-white mt-1 block">
                      ${estimatedEarnings.toLocaleString()}{" "}
                      <span className="text-sm font-normal text-slate-400">/ month</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setCreatorModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition"
                  >
                    Claim Your Creator Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CreatorModal isOpen={creatorModalOpen} onClose={() => setCreatorModalOpen(false)} />
      <ClipSubmissionModal
        isOpen={clipModalOpen}
        onClose={() => setClipModalOpen(false)}
        bounties={bounties}
        targetBountyId={targetBountyId}
        onSubmitClip={handleSubmitClip}
      />
    </div>
  );
}
