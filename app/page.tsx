"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignModal from "@/components/CampaignModal";
import CreatorModal from "@/components/CreatorModal";
import OutbidSpotlight from "@/components/OutbidSpotlight";
import OutbidModal from "@/components/OutbidModal";
import { INITIAL_OUTBID_LISTINGS, OutbidListing } from "@/lib/outbidData";
import {
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
  Compass,
  DollarSign,
  ArrowRight,
  Globe,
  BarChart3,
  Award,
  ShieldCheck,
  Flame,
  Activity,
  CheckCircle2,
  Zap,
  Trophy,
} from "lucide-react";

export default function Home() {
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [outbidListings, setOutbidListings] = useState<OutbidListing[]>(INITIAL_OUTBID_LISTINGS);
  const [outbidModalOpen, setOutbidModalOpen] = useState(false);
  const [targetOutbidId, setTargetOutbidId] = useState<string | null>(null);

  const handleOpenOutbidModal = (listingId?: string) => {
    setTargetOutbidId(listingId || null);
    setOutbidModalOpen(true);
  };

  const handleBidSubmitted = (newOrUpdatedItem: OutbidListing) => {
    setOutbidListings((prev) => {
      const index = prev.findIndex((item) => item.id === newOrUpdatedItem.id);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = newOrUpdatedItem;
        return copy;
      } else {
        return [newOrUpdatedItem, ...prev];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute top-[30%] right-[10%] w-[550px] h-[550px] rounded-full bg-amber-600/10 blur-[140px]" />
        <div className="absolute top-[65%] left-[5%] w-[650px] h-[650px] rounded-full bg-sky-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* Shared Header / Navigation across all pages */}
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-amber-950/40">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Featuring Outbid.lol Style Attention Leaderboard
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
                Where Startups Get Seen <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                  &amp; Creators Get Discovered.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
                AZYRA connects ambitious startups with creators, audiences, and growth opportunities — featuring a real-time pay-to-rank outbid leaderboard where rank is what you pay.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleOpenOutbidModal()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5 text-black fill-black" />
                  <span>⚡ Outbid Leaders &amp; Rank #1</span>
                </button>
                <Link
                  href="/leaderboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.15] text-slate-200 hover:text-white font-semibold text-base backdrop-blur-md transition-all flex items-center justify-center gap-2 group"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>View Pay-to-Rank Market</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust Signal */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Pay-To-Rank Model ($10 Min)
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Users className="w-4 h-4 text-purple-400" />
                  Built for Creators
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Globe className="w-4 h-4 text-pink-400" />
                  Global Attention Flywheel
                </span>
              </div>
            </div>

            {/* HOMEPAGE ATTRACTION: Outbid Attention Market Spotlight Component */}
            <div className="mt-14 max-w-6xl mx-auto">
              <OutbidSpotlight
                listings={outbidListings}
                onOpenBidModal={handleOpenOutbidModal}
              />
            </div>
          </div>
        </section>

        {/* Platform Ecosystem Grid */}
        <section className="py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                One Platform. A Whole Growth Ecosystem.
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg">
                Instead of fragmented channels, AZYRA unifies pay-to-rank leaderboards, creator collabs, and campaign briefs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Startups -> /startups */}
              <div className="relative rounded-3xl p-8 bg-gradient-to-b from-[#101424] to-[#0A0D18] border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Startups</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Build momentum from day one—launch your product, reach the right audience, and outbid competitors for front-page attention.
                  </p>
                </div>
                <Link
                  href="/startups"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Startups Page →</span>
                </Link>
              </div>

              {/* Card 2: Creators -> /creators */}
              <div className="relative rounded-3xl p-8 bg-gradient-to-b from-[#141026] to-[#0D0A1B] border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                    🎥
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Creators</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Discover hand-picked campaigns, collaborate with top-bidding startups, earn competitive payouts, and grow your influence.
                  </p>
                </div>
                <Link
                  href="/creators"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Creators Page →</span>
                </Link>
              </div>

              {/* Card 3: Outbid Leaderboard -> /leaderboard */}
              <div className="relative rounded-3xl p-8 bg-gradient-to-b from-[#1E1610] to-[#0E0A16] border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform text-amber-400">
                    🏆
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Outbid.lol Leaderboard</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Public attention market where rank is determined by total dollars paid. Outbid the top spot anytime.
                  </p>
                </div>
                <Link
                  href="/leaderboard"
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Outbid Market →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Four-Step Velocity */}
        <section className="py-20 bg-white/[0.01] border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Four-Step Velocity
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                How Pay-To-Rank Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Submit", desc: "Add your startup website or X profile starting with a minimum $10 bid." },
                { step: "02", title: "Rank", desc: "Your spot is ordered strictly by cumulative total money spent." },
                { step: "03", title: "Outbid", desc: "Overbid target positions by at least +$5 to instantly steal rank #1." },
                { step: "04", title: "Boost", desc: "Top up your bid difference anytime to retain top visibility." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl p-6 bg-[#0B0F1C] border border-white/[0.08] hover:border-amber-500/30 transition-all"
                >
                  <span className="text-3xl font-black font-mono text-amber-500/30 block mb-4">{item.step}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="py-24 bg-gradient-to-b from-[#07090E] via-[#0D1022] to-[#05070D] border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Claim the #1 Spot?
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg">
              Place a bid on the AZYRA Outbid Market and put your product directly in front of founders, creators, and investors.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handleOpenOutbidModal()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>Place Your Bid Now ($10 Min)</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CampaignModal isOpen={campaignModalOpen} onClose={() => setCampaignModalOpen(false)} />
      <CreatorModal isOpen={creatorModalOpen} onClose={() => setCreatorModalOpen(false)} />
      <OutbidModal
        isOpen={outbidModalOpen}
        onClose={() => setOutbidModalOpen(false)}
        listings={outbidListings}
        targetListingId={targetOutbidId}
        onBidSubmitted={handleBidSubmitted}
      />
    </div>
  );
}
