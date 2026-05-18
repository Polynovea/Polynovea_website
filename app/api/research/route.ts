import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyixPd_UBfHC2OYmNReb1W5ECH8tdk5Z2khyLu-BLHeC8zrISKGSG_jOwS7zXqEcuQtEQ/exec";
const NOTIFY_EMAIL = "subrojitroy@polynovearecords.in";

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown> = {};

  try {
    const body = await request.json();
    payload = body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Always log — captured in Vercel function logs as a safety net
  console.log('[research] submission received', JSON.stringify({ ...payload, _ts: new Date().toISOString() }));

  // Forward to Google Apps Script server-side (no CORS restrictions here)
  let sheetsOk = false;
  try {
    const fd = new FormData();
    fd.append("data", JSON.stringify(payload));
    const res = await fetch(SHEETS_ENDPOINT, { method: "POST", body: fd });
    sheetsOk = res.ok || res.status === 0; // Apps Script often returns 302 or opaque
    if (!sheetsOk) {
      console.error('[research] sheets returned non-ok status', res.status);
    }
  } catch (err) {
    console.error('[research] sheets fetch failed', err);
  }

  // Email fallback when Sheets is unreachable and Gmail is configured
  if (!sheetsOk && process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_APP_PASSWORD },
      });
      const rows = Object.entries(payload)
        .map(([k, v]) => `<tr><td style="padding:4px 12px;font-weight:600">${k}</td><td style="padding:4px 12px">${Array.isArray(v) ? v.join(', ') : String(v ?? '')}</td></tr>`)
        .join('');
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `[Research backup] Submission ${payload.submissionId ?? ''}`,
        html: `<p>Google Sheets was unreachable — submission captured via email.</p><table style="border-collapse:collapse">${rows}</table>`,
      });
      console.log('[research] backup email sent');
    } catch (emailErr) {
      console.error('[research] backup email failed', emailErr);
    }
  }

  // Always return success to the client — data is captured in logs regardless
  return NextResponse.json({ success: true, sheets: sheetsOk });
}
