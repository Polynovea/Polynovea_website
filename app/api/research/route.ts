import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TOKEN   = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_TABLE   = "Table 1";

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown> = {};

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!AIRTABLE_BASE_ID || !AIRTABLE_TOKEN) {
    console.error('[research] Airtable env vars missing');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const fields: Record<string, string> = {
    timestamp:                 new Date().toISOString(),
    submission_id:             String(payload.submissionId             ?? ''),
    initiation_pattern:        String(payload.initiation_pattern       ?? ''),
    decision_unlock:           String(payload.decision_unlock          ?? ''),
    discovery_source:          String(payload.discovery_source         ?? ''),
    first_5min_filter:         String(payload.first_5min_filter        ?? ''),
    social_influence:          String(payload.social_influence         ?? ''),
    music_function:            String(payload.music_function           ?? ''),
    live_performance_impact:   String(payload.live_performance_impact  ?? ''),
    spend_escalation_trigger:  String(payload.spend_escalation_trigger ?? ''),
    dwell_time_driver:         Array.isArray(payload.dwell_time_driver)
                                 ? (payload.dwell_time_driver as string[]).join(', ')
                                 : String(payload.dwell_time_driver ?? ''),
    story_signal:              String(payload.story_signal             ?? ''),
    recovery_preference:       String(payload.recovery_preference      ?? ''),
    loyalty_formation:         String(payload.loyalty_formation        ?? ''),
    validation_behavior:       String(payload.validation_behavior      ?? ''),
    escalation_catalyst:       String(payload.escalation_catalyst      ?? ''),
    exit_trigger:              String(payload.exit_trigger             ?? ''),
    memory_imprint:            String(payload.memory_imprint           ?? ''),
  };

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({ fields, typecast: true }),
      }
    );

    if (!res.ok) {
      const err = await res.text().catch(() => '');
      console.error('[research] Airtable error', res.status, err);
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[research] Airtable fetch failed', err);
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }
}
