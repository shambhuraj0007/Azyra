"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Rocket, Menu, X, LogOut, User } from "lucide-react";
import CampaignModal from "./CampaignModal";
import CreatorModal from "./CreatorModal";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status: sessionStatus } = useSession();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);

  const navLinks = [
    { label: "Discover", href: "/discover" },
    { label: "Startups", href: "/startups" },
    { label: "Creators", href: "/creators" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#07090E]/85 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090C15] rounded-[11px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                AZYRA
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping inline-block" />
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold -mt-1">
                Growth Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.12] shadow-sm font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs / User Auth Session */}
          <div className="hidden md:flex items-center gap-3">
            {sessionStatus === "authenticated" && session?.user ? (
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-indigo-600 border border-indigo-400 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <span>{session.user.name?.charAt(0) || "U"}</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  {session.user.name || session.user.email?.split("@")[0]}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/[0.06] rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 hover:bg-white/[0.05] rounded-xl transition"
                >
                  Log in
                </Link>
                <Link
                  href="/join"
                  className="text-sm font-medium text-slate-100 bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.12] px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  Join AZYRA
                </Link>
              </>
            )}

            <button
              onClick={() => setCampaignModalOpen(true)}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Rocket className="w-4 h-4 text-pink-200 group-hover:-translate-y-0.5 transition-transform" />
              <span>Launch a Campaign</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {sessionStatus === "authenticated" ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/[0.1] text-slate-200"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/join"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white shadow"
              >
                Join
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/[0.05]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-white/[0.08] bg-[#0A0D18]/95 backdrop-blur-2xl px-5 py-6 space-y-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-base font-medium rounded-lg ${
                    pathname === item.href
                      ? "text-indigo-400 bg-white/[0.06] font-semibold"
                      : "text-slate-200 hover:text-indigo-400 hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
              {sessionStatus === "authenticated" ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full text-center py-2.5 rounded-xl border border-white/[0.1] text-sm font-semibold text-rose-300"
                >
                  Sign Out ({session?.user?.name})
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl border border-white/[0.1] text-sm font-semibold text-slate-200"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/join"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-semibold text-white shadow-lg"
                  >
                    Join AZYRA
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCampaignModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                Launch a Campaign
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <CampaignModal isOpen={campaignModalOpen} onClose={() => setCampaignModalOpen(false)} />
      <CreatorModal isOpen={creatorModalOpen} onClose={() => setCreatorModalOpen(false)} />
    </>
  );
}
