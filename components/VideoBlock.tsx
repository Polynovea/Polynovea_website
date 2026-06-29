"use client";

import { useState } from "react";

export default function VideoBlock({ src, className }: { src: string; className: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        style={{
          width: "100%",
          padding: "2rem",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px",
          textAlign: "center",
          color: "var(--text-disabled)",
          fontSize: "0.8125rem",
          fontFamily: "var(--font-mono)",
        }}
      >
        Video could not be loaded. The format may not be supported by your browser.
      </div>
    );
  }

  return (
    <video
      src={src}
      controls
      preload="metadata"
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
