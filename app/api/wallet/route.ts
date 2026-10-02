import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") || session?.user?.email || "founder@startup.com";

  return NextResponse.json({
    email,
    rate: "1000 credits = $1.00 USD",
    conversionFactor: 0.001,
  });
}
