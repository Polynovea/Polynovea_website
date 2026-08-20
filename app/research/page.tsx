"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResearchScene = dynamic(() => import("@/components/ResearchScene"));

const ENDPOINT = "/api/research";

type Answers = Record<string, string | string[] | null>;
type Step =
  | { type: "intro" }
  | { type: "single"; key: string; q: string; options: string[] }
  | { type: "multi";  key: string; q: string; hint: string; limit: number; options: string[] }
  | { type: "text";   key: string; q: string; placeholder: string; long?: boolean; optional?: boolean }
  | { type: "thanks" };

const STEPS: Step[] = [
  { type: "intro" },
  {
    type: "single", key: "initiation_pattern",
    q: "How do most nights out usually begin for you?",
    options: ["Someone else plans it and I join", "A spontaneous idea turns into a plan", "I usually already had the idea in mind", "I repeat the same places and routines"],
  },
  {
    type: "single", key: "decision_unlock",
    q: "What most often makes you decide to go out?",
    options: ["The people involved", "My mood that day", "The place itself sounds interesting", "I just want a reason to get out"],
  },
  {
    type: "single", key: "discovery_source",
    q: "How did you discover the last place you genuinely liked?",
    options: ["Someone directly recommended it", "Instagram, Reels, or social media", "Zomato, Swiggy, or Google", "I found it accidentally while out"],
  },
  {
    type: "single", key: "first_5min_filter",
    q: "You enter a new place. What most affects whether you stay?",
    options: ["The crowd feels right", "The music immediately works", "The atmosphere and design feel right", "I trust the recommendation enough to give it time"],
  },
  {
    type: "single", key: "social_influence",
    q: "Your group wants another round but you weren't planning to continue. What usually happens?",
    options: ["I continue because the group energy pulls me in", "I continue if the night already feels good", "I stick to what I originally wanted", "I'm usually the person extending the night"],
  },
  {
    type: "single", key: "music_function",
    q: "When the music is right, what does it usually do for you?",
    options: ["It helps me stop thinking", "It pulls the group into the same energy", "It makes the night emotionally memorable", "I barely pay attention to it"],
  },
  {
    type: "single", key: "live_performance_impact",
    q: "What effect does live music or a live set usually have on you?",
    options: ["It can completely change the night", "It matters only if the performer is genuinely good", "It rarely affects my decisions", "I actively look for places because of live music"],
  },
  {
    type: "single", key: "spend_escalation_trigger",
    q: "What most often causes you to spend more than planned?",
    options: ["The night becomes too good to leave", "The group energy keeps building", "The place feels worth spending on", "I stop thinking about money in the moment"],
  },
  {
    type: "multi", key: "dwell_time_driver",
    q: "What most often makes you stay longer than expected?",
    hint: "Pick up to 2", limit: 2,
    options: ["The music or performance improves", "The conversation becomes deeper", "Nobody in the group wants to leave", "The place becomes extremely comfortable", "Something unexpected happens"],
  },
  {
    type: "single", key: "story_signal",
    q: "When you talk about a great night later, what do you usually mention first?",
    options: ["The place itself", "The people I was with", "What actually happened during the night", "How the night felt emotionally"],
  },
  {
    type: "single", key: "recovery_preference",
    q: "What type of night usually feels most worth it afterward?",
    options: ["High energy, loud, unforgettable", "Slow conversations and comfort", "Discovering something new", "Familiar places that always work"],
  },
  {
    type: "single", key: "loyalty_formation",
    q: "What most likely turns a place into a regular spot for you?",
    options: ["Events or live experiences worth returning for", "Consistency - I know what I'll get", "My group starts treating it as our place", "The experience feels personally familiar"],
  },
  {
    type: "single", key: "validation_behavior",
    q: "Before trying somewhere new, what do you usually check first?",
    options: ["Ratings and reviews", "Photos or videos", "Friends' opinions", "I usually don't check much"],
  },
  {
    type: "single", key: "escalation_catalyst",
    q: "What most often turns a normal plan into a bigger night than expected?",
    options: ["More people arrive", "The music or atmosphere suddenly shifts", "Someone suggests continuing elsewhere", "The energy becomes difficult to walk away from"],
  },
  {
    type: "single", key: "exit_trigger",
    q: "What most reliably makes you want to leave a place early?",
    options: ["The crowd or energy changes negatively", "Service becomes slow or frustrating", "The music or atmosphere stops working", "The group dynamic falls apart"],
  },
  {
    type: "text", key: "memory_imprint",
    q: "Describe one night out you still remember clearly.",
    placeholder: "What made it stay with you?",
    long: true, optional: true,
  },
  { type: "thanks" },
];

const KEYED = STEPS.filter(s => s.type !== "intro" && s.type !== "thanks");
const TOTAL = KEYED.length;

function pct(idx: number) {
  if (idx === 0) return 0;
  if (idx >= STEPS.length - 1) return 100;
  const cur = STEPS[idx];
  const pos = KEYED.findIndex(s => s === cur);
  return pos === -1 ? 100 : Math.round(((pos + 1) / TOTAL) * 100);
}
function qlabel(idx: number) {
  const cur = STEPS[idx];
  const pos = KEYED.findIndex(s => s === cur);
  return pos === -1 ? "" : `Q${pos + 1} of ${TOTAL}`;
}

export default function ResearchPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const subIdRef = useRef("");
  useEffect(() => {
    subIdRef.current = "sub_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }, []);
  const [pulse, setPulse] = useState(0);
  const submittedRef = useRef(false);
  const [transitioning, setTransitioning] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => {
    if (transitioning) return;
    setTransitioning(true);
    const el = wrapRef.current;
    if (el) {
      el.style.transition = "opacity 0.18s ease, transform 0.18s ease";
      el.style.opacity = "0";
      el.style.transform = `translateY(${dir > 0 ? -20 : 20}px)`;
    }
    setTimeout(() => {
      setStep(s => s + dir);
      setTransitioning(false);
    }, 190);
  }, [transitioning]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }));
  }, [step]);

  const submitForm = useCallback((extra?: Answers) => {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...answers, ...extra, submissionId: subIdRef.current }),
    }).catch(() => {});
  }, [answers]);

  useEffect(() => {
    if (STEPS[step].type === "thanks" && !submittedRef.current) {
      submittedRef.current = true;
      submitForm();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const advance = useCallback(() => go(1), [go]);
  const back    = useCallback(() => go(-1), [go]);

  const pick = useCallback((key: string, val: string) => {
    setPulse(p => p + 1);
    setAnswers(a => ({ ...a, [key]: val }));
    setTimeout(() => advance(), 260);
  }, [advance]);

  const toggleMulti = useCallback((key: string, val: string, limit: number) => {
    setPulse(p => p + 1);
    setAnswers(a => {
      const cur: string[] = Array.isArray(a[key]) ? (a[key] as string[]) : [];
      const on = cur.includes(val);
      if (on) return { ...a, [key]: cur.filter(v => v !== val) };
      const next = cur.length >= limit ? [...cur.slice(1), val] : [...cur, val];
      return { ...a, [key]: next };
    });
  }, []);

  const s = STEPS[step];
  const showBack = step > 0 && s.type !== "thanks";

  const [showEmail, setShowEmail]   = useState(false);
  const [email, setEmail]           = useState("");
  const [emailDone, setEmailDone]   = useState(false);
  const [declined, setDeclined]     = useState(false);

  const handleYes = () => { setShowEmail(true); setDeclined(false); };
  const handleNo  = () => { setDeclined(true); setShowEmail(false); };
  const handleEmailSubmit = () => {
    if (!email.trim()) return;
    submitForm({ email: email.trim() });
    setEmailDone(true);
  };

  return (
    <>
      <style jsx global>{`
        .rp-shell {
          position: relative;
          min-height: calc(100vh - var(--nav-height));
          background: rgba(9, 8, 16, 0.68); /* veil over the global neural scene */
          display: flex; flex-direction: column;
          font-family: "Clash Display", sans-serif;
          overflow: hidden;
        }
        .rp-bar { position: relative; z-index: 20; height: 2px; background: rgba(255,255,255,0.06); flex-shrink: 0; }
        .rp-fill {
          height: 100%;
          background: linear-gradient(90deg, #E6D3A3, #F0DFB8, #E6D3A3);
          background-size: 200% auto;
          animation: rpShimmer 3s linear infinite;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes rpShimmer { to { background-position: 200% center; } }
        .rp-back {
          position: absolute; z-index: 30; top: 18px; left: 22px;
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3); transition: color 0.18s;
        }
        .rp-back:hover { color: #E6D3A3; }
        .rp-vignette {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 65% 55% at 50% 50%, transparent 35%, rgba(10,10,10,0.75) 100%);
        }
        .rp-area {
          flex: 1; position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          min-height: calc(100vh - var(--nav-height) - 2px);
          padding: 48px 32px 72px;
        }
        .rp-wrap { width: 100%; max-width: 560px; display: flex; flex-direction: column; gap: 0; }
        .rp-brand {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; font-weight: 500; color: #F5F5F5;
          margin-bottom: 40px; letter-spacing: -0.01em;
        }
        .rp-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.28);
          margin-bottom: 16px; display: block;
        }
        .rp-q {
          font-size: clamp(22px, 4vw, 44px);
          font-weight: 600; line-height: 1.15;
          letter-spacing: -0.02em; color: #F5F5F5;
          margin: 0 0 32px;
        }
        .rp-hint { font-size: 12px; color: rgba(255,255,255,0.28); letter-spacing: 0.04em; margin: -20px 0 20px; }
        .rp-sub { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.42); line-height: 1.65; margin: -12px 0 32px; max-width: 400px; }
        .rp-opts { display: flex; flex-direction: column; gap: 8px; }
        .rp-opt {
          display: flex; align-items: center;
          min-height: 52px; padding: 13px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px; cursor: pointer;
          font-family: "Clash Display", sans-serif;
          font-size: 15px; font-weight: 400;
          color: rgba(255,255,255,0.58); text-align: left;
          transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s;
          backdrop-filter: blur(6px);
        }
        .rp-opt:hover { border-color: rgba(255,255,255,0.2); color: #F5F5F5; background: rgba(255,255,255,0.06); transform: translateX(5px); }
        .rp-opt.selected { border-color: #E6D3A3; color: #E6D3A3; background: rgba(230,211,163,0.08); transform: translateX(5px); }
        .rp-check {
          width: 18px; height: 18px; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          margin-right: 14px; transition: all 0.15s;
        }
        .rp-opt.multi-sel .rp-check { border-color: #E6D3A3; background: #E6D3A3; }
        .rp-opt.multi-sel { border-color: #E6D3A3; color: #E6D3A3; background: rgba(230,211,163,0.08); }
        .rp-check svg { display: none; }
        .rp-opt.multi-sel .rp-check svg { display: block; }
        .rp-text-wrap { width: 100%; }
        .rp-field {
          width: 100%; background: transparent; border: none;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 12px 0; color: #F5F5F5;
          font-family: "Clash Display", sans-serif; font-size: 20px; font-weight: 400;
          outline: none; resize: none; line-height: 1.45;
          transition: border-color 0.2s;
        }
        .rp-field::placeholder { color: rgba(255,255,255,0.18); }
        .rp-field:focus { border-color: #E6D3A3; }
        .rp-btns { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-top: 28px; }
        .rp-next {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: "Clash Display", sans-serif; font-size: 14px; font-weight: 600;
          color: #0A0A0A; background: #E6D3A3; border: none; border-radius: 5px;
          padding: 14px 28px; cursor: pointer; min-height: 52px;
          opacity: 0.35; pointer-events: none;
          transition: opacity 0.18s, transform 0.15s;
        }
        .rp-next.on { opacity: 1; pointer-events: all; }
        .rp-next.on:hover { transform: translateX(3px); }
        .rp-skip {
          font-family: "Clash Display", sans-serif; font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,0.28); background: none; border: none;
          border-bottom: 1px solid transparent; cursor: pointer; padding: 4px 0;
          transition: color 0.15s, border-color 0.15s;
        }
        .rp-skip:hover { color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.28); }
        .rp-ty-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
        .rp-ty-yes {
          font-family: "Clash Display", sans-serif; font-size: 14px; font-weight: 600;
          padding: 14px 28px; border-radius: 5px; border: none;
          background: #E6D3A3; color: #0A0A0A; cursor: pointer; min-height: 52px;
          transition: opacity 0.18s, transform 0.15s;
        }
        .rp-ty-yes:hover { opacity: 0.88; transform: translateX(2px); }
        .rp-ty-no {
          font-family: "Clash Display", sans-serif; font-size: 14px; font-weight: 400;
          padding: 14px 28px; border-radius: 5px;
          background: transparent; color: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.1); cursor: pointer; min-height: 52px;
          transition: all 0.18s;
        }
        .rp-ty-no:hover { border-color: rgba(255,255,255,0.25); color: #F5F5F5; }
        .rp-email-row {
          display: flex; gap: 10px; margin-top: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 4px; max-width: 460px;
          transition: border-color 0.2s;
        }
        .rp-email-row:focus-within { border-color: #E6D3A3; }
        .rp-email-inp {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: "Clash Display", sans-serif; font-size: 18px; font-weight: 400;
          color: #F5F5F5; min-width: 160px; padding: 10px 0;
        }
        .rp-email-inp::placeholder { color: rgba(255,255,255,0.2); }
        .rp-email-sub {
          font-family: "Clash Display", sans-serif; font-size: 13px; font-weight: 600;
          background: #E6D3A3; color: #0A0A0A; border: none; border-radius: 4px;
          padding: 10px 18px; cursor: pointer; display: flex; align-items: center;
          transition: opacity 0.18s;
        }
        .rp-email-sub:hover { opacity: 0.88; }
        .rp-ty-msg { margin-top: 22px; font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.4); line-height: 1.65; max-width: 360px; }
        .rp-ty-back {
          margin-top: 36px; font-family: "Clash Display", sans-serif;
          font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.28);
          text-decoration: none; border-bottom: 1px solid transparent; padding-bottom: 2px;
          transition: color 0.18s, border-color 0.18s; display: inline-block;
        }
        .rp-ty-back:hover { color: #E6D3A3; border-color: rgba(230,211,163,0.4); }
        @media (max-width: 480px) {
          .rp-area { padding: 40px 20px 60px; }
          .rp-opt { min-height: 46px; font-size: 14px; }
        }
        .rp-faq-section {
          position: relative;
          background: rgba(9, 8, 16, 0.68);
          padding: 64px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .rp-faq-inner { max-width: 760px; margin: 0 auto; }
        .rp-faq-title {
          font-family: "Clash Display", sans-serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 600;
          color: #fff;
          margin-bottom: 32px;
        }
        .rp-faq-list { display: grid; gap: 24px; }
        .rp-faq-item { border-left: 2px solid rgba(230,211,163,0.35); padding-left: 16px; }
        .rp-faq-q { font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 6px; }
        .rp-faq-a { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.65; margin: 0; }
      `}</style>

      <Navbar />

      <div className="rp-shell">
        <ResearchScene pulse={pulse} />
        <div className="rp-vignette" />

        <div className="rp-bar">
          <div className="rp-fill" style={{ width: `${pct(step)}%` }} />
        </div>

        {showBack && (
          <button className="rp-back" onClick={back} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 5 5 12 12 19" />
            </svg>
          </button>
        )}

        <div className="rp-area">
          <div ref={wrapRef} className="rp-wrap">

            {s.type === "intro" && (
              <>
                <div className="rp-brand">
                  <svg width="18" height="18" viewBox="0 0 64 64"><path d="M32 4 L37 27 L60 32 L37 37 L32 60 L27 37 L4 32 L27 27 Z" fill="#E6D3A3"/></svg>
                  Polynovea
                </div>
                <h1 className="rp-q" style={{ fontSize: "clamp(28px,5vw,56px)" }}>Help us understand what makes a great night.</h1>
                <p className="rp-sub">16 questions. 4 minutes. Your answers shape how we build live experiences.</p>
                <div className="rp-btns">
                  <button className="rp-next on" onClick={advance}>Let&apos;s begin →</button>
                </div>
              </>
            )}

            {s.type === "single" && (
              <>
                <span className="rp-label">{qlabel(step)}</span>
                <h2 className="rp-q">{s.q}</h2>
                <div className="rp-opts">
                  {s.options.map(opt => (
                    <button key={opt} className={`rp-opt${answers[s.key] === opt ? " selected" : ""}`} onClick={() => pick(s.key, opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {s.type === "multi" && (() => {
              const sel: string[] = Array.isArray(answers[s.key]) ? (answers[s.key] as string[]) : [];
              return (
                <>
                  <span className="rp-label">{qlabel(step)}</span>
                  <h2 className="rp-q">{s.q}</h2>
                  <p className="rp-hint">{s.hint}</p>
                  <div className="rp-opts">
                    {s.options.map(opt => (
                      <button key={opt} className={`rp-opt multi${sel.includes(opt) ? " multi-sel" : ""}`} onClick={() => toggleMulti(s.key, opt, s.limit)}>
                        <span className="rp-check">
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 4.5 7.5 10 1.5"/></svg>
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="rp-btns">
                    <button className={`rp-next${sel.length > 0 ? " on" : ""}`} onClick={advance} disabled={sel.length === 0}>Next →</button>
                  </div>
                </>
              );
            })()}

            {s.type === "text" && (() => {
              const val = (answers[s.key] as string) || "";
              const canGo = !!s.optional || val.trim().length > 0;
              return (
                <>
                  <span className="rp-label">{qlabel(step)}</span>
                  <h2 className="rp-q">{s.q}</h2>
                  <div className="rp-text-wrap">
                    {s.long ? (
                      <textarea className="rp-field" placeholder={s.placeholder} value={val} rows={3}
                        onChange={e => setAnswers(a => ({ ...a, [s.key]: e.target.value }))} />
                    ) : (
                      <input className="rp-field" type="text" placeholder={s.placeholder} value={val} autoComplete="off" autoFocus
                        onChange={e => setAnswers(a => ({ ...a, [s.key]: e.target.value }))}
                        onKeyDown={e => { if (e.key === "Enter" && canGo) { setAnswers(a => ({ ...a, [s.key]: val.trim() || null })); advance(); } }} />
                    )}
                  </div>
                  <div className="rp-btns">
                    <button className={`rp-next${canGo ? " on" : ""}`} onClick={() => { setAnswers(a => ({ ...a, [s.key]: val.trim() || null })); advance(); }} disabled={!canGo}>Next →</button>
                    {s.optional && <button className="rp-skip" onClick={() => { setAnswers(a => ({ ...a, [s.key]: null })); advance(); }}>Skip</button>}
                  </div>
                </>
              );
            })()}

            {s.type === "thanks" && (
              <>
                <div className="rp-brand">
                  <svg width="18" height="18" viewBox="0 0 64 64"><path d="M32 4 L37 27 L60 32 L37 37 L32 60 L27 37 L4 32 L27 27 Z" fill="#E6D3A3"/></svg>
                  Polynovea
                </div>
                <h2 className="rp-q" style={{ fontSize: "clamp(24px,4vw,44px)" }}>That&apos;s exactly what we needed.</h2>
                <p className="rp-sub">Want early access to what we&apos;re building based on this?</p>
                {!emailDone && !declined && (
                  <div className="rp-ty-btns">
                    <button className="rp-ty-yes" onClick={handleYes}>Yes, add me</button>
                    <button className="rp-ty-no" onClick={handleNo}>No thanks</button>
                  </div>
                )}
                {showEmail && !emailDone && (
                  <div className="rp-email-row">
                    <input className="rp-email-inp" type="email" placeholder="your@email.com" value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") handleEmailSubmit(); }}
                      autoFocus />
                    <button className="rp-email-sub" onClick={handleEmailSubmit}>Done →</button>
                  </div>
                )}
                {emailDone && <p className="rp-ty-msg">You&apos;re on the list. We&apos;ll be in touch.</p>}
                {declined && <p className="rp-ty-msg">Appreciated. Every answer helps us build something real.</p>}
              </>
            )}

          </div>
        </div>
      </div>

      <div className="rp-faq-section">
        <div className="rp-faq-inner">
          <h2 className="rp-faq-title">Frequently asked questions</h2>
          <div className="rp-faq-list">
            {[
              {
                q: "How long does the behavioral study take?",
                a: "The study is 16 short questions about what makes a great night out - most people complete it in under three minutes. There are no long-form answers required, just quick single-choice and multi-choice questions.",
              },
              {
                q: "Is my data anonymous?",
                a: "Yes. Responses feed the Human Behavioral Intelligence Framework in aggregate - no personally identifying information is required to participate or published in any research output.",
              },
              {
                q: "Why does Polynovea run this study?",
                a: "Polynovea's Acquisition System reads behavioral signals from reviews, but this study captures decision-making directly from people themselves - what triggers a night out, what keeps them at a venue, and what makes them leave.",
              },
              {
                q: "Who can participate in the study?",
                a: "Anyone who goes out to restaurants, bars, or live venues in India can participate - the study is designed around real nightlife and dining decisions, not a specific city or demographic.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rp-faq-item">
                <h3 className="rp-faq-q">{q}</h3>
                <p className="rp-faq-a">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
