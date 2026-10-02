"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rocket } from "lucide-react";
import CampaignModal from "./CampaignModal";
import CreatorModal from "./CreatorModal";

export default function Footer() {
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-white/[0.08] bg-[#04060A] text-slate-400 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Branding column */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 p-[1px]">
                  <div className="w-full h-full bg-white rounded-[7px] p-1 flex items-center justify-center">
                    <Image
                      src="/logo-mark.png"
                      alt="AZYRA"
                      width={20}
                      height={20}
                      className="w-auto h-5 object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <span className="text-xl font-black text-white tracking-tight">AZYRA</span>
              </Link>
              <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
                Discover what&apos;s next. Build what&apos;s next. A global growth marketplace connecting startups, creators, and audiences.
              </p>
            </div>

            {/* Column 1: Platform */}
            <div>
              <h4 className="text-xs uppercase font-mono font-bold text-white mb-4 tracking-wider">
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="/discover" className="hover:text-white transition">Discover</Link></li>
                <li><Link href="/startups" className="hover:text-white transition">Startups</Link></li>
                <li><Link href="/creators" className="hover:text-white transition">Creators</Link></li>
                <li><Link href="/campaigns" className="hover:text-white transition">Campaigns</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition">Leaderboards</Link></li>
              </ul>
            </div>

            {/* Column 2: For Startups */}
            <div>
              <h4 className="text-xs uppercase font-mono font-bold text-white mb-4 tracking-wider">
                For Startups
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => setCampaignModalOpen(true)} className="hover:text-white transition text-left">
                    Launch Campaign
                  </button>
                </li>
                <li><Link href="/campaigns" className="hover:text-white transition">Creator Marketplace</Link></li>
                <li><Link href="/startups" className="hover:text-white transition">Promotions</Link></li>
                <li><Link href="/startups#analytics" className="hover:text-white transition">Analytics</Link></li>
              </ul>
            </div>

            {/* Column 3: For Creators */}
            <div>
              <h4 className="text-xs uppercase font-mono font-bold text-white mb-4 tracking-wider">
                For Creators
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="/campaigns" className="hover:text-white transition">Discover Campaigns</Link></li>
                <li>
                  <button onClick={() => setCreatorModalOpen(true)} className="hover:text-white transition text-left">
                    Creator Profile
                  </button>
                </li>
                <li><Link href="/creators" className="hover:text-white transition">Opportunities</Link></li>
                <li><Link href="/creators#earnings" className="hover:text-white transition">Earnings</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition">Leaderboard</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} AZYRA Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-slate-400">
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Refund Policy</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <span className="hover:text-white transition cursor-pointer">X</span>
              <span className="hover:text-white transition cursor-pointer">Instagram</span>
              <span className="hover:text-white transition cursor-pointer">YouTube</span>
              <span className="hover:text-white transition cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>

      <CampaignModal isOpen={campaignModalOpen} onClose={() => setCampaignModalOpen(false)} />
      <CreatorModal isOpen={creatorModalOpen} onClose={() => setCreatorModalOpen(false)} />
    </>
  );
}
