"use client";

import { cn } from "@/lib/utils";

export interface BentoItem {
  num: string;
  tag: string;
  title: string;
  desc: string;
  colSpan?: 1 | 2 | 3;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.tag}
          className={cn(
            "glass-card group relative flex flex-col gap-4 overflow-hidden",
            "transition-all duration-300 will-change-transform",
            item.colSpan === 2 && "md:col-span-2",
            item.colSpan === 3 && "md:col-span-3",
          )}
          style={{ padding: "var(--space-xl)", minHeight: item.colSpan === 3 ? "200px" : "300px" }}
        >
          {/* Module tag */}
          <div className="relative z-10 flex items-center justify-between">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "var(--accent-authority-muted)",
              }}
            >
              {item.tag}
            </span>
          </div>

          {/* Ghost number watermark */}
          <div
            className="relative z-10"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: item.colSpan === 3 ? "96px" : "80px",
              fontWeight: 800,
              lineHeight: 0.8,
              letterSpacing: "-0.05em",
              color: "rgba(255, 255, 255, 0.05)",
              userSelect: "none" as const,
            }}
          >
            {item.num}
          </div>

          {/* Content — row layout for full-width card */}
          {item.colSpan === 3 ? (
            <div
              className="relative z-10 grid items-start gap-12"
              style={{ gridTemplateColumns: "clamp(200px, 28%, 300px) 1fr" }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col gap-3 flex-1">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          )}

          {/* Radial dot grid overlay (from 21st.dev pattern) */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />

          {/* Glow orb — bottom-right */}
          <div
            className="absolute pointer-events-none rounded-full transition-opacity duration-300 opacity-[0.07] group-hover:opacity-[0.15]"
            style={{
              bottom: "-100px",
              right: "-100px",
              width: "280px",
              height: "280px",
              background:
                "radial-gradient(circle, var(--accent-intelligence) 0%, var(--accent-authority) 60%, transparent 100%)",
              filter: "blur(70px)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
