"use client";

import React, { useState } from "react";
import { X, Sparkles, ChevronDown } from "lucide-react";

interface CreatorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreatorModal({ isOpen, onClose }: CreatorModalProps) {
    const [audienceSize, setAudienceSize] = useState("5,000 - 25,000");
    const [customAudience, setCustomAudience] = useState("");
    const [primaryNiche, setPrimaryNiche] = useState("AI & Tech Engineering");
    const [customNiche, setCustomNiche] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#110E24] border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-white transition"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Join AZYRA as a Creator</h3>
                        <p className="text-xs text-slate-400">Connect with cutting-edge startups and earn</p>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const niche = primaryNiche === "Other" ? customNiche : primaryNiche;
                        const audience = audienceSize === "Other" ? customAudience : audienceSize;
                        alert(`Creator application submitted for ${niche} (${audience})! We'll review your channel promptly.`);
                        onClose();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                            Full Name / Handle
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Alex Morgan (@alexdev)"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                            Primary Channel URL
                        </label>
                        <input
                            type="url"
                            required
                            placeholder="https://youtube.com/@yourchannel or x.com/handle"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Audience Size Dropdown */}
                        <div>
                            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                                Audience Size
                            </label>
                            <div className="relative">
                                <select
                                    value={audienceSize}
                                    onChange={(e) => setAudienceSize(e.target.value)}
                                    className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-[#090D18] border border-white/[0.12] text-white text-sm font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 cursor-pointer shadow-inner transition hover:border-white/[0.25]"
                                >
                                    <option value="5,000 - 25,000" className="bg-[#110D24] text-slate-100 py-2">
                                        5,000 - 25,000
                                    </option>
                                    <option value="25,000 - 100,000" className="bg-[#110D24] text-slate-100 py-2">
                                        25,000 - 100,000
                                    </option>
                                    <option value="100,000+" className="bg-[#110D24] text-slate-100 py-2">
                                        100,000+
                                    </option>
                                    <option value="High Engagement / Niche" className="bg-[#110D24] text-slate-100 py-2">
                                        High Engagement / Niche
                                    </option>
                                    <option value="Other" className="bg-[#110D24] text-purple-300 font-bold py-2">
                                        Other...
                                    </option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Primary Niche Dropdown */}
                        <div>
                            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                                Primary Niche
                            </label>
                            <div className="relative">
                                <select
                                    value={primaryNiche}
                                    onChange={(e) => setPrimaryNiche(e.target.value)}
                                    className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-[#090D18] border border-white/[0.12] text-white text-sm font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 cursor-pointer shadow-inner transition hover:border-white/[0.25]"
                                >
                                    <option value="AI & Tech Engineering" className="bg-[#110D24] text-slate-100 py-2">
                                        AI &amp; Tech Engineering
                                    </option>
                                    <option value="Design & UI/UX" className="bg-[#110D24] text-slate-100 py-2">
                                        Design &amp; UI/UX
                                    </option>
                                    <option value="Indie Hacking & SaaS" className="bg-[#110D24] text-slate-100 py-2">
                                        Indie Hacking &amp; SaaS
                                    </option>
                                    <option value="DevOps & Cloud" className="bg-[#110D24] text-slate-100 py-2">
                                        DevOps &amp; Cloud
                                    </option>
                                    <option value="Product Reviews" className="bg-[#110D24] text-slate-100 py-2">
                                        Product Reviews
                                    </option>
                                    <option value="Other" className="bg-[#110D24] text-purple-300 font-bold py-2">
                                        Other...
                                    </option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Custom Audience Input */}
                    {audienceSize === "Other" && (
                        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                            <label className="block text-xs font-mono uppercase text-purple-300 mb-1.5 font-semibold">
                                Specify Audience Size / Scale
                            </label>
                            <input
                                type="text"
                                required
                                value={customAudience}
                                onChange={(e) => setCustomAudience(e.target.value)}
                                placeholder="e.g. 500k+ newsletter subscribers..."
                                className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/40 text-white text-sm focus:outline-none focus:border-purple-400 transition placeholder-purple-300/40"
                            />
                        </div>
                    )}

                    {/* Custom Niche Input */}
                    {primaryNiche === "Other" && (
                        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                            <label className="block text-xs font-mono uppercase text-purple-300 mb-1.5 font-semibold">
                                Specify Custom Niche
                            </label>
                            <input
                                type="text"
                                required
                                value={customNiche}
                                onChange={(e) => setCustomNiche(e.target.value)}
                                placeholder="e.g. Web3 Gaming, Hardware Hacking..."
                                className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/40 text-white text-sm focus:outline-none focus:border-purple-400 transition placeholder-purple-300/40"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:opacity-95 transition"
                    >
                        Create Creator Profile →
                    </button>
                </form>
            </div>
        </div>
    );
}