import { NextRequest, NextResponse } from "next/server";
import {
  EARLY_ACCESS_PRODUCT,
  EARLY_ACCESS_TABLE,
  cleanText,
  getEarlyAccessSupabase,
  isEarlyAccessConfigured,
  normalizeCompany,
  normalizeEmail,
} from "@/lib/earlyAccess";

interface JoinPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  role?: unknown;
  companySize?: unknown;
  timeline?: unknown;
  currentStack?: unknown;
  problemStatement?: unknown;
  engines?: unknown;
  sourceSite?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCE_SITES = new Set(["polynovea", "infrakinetic"]);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as JoinPayload;

    const name = cleanText(body.name, 140);
    const email = normalizeEmail(cleanText(body.email, 254));
    const company = cleanText(body.company, 180);
    const role = cleanText(body.role, 140);
    const companySize = cleanText(body.companySize, 60);
    const timeline = cleanText(body.timeline, 80);
    const currentStack = cleanText(body.currentStack, 2000);
    const problemStatement = cleanText(body.problemStatement, 4000);
    const sourceSiteCandidate = cleanText(body.sourceSite, 40);
    const sourceSite = ALLOWED_SOURCE_SITES.has(sourceSiteCandidate)
      ? sourceSiteCandidate
      : "polynovea";

    const engines = Array.isArray(body.engines)
      ? body.engines
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim().slice(0, 120))
          .filter(Boolean)
          .slice(0, 20)
      : [];

    if (!name || !email || !company || !companySize || !timeline || !problemStatement) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
    }

    if (engines.length === 0) {
      return NextResponse.json({ error: "Select at least one engine or operating area." }, { status: 400 });
    }

    if (!isEarlyAccessConfigured()) {
      return NextResponse.json(
        { error: "Early Access signups are being connected right now. Please try again shortly." },
        { status: 503 }
      );
    }

    const supabase = getEarlyAccessSupabase();
    const companyNormalized = normalizeCompany(company);

    const { data: existing, error: existingError } = await supabase
      .from(EARLY_ACCESS_TABLE)
      .select("id,status")
      .eq("product", EARLY_ACCESS_PRODUCT)
      .eq("email_normalized", email)
      .maybeSingle();

    if (existingError) {
      console.error("Early Access dedupe query failed:", existingError.message);
      return NextResponse.json({ error: "Early Access is temporarily unavailable." }, { status: 503 });
    }

    const commonFields = {
      full_name: name,
      email,
      email_normalized: email,
      company,
      company_normalized: companyNormalized,
      role: role || null,
      company_size: companySize,
      timeline,
      engines,
      current_stack: currentStack || null,
      problem_statement: problemStatement,
      source_site: sourceSite,
      explicit_opt_in: true,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      const { error: updateError } = await supabase
        .from(EARLY_ACCESS_TABLE)
        .update(commonFields)
        .eq("id", existing.id);

      if (updateError) {
        console.error("Early Access update failed:", updateError.message);
        return NextResponse.json({ error: "We could not update your Early Access entry." }, { status: 500 });
      }

      return NextResponse.json({ success: true, alreadyJoined: true }, { status: 200 });
    }

    const { error: insertError } = await supabase.from(EARLY_ACCESS_TABLE).insert({
      product: EARLY_ACCESS_PRODUCT,
      ...commonFields,
      status: "waitlisted",
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Early Access insert failed:", insertError.message);
      return NextResponse.json({ error: "We could not add you to Early Access." }, { status: 500 });
    }

    return NextResponse.json({ success: true, alreadyJoined: false }, { status: 201 });
  } catch (error) {
    console.error("Early Access join error:", error);
    return NextResponse.json({ error: "Early Access is temporarily unavailable." }, { status: 503 });
  }
}
