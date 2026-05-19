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

  // Store in Airtable's default Name field — custom fields don't exist yet
  // Name = submission ID, Notes = full answers as readable text
  const answers = [
    `Timestamp: ${new Date().toISOString()}`,
    `Q1 Initiation: ${payload.initiation_pattern ?? ''}`,
    `Q2 Decision: ${payload.decision_unlock ?? ''}`,
    `Q3 Discovery: ${payload.discovery_source ?? ''}`,
    `Q4 First 5min: ${payload.first_5min_filter ?? ''}`,
    `Q5 Social: ${payload.social_influence ?? ''}`,
    `Q6 Music: ${payload.music_function ?? ''}`,
    `Q7 Live: ${payload.live_performance_impact ?? ''}`,
    `Q8 Spend: ${payload.spend_escalation_trigger ?? ''}`,
    `Q9 Dwell: ${Array.isArray(payload.dwell_time_driver) ? (payload.dwell_time_driver as string[]).join(', ') : (payload.dwell_time_driver ?? '')}`,
    `Q10 Story: ${payload.story_signal ?? ''}`,
    `Q11 Recovery: ${payload.recovery_preference ?? ''}`,
    `Q12 Loyalty: ${payload.loyalty_formation ?? ''}`,
    `Q13 Validation: ${payload.validation_behavior ?? ''}`,
    `Q14 Escalation: ${payload.escalation_catalyst ?? ''}`,
    `Q15 Exit: ${payload.exit_trigger ?? ''}`,
    `Q16 Memory: ${payload.memory_imprint ?? ''}`,
    `Email: ${payload.email ?? ''}`,
  ].join('\n');

  const fields: Record<string, string> = {
    Name:  String(payload.submissionId ?? new Date().toISOString()),
    Notes: answers,
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
