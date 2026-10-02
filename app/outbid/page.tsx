"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INITIAL_OUTBID_LISTINGS, OutbidListing, OUTBID_RULES } from "@/lib/outbidData";
import {
  ArrowLeft,
  Zap,
  Trophy,
  DollarSign,
  TrendingUp,
  Flame,
  Globe,
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowUpRight,
  Crown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function OutbidForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTargetId = searchParams.get("id");

  const [listings, setListings] = useState<OutbidListing[]>(INITIAL_OUTBID_LISTINGS);
  const [mode, setMode] = useState<"boost" | "new">(initialTargetId ? "boost" : "new");
  const [selectedId, setSelectedId] = useState<string>(initialTargetId || "");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [twitter, setTwitter] = useState("");
  const [category, setCategory] = useState("AI & Productivity");
  const [tagline, setTagline] = useState("");
  const [bidAmount, setBidAmount] = useState<number>(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const sortedListings = [...listings].sort((a, b) => b.totalBid - a.totalBid);
  const currentTop = sortedListings[0];
  const minToBeatTop = (currentTop?.totalBid || 0) + OUTBID_RULES.MIN_OVERBID_DIFFERENCE;

  useEffect(() => {
    if (initialTargetId) {
      const match = listings.find((l) => l.id === initialTargetId);
      if (match) {
        setMode("boost");
        setSelectedId(match.id);
        const topDiff = Math.max(minToBeatTop - match.totalBid, 25);
        setBidAmount(topDiff);
      }
    } else {
      setBidAmount(Math.max(minToBeatTop, 50));
    }
  }, [initialTargetId, listings, minToBeatTop]);

  const handleSelectExisting = (id: string) => {
    setSelectedId(id);
    const item = listings.find((l) => l.id === id);
    if (item) {
      const neededForTop = Math.max(minToBeatTop - item.totalBid, 25);
      setBidAmount(neededForTop);
    }
  };

  const getProjectedRank = (addedBid: number): { rank: number; currentBid: number; newTotal: number } => {
    if (mode === "boost" && selectedId) {
      const target = listings.find((l) => l.id === selectedId);
      const existingBid = target ? target.totalBid : 0;
      const newTotal = existingBid + addedBid;

      const higherCount = sortedListings.filter(
        (l) => l.id !== selectedId && l.totalBid >= newTotal
      ).length;
      return { rank: higherCount + 1, currentBid: existingBid, newTotal };
    } else {
      const newTotal = addedBid;
      const higherCount = sortedListings.filter((l) => l.totalBid >= newTotal).length;
      return { rank: higherCount + 1, currentBid: 0, newTotal };
    }
  };

  const projected = getProjectedRank(bidAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (bidAmount < OUTBID_RULES.MIN_NEW_BID) {
      alert(`Minimum bid is $${OUTBID_RULES.MIN_NEW_BID}. Please increase your bid amount.`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`🔥 SUCCESS! Placed a $${bidAmount} bid. Claimed Rank #${projected.rank}!`);

      setTimeout(() => {
        router.push("/leaderboard");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      {/* Top Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back to Outbid Leaderboard</span>
        </Link>
      </div>

      <div className="rounded-3xl p-6 sm:p-10 bg-[#0C0F1D] border border-amber-500/30 shadow-2xl shadow-amber-950/50 relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Portal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08] mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              <Zap className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">Outbid.lol Bidding Console</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  Pay-to-Rank
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Bid higher to outperform products, capture front-page attention, and rank #1
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
              Leaderboard updated in real-time. Redirecting back to main leaderboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Mode Selector */}
            <div className="grid grid-cols-2 gap-4 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  setMode("new");
                  setSelectedId("");
                }}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
                  mode === "new"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Submit New Startup ($10 Min)</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("boost")}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
                  mode === "boost"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Outbid / Boost Existing Listing</span>
              </button>
            </div>

            {/* Select Target if Boost Mode */}
            {mode === "boost" && (
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-extrabold mb-2">
                  Select Product to Outbid / Boost *
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => handleSelectExisting(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#080B16] border border-amber-500/40 text-white font-semibold text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="">-- Choose Existing Listing --</option>
                  {sortedListings.map((item, idx) => (
                    <option key={item.id} value={item.id}>
                      #{idx + 1} {item.name} (${item.totalBid.toLocaleString()} total spent)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Product Fields if New Mode */}
            {mode === "new" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                    Product / Startup Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Acme AI, Outbid Engine"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Product Website URL *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        required
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://myproduct.io"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      X (Twitter) Profile (Optional)
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <input
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="@myproduct_x"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#080B16] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="AI & Productivity">AI &amp; Productivity</option>
                      <option value="Developer Tools">Developer Tools</option>
                      <option value="SaaS & Analytics">SaaS &amp; Analytics</option>
                      <option value="Fintech & Web3">Fintech &amp; Web3</option>
                      <option value="Design & Media">Design &amp; Media</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Other">Other...</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Short Tagline *
                    </label>
                    <input
                      type="text"
                      required
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="One-line pitch for high conversion"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono uppercase text-amber-300 font-extrabold">
                  Select Bid Amount ($ USD)
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  Min to beat #1: ${minToBeatTop.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setBidAmount(minToBeatTop)}
                  className={`p-3 rounded-xl border text-xs font-extrabold text-center transition ${
                    bidAmount === minToBeatTop
                      ? "bg-amber-500 text-black border-amber-400 shadow-md"
                      : "bg-white/[0.03] border-white/[0.1] text-amber-300 hover:bg-white/[0.08]"
                  }`}
                >
                  👑 #1 Spot (${minToBeatTop.toLocaleString()})
                </button>

                {sortedListings[2] && (
                  <button
                    type="button"
                    onClick={() => setBidAmount(sortedListings[2].totalBid + 5)}
                    className={`p-3 rounded-xl border text-xs font-extrabold text-center transition ${
                      bidAmount === sortedListings[2].totalBid + 5
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                        : "bg-white/[0.03] border-white/[0.1] text-indigo-300 hover:bg-white/[0.08]"
                    }`}
                  >
                    🥉 Top 3 (${(sortedListings[2].totalBid + 5).toLocaleString()})
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setBidAmount(100)}
                  className={`p-3 rounded-xl border text-xs font-extrabold text-center transition ${
                    bidAmount === 100
                      ? "bg-purple-600 text-white border-purple-400 shadow-md"
                      : "bg-white/[0.03] border-white/[0.1] text-purple-300 hover:bg-white/[0.08]"
                  }`}
                >
                  ⚡ Boost +$100
                </button>

                <button
                  type="button"
                  onClick={() => setBidAmount(250)}
                  className={`p-3 rounded-xl border text-xs font-extrabold text-center transition ${
                    bidAmount === 250
                      ? "bg-pink-600 text-white border-pink-400 shadow-md"
                      : "bg-white/[0.03] border-white/[0.1] text-pink-300 hover:bg-white/[0.08]"
                  }`}
                >
                  🔥 Boost +$250
                </button>
              </div>

              {/* Custom Bid Input */}
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                <input
                  type="number"
                  min={OUTBID_RULES.MIN_NEW_BID}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  placeholder="Enter custom bid amount"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/60 border border-amber-500/50 text-amber-300 font-mono font-black text-xl focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Projected Rank Live Card */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-extrabold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Live Outbid Projection
                </span>
                <p className="text-xs text-slate-300">
                  {mode === "boost" && selectedId
                    ? `Current Total: $${projected.currentBid.toLocaleString()} + Boost: $${bidAmount.toLocaleString()}`
                    : `Initial Listing Bid: $${bidAmount.toLocaleString()}`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Target Rank Position
                  </span>
                  <span className="text-3xl font-black text-amber-400 font-mono">
                    #{projected.rank}
                  </span>
                </div>
                {projected.rank === 1 && (
                  <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" /> #1 CHAMPION
                  </span>
                )}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-black text-base shadow-xl shadow-amber-500/25 transition flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Broadcasting Outbid Signal...</span>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-black fill-black" />
                    <span>Place ${bidAmount.toLocaleString()} Bid &amp; Claim Rank #{projected.rank}</span>
                    <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>

              <Link
                href="/leaderboard"
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

export default function OutbidPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-slate-400 font-mono">Loading outbid console...</div>}>
          <OutbidForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
