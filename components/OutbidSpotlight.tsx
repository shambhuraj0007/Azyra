"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Zap,
  TrendingUp,
  Flame,
  Globe,
  ArrowRight,
  ShieldCheck,
  Crown,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { OutbidListing, OUTBID_RULES } from "@/lib/outbidData";

interface OutbidSpotlightProps {
  listings: OutbidListing[];
  onOpenBidModal: (listingId?: string) => void;
}

export default function OutbidSpotlight({ listings, onOpenBidModal }: OutbidSpotlightProps) {
  const [activeView, setActiveView] = useState<"alltime" | "today">("alltime");

  const sorted = [...listings].sort((a, b) =>
    activeView === "alltime" ? b.totalBid - a.totalBid : b.todayBid - a.todayBid
  );

  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  const totalMarketVolume = listings.reduce((sum, item) => sum + item.totalBid, 0);
  const minToTakeTop = (top1?.totalBid || 0) + OUTBID_RULES.MIN_OVERBID_DIFFERENCE;

  return (
    <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/30 via-purple-500/20 to-indigo-500/20 shadow-2xl shadow-amber-950/40 overflow-hidden">
      <div className="rounded-[22px] bg-[#0A0D1B] border border-white/[0.08] p-6 md:p-8 space-y-8 relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Live Ticker Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
          <div className="flex items-center gap-2 font-mono text-amber-300 font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Outbid.lol Live Attention Market</span>
          </div>

          {/* Dynamic news ticker */}
          <div className="flex items-center gap-6 text-slate-300 font-mono text-[11px] overflow-x-auto whitespace-nowrap py-1">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              👑 #1 Champion: {top1?.name} (${top1?.totalBid.toLocaleString()})
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">
              ⚡ Min to capture #1: ${minToTakeTop.toLocaleString()}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-indigo-300">
              📊 Total Market Volume: ${totalMarketVolume.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("alltime")}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                activeView === "alltime"
                  ? "bg-amber-500 text-black shadow"
                  : "bg-white/[0.05] text-slate-400 hover:text-white"
              }`}
            >
              All-Time
            </button>
            <button
              onClick={() => setActiveView("today")}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                activeView === "today"
                  ? "bg-amber-500 text-black shadow"
                  : "bg-white/[0.05] text-slate-400 hover:text-white"
              }`}
            >
              Today UTC
            </button>
          </div>
        </div>

        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Pay-To-Rank Leaderboard
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white mt-2 tracking-tight">
              Pay Is Rank. Rank Is Attention.
            </h2>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-xl">
              No review queues or algorithm feeds. Startups bid to command top slots in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenBidModal()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
            >
              <Zap className="w-4 h-4 text-black fill-black" />
              <span>Outbid #1 Spot (${minToTakeTop.toLocaleString()})</span>
              <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rank #1 Gold */}
          {top1 && (
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-amber-500/20 via-[#13101E] to-[#0A0D1B] border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10 group flex flex-col justify-between">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-amber-500 text-black font-extrabold font-mono text-xs shadow-lg flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 fill-black" /> #01 CHAMPION
              </div>

              <div>
                <div className="flex items-start justify-between mt-2">
                  <div>
                    <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wide font-bold">
                      {top1.category}
                    </span>
                    <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition">
                      {top1.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Total Bid Spent
                    </span>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      ${top1.totalBid.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {top1.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href={top1.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Website →</span>
                </a>
                <button
                  onClick={() => onOpenBidModal(top1.id)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition"
                >
                  Outbid #1 🔥
                </button>
              </div>
            </div>
          )}

          {/* Rank #2 Silver */}
          {top2 && (
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-indigo-500/15 via-[#101326] to-[#0A0D1B] border border-indigo-500/30 shadow-xl group flex flex-col justify-between">
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-slate-300 text-black font-extrabold font-mono text-xs shadow">
                🥈 #02 SPOT
              </div>

              <div>
                <div className="flex items-start justify-between mt-2">
                  <div>
                    <span className="text-[11px] font-mono text-indigo-300 uppercase tracking-wide font-bold">
                      {top2.category}
                    </span>
                    <h3 className="text-2xl font-black text-white group-hover:text-indigo-300 transition">
                      {top2.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Total Bid Spent
                    </span>
                    <span className="text-2xl font-black text-slate-200 font-mono">
                      ${top2.totalBid.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {top2.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href={top2.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Website →</span>
                </a>
                <button
                  onClick={() => onOpenBidModal(top2.id)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition"
                >
                  Outbid Spot ⚡
                </button>
              </div>
            </div>
          )}

          {/* Rank #3 Bronze */}
          {top3 && (
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-purple-500/15 via-[#131024] to-[#0A0D1B] border border-purple-500/30 shadow-xl group flex flex-col justify-between">
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-amber-700 text-white font-extrabold font-mono text-xs shadow">
                🥉 #03 SPOT
              </div>

              <div>
                <div className="flex items-start justify-between mt-2">
                  <div>
                    <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wide font-bold">
                      {top3.category}
                    </span>
                    <h3 className="text-2xl font-black text-white group-hover:text-purple-300 transition">
                      {top3.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Total Bid Spent
                    </span>
                    <span className="text-2xl font-black text-purple-300 font-mono">
                      ${top3.totalBid.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {top3.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href={top3.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Website →</span>
                </a>
                <button
                  onClick={() => onOpenBidModal(top3.id)}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition"
                >
                  Outbid Spot ⚡
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Gateway to Full Outbid Leaderboard Page */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Minimum bid: <strong>$10</strong> · Overbid minimum: <strong>+$5 over target spot</strong>
            </span>
          </div>

          <Link
            href="/leaderboard"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] text-slate-200 hover:text-white font-bold text-xs transition text-center flex items-center justify-center gap-2 group"
          >
            <span>View Full Outbid Leaderboard ({listings.length} Listings)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
