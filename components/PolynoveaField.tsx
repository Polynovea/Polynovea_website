"use client";

export default function PolynoveaField() {
  return (
    <div className="polynovea-field" aria-hidden="true">
      <div className="field-wash" />
      <svg
        className="field-map"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="field-violet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6D4AFF" stopOpacity="0.04" />
            <stop offset="0.55" stopColor="#8B6CFF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#5A3CB5" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="field-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E6D3A3" stopOpacity="0" />
            <stop offset="0.5" stopColor="#E6D3A3" stopOpacity="0.38" />
            <stop offset="1" stopColor="#E6D3A3" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="field-node-violet">
            <stop offset="0" stopColor="#A58BFF" stopOpacity="0.72" />
            <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="field-node-gold">
            <stop offset="0" stopColor="#F0DFB8" stopOpacity="0.92" />
            <stop offset="1" stopColor="#E6D3A3" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="field-geometry-a" fill="none" stroke="url(#field-violet)" strokeWidth="1.1" vectorEffect="non-scaling-stroke">
          <path d="M-120 760 C180 660 280 420 520 430 S870 640 1060 490 S1350 250 1740 340" />
          <path d="M180 1040 C330 820 560 810 690 650 S860 310 1130 300 S1430 470 1710 210" />
          <path d="M-100 180 C260 130 390 270 570 250 S900 40 1110 170 S1360 360 1710 110" />
        </g>

        <g className="field-geometry-b" fill="none" stroke="rgba(208, 200, 232, 0.09)" strokeWidth="0.75" vectorEffect="non-scaling-stroke">
          <path d="M300 760 C470 700 580 560 670 430" />
          <path d="M670 430 C770 360 880 350 1030 390" />
          <path d="M1030 390 C1160 430 1240 540 1360 560" />
          <path d="M670 430 C650 290 560 190 420 160" />
          <path d="M1030 390 C1080 270 1170 190 1320 150" />
        </g>

        <path
          className="field-evidence-path"
          d="M300 760 C470 700 580 560 670 430 C770 360 880 350 1030 390"
          fill="none"
          stroke="url(#field-gold)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />

        <g className="field-observations" fill="rgba(235, 232, 242, 0.42)">
          <circle cx="300" cy="760" r="3" />
          <circle cx="420" cy="160" r="2.2" />
          <circle cx="520" cy="430" r="2.4" />
          <circle cx="670" cy="430" r="3" />
          <circle cx="820" cy="350" r="2.1" />
          <circle cx="1030" cy="390" r="3" />
          <circle cx="1130" cy="300" r="2.2" />
          <circle cx="1320" cy="150" r="2.3" />
          <circle cx="1360" cy="560" r="2.5" />
        </g>

        <g className="field-state-nodes">
          <circle cx="670" cy="430" r="62" fill="url(#field-node-violet)" />
          <circle cx="1030" cy="390" r="48" fill="url(#field-node-violet)" />
        </g>

        <g className="field-evidence-nodes">
          <circle cx="670" cy="430" r="22" fill="url(#field-node-gold)" />
          <circle cx="1030" cy="390" r="15" fill="url(#field-node-gold)" />
        </g>
      </svg>
      <div className="field-vignette" />

      <style jsx>{`
        .polynovea-field {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background: #08080b;
        }

        .field-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 48% at 72% 28%, rgba(92, 63, 180, 0.10), transparent 68%),
            radial-gradient(ellipse 44% 40% at 24% 78%, rgba(230, 211, 163, 0.028), transparent 72%),
            linear-gradient(180deg, rgba(255,255,255,0.01), transparent 28%);
        }

        .field-map {
          position: absolute;
          inset: -4%;
          width: 108%;
          height: 108%;
          opacity: 0.84;
          transform: translate3d(0, 0, 0);
        }

        .field-evidence-path { opacity: 0.74; }
        .field-state-nodes { opacity: 0.40; }
        .field-evidence-nodes { opacity: 0.44; }

        .field-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 72% 66% at 50% 44%, transparent 40%, rgba(8, 8, 11, 0.24) 72%, rgba(8, 8, 11, 0.66) 100%),
            linear-gradient(180deg, rgba(8,8,11,0.05), rgba(8,8,11,0.28));
        }

        @media (prefers-reduced-motion: no-preference) and (min-width: 900px) {
          .field-map { animation: fieldDrift 36s ease-in-out infinite alternate; }
          .field-evidence-nodes {
            animation: evidenceBreathe 8s ease-in-out infinite;
            transform-origin: center;
          }
        }

        @keyframes fieldDrift {
          0% { transform: translate3d(-0.35%, 0.25%, 0) scale(1.006); }
          100% { transform: translate3d(0.45%, -0.35%, 0) scale(1.012); }
        }

        @keyframes evidenceBreathe {
          0%, 100% { opacity: 0.34; }
          50% { opacity: 0.50; }
        }

        @media (max-width: 899px) {
          .field-map {
            inset: -14%;
            width: 128%;
            height: 128%;
            opacity: 0.58;
          }
          .field-state-nodes, .field-evidence-nodes { opacity: 0.30; }
        }
      `}</style>
    </div>
  );
}
