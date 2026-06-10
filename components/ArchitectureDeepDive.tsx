"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import Link from "next/link";
import * as THREE from "three";

type MilestoneKey = "m1" | "m2" | "m3" | "m4";
type SurfaceKey = "venues" | "music";

const milestoneColors: Record<MilestoneKey, string> = {
  m1: "#7C3AED",
  m2: "#FBBF24",
  m3: "#06B6D4",
  m4: "#EC4899",
};

const milestoneVisuals: Record<MilestoneKey, { primary: string; secondary: string; line: string }> = {
  m1: { primary: "#7C3AED", secondary: "#A78BFA", line: "#8B5CF6" },
  m2: { primary: "#FBBF24", secondary: "#F59E0B", line: "#FACC15" },
  m3: { primary: "#06B6D4", secondary: "#14B8A6", line: "#22D3EE" },
  m4: { primary: "#EC4899", secondary: "#D946EF", line: "#F472B6" },
};

const milestones = [
  {
    key: "m1" as const,
    number: "01",
    stage: "Data In",
    title: "Intelligence Infrastructure",
    summary:
      "Raw behavior becomes measurable insight through decision frameworks, acquisition systems, and optimization loops.",
    flow: "Behavior patterns + raw signals -> intelligence insights",
    items: [
      {
        title: "Module 1: Decision Framework",
        what: "Define what you are measuring and why.",
        how: ["Identify behavioral triggers", "Define success metrics", "Set baseline measurements"],
        output: "KPIs, decision criteria, measurement baseline",
      },
      {
        title: "Module 2: Acquisition System",
        what: "Map the behavioural mechanics of commercial environments — not categories, not sentiment, but the operating mechanisms that determine why customers return, spend, and refer.",
        how: ["Extract multi-source behavioural signals and structure them through an ontology layer", "Score venues across fitness dimensions and audience archetypes using Bayesian inference", "Convert intelligence into a field execution framework — 8-phase acquisition system deployed live at each venue"],
        output: "Behavioural fitness profiles, audience archetype maps, competitor intelligence by behavioural similarity, and a proven acquisition playbook per venue",
      },
      {
        title: "Module 3: Optimization System",
        what: "Identify patterns and recommend improvements.",
        how: ["Run pattern recognition", "Calculate correlations", "Generate recommendations"],
        output: "Actionable insights, interventions, impact predictions",
      },
    ],
  },
  {
    key: "m2" as const,
    number: "02",
    stage: "Execution",
    title: "IP & Records Layer",
    summary:
      "The cultural execution surface where intelligence informs creator development, owned IP, and audience relationships.",
    flow: "Intelligence insights -> records execution",
    items: [
      {
        title: "Artist Discovery & Development",
        what: "Match creators to opportunities and track development.",
        how: ["Use intelligence from M1", "Compare creator fit", "Measure growth signals"],
        output: "Developed talent, success benchmarks",
      },
      {
        title: "IP Creation & Ownership",
        what: "Turn behavioral patterns and creative assets into owned content.",
        how: ["Create original assets", "Manage rights", "Build catalog value"],
        output: "Owned catalog, licensing options, revenue streams",
      },
      {
        title: "Audience Ownership",
        what: "Build direct relationships with audiences.",
        how: ["Capture engagement patterns", "Develop communities", "Strengthen retention"],
        output: "First-party audience data, loyalty, repeatable demand",
      },
    ],
  },
  {
    key: "m3" as const,
    number: "03",
    stage: "Monetization",
    title: "External Services",
    summary:
      "The infrastructure becomes commercially useful through creator services, licensing, and implementation work.",
    flow: "IP + audience data -> external services leverage",
    items: [
      {
        title: "Creator / Artist Services",
        what: "Offer production, distribution, and growth support.",
        how: ["Apply behavioral insights", "Optimize release paths", "Track conversion"],
        output: "SaaS fees, revenue share, retainers",
      },
      {
        title: "Infrastructure Licensing",
        what: "License intelligence systems to partners.",
        how: ["Expose platform access", "Package decision frameworks", "Support integrations"],
        output: "API licensing, enterprise tiers",
      },
      {
        title: "Consulting & Implementation",
        what: "Deploy custom behavioral strategy for complex ecosystems.",
        how: ["Map the system", "Instrument feedback loops", "Train operating teams"],
        output: "Project fees, implementation services",
      },
    ],
  },
  {
    key: "m4" as const,
    number: "04",
    stage: "Revenue",
    title: "Distribution & Ownership",
    summary:
      "The final layer: distribution control, rights leverage, and long-term ecosystem sovereignty.",
    flow: "Service revenue + margin -> distribution control",
    items: [
      {
        title: "Distribution Infrastructure",
        what: "Reduce dependency on third-party channels.",
        how: ["Build direct channels", "Expand platform presence", "Control delivery"],
        output: "Lower dependency, stronger margins",
      },
      {
        title: "Rights & Catalog Management",
        what: "Control ownership and licensing decisions.",
        how: ["Own IP", "Structure licenses", "Track rights value"],
        output: "Perpetual revenue, licensing leverage",
      },
      {
        title: "Monetization Sovereignty",
        what: "Capture more value from the ecosystem.",
        how: ["Control pricing", "Shape partner agreements", "Protect margins"],
        output: "Sustainable long-term value",
      },
    ],
  },
];

const appliedSurfaces: Record<SurfaceKey, {
  label: string;
  eyebrow: string;
  color: string;
  examples: string[];
}> = {
  venues: {
    label: "Venue Revenue Optimisation",
    eyebrow: "Live environments",
    color: "#7C3AED",
    examples: [
      "Measure baseline venue behavior before changing the experience.",
      "Track sales timing, dwell time, audience retention, and response quality.",
      "Use live entertainment as an operational variable, not a decorative add-on.",
      "Turn repeatable patterns into show formats and venue playbooks.",
    ],
  },
  music: {
    label: "Music Creation & Production",
    eyebrow: "Cultural output",
    color: "#FBBF24",
    examples: [
      "Study how structure, lyric, emotion, and production choices shape listener response.",
      "Use audience and context signals to guide creative decisions without flattening taste.",
      "Develop music that is creatively strong and behaviorally aware.",
      "Convert learning from releases back into artist development and owned IP strategy.",
    ],
  },
};

// Real 3D positions — nodes distributed across x/y/z, not a flat line
const NODE_POSITIONS: [number, number, number][] = [
  [-2.0,  0.65,  0.7],
  [-0.45, -0.55, -0.3],
  [ 0.95,  0.72,  0.3],
  [ 2.25, -0.42, -0.5],
];

function CrystalNode({
  milestone,
  active,
  hovered,
  position,
  onHover,
}: {
  milestone: (typeof milestones)[number];
  active: boolean;
  hovered: boolean;
  position: [number, number, number];
  onHover: (key: MilestoneKey | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const visual = milestoneVisuals[milestone.key];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const phase = Number(milestone.number) * 0.7;
    const breathe = 1 + Math.sin(t * 1.3 + phase) * (active ? 0.055 : 0.022);
    groupRef.current?.scale.setScalar(active ? breathe * 1.18 : hovered ? breathe * 1.09 : breathe);
    if (ringRef.current) {
      ringRef.current.rotation.z = t * (active ? 0.85 : 0.3);
      ringRef.current.rotation.x = t * 0.28;
    }
    if (icoRef.current) {
      icoRef.current.rotation.y = t * (active ? 0.55 : 0.18);
      icoRef.current.rotation.x = t * 0.22;
      if (icoRef.current.material instanceof THREE.MeshBasicMaterial) {
        icoRef.current.material.opacity = THREE.MathUtils.lerp(
          icoRef.current.material.opacity,
          active ? 0.9 : hovered ? 0.6 : 0.32,
          0.06
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Glass transmission sphere */}
      <mesh
        onPointerOver={() => onHover(milestone.key)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.44, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={0.92}
          roughness={0.08}
          thickness={0.55}
          ior={1.45}
          chromaticAberration={active ? 0.06 : 0.02}
          color={visual.primary}
          backside
          samples={6}
          distortionScale={active ? 0.18 : 0.06}
          temporalDistortion={0.12}
        />
      </mesh>

      {/* Spinning inner icosahedron lattice */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshBasicMaterial color={visual.secondary} wireframe transparent opacity={0.32} />
      </mesh>

      {/* Orbital ring — grows in when active/hovered */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[0.65, active ? 0.022 : 0.009, 16, 64]} />
        <meshBasicMaterial
          color={visual.secondary}
          transparent
          opacity={active ? 0.72 : hovered ? 0.38 : 0.14}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[0.78, 32, 32]} />
        <meshBasicMaterial
          color={visual.primary}
          transparent
          opacity={active ? 0.08 : 0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function ConnectionBeam({
  from,
  to,
  color,
  active,
  speed,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  active: boolean;
  speed: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const tRef = useRef(Math.random());
  const curve = useMemo(
    () => new THREE.LineCurve3(new THREE.Vector3(...from), new THREE.Vector3(...to)),
    [from, to]
  );

  useFrame((_, delta) => {
    tRef.current = (tRef.current + delta * speed) % 1;
    if (pulseRef.current) {
      const pos = curve.getPoint(tRef.current);
      pulseRef.current.position.copy(pos);
    }
  });

  return (
    <>
      {/* Base wire */}
      <mesh>
        <tubeGeometry args={[curve, 20, active ? 0.018 : 0.008, 6, false]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.65 : 0.2} />
      </mesh>
      {/* Traveling pulse dot */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[active ? 0.058 : 0.028, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.95 : 0.5} />
      </mesh>
    </>
  );
}

function CameraShift({ activeKey }: { activeKey: MilestoneKey }) {
  const { camera } = useThree();
  const idx = milestones.findIndex((m) => m.key === activeKey);
  const target = NODE_POSITIONS[idx];

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target[0] * 0.28, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target[1] * 0.18, 0.025);
  });
  return null;
}

function FlowObjects({
  selected,
  hovered,
  onHover,
}: {
  selected: MilestoneKey;
  hovered: MilestoneKey | null;
  onHover: (key: MilestoneKey | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.12, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.06, 0.04);
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Beams between consecutive nodes */}
      {NODE_POSITIONS.slice(0, -1).map((pos, idx) => {
        const fromM = milestones[idx];
        const toM = milestones[idx + 1];
        const active = selected === fromM.key || selected === toM.key ||
                       hovered === fromM.key || hovered === toM.key;
        return (
          <ConnectionBeam
            key={`beam-${idx}`}
            from={pos}
            to={NODE_POSITIONS[idx + 1]}
            color={milestoneVisuals[toM.key].line}
            active={active}
            speed={active ? 0.55 : 0.28}
          />
        );
      })}
      {/* Cross-beams for network feel */}
      <ConnectionBeam
        from={NODE_POSITIONS[0]} to={NODE_POSITIONS[2]}
        color={milestoneVisuals.m3.line} active={selected === "m1" || selected === "m3"}
        speed={0.22}
      />
      <ConnectionBeam
        from={NODE_POSITIONS[1]} to={NODE_POSITIONS[3]}
        color={milestoneVisuals.m4.line} active={selected === "m2" || selected === "m4"}
        speed={0.19}
      />

      {/* Crystal nodes */}
      {NODE_POSITIONS.map((pos, idx) => {
        const m = milestones[idx];
        return (
          <CrystalNode
            key={m.key}
            milestone={m}
            active={m.key === selected}
            hovered={m.key === hovered}
            position={pos}
            onHover={onHover}
          />
        );
      })}
    </group>
  );
}

function FlowScene({
  selected,
  hovered,
  onHover,
}: {
  selected: MilestoneKey;
  hovered: MilestoneKey | null;
  onHover: (key: MilestoneKey | null) => void;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 46 }} gl={{ alpha: true, antialias: true }}>
      <Environment preset="city" />
      <ambientLight intensity={0.35} />
      <pointLight position={[-4, 4, 5]} intensity={22} color="#9a6cff" />
      <pointLight position={[4, -2, 3]} intensity={14} color="#E6D3A3" />
      <pointLight position={[0, -4, 2]} intensity={8} color="#06B6D4" />
      <CameraShift activeKey={selected} />
      <FlowObjects selected={selected} hovered={hovered} onHover={onHover} />
    </Canvas>
  );
}

/** Per-milestone SVG glyphs — no canvas overhead, visually distinctive. */
function MilestoneGlyph({ milestoneKey, color }: { milestoneKey: MilestoneKey; color: string }) {
  const c = color;
  if (milestoneKey === "m1") return (
    <svg viewBox="0 0 240 200" className="mg" aria-hidden="true">
      {/* Concentric signal arcs */}
      <circle cx="120" cy="115" r="30" stroke={c} strokeWidth="1.5" fill="none" opacity="0.25" className="mg-ring mg-r1" />
      <circle cx="120" cy="115" r="55" stroke={c} strokeWidth="1" fill="none" opacity="0.15" className="mg-ring mg-r2" />
      <circle cx="120" cy="115" r="82" stroke={c} strokeWidth="0.7" fill="none" opacity="0.08" className="mg-ring mg-r3" />
      {/* Radar sweep line */}
      <line x1="120" y1="115" x2="120" y2="33" stroke={c} strokeWidth="1.5" opacity="0.7" className="mg-sweep" style={{ transformOrigin: "120px 115px" }} />
      {/* Data nodes */}
      <circle cx="162" cy="72" r="5.5" fill={c} opacity="0.9" className="mg-dot" />
      <circle cx="82" cy="88" r="4" fill={c} opacity="0.7" className="mg-dot" style={{ animationDelay: "0.3s" }} />
      <circle cx="148" cy="152" r="6.5" fill={c} opacity="1" className="mg-dot mg-dot-active" style={{ animationDelay: "0.6s" }} />
      <circle cx="66" cy="145" r="3.5" fill={c} opacity="0.55" className="mg-dot" style={{ animationDelay: "0.9s" }} />
      {/* Connection lines */}
      <line x1="162" y1="72" x2="148" y2="152" stroke={c} strokeWidth="0.8" opacity="0.3" />
      <line x1="82" y1="88" x2="148" y2="152" stroke={c} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
  if (milestoneKey === "m2") return (
    <svg viewBox="0 0 240 200" className="mg" aria-hidden="true">
      {/* Stacked catalog bars */}
      <rect x="40" y="148" width="160" height="9" rx="4.5" fill={c} opacity="0.85" className="mg-bar" />
      <rect x="40" y="131" width="126" height="9" rx="4.5" fill={c} opacity="0.65" className="mg-bar" style={{ animationDelay: "0.1s" }} />
      <rect x="40" y="114" width="98" height="9" rx="4.5" fill={c} opacity="0.45" className="mg-bar" style={{ animationDelay: "0.2s" }} />
      <rect x="40" y="97" width="72" height="9" rx="4.5" fill={c} opacity="0.28" className="mg-bar" style={{ animationDelay: "0.3s" }} />
      {/* IP ring + label */}
      <circle cx="120" cy="56" r="26" stroke={c} strokeWidth="1.5" fill="none" opacity="0.55" className="mg-ring mg-r1" />
      <circle cx="120" cy="56" r="14" fill={c} opacity="0.12" />
      <circle cx="120" cy="56" r="5" fill={c} opacity="0.9" />
      {/* IP anchor lines */}
      <line x1="120" y1="82" x2="120" y2="97" stroke={c} strokeWidth="1" opacity="0.4" />
      <line x1="120" y1="82" x2="80" y2="97" stroke={c} strokeWidth="0.8" opacity="0.25" />
      <line x1="120" y1="82" x2="160" y2="97" stroke={c} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
  if (milestoneKey === "m3") return (
    <svg viewBox="0 0 240 200" className="mg" aria-hidden="true">
      {/* Central hub */}
      <circle cx="120" cy="100" r="16" fill={c} opacity="0.15" />
      <circle cx="120" cy="100" r="8" fill={c} opacity="0.9" className="mg-dot mg-dot-active" />
      {/* Spoke nodes */}
      {([[-1.1, -0.85], [1.1, -0.85], [-1.4, 0.15], [1.4, 0.15], [-0.8, 1.1], [0.8, 1.1]] as [number, number][]).map(([dx, dy], i) => {
        const nx = 120 + dx * 62, ny = 100 + dy * 52;
        return (
          <g key={i}>
            <line x1="120" y1="100" x2={nx} y2={ny} stroke={c} strokeWidth="0.9" opacity="0.35" />
            <circle cx={nx} cy={ny} r="5" fill={c} opacity="0.7" className="mg-dot" style={{ animationDelay: `${i * 0.15}s` }} />
          </g>
        );
      })}
      {/* Outer ring */}
      <circle cx="120" cy="100" r="72" stroke={c} strokeWidth="0.6" fill="none" opacity="0.12" strokeDasharray="4 6" />
    </svg>
  );
  // m4
  return (
    <svg viewBox="0 0 240 200" className="mg" aria-hidden="true">
      {/* Root node */}
      <circle cx="120" cy="32" r="8" fill={c} opacity="0.9" className="mg-dot mg-dot-active" />
      {/* Level 2 */}
      <line x1="120" y1="40" x2="80" y2="88" stroke={c} strokeWidth="1" opacity="0.5" />
      <line x1="120" y1="40" x2="160" y2="88" stroke={c} strokeWidth="1" opacity="0.5" />
      <circle cx="80" cy="92" r="6" fill={c} opacity="0.75" className="mg-dot" style={{ animationDelay: "0.2s" }} />
      <circle cx="160" cy="92" r="6" fill={c} opacity="0.75" className="mg-dot" style={{ animationDelay: "0.3s" }} />
      {/* Level 3 */}
      {([[80, 100, 52, 148], [80, 100, 108, 148], [160, 100, 132, 148], [160, 100, 188, 148]] as number[][]).map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="0.8" opacity="0.35" />
          <circle cx={x2} cy={y2 + 5} r="4.5" fill={c} opacity="0.6" className="mg-dot" style={{ animationDelay: `${0.4 + i * 0.12}s` }} />
        </g>
      ))}
      {/* Sovereign base line */}
      <line x1="44" y1="168" x2="196" y2="168" stroke={c} strokeWidth="1.5" opacity="0.35" />
      <rect x="44" y="165" width="152" height="3" rx="1.5" fill={c} opacity="0.2" />
    </svg>
  );
}

export default function ArchitectureDeepDive() {
  const [visibleMilestone, setVisibleMilestone] = useState<MilestoneKey>("m1");
  const [manualSelectedMilestone, setManualSelectedMilestone] = useState<MilestoneKey | null>(null);
  const [hoveredModule, setHoveredModule] = useState<{ milestone: MilestoneKey; index: number } | null>(null);
  const [hoveredMilestoneNode, setHoveredMilestoneNode] = useState<MilestoneKey | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => new Set());
  const [selectedSurface, setSelectedSurface] = useState<SurfaceKey>("venues");
  const selectedMilestone = manualSelectedMilestone ?? visibleMilestone;
  const activeMilestone = milestones.find((m) => m.key === selectedMilestone) ?? milestones[0];
  const surface = appliedSurfaces[selectedSurface];
  const hoveredMilestone = hoveredModule?.milestone ?? hoveredMilestoneNode;

  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-milestone-key]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const key = visible?.target.getAttribute("data-milestone-key") as MilestoneKey | null;
        if (key) setVisibleMilestone(key);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const releaseManualSelection = () => {
      setManualSelectedMilestone(null);
    };

    window.addEventListener("scroll", releaseManualSelection, { passive: true });
    return () => window.removeEventListener("scroll", releaseManualSelection);
  }, []);

  const selectMilestone = (key: MilestoneKey) => setManualSelectedMilestone(key);

  const toggleModule = (moduleKey: string) => {
    setExpandedModules((current) => {
      const next = new Set(current);
      if (next.has(moduleKey)) {
        next.delete(moduleKey);
      } else {
        next.add(moduleKey);
      }
      return next;
    });
  };

  return (
    <main className="architecture-page">
      <section className="architecture-hero">
        {/* Full-bleed 3D canvas — fills the entire viewport */}
        <div className="hero-canvas-wrap" aria-hidden="true">
          <FlowScene
            selected={selectedMilestone}
            hovered={hoveredMilestone}
            onHover={setHoveredMilestoneNode}
          />
        </div>
        {/* Bottom vignette so copy stays readable */}
        <div className="hero-fade" />

        {/* Overlaid content anchored to the bottom */}
        <div className="container hero-content">
          <span className="t-label" style={{ color: "var(--accent-authority)" }}>
            The Behavioral Intelligence Stack
          </span>
          <h1 className="hero-title">The ecosystem flow<br />from behavior to ownership.</h1>
          <p className="t-body-lg hero-desc">
            Polynovea turns fragmented human behavior into intelligence, uses that intelligence to create IP,
            commercializes the infrastructure, and compounds toward distribution control.
          </p>
          <div className="flow-labels">
            {milestones.map((m) => (
              <button
                key={m.key}
                className={`flow-label ${m.key === selectedMilestone ? "active" : ""}`}
                style={{ "--node-color": milestoneColors[m.key] } as CSSProperties}
                onClick={() => selectMilestone(m.key)}
                type="button"
              >
                <span aria-hidden="true" />
                {m.number} — {m.title}
              </button>
            ))}
          </div>
          <p className="hero-active-flow">
            <span style={{ color: milestoneColors[activeMilestone.key] }}>{activeMilestone.stage} · </span>
            {activeMilestone.flow}
          </p>
        </div>
      </section>

      <section className="section breakdown-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Milestone Breakdown
            </span>
            <h2 className="t-display-md">Four compounding layers.</h2>
          </div>

          <div className="milestone-stack">
            {milestones.map((milestone) => (
              <article
                key={milestone.key}
                id={`milestone-${milestone.key}`}
                className="milestone-row"
                data-milestone-key={milestone.key}
                data-reveal
              >
                <div
                  className="sticky-visual"
                  style={{ "--mg-color": milestoneColors[milestone.key] } as CSSProperties}
                >
                  <MilestoneGlyph
                    milestoneKey={milestone.key}
                    color={milestoneColors[milestone.key]}
                  />
                  <div className="sticky-caption">
                    <span>{milestone.number}</span>
                    <strong>{milestone.title}</strong>
                  </div>
                </div>
                <div className="milestone-content">
                  <span className="t-label" style={{ color: milestoneColors[milestone.key] }}>
                    {milestone.stage}
                  </span>
                  <h3>{milestone.title}</h3>
                  <p className="t-body">{milestone.summary}</p>
                  <div className="module-grid">
                    {milestone.items.map((item, index) => {
                      const moduleKey = `${milestone.key}-${index}`;
                      const expanded = expandedModules.has(moduleKey);
                      const hovered =
                        hoveredModule?.milestone === milestone.key && hoveredModule.index === index;

                      return (
                        <div
                          key={item.title}
                          className={`module-card card${expanded || hovered ? " expanded" : ""}`}
                          style={{ "--milestone-color": milestoneColors[milestone.key] } as CSSProperties}
                          onMouseEnter={() => setHoveredModule({ milestone: milestone.key, index })}
                          onMouseLeave={() => setHoveredModule(null)}
                          onFocus={() => setHoveredModule({ milestone: milestone.key, index })}
                          onBlur={() => setHoveredModule(null)}
                        >
                          <button
                            type="button"
                            aria-expanded={expanded}
                            onClick={() => toggleModule(moduleKey)}
                          >
                            <span>{item.title}</span>
                          </button>
                          <div className="module-body">
                            <div className="module-body-inner">
                              <p>{item.what}</p>
                              <ul>
                                {item.how.map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ul>
                              <div className="output">Output: {item.output}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="next-flow">{milestone.flow}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Applied Surfaces
            </span>
            <h2 className="t-display-md">Where the framework is being tested first.</h2>
            <p className="t-body-lg">
              The system is strongest when it stays close to measurable reality. For now, the clearest
              surfaces are live venues and music creation.
            </p>
          </div>

          <div className="surface-tabs" data-reveal>
            {(Object.keys(appliedSurfaces) as SurfaceKey[]).map((key) => (
              <button
                key={key}
                className={key === selectedSurface ? "active" : ""}
                style={{ "--surface-color": appliedSurfaces[key].color } as CSSProperties}
                onClick={() => setSelectedSurface(key)}
              >
                {appliedSurfaces[key].label}
                <span>{appliedSurfaces[key].eyebrow}</span>
              </button>
            ))}
          </div>

          <div className="surface-card card" style={{ "--surface-color": surface.color } as CSSProperties} data-reveal>
            <div>
              <span className="t-label" style={{ color: surface.color }}>
                {surface.eyebrow}
              </span>
              <h3>{surface.label}</h3>
            </div>
            <div className="surface-flow">
              {surface.examples.map((example, index) => (
                <div key={example} className="surface-step">
                  <span>M{index + 1}</span>
                  <p>{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section data-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Intelligence Flow
            </span>
            <h2 className="t-display-md">How signal becomes leverage.</h2>
          </div>
          <div className="sankey-card card" data-reveal>
            {[
              "Raw behavior input",
              "Decision framework",
              "Acquisition system",
              "Optimization system",
              "Execution layer",
              "Monetization",
              "Sovereignty",
              "Sustainable value",
            ].map((step, index) => (
              <div key={step} className="sankey-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < 7 && <i />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section architecture-cta">
        <div className="container cta-card card">
          <span className="t-label" style={{ color: "var(--accent-authority)" }}>
            Build The System
          </span>
          <h2>Bring behavioral intelligence into your ecosystem.</h2>
          <p>
            Partner with Polynovea to define the signals, build the measurement layer, and turn behavior into a
            compounding operating advantage.
          </p>
          <div className="cta-actions">
            <Link href="/#contact" className="btn btn-primary">Partner with us</Link>
            <a href="#milestone-m1" className="btn btn-secondary">Review the stack</a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .architecture-page {
          background: rgba(9, 8, 16, 0.62); /* veil over the global neural scene */
          color: var(--text-primary);
        }

        /* ─── Hero ──────────────────────────────────────────────────── */
        .architecture-hero {
          position: relative;
          height: 100vh;
          min-height: 680px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .hero-canvas-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        /* Vignette at bottom so copy is always readable */
        .hero-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 55%;
          background: linear-gradient(to bottom, transparent, rgba(9, 8, 16, 0.88) 55%, #090810 100%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding-bottom: var(--space-3xl);
          max-width: 800px;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(42px, 5.5vw, 82px);
          font-weight: 700;
          line-height: 1.03;
          letter-spacing: -0.02em;
          margin: var(--space-md) 0 var(--space-lg);
        }

        .hero-desc {
          max-width: 560px;
          margin-bottom: var(--space-xl);
        }

        .hero-active-flow {
          margin-top: var(--space-md);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.02em;
        }

        .flow-labels {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: var(--space-md);
          position: relative;
          z-index: 2;
        }


        .flow-label,
        .surface-tabs button {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--duration-default) ease;
        }

        .flow-label:hover,
        .surface-tabs button:hover {
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }

        /* Refined chip — pill shape with colored dot, no min-height box */
        .flow-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border-radius: var(--radius-pill);
          padding: 7px 14px 7px 10px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.01em;
          line-height: 1;
          white-space: nowrap;
        }

        .flow-label span {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--node-color);
          box-shadow: 0 0 6px var(--node-color);
          flex-shrink: 0;
        }

        .flow-label.active {
          background: color-mix(in srgb, var(--node-color) 14%, transparent);
          color: var(--text-primary);
          border-color: color-mix(in srgb, var(--node-color) 55%, transparent);
          box-shadow: 0 0 18px color-mix(in srgb, var(--node-color) 22%, transparent);
        }

        @media (max-width: 768px) {
          .flow-label {
            font-size: 11px;
            padding: 6px 12px 6px 9px;
          }
        }


        .cta-card {
          padding: var(--space-xl);
        }

        .cta-card h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.1;
          margin: var(--space-sm) 0 var(--space-md);
        }

        @media (max-width: 768px) {
          .cta-card {
            padding: var(--space-lg);
          }

          .cta-card h2 {
            font-size: clamp(24px, 5vw, 36px);
          }

          .cta-card p {
            font-size: 14px;
          }

          .cta-actions {
            flex-direction: column;
            gap: var(--space-sm);
          }

          .cta-actions a,
          .cta-actions button {
            width: 100%;
          }
        }

        .cta-card p {
          color: var(--text-secondary);
        }

        .section-heading {
          max-width: 820px;
          margin-bottom: var(--space-3xl);
        }

        .section-heading h2 {
          color: var(--text-primary);
          margin-top: var(--space-md);
        }

        .section-heading p {
          margin-top: var(--space-md);
        }

        .milestone-stack {
          display: flex;
          flex-direction: column;
          gap: var(--space-5xl);
        }

        .milestone-row {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: var(--space-3xl);
          align-items: start;
          scroll-margin-top: calc(var(--nav-height) + var(--space-xl));
        }

        @media (max-width: 1024px) {
          .milestone-row {
            gap: var(--space-2xl);
          }
        }

        @media (max-width: 768px) {
          .milestone-row {
            gap: var(--space-lg);
          }
        }

        /* ─── Milestone glyph (SVG visual in sticky card) ─────────── */
        .sticky-visual {
          position: sticky;
          top: calc(var(--nav-height) + var(--space-xl));
          height: 340px;
          overflow: hidden;
          border-radius: var(--radius-lg);
          background: rgba(10, 9, 18, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mg {
          width: 68%;
          height: 68%;
          overflow: visible;
        }

        /* Pulsing dots */
        @keyframes mgDotPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }
        .mg-dot { animation: mgDotPulse 2.8s ease-in-out infinite; }
        .mg-dot-active { animation: mgDotPulse 1.6s ease-in-out infinite; }

        /* Concentric ring breathe */
        @keyframes mgRingBreathe {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.55; }
        }
        .mg-ring { animation: mgRingBreathe 3.5s ease-in-out infinite; }
        .mg-r2 { animation-delay: 0.6s; }
        .mg-r3 { animation-delay: 1.2s; }

        /* Radar sweep rotation */
        @keyframes mgSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .mg-sweep { animation: mgSweep 4s linear infinite; }

        /* Bars grow in */
        @keyframes mgBarGrow {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        .mg-bar {
          transform-origin: left center;
          animation: mgBarGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (max-width: 1024px) {
          .sticky-visual { height: 300px; }
        }
        @media (max-width: 768px) {
          .sticky-visual { height: 240px; position: relative; top: 0; }
          .mg { width: 55%; height: 55%; }
        }

        .sticky-caption {
          position: absolute;
          left: var(--space-lg);
          right: var(--space-lg);
          bottom: var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
        }

        .sticky-caption span,
        .milestone-content h3 {
          font-family: var(--font-display);
        }

        .sticky-caption span {
          font-size: 44px;
          color: var(--accent-authority);
          opacity: 0.5;
          line-height: 1;
        }

        .milestone-content h3 {
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.1;
          margin: var(--space-md) 0;
        }

        .module-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        @media (max-width: 1024px) {
          .module-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .module-card {
          position: relative;
          padding: 0;
          overflow: hidden;
          transform-origin: center;
          transition:
            border-color var(--duration-default) ease,
            box-shadow var(--duration-default) ease,
            transform var(--duration-default) ease,
            background var(--duration-default) ease;
        }

        .module-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: var(--milestone-color);
          opacity: 0.85;
        }

        .module-card:hover,
        .module-card.expanded {
          background: color-mix(in srgb, var(--milestone-color) 8%, rgba(24,24,27,0.65));
          border-color: color-mix(in srgb, var(--milestone-color) 54%, var(--border-muted));
          box-shadow: 0 0 28px color-mix(in srgb, var(--milestone-color) 18%, transparent);
          transform: scale(1.02);
        }

        .module-card button {
          width: 100%;
          min-height: 72px;
          padding: var(--space-lg);
          padding-left: calc(var(--space-lg) + 3px);
          background: transparent;
          border: 0;
          cursor: pointer;
          color: var(--text-primary);
          font: inherit;
          font-weight: 700;
          line-height: 1.35;
          text-align: left;
        }

        @media (max-width: 768px) {
          .module-card button {
            min-height: 64px;
            padding: var(--space-md);
            padding-left: calc(var(--space-md) + 3px);
            font-size: 14px;
          }
        }

        .module-card button span {
          display: block;
        }

        .module-card p,
        .module-card li,
        .output {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.55;
        }

        .module-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows var(--duration-default) ease;
        }

        .module-card.expanded .module-body,
        .module-card:hover .module-body,
        .module-card:focus-within .module-body {
          grid-template-rows: 1fr;
        }

        .module-body-inner {
          min-height: 0;
          overflow: hidden;
          padding-inline: var(--space-lg);
          padding-left: calc(var(--space-lg) + 3px);
        }

        .module-card.expanded .module-body-inner,
        .module-card:hover .module-body-inner,
        .module-card:focus-within .module-body-inner {
          padding-bottom: var(--space-lg);
        }

        .module-card p {
          margin-top: 0;
        }

        .module-card ul {
          margin: var(--space-md) 0;
          padding-left: 0;
          list-style: none;
        }

        .module-card li {
          position: relative;
          padding-left: 18px;
          margin-top: 8px;
        }

        .module-card li::before {
          content: "->";
          position: absolute;
          left: 0;
          color: var(--accent-intelligence);
        }

        .output,
        .next-flow {
          border-top: 1px solid var(--border-muted);
          padding-top: var(--space-md);
        }

        .next-flow {
          margin-top: var(--space-xl);
          color: var(--accent-authority);
          font-weight: 600;
        }

        .surface-tabs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }

        .surface-tabs button {
          border-radius: var(--radius-md);
          padding: var(--space-md);
          text-align: left;
          color: var(--text-primary);
          font-weight: 700;
        }

        .surface-tabs button span {
          display: block;
          margin-top: 4px;
          color: var(--text-disabled);
          font-size: 12px;
          font-weight: 500;
        }

        .surface-tabs button.active {
          border-color: var(--surface-color);
          box-shadow: 0 0 24px color-mix(in srgb, var(--surface-color) 24%, transparent);
        }

        .surface-card {
          padding: var(--space-xl);
          border-color: color-mix(in srgb, var(--surface-color) 36%, var(--border-muted));
        }

        .surface-card h3 {
          font-family: var(--font-display);
          font-size: 36px;
          margin-top: var(--space-sm);
        }

        .surface-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        @media (max-width: 1024px) {
          .surface-flow {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .surface-flow {
            grid-template-columns: 1fr;
          }
        }

        .surface-step {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .surface-step span {
          color: var(--surface-color);
          font-weight: 800;
        }

        .surface-step p {
          color: var(--text-secondary);
          margin-top: var(--space-sm);
          font-size: 14px;
        }

        .sankey-card {
          padding: var(--space-xl);
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: var(--space-sm);
        }

        @media (max-width: 1024px) {
          .sankey-card {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sankey-card {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-xs);
            padding: var(--space-lg);
          }
        }

        .sankey-step {
          position: relative;
          min-height: 150px;
          border: 1.5px solid color-mix(in srgb, var(--node-color) 34%, var(--border-muted));
          border-radius: var(--radius-md);
          padding: var(--space-md);
          background:
            linear-gradient(135deg,
              color-mix(in srgb, var(--node-color) 8%, rgba(24,24,27,0.4)),
              color-mix(in srgb, var(--node-color) 4%, rgba(24,24,27,0.6))),
            rgba(255,255,255,0.015);
          box-shadow:
            0 0 1px color-mix(in srgb, var(--node-color) 16%, transparent),
            inset 0 1px 2px color-mix(in srgb, var(--node-color) 12%, rgba(255,255,255,0.1));
          transition: all var(--duration-default) ease;
        }

        .sankey-step:hover {
          border-color: color-mix(in srgb, var(--node-color) 56%, var(--border-muted));
          box-shadow:
            0 0 12px color-mix(in srgb, var(--node-color) 24%, transparent),
            inset 0 1px 2px color-mix(in srgb, var(--node-color) 12%, rgba(255,255,255,0.1));
          transform: translateY(-2px);
        }

        .sankey-step span {
          color: var(--node-color);
          font-weight: 800;
          font-size: 20px;
          text-shadow: 0 0 8px color-mix(in srgb, var(--node-color) 28%, transparent);
        }

        .sankey-step strong {
          display: block;
          margin-top: var(--space-md);
          font-size: 14px;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .sankey-step {
            min-height: 120px;
            padding: var(--space-md);
          }

          .sankey-step span {
            font-size: 18px;
          }

          .sankey-step strong {
            font-size: 13px;
          }
        }

        @media (max-width: 768px) {
          .sankey-step {
            min-height: 100px;
            padding: var(--space-sm);
          }

          .sankey-step span {
            font-size: 16px;
          }

          .sankey-step strong {
            font-size: 12px;
            margin-top: 4px;
          }
        }

        .sankey-step i {
          position: absolute;
          top: 50%;
          right: -14px;
          width: 18px;
          height: 1px;
          background: var(--accent-intelligence);
          z-index: 2;
        }

        .architecture-cta {
          padding-top: 0;
        }

        .cta-card {
          text-align: center;
          max-width: 900px;
          margin-inline: auto;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: var(--space-md);
          flex-wrap: wrap;
          margin-top: var(--space-xl);
        }

        @media (max-width: 1024px) {
          .milestone-row {
            grid-template-columns: 1fr;
          }

          .sticky-visual {
            position: relative;
            top: 0;
          }

          .module-grid,
          .surface-flow {
            grid-template-columns: 1fr;
          }

          .surface-tabs,
          .sankey-card {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .surface-tabs,
          .sankey-card {
            grid-template-columns: 1fr;
          }


          .sankey-step {
            min-height: auto;
          }

          .sankey-step i {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
