import { NextResponse } from "next/server";
import { EARLY_ACCESS_PRODUCT, getPublicEarlyAccessCount } from "@/lib/earlyAccess";

export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getPublicEarlyAccessCount();

  if (count === null) {
    return NextResponse.json({ error: "Early Access count unavailable" }, { status: 503 });
  }

  return NextResponse.json(
    { product: EARLY_ACCESS_PRODUCT, count },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=30, stale-while-revalidate=60",
      },
    }
  );
}
