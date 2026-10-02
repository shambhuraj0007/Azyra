export interface WalletTransaction {
  id: string;
  type: "signup_bonus" | "referral_earned" | "bid_discount" | "reward";
  credits: number; // positive or negative
  dollarValue: number; // in USD ($1 = 1000 credits)
  description: string;
  timestamp: string;
}

export interface UserWallet {
  userEmail: string;
  referralCode: string;
  credits: number; // 1,000 credits = $1.00 USD
  totalEarned: number;
  transactions: WalletTransaction[];
}

export const CREDITS_PER_DOLLAR = 1000;
export const SIGNUP_WELCOME_CREDITS = 2000; // $2.00 USD on signup
export const REFERRAL_REWARD_CREDITS = 2000; // $2.00 USD when friend signs up
export const REFERRED_FRIEND_BONUS = 1000;   // $1.00 USD extra for referee

export function creditsToDollars(credits: number): number {
  return Number((credits / CREDITS_PER_DOLLAR).toFixed(2));
}

export function dollarsToCredits(dollars: number): number {
  return Math.round(dollars * CREDITS_PER_DOLLAR);
}

export function generateReferralCode(email: string): string {
  const clean = email.split("@")[0].toUpperCase().replace(/[^A-Z0-9]/g, "");
  return `AZYRA-${clean.slice(0, 6) || "FOUNDER"}-${Math.floor(100 + Math.random() * 900)}`;
}

const STORAGE_PREFIX = "azyra_wallet_";
const REFERRAL_MAP_KEY = "azyra_referral_codes";

export function getStoredWallet(email: string): UserWallet {
  if (typeof window === "undefined" || !email) {
    return {
      userEmail: email || "guest@azyra.io",
      referralCode: generateReferralCode(email || "guest"),
      credits: SIGNUP_WELCOME_CREDITS,
      totalEarned: SIGNUP_WELCOME_CREDITS,
      transactions: [
        {
          id: `tx-init-${Date.now()}`,
          type: "signup_bonus",
          credits: SIGNUP_WELCOME_CREDITS,
          dollarValue: creditsToDollars(SIGNUP_WELCOME_CREDITS),
          description: "🎁 Welcome to AZYRA! Signup bonus credits awarded.",
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }

  const key = `${STORAGE_PREFIX}${email.toLowerCase()}`;
  const saved = localStorage.getItem(key);

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // parse fallback
    }
  }

  // Create new wallet with welcome bonus
  const newWallet: UserWallet = {
    userEmail: email.toLowerCase(),
    referralCode: generateReferralCode(email),
    credits: SIGNUP_WELCOME_CREDITS,
    totalEarned: SIGNUP_WELCOME_CREDITS,
    transactions: [
      {
        id: `tx-welcome-${Date.now()}`,
        type: "signup_bonus",
        credits: SIGNUP_WELCOME_CREDITS,
        dollarValue: creditsToDollars(SIGNUP_WELCOME_CREDITS),
        description: "🎁 Welcome to AZYRA! Signup bonus credits awarded.",
        timestamp: new Date().toISOString(),
      },
    ],
  };

  saveWallet(newWallet);
  registerReferralCode(newWallet.referralCode, email);

  return newWallet;
}

export function saveWallet(wallet: UserWallet): void {
  if (typeof window === "undefined" || !wallet?.userEmail) return;
  const key = `${STORAGE_PREFIX}${wallet.userEmail.toLowerCase()}`;
  localStorage.setItem(key, JSON.stringify(wallet));

  // Dispatch custom event for real-time wallet sync across components
  window.dispatchEvent(
    new CustomEvent("azyra-wallet-updated", { detail: wallet })
  );
}

export function registerReferralCode(code: string, email: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(REFERRAL_MAP_KEY) || "{}";
    const map = JSON.parse(raw);
    map[code.toUpperCase()] = email.toLowerCase();
    localStorage.setItem(REFERRAL_MAP_KEY, JSON.stringify(map));
  } catch {
    // Ignore
  }
}

export function awardSignupBonus(email: string, referredByCode?: string | null): UserWallet {
  const wallet = getStoredWallet(email);

  if (referredByCode && typeof window !== "undefined") {
    // Add referee bonus
    const alreadyReferred = wallet.transactions.some(
      (tx) => tx.description.includes("Referral link bonus")
    );

    if (!alreadyReferred) {
      wallet.credits += REFERRED_FRIEND_BONUS;
      wallet.totalEarned += REFERRED_FRIEND_BONUS;
      wallet.transactions.unshift({
        id: `tx-ref-bonus-${Date.now()}`,
        type: "reward",
        credits: REFERRED_FRIEND_BONUS,
        dollarValue: creditsToDollars(REFERRED_FRIEND_BONUS),
        description: `🚀 Referral link bonus for joining via invite (${referredByCode.toUpperCase()})`,
        timestamp: new Date().toISOString(),
      });
      saveWallet(wallet);

      // Reward referrer
      try {
        const raw = localStorage.getItem(REFERRAL_MAP_KEY) || "{}";
        const map = JSON.parse(raw);
        const referrerEmail = map[referredByCode.toUpperCase()];
        if (referrerEmail && referrerEmail !== email.toLowerCase()) {
          const referrerWallet = getStoredWallet(referrerEmail);
          referrerWallet.credits += REFERRAL_REWARD_CREDITS;
          referrerWallet.totalEarned += REFERRAL_REWARD_CREDITS;
          referrerWallet.transactions.unshift({
            id: `tx-ref-earned-${Date.now()}`,
            type: "referral_earned",
            credits: REFERRAL_REWARD_CREDITS,
            dollarValue: creditsToDollars(REFERRAL_REWARD_CREDITS),
            description: `🤝 Friend signed up (${email})! +2,000 referral credits.`,
            timestamp: new Date().toISOString(),
          });
          saveWallet(referrerWallet);
        }
      } catch {
        // Ignore
      }
    }
  }

  return wallet;
}

export function applyWalletCredits(
  email: string,
  creditsToUse: number,
  targetListingName: string
): { success: boolean; discountDollars: number; remainingCredits: number } {
  const wallet = getStoredWallet(email);

  if (creditsToUse <= 0 || wallet.credits < creditsToUse) {
    return {
      success: false,
      discountDollars: 0,
      remainingCredits: wallet.credits,
    };
  }

  const discountDollars = creditsToDollars(creditsToUse);
  wallet.credits -= creditsToUse;

  wallet.transactions.unshift({
    id: `tx-bid-${Date.now()}`,
    type: "bid_discount",
    credits: -creditsToUse,
    dollarValue: -discountDollars,
    description: `⚡ Applied wallet credits on leaderboard bid for ${targetListingName}`,
    timestamp: new Date().toISOString(),
  });

  saveWallet(wallet);

  return {
    success: true,
    discountDollars,
    remainingCredits: wallet.credits,
  };
}
