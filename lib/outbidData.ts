export interface OutbidListing {
  id: string;
  name: string;
  tagline: string;
  url: string;
  twitter?: string;
  category: string;
  totalBid: number; // Cumulative money spent ($)
  todayBid: number; // Money spent today ($)
  createdAt: string;
  updatedAt: string;
  isSponsored?: boolean;
  bidCount: number;
}

export const INITIAL_OUTBID_LISTINGS: OutbidListing[] = [
  {
    id: "nova-ai",
    name: "NovaAI",
    tagline: "Autonomous AI Coding & Workspace Co-Pilot for Engineering Teams",
    url: "https://novaai.io",
    twitter: "@novaai_official",
    category: "AI & Productivity",
    totalBid: 18450,
    todayBid: 1250,
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-10-02T11:30:00Z",
    bidCount: 42,
  },
  {
    id: "hyperscale",
    name: "HyperScale Cloud",
    tagline: "Next-Gen Multi-Cloud Edge Deployment Platform & CDN Network",
    url: "https://hyperscale.cloud",
    twitter: "@hyperscalecloud",
    category: "Developer Tools",
    totalBid: 14200,
    todayBid: 850,
    createdAt: "2026-08-05T14:20:00Z",
    updatedAt: "2026-10-02T09:15:00Z",
    bidCount: 31,
  },
  {
    id: "flowx",
    name: "FlowX Studio",
    tagline: "Visual API Automation & Real-time Event Workflow Engine",
    url: "https://flowx.dev",
    twitter: "@flowx_dev",
    category: "Developer Tools",
    totalBid: 9800,
    todayBid: 500,
    createdAt: "2026-08-10T09:00:00Z",
    updatedAt: "2026-10-01T18:45:00Z",
    bidCount: 24,
  },
  {
    id: "pixelpay",
    name: "PixelPay",
    tagline: "Instant Micropayments & Crypto Escrow for Digital Creators",
    url: "https://pixelpay.io",
    twitter: "@pixelpay_io",
    category: "Fintech & Web3",
    totalBid: 7650,
    todayBid: 300,
    createdAt: "2026-08-15T12:00:00Z",
    updatedAt: "2026-10-02T08:10:00Z",
    bidCount: 19,
  },
  {
    id: "pulsehealth",
    name: "PulseHealth",
    tagline: "Real-Time Product Telemetry & Customer Behavioral Analytics",
    url: "https://pulsehealth.app",
    twitter: "@pulsehealth_app",
    category: "SaaS & Analytics",
    totalBid: 5400,
    todayBid: 450,
    createdAt: "2026-08-20T16:00:00Z",
    updatedAt: "2026-10-02T10:00:00Z",
    bidCount: 16,
  },
  {
    id: "synthetix-voice",
    name: "Synthetix Voice",
    tagline: "Neural Voice Cloning & AI Audio Studio for Creators",
    url: "https://synthetix.ai",
    twitter: "@synthetix_ai",
    category: "Design & Media",
    totalBid: 4100,
    todayBid: 120,
    createdAt: "2026-08-25T11:30:00Z",
    updatedAt: "2026-09-30T20:00:00Z",
    bidCount: 13,
  },
  {
    id: "devflow-studio",
    name: "DevFlow Studio",
    tagline: "Git-Native Code Review & Automated CI/CD Pipeline Dashboard",
    url: "https://devflow.io",
    twitter: "@devflow_io",
    category: "Developer Tools",
    totalBid: 3250,
    todayBid: 200,
    createdAt: "2026-09-01T08:45:00Z",
    updatedAt: "2026-10-02T07:30:00Z",
    bidCount: 10,
  },
  {
    id: "nexus-commerce",
    name: "Nexus Commerce",
    tagline: "Headless E-Commerce API Suite for Next.js & React Applications",
    url: "https://nexuscommerce.com",
    twitter: "@nexus_commerce",
    category: "E-Commerce",
    totalBid: 2100,
    todayBid: 100,
    createdAt: "2026-09-05T15:10:00Z",
    updatedAt: "2026-10-01T14:20:00Z",
    bidCount: 7,
  },
  {
    id: "craftui",
    name: "CraftUI",
    tagline: "Ultra-Fast 3D Glassmorphism UI Component Library for React",
    url: "https://craftui.design",
    twitter: "@craftui_design",
    category: "Design & Media",
    totalBid: 1450,
    todayBid: 80,
    createdAt: "2026-09-12T10:00:00Z",
    updatedAt: "2026-10-02T05:00:00Z",
    bidCount: 5,
  },
  {
    id: "zeroauth",
    name: "ZeroAuth",
    tagline: "Passwordless Passkey & Biometric Authentication SDK",
    url: "https://zeroauth.dev",
    twitter: "@zeroauth_dev",
    category: "Security",
    totalBid: 950,
    todayBid: 50,
    createdAt: "2026-09-20T09:30:00Z",
    updatedAt: "2026-10-01T12:00:00Z",
    bidCount: 4,
  },
];

export const OUTBID_RULES = {
  MIN_NEW_BID: 10, // Minimum $10 for new listing
  MIN_OVERBID_DIFFERENCE: 5, // Must outbid current spot by at least $5 to steal it
};
