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
} from "lucide-react";

export default function LeaderboardPage() {
  const [listings, setListings] = useState<OutbidListing[]>(INITIAL_OUTBID_LISTINGS);
  const [activeTab, setActiveTab] = useState<"alltime" | "today" | "archive">("alltime");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [archiveDate, setArchiveDate] = useState<string>("2026-10-01");
  const [searchQuery, setSearchQuery] = useState("");

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

    if (activeTab === "today") {
      list.sort((a, b) => b.todayBid - a.todayBid);
    } else {
      list.sort((a, b) => b.totalBid - a.totalBid);
    }

    return list;
  };

  const sortedListings = getFilteredAndSorted();
  const currentTop = sortedListings[0];
  const totalMarketVolume = listings.reduce((acc, curr) => acc + curr.totalBid, 0);
  const todayMarketVolume = listings.reduce((acc, curr) => acc + curr.todayBid, 0);
  const minToBeatTop = (currentTop?.totalBid || 0) + OUTBID_RULES.MIN_OVERBID_DIFFERENCE;

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
              Outbid.lol Style Attention Market
            </span>

            <h1 className="mt-4 text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Rank Is What You Pay. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                Attention Is What You Get.
              </span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              No upvote rings, review queues, or secret algorithms. Submit your startup website or X profile and bid to capture live rank positions.
            </p>

            {/* Quick Action Button Links */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/outbid"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <PlusCircle className="w-5 h-5 text-black" />
                <span>Submit Product / Outbid Console ($10 Min)</span>
              </Link>

              <Link
                href={`/outbid?id=${currentTop?.id}`}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-amber-500/40 text-amber-300 font-bold text-sm backdrop-blur-md transition flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Steal #1 Spot (${minToBeatTop.toLocaleString()})</span>
              </Link>
            </div>

            {/* Bidding Rules Highlights */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Min New Listing</span>
                <span className="text-lg font-black text-amber-400 font-mono">$10 USD</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Outbid Minimum</span>
                <span className="text-lg font-black text-emerald-400 font-mono">+$5 Over Target</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Tiebreaker</span>
                <span className="text-xs font-bold text-slate-200">Older listing retains rank</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Rank Bumping</span>
                <span className="text-xs font-bold text-slate-200">Pay difference anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Market Bar */}
        <section className="py-6 bg-[#0A0D1B] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-slate-400 uppercase block">Total Market Volume:</span>
                <span className="text-amber-400 font-bold text-base">${totalMarketVolume.toLocaleString()}</span>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div>
                <span className="text-slate-400 uppercase block">Today 24h Volume:</span>
                <span className="text-emerald-400 font-bold text-base">${todayMarketVolume.toLocaleString()}</span>
              </div>
              <div className="h-8 w-px bg-white/[0.08] hidden md:block" />
              <div className="hidden md:block">
                <span className="text-slate-400 uppercase block">#1 Champion Spot Value:</span>
                <span className="text-white font-bold text-base">${currentTop?.totalBid.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Daily reset at 00:00 UTC</span>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <button
                onClick={() => setActiveTab("alltime")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "alltime"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>All-Time Board</span>
              </button>

              <button
                onClick={() => setActiveTab("today")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "today"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Today UTC</span>
              </button>

              <button
                onClick={() => setActiveTab("archive")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "archive"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Daily Archive</span>
              </button>
            </div>

            {activeTab === "archive" && (
              <div className="flex items-center gap-2 bg-white/[0.04] px-4 py-2 rounded-xl border border-white/[0.08]">
                <span className="text-xs text-slate-400 font-mono">Select Archive Date:</span>
                <input
                  type="date"
                  value={archiveDate}
                  onChange={(e) => setArchiveDate(e.target.value)}
                  className="bg-transparent text-white text-xs font-mono outline-none"
                />
              </div>
            )}

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
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-white/[0.12] text-amber-300 border border-amber-500/40"
                    : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-3xl border border-amber-500/20 bg-[#090C19] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono uppercase text-slate-400">
                    <th className="py-4 px-6 font-semibold">Rank</th>
                    <th className="py-4 px-6 font-semibold">Startup / Product</th>
                    <th className="py-4 px-6 font-semibold">Category</th>
                    <th className="py-4 px-6 font-semibold">Cumulative Total Spent</th>
                    <th className="py-4 px-6 font-semibold">Today Spent</th>
                    <th className="py-4 px-6 font-semibold">Total Bids</th>
                    <th className="py-4 px-6 font-semibold text-right">Outbid Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-sm">
                  {sortedListings.map((item, idx) => {
                    const rankNum = idx + 1;
                    const isTop1 = rankNum === 1;
                    const isTop3 = rankNum <= 3;

                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors group ${
                          isTop1
                            ? "bg-amber-500/10 hover:bg-amber-500/15"
                            : isTop3
                            ? "bg-white/[0.02] hover:bg-white/[0.04]"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <td className="py-5 px-6 font-mono font-black">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-base font-extrabold ${
                                isTop1
                                  ? "text-amber-400 text-xl"
                                  : rankNum === 2
                                  ? "text-slate-200"
                                  : rankNum === 3
                                  ? "text-amber-600"
                                  : "text-slate-400"
                              }`}
                            >
                              #{rankNum < 10 ? `0${rankNum}` : rankNum}
                            </span>
                            {isTop1 && <Crown className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />}
                          </div>
                        </td>

                        <td className="py-5 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="font-extrabold text-white text-base hover:text-amber-300 transition flex items-center gap-1.5"
                              >
                                <span>{item.name}</span>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300" />
                              </a>

                              {item.twitter && (
                                <a
                                  href={`https://x.com/${item.twitter.replace("@", "")}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-mono text-slate-400 hover:text-sky-400 flex items-center gap-1"
                                >
                                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                  </svg>
                                  <span>{item.twitter}</span>
                                </a>
                              )}
                            </div>

                            <p className="text-xs text-slate-300 line-clamp-1 max-w-md">
                              {item.tagline}
                            </p>
                          </div>
                        </td>

                        <td className="py-5 px-6 font-mono text-xs text-slate-300">
                          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                            {item.category}
                          </span>
                        </td>

                        <td className="py-5 px-6 font-mono">
                          <div className="flex items-center gap-1">
                            <span className="text-base font-black text-amber-400">
                              ${item.totalBid.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400">USD</span>
                          </div>
                        </td>

                        <td className="py-5 px-6 font-mono text-xs">
                          {item.todayBid > 0 ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <TrendingUp className="w-3.5 h-3.5" /> +${item.todayBid.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-slate-400">$0 today</span>
                          )}
                        </td>

                        <td className="py-5 px-6 font-mono text-xs text-slate-400">
                          {item.bidCount} bids placed
                        </td>

                        <td className="py-5 px-6 text-right">
                          <Link
                            href={`/outbid?id=${item.id}`}
                            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition inline-flex items-center gap-1.5 ${
                              isTop1
                                ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20"
                                : "bg-white/[0.08] hover:bg-white/[0.16] text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            <span>{isTop1 ? "Outbid #1" : "Outbid / Boost"}</span>
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
    </div>
  );
}
