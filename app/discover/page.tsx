"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignModal from "@/components/CampaignModal";
import CreatorModal from "@/components/CreatorModal";
import {
  Flame,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Globe,
  Sparkles,
  ArrowRight,
  Filter,
  Users,
  Rocket,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<"all" | "startups" | "creators" | "campaigns">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);

  // Global Map Hotspots
  const [activeRegion, setActiveRegion] = useState("us");
  const mapHotspots = [
    { id: "us", name: "North America (SF / NYC)", coords: { top: "34%", left: "22%" }, startups: 840, creators: 4200, campaigns: 182, trend: "+34%" },
    { id: "eu", name: "Europe (Berlin / London)", coords: { top: "28%", left: "51%" }, startups: 610, creators: 3100, campaigns: 144, trend: "+28%" },
    { id: "in", name: "India (Bengaluru / NCR)", coords: { top: "48%", left: "69%" }, startups: 530, creators: 3800, campaigns: 126, trend: "+42%" },
    { id: "sg", name: "Southeast Asia (Singapore)", coords: { top: "54%", left: "78%" }, startups: 320, creators: 1950, campaigns: 89, trend: "+22%" },
    { id: "au", name: "Oceania (Sydney / Melbourne)", coords: { top: "72%", left: "84%" }, startups: 210, creators: 1100, campaigns: 48, trend: "+19%" },
  ];

  const categories = [
    "All Categories",
    "AI Productivity",
    "Developer Tools",
    "SaaS & Analytics",
    "Fintech & Web3",
    "Design & Media",
  ];

  const discoveryItems = [
    {
      type: "startup",
      name: "NovaAI",
      category: "AI Productivity",
      metric: "+284% attention",
      desc: "Autonomous workflow agents that eliminate 15 hours of busywork per week for product builders.",
      tags: ["AI Agent", "Workflow", "Y Combinator S25"],
      badge: "Trending #01",
      action: "View Startup",
    },
    {
      type: "creator",
      name: "@alexdev",
      category: "Technology · AI",
      metric: "24.8K followers",
      desc: "Software engineer & technical creator breaking down emerging LLM applications and open-source stacks.",
      tags: ["YouTube", "X Threads", "4.9★ Rated"],
      badge: "Top Creator",
      action: "Collaborate",
    },
    {
      type: "campaign",
      name: "Build With NovaAI Launch",
      category: "Developer Bounty",
      metric: "$12,500 Pool",
      desc: "Looking for 15 developers and creators to build integrations and publish hands-on demonstration videos.",
      tags: ["12 Joined", "Escrow Verified", "7 Days Left"],
      badge: "LIVE NOW",
      action: "Apply Now",
    },
    {
      type: "startup",
      name: "FlowX",
      category: "SaaS & Analytics",
      metric: "+192% attention",
      desc: "Zero-latency user event pipeline with automated conversion funnel diagnostics.",
      tags: ["Analytics", "DevTools", "Indie"],
      badge: "Trending #02",
      action: "View Startup",
    },
    {
      type: "creator",
      name: "@sarahbuilds",
      category: "Design & Media",
      metric: "19.2K followers",
      desc: "UX designer walking through startup workflows, design systems, and onboarding teardowns.",
      tags: ["UI/UX", "TikTok", "Figma"],
      badge: "Rising Creator",
      action: "Collaborate",
    },
    {
      type: "campaign",
      name: "PixelPay Creator Cohort",
      category: "Fintech & Web3",
      metric: "$6,500 Pool",
      desc: "Educational content showcasing instant global creator payouts and multi-currency invoicing.",
      tags: ["8 Joined", "Fixed Fee", "High Match"],
      badge: "HOT BRIEF",
      action: "Apply Now",
    },
  ];

  const filteredItems = discoveryItems.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab.slice(0, -1) || (activeTab === "startups" && item.type === "startup") || (activeTab === "creators" && item.type === "creator") || (activeTab === "campaigns" && item.type === "campaign");
    const matchesCategory = selectedCategory === "All Categories" || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Discover Header */}
        <section className="pt-16 pb-12 bg-radial-glow border-b border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Ecosystem Radar
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black text-white tracking-tight">
              Discover What&apos;s Next.
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              Explore breakout tech startups, top-performing product creators, and live campaign opportunities shaping the modern internet.
            </p>

            {/* Search Bar */}
            <div className="mt-8 relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search startups, creators, or campaign briefs..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.12] text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 backdrop-blur-md shadow-xl text-sm"
              />
            </div>
          </div>
        </section>

        {/* Global Discovery Map (Signature Visual) */}


        {/* Filters & Tabs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            {/* Tabs */}
            <div className="flex items-center p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] self-start">
              {(["all", "startups", "creators", "campaigns"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition ${activeTab === tab
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${selectedCategory === cat
                    ? "bg-white/[0.14] text-white border border-white/[0.2]"
                    : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-6 bg-[#0B0E1B] border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-400 mb-3">{item.category}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{item.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-slate-400 capitalize">{item.type} Profile</span>
                  <button
                    onClick={() => {
                      if (item.type === "creator") setCreatorModalOpen(true);
                      else setCampaignModalOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md hover:scale-[1.02] transition"
                  >
                    {item.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <CampaignModal isOpen={campaignModalOpen} onClose={() => setCampaignModalOpen(false)} />
      <CreatorModal isOpen={creatorModalOpen} onClose={() => setCreatorModalOpen(false)} />
    </div>
  );
}
