import { NextResponse } from "next/server";
import { checkMongoConnection } from "@/lib/mongodb";

export async function GET() {
  const status = await checkMongoConnection();
  const googleConfigured = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );

  return NextResponse.json({
    mongoConnected: status.connected,
    dbName: status.dbName || "AZYRA Cluster",
    mongoError: status.error || null,
    googleConfigured,
    googleClientIdSnippet: process.env.GOOGLE_CLIENT_ID
      ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 12)}...`
      : null,
  });
}
