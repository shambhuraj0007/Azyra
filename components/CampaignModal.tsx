"use client";

import React, { useState } from "react";
import { X, Rocket, ChevronDown } from "lucide-react";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CampaignModal({ isOpen, onClose }: CampaignModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("AI & Automation");
  const [customCategory, setCustomCategory] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("$1,000 - $3,000");
  const [customBudget, setCustomBudget] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0C101F] border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Launch a Campaign</h3>
            <p className="text-xs text-slate-400">Connect with creators &amp; scale your reach</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const category = selectedCategory === "Other" ? customCategory : selectedCategory;
            const budget = selectedBudget === "Other" ? customBudget : selectedBudget;
            alert(`Campaign brief submitted for ${category} (${budget})! The AZYRA team will review your submission.`);
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
              Startup / Product Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. NovaAI, FlowX"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
              Website URL
            </label>
            <input
              type="url"
              required
              placeholder="https://yourstartup.com"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-[#090D18] border border-white/[0.12] text-white text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 cursor-pointer shadow-inner transition hover:border-white/[0.25]"
                >
                  <option value="AI & Automation" className="bg-[#0D1222] text-slate-100 py-2">
                    AI &amp; Automation
                  </option>
                  <option value="Developer Tools" className="bg-[#0D1222] text-slate-100 py-2">
                    Developer Tools
                  </option>
                  <option value="SaaS & Analytics" className="bg-[#0D1222] text-slate-100 py-2">
                    SaaS &amp; Analytics
                  </option>
                  <option value="Fintech & Web3" className="bg-[#0D1222] text-slate-100 py-2">
                    Fintech &amp; Web3
                  </option>
                  <option value="Consumer Tech" className="bg-[#0D1222] text-slate-100 py-2">
                    Consumer Tech
                  </option>
                  <option value="Other" className="bg-[#0D1222] text-indigo-300 font-bold py-2">
                    Other...
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Target Budget Dropdown */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                Target Budget
              </label>
              <div className="relative">
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-[#090D18] border border-white/[0.12] text-white text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 cursor-pointer shadow-inner transition hover:border-white/[0.25]"
                >
                  <option value="$1,000 - $3,000" className="bg-[#0D1222] text-slate-100 py-2">
                    $1,000 - $3,000
                  </option>
                  <option value="$3,000 - $10,000" className="bg-[#0D1222] text-slate-100 py-2">
                    $3,000 - $10,000
                  </option>
                  <option value="$10,000+" className="bg-[#0D1222] text-slate-100 py-2">
                    $10,000+
                  </option>
                  <option value="Custom / Performance" className="bg-[#0D1222] text-slate-100 py-2">
                    Custom / Performance
                  </option>
                  <option value="Other" className="bg-[#0D1222] text-indigo-300 font-bold py-2">
                    Other...
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* If "Other" category is selected */}
          {selectedCategory === "Other" && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200">
              <label className="block text-xs font-mono uppercase text-indigo-300 mb-1.5 font-semibold">
                Specify Custom Category
              </label>
              <input
                type="text"
                required
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g. EdTech, Robotics, BioTech..."
                className="w-full px-4 py-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/40 text-white text-sm focus:outline-none focus:border-indigo-400 transition placeholder-indigo-300/40"
              />
            </div>
          )}

          {/* If "Other" budget is selected */}
          {selectedBudget === "Other" && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200">
              <label className="block text-xs font-mono uppercase text-indigo-300 mb-1.5 font-semibold">
                Specify Budget Range
              </label>
              <input
                type="text"
                required
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                placeholder="e.g. Equity allocation, $50k+ custom..."
                className="w-full px-4 py-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/40 text-white text-sm focus:outline-none focus:border-indigo-400 transition placeholder-indigo-300/40"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
              Campaign Objective
            </label>
            <textarea
              rows={3}
              placeholder="What is your main goal? (Product Hunt launch, beta user signups, creator walkthroughs...)"
              className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-indigo-500 resize-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:opacity-95 transition"
          >
            Proceed to Campaign Studio →
          </button>
        </form>
      </div>
    </div>
  );
}
