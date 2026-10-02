"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Zap,
  Trophy,
  DollarSign,
  TrendingUp,
  Flame,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { OutbidListing, OUTBID_RULES } from "@/lib/outbidData";

interface OutbidModalProps {
  isOpen: boolean;
  onClose: () => void;
  listings: OutbidListing[];
  targetListingId?: string | null;
  onBidSubmitted: (newListing: OutbidListing) => void;
}

export default function OutbidModal({
  isOpen,
  onClose,
  listings,
  targetListingId,
  onBidSubmitted,
}: OutbidModalProps) {
  const [mode, setMode] = useState<"boost" | "new">("new");
  const [selectedId, setSelectedId] = useState<string>("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [twitter, setTwitter] = useState("");
  const [category, setCategory] = useState("AI & Productivity");
  const [tagline, setTagline] = useState("");
  const [bidAmount, setBidAmount] = useState<number>(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sorted listings by total bid descending
  const sortedListings = [...listings].sort((a, b) => b.totalBid - a.totalBid);
  const currentTop = sortedListings[0];
  const minToBeatTop = (currentTop?.totalBid || 0) + OUTBID_RULES.MIN_OVERBID_DIFFERENCE;

  useEffect(() => {
    if (targetListingId) {
      const match = listings.find((l) => l.id === targetListingId);
      if (match) {
        setMode("boost");
        setSelectedId(match.id);
        const topDiff = Math.max(minToBeatTop - match.totalBid, 25);
        setBidAmount(topDiff);
      }
    } else {
      setMode("new");
      setSelectedId("");
      setBidAmount(Math.max(minToBeatTop, 50));
    }
  }, [targetListingId, listings, minToBeatTop, isOpen]);

  if (!isOpen) return null;

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
      let updatedOrNewItem: OutbidListing;

      if (mode === "boost" && selectedId) {
        const existing = listings.find((l) => l.id === selectedId)!;
        updatedOrNewItem = {
          ...existing,
          totalBid: existing.totalBid + bidAmount,
          todayBid: existing.todayBid + bidAmount,
          bidCount: existing.bidCount + 1,
          updatedAt: new Date().toISOString(),
        };
      } else {
        const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-") || `startup-${Date.now()}`;
        updatedOrNewItem = {
          id: slug,
          name: name || "My Product",
          tagline: tagline || "Revolutionary new product on AZYRA outbid market",
          url: url.startsWith("http") ? url : `https://${url || "myproduct.io"}`,
          twitter: twitter ? (twitter.startsWith("@") ? twitter : `@${twitter}`) : undefined,
          category,
          totalBid: bidAmount,
          todayBid: bidAmount,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          bidCount: 1,
        };
      }

      onBidSubmitted(updatedOrNewItem);
      setIsSubmitting(false);
      setSuccessMessage(`🔥 SUCCESS! You placed a $${bidAmount} bid. Ranked #${projected.rank}!`);

      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1800);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0C0F1D] border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-950/50 text-slate-100 overflow-hidden my-8">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg">Outbid.lol Attention Market</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  Pay-to-Rank
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Bid higher to outperform products, capture eyeballs, and rank #1
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
              Leaderboard updated in real-time. Your listing is now broadcasting across all views!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 relative z-10">
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  setMode("new");
                  setSelectedId("");
                }}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  mode === "new"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Submit New Startup</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("boost")}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  mode === "boost"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Outbid / Boost Existing</span>
              </button>
            </div>

            {/* Select Target if Boost Mode */}
            {mode === "boost" && (
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                  Select Product to Outbid / Boost
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => handleSelectExisting(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#080B16] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
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
              <div className="space-y-4">
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
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Product Website URL *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        required
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://myproduct.io"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      X (Twitter) Profile (Optional)
                    </label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <input
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="@myproduct_x"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080B16] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Bidding Preset Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono uppercase text-amber-300 font-bold">
                  Select Bid Amount ($ USD)
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  Min bid: ${OUTBID_RULES.MIN_NEW_BID} · Min to steal #1: ${minToBeatTop.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setBidAmount(minToBeatTop)}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
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
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
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
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
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
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
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
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type="number"
                  min={OUTBID_RULES.MIN_NEW_BID}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  placeholder="Enter custom bid amount"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-amber-500/50 text-amber-300 font-mono font-bold text-lg focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Projected Rank Live Card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  Live Outbid Projection
                </span>
                <p className="text-xs text-slate-300">
                  {mode === "boost" && selectedId
                    ? `Current Total: $${projected.currentBid.toLocaleString()} + Boost: $${bidAmount.toLocaleString()}`
                    : `Initial Listing Bid: $${bidAmount.toLocaleString()}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Target Rank Position
                  </span>
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    #{projected.rank}
                  </span>
                </div>
                {projected.rank === 1 && (
                  <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-amber-400" /> #1 CHAMPION
                  </span>
                )}
              </div>
            </div>

            {/* Rules reminder */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-slate-400 space-y-1 font-mono">
              <p>• <strong>Pay-to-Rank Rule:</strong> Listings are ordered strictly by total cumulative dollars spent.</p>
              <p>• <strong>Outbid Rule:</strong> Beat current #1 by at least $5 to steal the top spot.</p>
              <p>• <strong>Tiebreaker:</strong> Older listings retain position if total bids are identical.</p>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2 group disabled:opacity-50"
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
          </form>
        )}
      </div>
    </div>
  );
}
