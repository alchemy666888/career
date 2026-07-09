import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await query("select 1 as ok");
    return NextResponse.json({ status: "ok", database: "connected" });
  } catch (error) {
    return NextResponse.json(
      { status: "error", database: "unavailable", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 503 }
    );
  }
}
