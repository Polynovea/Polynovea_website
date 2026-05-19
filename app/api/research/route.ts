import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TOKEN   = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_TABLE   = "Submissions";

async function findRecordBySubmissionId(submissionId: string): Promise<string | null> {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?filterByFormula=${encodeURIComponent(`{submission_id}="${submissionId}"`)}`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${AIRTABLE_TOKEN}` },
  });
  if (!res.ok) return null;
  const data = await res.json() as { records: { id: string }[] };
  return data.records?.[0]?.id ?? null;
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown> = {};

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!AIRTABLE_BASE_ID || !AIRTABLE_TOKEN) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const submissionId = String(payload.submissionId ?? '');
  const isEmailUpdate = !!payload.email && Object.keys(payload).length <= 3; // submissionId + email only

  const fields: Record<string, string> = {
    submission_id:            submissionId,
    timestamp:                new Date().toISOString(),
    initiation_pattern:       String(payload.initiation_pattern       ?? ''),
    decision_unlock:          String(payload.decision_unlock          ?? ''),
    discovery_source:         String(payload.discovery_source         ?? ''),
    first_5min_filter:        String(payload.first_5min_filter        ?? ''),
    social_influence:         String(payload.social_influence         ?? ''),
    music_function:           String(payload.music_function           ?? ''),
    live_performance_impact:  String(payload.live_performance_impact  ?? ''),
    spend_escalation_trigger: String(payload.spend_escalation_trigger ?? ''),
    dwell_time_driver:        Array.isArray(payload.dwell_time_driver)
                                ? (payload.dwell_time_driver as string[]).join(', ')
                                : String(payload.dwell_time_driver    ?? ''),
    story_signal:             String(payload.story_signal             ?? ''),
    recovery_preference:      String(payload.recovery_preference      ?? ''),
    loyalty_formation:        String(payload.loyalty_formation        ?? ''),
    validation_behavior:      String(payload.validation_behavior      ?? ''),
    escalation_catalyst:      String(payload.escalation_catalyst      ?? ''),
    exit_trigger:             String(payload.exit_trigger             ?? ''),
    memory_imprint:           String(payload.memory_imprint           ?? ''),
    email:                    String(payload.email                    ?? ''),
  };

  try {
    // If it's just an email update, find and patch the existing record
    if (isEmailUpdate && submissionId) {
      const recordId = await findRecordBySubmissionId(submissionId);
      if (recordId) {
        await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}/${recordId}`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
              'Content-Type':  'application/json',
            },
            body: JSON.stringify({ fields: { email: String(payload.email) } }),
          }
        );
        return NextResponse.json({ success: true });
      }
    }

    // Otherwise create a new record
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
