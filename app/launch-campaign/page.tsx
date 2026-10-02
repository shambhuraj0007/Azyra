"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Rocket,
  ShieldCheck,
  DollarSign,
  Users,
  CheckCircle2,
  Lock,
  Film,
  Layers,
  Sparkles,
} from "lucide-react";

export default function LaunchCampaignPage() {
  const router = useRouter();
  const [campaignType, setCampaignType] = useState<"clips" | "brief">("clips");
  const [title, setTitle] = useState("");
  const [startupName, setStartupName] = useState("");
  const [cpmRate, setCpmRate] = useState<number>(2.00);
  const [totalBudget, setTotalBudget] = useState<number>(5000);
  const [category, setCategory] = useState("AI & Productivity");
  const [hashtags, setHashtags] = useState("#NovaAI #TechTools");
  const [assetUrl, setAssetUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (totalBudget < 500) {
      alert("Minimum campaign pool budget is $500.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`🚀 CAMPAIGN LAUNCHED! $${totalBudget.toLocaleString()} USD locked in escrow.`);

      setTimeout(() => {
        router.push("/campaigns");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-pink-600/30 selection:text-pink-200">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono font-bold text-slate-300 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4 text-pink-400" />
              <span>Back to Campaigns Marketplace</span>
            </Link>
          </div>

          <div className="rounded-3xl p-6 sm:p-10 bg-[#0D0B1F] border border-pink-500/30 shadow-2xl shadow-pink-950/60 relative overflow-hidden">
            {/* Glow ambient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08] mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">Launch Escrow Campaign</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Fund Whop Clips Bounties or Milestone Briefs for verified independent creators
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
                  Your campaign brief is live in the marketplace. Creators are now submitting clips!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Type selection */}
                <div className="grid grid-cols-2 gap-4 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setCampaignType("clips")}
                    className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
                      campaignType === "clips"
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Film className="w-4 h-4 text-pink-300" />
                    <span>Whop Clips Bounty ($/1K Views)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCampaignType("brief")}
                    className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
                      campaignType === "brief"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Layers className="w-4 h-4 text-indigo-300" />
                    <span>Standard Sponsorship Brief</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Campaign Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. NovaAI TikTok Clips Launch"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Startup / Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={startupName}
                      onChange={(e) => setStartupName(e.target.value)}
                      placeholder="e.g. NovaAI"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Pricing & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Total Campaign Escrow Budget ($ USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                      <input
                        type="number"
                        min={500}
                        step={500}
                        required
                        value={totalBudget}
                        onChange={(e) => setTotalBudget(Number(e.target.value))}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white font-mono font-bold text-base focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  {campaignType === "clips" && (
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                        CPM Rate ($ per 1,000 Verified Views) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
                        <input
                          type="number"
                          min={0.5}
                          max={10.0}
                          step={0.25}
                          required
                          value={cpmRate}
                          onChange={(e) => setCpmRate(Number(e.target.value))}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-pink-300 font-mono font-bold text-base focus:outline-none focus:border-pink-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#080714] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
                    >
                      <option value="AI & Productivity">AI &amp; Productivity</option>
                      <option value="Developer Tools">Developer Tools</option>
                      <option value="SaaS & Analytics">SaaS &amp; Telemetry</option>
                      <option value="Fintech & Web3">Fintech &amp; Web3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                      Raw Asset / Footage Drive Link
                    </label>
                    <input
                      type="url"
                      value={assetUrl}
                      onChange={(e) => setAssetUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/xxx"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                    Brief Description &amp; Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Describe raw VOD footage available, editing guidelines, hooks to highlight..."
                    className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Guaranteed Milestone Escrow
                  </span>
                  <span className="text-slate-300">
                    Funds auto-released as clippers generate verified views
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-pink-500/25 transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Locking Escrow Funds &amp; Publishing...</span>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        <span>Lock ${totalBudget.toLocaleString()} Escrow &amp; Launch Campaign</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/campaigns"
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-slate-300 font-bold text-xs text-center transition"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
