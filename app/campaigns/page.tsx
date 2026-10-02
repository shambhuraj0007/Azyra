"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INITIAL_WHOP_BOUNTIES, WhopBountyPool } from "@/lib/bountiesData";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  DollarSign,
  Lock,
  Sparkles,
  Flame,
  Award,
  Film,
  Eye,
  TrendingUp,
  Video,
  Layers,
  PlusCircle,
} from "lucide-react";

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<"clips" | "briefs">("clips");
  const [filterCategory, setFilterCategory] = useState("all");
  const [bounties, setBounties] = useState<WhopBountyPool[]>(INITIAL_WHOP_BOUNTIES);

  const campaigns = [
    {
      id: 1,
      title: "Build With NovaAI Launch Brief",
      startup: "NovaAI",
      category: "ai",
      status: "LIVE BRIEF",
      totalPool: 12500,
      totalSpots: 15,
      filledSpots: 12,
      deadline: "5 days left",
      desc: "Produce a high-impact hands-on workflow video or Twitter/X breakdown demonstrating how NovaAI automates repetitive coding tasks for engineers.",
    },
    {
      id: 2,
      title: "FlowX Developer Telemetry Sprint",
      startup: "FlowX",
      category: "devtools",
      status: "LIVE BRIEF",
      totalPool: 8000,
      totalSpots: 10,
      filledSpots: 7,
      deadline: "8 days left",
      desc: "Integrate FlowX into a sample Next.js or Node repository and publish a walkthrough analyzing performance & latency bottlenecks.",
    },
    {
      id: 3,
      title: "PixelPay Global Onboarding Showcase",
      startup: "PixelPay",
      category: "fintech",
      status: "HOT BRIEF",
      totalPool: 6500,
      totalSpots: 8,
      filledSpots: 5,
      deadline: "3 days left",
      desc: "Walk your tech & creator audience through cross-border payments with zero FX margin for digital nomads and global freelancers.",
    },
    {
      id: 4,
      title: "HyperScale Edge Computing Beta Sprint",
      startup: "HyperScale",
      category: "devtools",
      status: "SPONSORED",
      totalPool: 15000,
      totalSpots: 12,
      filledSpots: 4,
      deadline: "12 days left",
      desc: "Benchmark global edge latency versus traditional cloud providers and publish an in-depth case study targeting cloud architects.",
    },
  ];

  const filteredCampaigns =
    filterCategory === "all"
      ? campaigns
      : campaigns.filter((c) => c.category === filterCategory);

  const totalWhopBudget = bounties.reduce((sum, b) => sum + b.remainingBudget, 0);
  const totalViewsGenerated = bounties.reduce((sum, b) => sum + b.totalViewsGenerated, 0);

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-pink-600/30 selection:text-pink-200">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-[#1B0D28] via-[#0D0A14] to-[#07090E] border-b border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 bg-pink-500/10 px-4 py-1.5 rounded-full border border-pink-500/30 inline-flex items-center gap-1.5 font-bold shadow-lg">
              <Film className="w-4 h-4 text-pink-400" />
              Whop Clips Content Rewards &amp; Escrow Marketplace
            </span>

            <h1 className="mt-4 text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Clip Content. Get Paid <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Per 1,000 Verified Views.
              </span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Whop-style Content Rewards marketplace where startups fund short-form video bounty pools and clippers earn guaranteed CPM rates ($0.50 – $5.00 / 1K views).
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/submit-clip"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-extrabold text-base shadow-xl shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2"
              >
                <Film className="w-5 h-5" />
                <span>Submit Clip &amp; Claim Payout</span>
              </Link>

              <Link
                href="/launch-campaign"
                className="px-8 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.15] text-slate-200 font-semibold text-base backdrop-blur-md transition"
              >
                Launch Whop Bounty Pool
              </Link>
            </div>
          </div>
        </section>

        {/* Whop Clips Live Market Summary Banner */}
        <section className="py-8 bg-[#090C19] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400 block uppercase mb-1">Live Whop Bounty Budget</span>
                <span className="text-2xl font-black text-pink-400">${totalWhopBudget.toLocaleString()} USD</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400 block uppercase mb-1">Total Verified Views</span>
                <span className="text-2xl font-black text-emerald-400">{(totalViewsGenerated / 1000000).toFixed(1)}M Views</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400 block uppercase mb-1">Average CPM Rate</span>
                <span className="text-2xl font-black text-amber-300">$1.95 / 1K Views</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400 block uppercase mb-1">Payout Verification</span>
                <span className="text-2xl font-black text-indigo-300 flex items-center gap-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Instant Escrow
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Switcher: Whop Clips vs Standard Briefs */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div className="flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <button
                onClick={() => setActiveTab("clips")}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold capitalize transition-all flex items-center gap-2 ${
                  activeTab === "clips"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Film className="w-4 h-4 text-pink-300" />
                <span>Whop Content Rewards ($/1K Views)</span>
              </button>

              <button
                onClick={() => setActiveTab("briefs")}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold capitalize transition-all flex items-center gap-2 ${
                  activeTab === "briefs"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-300" />
                <span>Standard Sponsorship Briefs</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              {activeTab === "clips"
                ? "⚡ Whop Model: Submit video link → Automatic view verification → Direct escrow payout per 1K views."
                : "🔒 Escrow Model: Custom deliverables & fixed milestone payments per creator slot."}
            </p>
          </div>

          {/* TAB 1: WHOP CLIPS CONTENT REWARDS MARKETPLACE */}
          {activeTab === "clips" && (
            <div className="space-y-6">
              {bounties.map((bounty) => (
                <div
                  key={bounty.id}
                  className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#120F24] to-[#0A0D1B] border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 group shadow-2xl relative overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                    <div className="space-y-4 max-w-2xl flex-1">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                          {bounty.status}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                          {bounty.category} Target
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1">
                          ⚡ ${bounty.cpmRate.toFixed(2)} / 1,000 Views
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-pink-300 transition-colors leading-tight">
                        {bounty.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {bounty.description}
                      </p>

                      {/* Hashtags & Raw Assets Link */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">Required Tags:</span>
                          {bounty.hashtags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-white/[0.05] text-pink-300 border border-white/[0.1]">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={bounty.rawAssetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 ml-auto"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Download Raw Footage Drive →</span>
                        </a>
                      </div>

                      {/* Metrics bar */}
                      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Min Views Threshold</span>
                          <span className="text-white font-bold">{bounty.minViewsThreshold.toLocaleString()} views</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Max Cap Per Video</span>
                          <span className="text-amber-300 font-bold">${bounty.maxCapPerVideo} USD</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Total Views Paid</span>
                          <span className="text-emerald-400 font-bold">{(bounty.totalViewsGenerated / 1000000).toFixed(2)}M</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Action Column */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/[0.08] min-w-[250px]">
                      <div className="text-left lg:text-right space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                          Remaining Whop Bounty Pool
                        </span>
                        <span className="text-3xl font-black text-white font-mono text-pink-400 block">
                          ${bounty.remainingBudget.toLocaleString()} USD
                        </span>
                        <span className="inline-block text-[11px] font-mono text-emerald-400 font-bold">
                          CPM Rate: ${bounty.cpmRate.toFixed(2)} / 1K views
                        </span>
                      </div>

                      <Link
                        href={`/submit-clip?bountyId=${bounty.id}`}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-extrabold text-xs tracking-wide uppercase shadow-xl shadow-pink-500/25 transition-all flex items-center justify-center gap-2 group/btn hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Film className="w-4 h-4" />
                        <span>Submit Clip &amp; Claim Payout</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: STANDARD SPONSORSHIP BRIEFS */}
          {activeTab === "briefs" && (
            <div className="space-y-6">
              {filteredCampaigns.map((camp) => {
                const remainingSpots = camp.totalSpots - camp.filledSpots;
                const fillPercentage = Math.round((camp.filledSpots / camp.totalSpots) * 100);

                return (
                  <div
                    key={camp.id}
                    className="rounded-3xl p-6 sm:p-8 bg-[#0B0E1B] border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group shadow-xl"
                  >
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                          {camp.status}
                        </span>
                        <span className="text-xs font-mono text-slate-400">by {camp.startup}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {camp.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {camp.desc}
                      </p>

                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                        <span className="text-slate-300 font-semibold">
                          {camp.filledSpots} of {camp.totalSpots} spots filled ({fillPercentage}%)
                        </span>
                        <span>·</span>
                        <span className="text-amber-400">{camp.deadline}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                      <div className="text-left lg:text-right">
                        <span className="text-[11px] font-mono uppercase text-slate-400 block">Total Reward</span>
                        <span className="text-2xl font-black text-white font-mono text-indigo-400">
                          ${camp.totalPool.toLocaleString()}
                        </span>
                      </div>
                      <Link
                        href="/join"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
                      >
                        <span>Apply for Opportunity</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
