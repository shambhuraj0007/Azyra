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
  Calendar,
} from "lucide-react";
import { OutbidListing, OUTBID_RULES } from "@/lib/outbidData";

interface OutbidSpotlightProps {
  listings: OutbidListing[];
}

export default function OutbidSpotlight({ listings }: OutbidSpotlightProps) {
  const [activeView, setActiveView] = useState<"alltime" | "weekly" | "daily">("alltime");

  const sorted = [...listings].sort((a, b) => {
    if (activeView === "daily") return b.todayBid - a.todayBid;
    if (activeView === "weekly") return (b.weekBid || 0) - (a.weekBid || 0);
    return b.totalBid - a.totalBid;
  });

  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  const getDisplayBid = (item?: OutbidListing) => {
    if (!item) return 0;
    if (activeView === "daily") return item.todayBid;
    if (activeView === "weekly") return item.weekBid;
    return item.totalBid;
  };

  const getDisplayBidLabel = () => {
    if (activeView === "daily") return "Today 24h Bid";
    if (activeView === "weekly") return "This Week (7d) Bid";
    return "Total Bid Spent";
  };

  const activeTopBid = getDisplayBid(top1);
  const minToTakeTop = activeTopBid + OUTBID_RULES.MIN_OVERBID_DIFFERENCE;

  const totalMarketVolume = listings.reduce((sum, item) => sum + item.totalBid, 0);
  const weeklyMarketVolume = listings.reduce((sum, item) => sum + (item.weekBid || 0), 0);
  const dailyMarketVolume = listings.reduce((sum, item) => sum + item.todayBid, 0);

  const currentVolume =
    activeView === "daily"
      ? dailyMarketVolume
      : activeView === "weekly"
        ? weeklyMarketVolume
        : totalMarketVolume;

  return (
    <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/30 via-purple-500/20 to-indigo-500/20 shadow-2xl shadow-amber-950/40 overflow-hidden">
      <div className="rounded-[22px] bg-[#0A0D1B] border border-white/[0.08] p-6 md:p-8 space-y-8 relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Live Ticker Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 shadow-lg shadow-amber-950/20 backdrop-blur-md text-sm md:text-base font-mono text-center">
          <div className="flex items-center gap-2 text-amber-300 font-bold tracking-tight">
            <span className="text-base md:text-lg">👑</span>
            <span>
              {activeView === "daily"
                ? "Daily #1:"
                : activeView === "weekly"
                  ? "Weekly #1:"
                  : "All-Time #1:"}
            </span>
            <span className="text-white drop-shadow-sm">
              {top1?.name} (${activeTopBid?.toLocaleString()})
            </span>
          </div>

          <span className="hidden sm:inline-block text-amber-500/40 select-none">•</span>

          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <span className="text-base md:text-lg">⚡</span>
            <span>Min to steal #1:</span>
            <span className="font-bold text-emerald-300">
              ${minToTakeTop?.toLocaleString()}
            </span>
          </div>

          <span className="hidden sm:inline-block text-amber-500/40 select-none">•</span>

          <div className="flex items-center gap-2 text-indigo-300 font-medium">
            <span className="text-base md:text-lg">📊</span>
            <span>
              {activeView === "daily"
                ? "Today's Volume:"
                : activeView === "weekly"
                  ? "Weekly Volume:"
                  : "Total Volume:"}
            </span>
            <span className="font-bold text-indigo-200">
              ${currentVolume?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-white mt-2 tracking-tight">
              Pay Is Rank. Rank Is Attention.
            </h2>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-xl">
              No review queues or algorithm feeds. Startups bid to command top slots in real-time across daily, weekly, and all-time boards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 3-Way Timeframe Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveView("alltime")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeView === "alltime"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All-Time
              </button>
              <button
                type="button"
                onClick={() => setActiveView("weekly")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1 ${
                  activeView === "weekly"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Weekly</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${activeView === "weekly" ? "bg-black/25 text-black" : "bg-white/10 text-slate-300"}`}>7D</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView("daily")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1 ${
                  activeView === "daily"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Daily</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${activeView === "daily" ? "bg-black/25 text-black" : "bg-white/10 text-slate-300"}`}>24H</span>
              </button>
            </div>

            <Link
              href={`/outbid?id=${top1?.id}`}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
            >
              <Zap className="w-3.5 h-3.5 text-black fill-black" />
              <span>Bid for #1 (${minToTakeTop.toLocaleString()})</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {top1 && (
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-amber-500/20 via-[#13101E] to-[#0A0D1B] border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10 group flex flex-col justify-between">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-amber-500 text-black font-extrabold font-mono text-xs shadow-lg flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 fill-black" />
                {activeView === "daily"
                  ? "#01 DAILY CHAMPION"
                  : activeView === "weekly"
                    ? "#01 WEEKLY CHAMPION"
                    : "#01 ALL-TIME CHAMPION"}
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
                      {getDisplayBidLabel()}
                    </span>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      ${getDisplayBid(top1).toLocaleString()}
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
                <Link
                  href={`/outbid?id=${top1.id}`}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition"
                >
                  Bid for #1 🔥
                </Link>
              </div>
            </div>
          )}

          {top2 && (
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-indigo-500/15 via-[#101326] to-[#0A0D1B] border border-indigo-500/30 shadow-xl group flex flex-col justify-between">
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-slate-300 text-black font-extrabold font-mono text-xs shadow">
                🥈 {activeView === "daily" ? "#02 TODAY" : activeView === "weekly" ? "#02 THIS WEEK" : "#02 SPOT"}
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
                      {getDisplayBidLabel()}
                    </span>
                    <span className="text-2xl font-black text-slate-200 font-mono">
                      ${getDisplayBid(top2).toLocaleString()}
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
                <Link
                  href={`/outbid?id=${top2.id}`}
                  className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition"
                >
                  Bid for Spot ⚡
                </Link>
              </div>
            </div>
          )}

          {top3 && (
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-purple-500/15 via-[#131024] to-[#0A0D1B] border border-purple-500/30 shadow-xl group flex flex-col justify-between">
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-amber-700 text-white font-extrabold font-mono text-xs shadow">
                🥉 {activeView === "daily" ? "#03 TODAY" : activeView === "weekly" ? "#03 THIS WEEK" : "#03 SPOT"}
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
                      {getDisplayBidLabel()}
                    </span>
                    <span className="text-2xl font-black text-purple-300 font-mono">
                      ${getDisplayBid(top3).toLocaleString()}
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
                <Link
                  href={`/outbid?id=${top3.id}`}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition"
                >
                  Bid for Spot ⚡
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Gateway */}
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
            <span>View Full AZYRA Leaderboard ({listings.length} Listings)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
