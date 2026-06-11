import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cappella — Music Intelligence for Musicians | Polynovea",
  description:
    "Cappella by Polynovea. Guitar tuner, BPM detection, key detection, chord detection, and full song analysis — on device, built for musicians.",
  alternates: {
    canonical: "https://polynovearecords.in/cappella-account-deletion",
  },
  openGraph: {
    title: "Cappella — Music Intelligence for Musicians",
    description:
      "Guitar tuner, BPM detection, key detection, chord detection, and song analysis — on device.",
    url: "https://polynovearecords.in/cappella-account-deletion",
    siteName: "Polynovea",
    type: "website",
  },
};

const features = [
  {
    icon: "♩",
    title: "Guitar Tuner",
    description:
      "Pitch-accurate chromatic and smart tuner. Works offline, instant response, built for live and studio use.",
  },
  {
    icon: "♩",
    title: "BPM Detector",
    description:
      "Tap or record — Cappella extracts tempo from any audio source with high accuracy.",
  },
  {
    icon: "♩",
    title: "Key Detection",
    description:
      "Identify the musical key of any track or live performance in seconds.",
  },
  {
    icon: "♩",
    title: "Chord Detection",
    description:
      "Real-time chord recognition from microphone or file input. No internet required.",
  },
  {
    icon: "♩",
    title: "Song Analysis",
    description:
      "Deep intelligence — BPM, key, chords, energy curve, section map, and track compatibility — in a single cloud run.",
    hero: true,
  },
];

const whyPoints = [
  {
    title: "Fast",
    description: "On-device DSP means zero latency for core features. No waiting for a server.",
  },
  {
    title: "Accurate",
    description:
      "Built on precision signal processing. Cappella is designed to be correct, not approximate.",
  },
  {
    title: "Privacy-focused",
    description:
      "Audio is processed locally for all real-time features. Your recordings never leave your device unless you choose cloud analysis.",
  },
  {
    title: "Built for professionals",
    description:
      "Designed for musicians, producers, and analysts who need a tool that works — not a toy.",
  },
];

const deletionSteps = [
  "Open the Cappella app on your device.",
  "Navigate to Profile (bottom navigation bar, rightmost tab).",
  "Scroll down and tap Delete Account.",
  "Confirm deletion in the dialog that appears.",
];

export default function CappellaPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "rgba(9, 8, 16, 0.7)", color: "var(--text-primary)" }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={styles.hero}>
          <div style={styles.container}>
            <p style={styles.eyebrow}>by Polynovea</p>
            <h1 style={styles.heroTitle}>Cappella</h1>
            <p style={styles.heroSubtitle}>
              Music Intelligence, Built for Musicians.
            </p>
            <p style={styles.heroDesc}>
              Guitar Tuner · BPM Detection · Key Detection · Chord Detection · Song Analysis
            </p>
            <div style={styles.badgeRow}>
              <a
                href="https://play.google.com/store/apps/details?id=com.polynovea.cappella"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.playBadge}
                aria-label="Get Cappella on Google Play"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5c.5.29.5 1.21 0 1.5l-15 8.5c-.5.33-1.5.33-1.5-.5z" />
                </svg>
                Get on Google Play
              </a>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────── */}
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Everything you need to understand music.</h2>
            <p style={styles.sectionSubtitle}>
              Five tools. One app. All on device.
            </p>
            <div style={styles.featureGrid}>
              {features.map((f) => (
                <div
                  key={f.title}
                  style={{
                    ...styles.featureCard,
                    ...(f.hero ? styles.featureCardHero : {}),
                    gridColumn: f.hero ? "1 / -1" : undefined,
                  }}
                >
                  <p style={styles.featureTitle}>{f.title}</p>
                  <p style={styles.featureDesc}>{f.description}</p>
                  {f.hero && (
                    <span style={styles.heroBadge}>STUDIO FEATURE</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Cappella ─────────────────────────────────────────────── */}
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Why Cappella</h2>
            <div style={styles.whyGrid}>
              {whyPoints.map((p) => (
                <div key={p.title} style={styles.whyCard}>
                  <h3 style={styles.whyTitle}>{p.title}</h3>
                  <p style={styles.whyDesc}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Privacy & Data ───────────────────────────────────────────── */}
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Privacy &amp; Data</h2>
            <div style={styles.privacyGrid}>
              {[
                "Audio is processed only for the analysis you request. It is never stored or shared without your explicit action.",
                "All user data is encrypted in transit using industry-standard TLS.",
                "You retain full control over your data. You can delete your account and all associated data at any time from within the app.",
              ].map((text, i) => (
                <div key={i} style={styles.privacyCard}>
                  <p style={styles.privacyText}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Account Deletion ─────────────────────────────────────────── */}
        <section id="account-deletion" style={styles.section}>
          <div style={styles.container}>
            <div style={styles.deletionHeader}>
              <span style={styles.complianceBadge}>Google Play Compliance</span>
              <h2 style={styles.sectionTitle}>Account Deletion</h2>
              <p style={styles.sectionSubtitle}>
                You can delete your Cappella account and all associated data directly from the app.
              </p>
            </div>

            <div style={styles.deletionGrid}>
              {/* How to delete */}
              <div style={styles.deletionCard}>
                <h3 style={styles.deletionCardTitle}>How to delete your account</h3>
                <ol style={styles.stepList}>
                  {deletionSteps.map((step, i) => (
                    <li key={i} style={styles.stepItem}>
                      <span style={styles.stepNumber}>{i + 1}</span>
                      <span style={styles.stepText}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* What gets deleted */}
              <div style={styles.deletionCard}>
                <h3 style={styles.deletionCardTitle}>Data deleted</h3>
                <ul style={styles.bulletList}>
                  {["Your account credentials and profile", "All saved analyses and results", "App preferences and usage data"].map((item) => (
                    <li key={item} style={styles.bulletItem}>
                      <span style={styles.bullet}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 style={{ ...styles.deletionCardTitle, marginTop: 24 }}>Data that may be retained</h3>
                <ul style={styles.bulletList}>
                  {[
                    "Subscription and transaction records where legally required",
                    "Security, fraud-prevention, or compliance records where required by law",
                  ].map((item) => (
                    <li key={item} style={styles.bulletItem}>
                      <span style={styles.bullet}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p style={styles.retentionNote}>
                  Retained only for the minimum period required by applicable law.
                </p>
              </div>
            </div>

            <div style={styles.supportBox}>
              <p style={styles.supportText}>
                Need help?{" "}
                <a href="mailto:support@polynovearecords.in" style={styles.supportLink}>
                  support@polynovearecords.in
                </a>
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "0 24px",
  },
  hero: {
    padding: "120px 0 80px",
    textAlign: "center",
    background:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 60%)",
  },
  eyebrow: {
    fontSize: 13,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--accent-authority-muted)",
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(56px, 10vw, 100px)",
    fontWeight: 700,
    color: "var(--accent-authority)",
    lineHeight: 1,
    marginBottom: 20,
    letterSpacing: "-2px",
  },
  heroSubtitle: {
    fontSize: "clamp(18px, 3vw, 24px)",
    color: "var(--text-primary)",
    marginBottom: 12,
    fontWeight: 400,
  },
  heroDesc: {
    fontSize: 14,
    color: "var(--text-secondary)",
    letterSpacing: "0.05em",
    marginBottom: 40,
  },
  badgeRow: {
    display: "flex",
    justifyContent: "center",
  },
  playBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 28px",
    background: "var(--accent-authority)",
    color: "#0A0A0A",
    borderRadius: "var(--radius-pill)",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "background var(--duration-default)",
  },
  section: {
    padding: "80px 0",
  },
  sectionTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: 12,
    letterSpacing: "-0.5px",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "var(--text-secondary)",
    marginBottom: 48,
    lineHeight: 1.6,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },
  featureCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-muted)",
    borderRadius: "var(--radius-lg)",
    padding: 24,
    position: "relative",
  },
  featureCardHero: {
    border: "1px solid var(--accent-authority-muted)",
    background:
      "linear-gradient(135deg, rgba(230, 211, 163, 0.05) 0%, var(--bg-card) 100%)",
  },
  featureTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 18,
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    color: "var(--text-secondary)",
    lineHeight: 1.6,
  },
  heroBadge: {
    display: "inline-block",
    marginTop: 16,
    padding: "4px 12px",
    background: "rgba(230, 211, 163, 0.1)",
    border: "1px solid rgba(230, 211, 163, 0.3)",
    borderRadius: "var(--radius-pill)",
    fontSize: 11,
    letterSpacing: "0.1em",
    color: "var(--accent-authority)",
    fontWeight: 600,
  },
  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
  },
  whyCard: {
    padding: "24px 0",
    borderTop: "1px solid var(--border-muted)",
  },
  whyTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    fontWeight: 600,
    color: "var(--accent-authority)",
    marginBottom: 8,
  },
  whyDesc: {
    fontSize: 14,
    color: "var(--text-secondary)",
    lineHeight: 1.7,
  },
  privacyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  privacyCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-muted)",
    borderRadius: "var(--radius-lg)",
    padding: 24,
  },
  privacyText: {
    fontSize: 14,
    color: "var(--text-secondary)",
    lineHeight: 1.7,
  },
  deletionHeader: {
    marginBottom: 48,
  },
  complianceBadge: {
    display: "inline-block",
    marginBottom: 16,
    padding: "4px 12px",
    background: "rgba(124, 58, 237, 0.1)",
    border: "1px solid rgba(124, 58, 237, 0.3)",
    borderRadius: "var(--radius-pill)",
    fontSize: 11,
    letterSpacing: "0.1em",
    color: "var(--accent-intelligence)",
    fontWeight: 600,
  },
  deletionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    marginBottom: 32,
  },
  deletionCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-muted)",
    borderRadius: "var(--radius-lg)",
    padding: 28,
  },
  deletionCardTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 16,
    letterSpacing: "0.02em",
  },
  stepList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  stepItem: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    flexShrink: 0,
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "rgba(230, 211, 163, 0.1)",
    border: "1px solid rgba(230, 211, 163, 0.3)",
    color: "var(--accent-authority)",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  stepText: {
    fontSize: 14,
    color: "var(--text-secondary)",
    lineHeight: 1.6,
    paddingTop: 3,
  },
  bulletList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  bulletItem: {
    display: "flex",
    gap: 10,
    fontSize: 14,
    color: "var(--text-secondary)",
    lineHeight: 1.5,
  },
  bullet: {
    color: "var(--accent-authority-muted)",
    flexShrink: 0,
  },
  retentionNote: {
    marginTop: 16,
    fontSize: 12,
    color: "var(--text-disabled)",
    fontStyle: "italic",
  },
  supportBox: {
    textAlign: "center",
    padding: "24px",
    border: "1px solid var(--border-muted)",
    borderRadius: "var(--radius-lg)",
    background: "var(--bg-card)",
  },
  supportText: {
    fontSize: 14,
    color: "var(--text-secondary)",
  },
  supportLink: {
    color: "var(--accent-authority)",
    textDecoration: "none",
    fontWeight: 500,
  },
};
