"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INITIAL_OUTBID_LISTINGS, OutbidListing, OUTBID_RULES } from "@/lib/outbidData";
import {
  Trophy,
  Zap,
  TrendingUp,
  Flame,
  Globe,
  Search,
  Filter,
  ShieldCheck,
  Crown,
  Clock,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  PlusCircle,
  Calendar,
  Layers,
  Gift,
  Coins,
} from "lucide-react";
import ShareEarnModal from "@/components/ShareEarnModal";

export default function LeaderboardPage() {
  const [listings, setListings] = useState<OutbidListing[]>(INITIAL_OUTBID_LISTINGS);
  const [activeTab, setActiveTab] = useState<"alltime" | "weekly" | "daily" | "archive">("alltime");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [archiveDate, setArchiveDate] = useState<string>("2026-10-01");
  const [searchQuery, setSearchQuery] = useState("");
  const [shareEarnModalOpen, setShareEarnModalOpen] = useState(false);

  const getFilteredAndSorted = () => {
    let list = [...listings];

    if (selectedCategory !== "All") {
      list = list.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    if (activeTab === "daily") {
      list.sort((a, b) => b.todayBid - a.todayBid);
    } else if (activeTab === "weekly") {
      list.sort((a, b) => (b.weekBid || 0) - (a.weekBid || 0));
    } else {
      list.sort((a, b) => b.totalBid - a.totalBid);
    }

    return list;
  };

  const sortedListings = getFilteredAndSorted();
  const currentTop = sortedListings[0];

  const getActiveBid = (item?: OutbidListing) => {
    if (!item) return 0;
    if (activeTab === "daily") return item.todayBid;
    if (activeTab === "weekly") return item.weekBid || 0;
    return item.totalBid;
  };

  const activeTopBid = getActiveBid(currentTop);
  const totalMarketVolume = listings.reduce((acc, curr) => acc + curr.totalBid, 0);
  const weekMarketVolume = listings.reduce((acc, curr) => acc + (curr.weekBid || 0), 0);
  const todayMarketVolume = listings.reduce((acc, curr) => acc + curr.todayBid, 0);
  const minToBeatTop = activeTopBid + OUTBID_RULES.MIN_OVERBID_DIFFERENCE;

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-[#141024] via-[#0A0D1B] to-[#07090E] border-b border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/30 inline-flex items-center gap-2 font-bold shadow-lg shadow-amber-950/50">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              AZYRA Pay-To-Rank Attention Market
            </span>

            <h1 className="mt-4 text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Rank Is What You Pay. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                Attention Is What You Get.
              </span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              No upvote rings, review queues, or secret algorithms. Submit your startup website or X profile and bid to capture live rank positions across All-Time, Weekly, and Daily boards.
            </p>

            {/* Quick Action Button Links */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/outbid"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <PlusCircle className="w-5 h-5 text-black" />
                <span>Submit Product / Bid Console ($10 Min)</span>
              </Link>

              <Link
                href={`/outbid?id=${currentTop?.id}`}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-amber-500/40 text-amber-300 font-bold text-sm backdrop-blur-md transition flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Steal #1 Spot (${minToBeatTop.toLocaleString()})</span>
              </Link>

              <button
                type="button"
                onClick={() => setShareEarnModalOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-sm backdrop-blur-md transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Share &amp; Earn Credits (1000 = $1)</span>
              </button>
            </div>

            {/* Bidding Rules Highlights */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Min New Listing</span>
                <span className="text-lg font-black text-amber-400 font-mono">$10 USD</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Bid Minimum</span>
                <span className="text-lg font-black text-emerald-400 font-mono">+$5 Over Target</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">Wallet Discount</span>
                <span className="text-sm font-black text-amber-300 font-mono">1,000 = $1.00 USD</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Flipkart-style checkout</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Tiebreaker</span>
                <span className="text-xs font-bold text-slate-200">Older listing retains rank</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Volume & Scope Metric Strip */}
        <section className="py-4 bg-[#090C1A] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <span className="text-slate-400 uppercase text-[10px] block">All-Time Volume:</span>
                <span className="text-amber-400 font-bold text-sm">${totalMarketVolume.toLocaleString()}</span>
              </div>
              <div className="h-6 w-px bg-white/[0.08] hidden sm:block" />
              <div>
                <span className="text-slate-400 uppercase text-[10px] block">Weekly (7d) Volume:</span>
                <span className="text-indigo-400 font-bold text-sm">${weekMarketVolume.toLocaleString()}</span>
              </div>
              <div className="h-6 w-px bg-white/[0.08] hidden sm:block" />
              <div>
                <span className="text-slate-400 uppercase text-[10px] block">Today (24h) Volume:</span>
                <span className="text-emerald-400 font-bold text-sm">${todayMarketVolume.toLocaleString()}</span>
              </div>
              <div className="h-6 w-px bg-white/[0.08] hidden md:block" />
              <div className="hidden md:block">
                <span className="text-slate-400 uppercase text-[10px] block">
                  {activeTab === "daily" ? "Today's #1 Spot:" : activeTab === "weekly" ? "Weekly #1 Spot:" : "All-Time #1 Spot:"}
                </span>
                <span className="text-white font-bold text-sm">
                  {currentTop?.name} (${activeTopBid.toLocaleString()})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily resets 00:00 UTC · Weekly resets Mon</span>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            {/* Multi-Timeframe Ranking Tabs */}
            <div className="flex flex-wrap items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("alltime")}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "alltime"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                <Trophy className="w-4 h-4" />
                <span>All-Time Ranking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("weekly")}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "weekly"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Weekly Ranking</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === "weekly" ? "bg-black/25 text-black" : "bg-white/10 text-slate-300"
                    }`}
                >
                  7D
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("daily")}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "daily"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                <Flame className="w-4 h-4" />
                <span>Daily Ranking</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === "daily" ? "bg-black/25 text-black" : "bg-white/10 text-slate-300"
                    }`}
                >
                  24H
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("archive")}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "archive"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Daily Archive</span>
              </button>
            </div>



            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, category, website..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>
          </div>

          {/* Active Mode Explanation Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                {activeTab === "alltime" && "ALL-TIME LEADERBOARD: Ranked by cumulative historical bids since launch."}
                {activeTab === "weekly" && "WEEKLY LEADERBOARD: Ranked by 7-day rolling funding and momentum. Resets every Monday."}
                {activeTab === "daily" && "DAILY LEADERBOARD: Ranked by today's 24-hour bid velocity. Resets at 00:00 UTC."}
                {activeTab === "archive" && `HISTORICAL ARCHIVE: Snapshot of leaderboard rankings on ${archiveDate}.`}
              </span>
            </div>
            <span className="text-slate-400">
              Showing {sortedListings.length} products
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
            {[
              "All",
              "AI & Productivity",
              "Developer Tools",
              "SaaS & Analytics",
              "Fintech & Web3",
              "Design & Media",
              "E-Commerce",
              "Security",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition whitespace-nowrap ${selectedCategory === cat
                    ? "bg-white/[0.12] text-amber-300 border border-amber-500/40"
                    : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#070913]/90 shadow-[0_0_50px_-12px_rgba(245,158,11,0.12)] backdrop-blur-xl overflow-hidden">
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.015] text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 pl-6 pr-4 font-medium w-20 text-center">Rank</th>
                    <th className="py-3.5 px-4 font-medium">Startup / Product</th>
                    <th className="py-3.5 px-4 font-medium">Category</th>
                    <th className="py-3.5 px-4 font-medium text-right">
                      {activeTab === "daily"
                        ? "Today's Bid (24h)"
                        : activeTab === "weekly"
                          ? "This Week's Bid (7d)"
                          : "Total Spent"}
                    </th>
                    <th className="py-3.5 px-4 font-medium text-right">
                      {activeTab === "daily" || activeTab === "weekly" ? "All-Time Spent" : "24h Momentum"}
                    </th>
                    <th className="py-3.5 px-4 font-medium text-center">Bids</th>
                    <th className="py-3.5 pl-4 pr-6 font-medium text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.04]">
                  {sortedListings.map((item, idx) => {
                    const rankNum = idx + 1;
                    const isTop1 = rankNum === 1;
                    const isTop2 = rankNum === 2;
                    const isTop3 = rankNum === 3;

                    return (
                      <tr
                        key={item.id}
                        className={`group transition-all duration-150 ${isTop1
                            ? "bg-gradient-to-r from-amber-500/[0.10] via-amber-500/[0.04] to-transparent hover:from-amber-500/[0.14]"
                            : isTop2
                              ? "hover:bg-slate-400/[0.04]"
                              : isTop3
                                ? "hover:bg-amber-700/[0.04]"
                                : "hover:bg-white/[0.02]"
                          }`}
                      >
                        {/* Rank Column */}
                        <td className="py-4 pl-6 pr-4 text-center">
                          <div className="flex items-center justify-center">
                            <span
                              className={`inline-flex items-center justify-center h-8 min-w-[2rem] px-2 rounded-lg font-mono text-xs font-black tracking-tight ${isTop1
                                  ? "bg-amber-400 text-black shadow-md shadow-amber-400/30 ring-1 ring-amber-300"
                                  : isTop2
                                    ? "bg-slate-200 text-slate-900 ring-1 ring-white/40"
                                    : isTop3
                                      ? "bg-amber-800/80 text-amber-200 border border-amber-600/40"
                                      : "text-slate-400 bg-white/[0.03] border border-white/[0.05]"
                                }`}
                            >
                              {isTop1 ? "👑 01" : rankNum < 10 ? `0${rankNum}` : rankNum}
                            </span>
                          </div>
                        </td>

                        {/* Startup Details */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {/* Favicon / Avatar preview block */}
                            <div className="relative shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 p-1.5 flex items-center justify-center overflow-hidden group-hover:border-amber-400/40 transition">
                              <img
                                src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=64`}
                                alt={item.name}
                                className="w-5 h-5 rounded-sm object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                              <span className="font-mono text-xs font-black text-slate-400 uppercase select-none absolute">
                                {item.name.slice(0, 2)}
                              </span>
                            </div>

                            <div className="min-w-0 max-w-sm">
                              <div className="flex items-center gap-2">
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-bold text-white text-sm hover:text-amber-300 transition-colors inline-flex items-center gap-1 group/link truncate"
                                >
                                  <span className="truncate">{item.name}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-amber-300 shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                </a>

                                {item.twitter && (
                                  <a
                                    href={`https://x.com/${item.twitter.replace("@", "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="shrink-0 p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
                                    title={`@${item.twitter.replace("@", "")}`}
                                  >
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                  </a>
                                )}
                              </div>

                              <p className="text-xs text-slate-400 truncate mt-0.5 font-normal leading-relaxed">
                                {item.tagline}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-white/[0.03] border border-white/[0.07]">
                            {item.category}
                          </span>
                        </td>

                        {/* Primary Spent Column based on Active Tab */}
                        <td className="py-4 px-4 text-right whitespace-nowrap font-mono">
                          <div className="inline-flex flex-col items-end">
                            <span
                              className={`text-sm font-black tracking-tight ${isTop1 ? "text-amber-300 font-extrabold" : "text-white"
                                }`}
                            >
                              $
                              {(activeTab === "daily"
                                ? item.todayBid
                                : activeTab === "weekly"
                                  ? item.weekBid || 0
                                  : item.totalBid
                              )?.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium tracking-wider">
                              {activeTab === "daily"
                                ? "TODAY"
                                : activeTab === "weekly"
                                  ? "THIS WEEK"
                                  : "TOTAL"}
                            </span>
                          </div>
                        </td>

                        {/* Secondary Metric / Context */}
                        <td className="py-4 px-4 text-right whitespace-nowrap font-mono text-xs">
                          {activeTab === "daily" || activeTab === "weekly" ? (
                            <span className="text-slate-300 text-xs">
                              ${item.totalBid?.toLocaleString()} total
                            </span>
                          ) : item.todayBid > 0 ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 font-medium">
                              <TrendingUp className="w-3 h-3" />
                              +${item.todayBid?.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">—</span>
                          )}
                        </td>

                        {/* Total Bids */}
                        <td className="py-4 px-4 text-center whitespace-nowrap font-mono text-xs text-slate-400">
                          {item.bidCount}
                        </td>

                        {/* Action Link to Outbid Portal */}
                        <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                          <Link
                            href={`/outbid?id=${item.id}`}
                            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition inline-flex items-center gap-1.5 ${isTop1
                                ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20"
                                : "bg-white/[0.08] hover:bg-white/[0.16] text-amber-300 border border-amber-500/30"
                              }`}
                          >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            <span>{isTop1 ? "Bid for #1" : "Bid / Boost"}</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ShareEarnModal
        isOpen={shareEarnModalOpen}
        onClose={() => setShareEarnModalOpen(false)}
      />
    </div>
  );
}
