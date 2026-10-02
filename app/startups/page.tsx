"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignModal from "@/components/CampaignModal";
import {
  Rocket,
  Megaphone,
  BarChart3,
  Star,
  Users,
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function StartupsPage() {
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-indigo-600/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Hero Section for Startups */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-[#0B0F1F] via-[#080B15] to-[#07090E] border-b border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              For Founders &amp; Marketing Leaders
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Your Startup Deserves Attention.
            </h1>
            <p className="mt-4 text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Launch campaigns, reach top creators, promote your product, and put your startup in front of people actively looking for what&apos;s next.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setCampaignModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                <span>Launch Your Startup</span>
              </button>
              <a
                href="#promotions"
                className="px-8 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.15] text-slate-200 font-semibold text-base transition-all"
              >
                Promotional Marketplace
              </a>
            </div>
          </div>
        </section>

        {/* 6 Core Startup Features */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              End-to-End Growth Engine
            </h2>
            <p className="mt-3 text-slate-300 text-base">
              Everything early-stage and scaling startups need to recruit advocates and drive qualified users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Campaign Creation",
                desc: "Spin up branded campaigns in minutes with target deliverables, budgets, and clear creator guidelines.",
                icon: Rocket,
              },
              {
                title: "Creator Discovery",
                desc: "Filter through verified tech creators by niche, engagement metrics, audience demographics, and track records.",
                icon: Users,
              },
              {
                title: "Sponsored Promotion",
                desc: "Boost your startup to the top of category feeds with transparently marked promotional placements.",
                icon: Megaphone,
              },
              {
                title: "Featured Placements",
                desc: "Secure premier visibility across the AZYRA homepage, weekly ecosystem digest, and community channels.",
                icon: Star,
              },
              {
                title: "Campaign Analytics",
                desc: "Track impressions, clicks, creator submissions, conversions, and ROI through a live data dashboard.",
                icon: BarChart3,
              },
              {
                title: "Global Discovery",
                desc: "Get seen by tech-forward early adopters and founders across North America, Europe, Asia, and beyond.",
                icon: Globe,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-6 bg-[#090C15] border border-white/[0.06] hover:border-indigo-500/40 hover:bg-[#0D1220] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Promotional Marketplace Section */}
        <section id="promotions" className="py-20 bg-[#05070B] border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                Promotional Marketplace
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Get Your Product in the Spotlight.
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg">
                Need guaranteed visibility? Promote your startup or campaign through AZYRA&apos;s promotional marketplace.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Sponsored placements are clearly marked for maximum audience trust.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Featured Startup",
                  badge: "Sponsored Placement",
                  desc: "Top placement on startup discovery pages and highest-ranking position on daily launch feeds.",
                  reach: "Up to 35K impressions",
                },
                {
                  title: "Featured Campaign",
                  badge: "Sponsored Placement",
                  desc: "Pushed to the top of active creator feeds with push notifications to top 10% rated creators.",
                  reach: "3x Creator Applications",
                },
                {
                  title: "Homepage Spotlight",
                  badge: "Sponsored Placement",
                  desc: "Prime real estate on the hero visual dashboard viewed by hundreds of daily tech enthusiasts.",
                  reach: "Maximum Brand Prestige",
                },
                {
                  title: "Category Spotlight",
                  badge: "Sponsored Placement",
                  desc: "Dominate your specific category (AI, SaaS, Fintech, DevTools) whenever visitors filter.",
                  reach: "Targeted Audience Only",
                },
                {
                  title: "Newsletter Takeover",
                  badge: "Sponsored Placement",
                  desc: "Dedicated feature in the weekly AZYRA Growth Brief sent to 45,000+ tech founders.",
                  reach: "48% Open Rate",
                },
                {
                  title: "Leaderboard Boost",
                  badge: "Sponsored Placement",
                  desc: "Pinned featured spot on the ecosystem leaderboard with clear sponsored attribution.",
                  reach: "High Traffic Exposure",
                },
              ].map((promo) => (
                <div
                  key={promo.title}
                  className="rounded-2xl p-6 bg-[#0B0E1B] border border-white/[0.08] hover:border-pink-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 font-bold">
                      {promo.badge}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-3 mb-2">{promo.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">{promo.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-indigo-300 font-mono font-medium">{promo.reach}</span>
                    <button
                      onClick={() => setCampaignModalOpen(true)}
                      className="text-pink-400 hover:text-pink-300 font-bold"
                    >
                      Book Slot →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Analytics Dashboard Preview */}
        <section id="analytics" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Live Telemetry
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
              Know What&apos;s Working.
            </h2>
            <p className="mt-3 text-slate-300 text-base">
              Track creator engagements, click attribution, and conversions with zero guesswork.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B0F1E] border border-white/[0.1] p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {[
                { label: "Views", val: "48,291", change: "+34%" },
                { label: "Clicks", val: "7,482", change: "+28%" },
                { label: "CTR", val: "15.5%", change: "+3.2%" },
                { label: "Creators", val: "42", change: "+12" },
                { label: "Applications", val: "87", change: "+19" },
                { label: "Conversions", val: "913", change: "+41%" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">{s.label}</span>
                  <span className="text-lg font-black text-white mt-0.5 block">{s.val}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">{s.change}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#070911] border border-white/[0.06] text-center">
              <span className="text-xs font-mono text-slate-400 block mb-3">Live Attention Curve</span>
              <div className="h-32 w-full flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                  <path
                    d="M0,80 Q80,60 150,55 T300,35 T400,20 T500,10"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="3"
                  />
                  <circle cx="400" cy="20" r="4" fill="#ec4899" />
                </svg>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setCampaignModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
              >
                Set Up Your Startup Campaign
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CampaignModal isOpen={campaignModalOpen} onClose={() => setCampaignModalOpen(false)} />
    </div>
  );
}
