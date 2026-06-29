import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    revalidatePath("/blog");
    if (body.slug) {
      revalidatePath(`/blog/${body.slug}`);
    }
    return NextResponse.json({ success: true, revalidated: ["/blog", body.slug ? `/blog/${body.slug}` : null].filter(Boolean) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Revalidation failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
