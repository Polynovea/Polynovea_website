"use client";

import { useState } from "react";

const musicProjects = [
  {
    id: "I8ZQCN9EslU",
    title: "Lately",
    desc: "Our debut release. The first piece of original IP from Polynovea.",
    cta: "Watch on YouTube",
    href: "https://youtu.be/I8ZQCN9EslU",
  },
  {
    id: "VqiJCgQTJ0g",
    title: "Lately — Remake",
    desc: "A reimagined version. Same foundation, different resolution.",
    cta: "Watch on YouTube",
    href: "https://youtu.be/VqiJCgQTJ0g",
  },
  {
    id: "IIvCau8-tBw",
    title: "Sangharsh",
    desc: "Our upcoming album. A body of work in active production — releasing progressively.",
    cta: "Watch Teaser",
    href: "https://youtu.be/IIvCau8-tBw",
  },
];

function VideoCard({
  id,
  title,
  desc,
  cta,
  href,
}: {
  id: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="project-card music-card">
      <div className="video-embed">
        {!loaded ? (
          <button className="video-thumb" onClick={() => setLoaded(true)} aria-label={`Play ${title}`}>
            <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={title} loading="lazy" />
            <div className="play-btn">▶</div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div className="music-card-body">
        <div className="music-card-title">{title}</div>
        <p className="t-body-sm">{desc}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          {cta} →
        </a>
      </div>

      <style jsx>{`
        .music-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .video-embed {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          overflow: hidden;
        }
        .video-embed iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }
        .video-thumb {
          position: relative;
          width: 100%;
          height: 100%;
          border: 0;
          padding: 0;
          cursor: pointer;
          background: #000;
        }
        .video-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          transition: opacity var(--duration-default) ease, transform var(--duration-slow) var(--ease-3d);
        }
        .video-thumb:hover img {
          opacity: 1;
          transform: scale(1.04);
        }
        .play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #fff;
          background: rgba(124, 58, 237, 0.85);
          box-shadow: 0 0 28px rgba(124, 58, 237, 0.5);
          pointer-events: none;
        }
        .music-card-body {
          padding: var(--space-md) var(--space-lg) var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          align-items: flex-start;
        }
        .music-card-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}

export default function MusicPane() {
  return (
    <section className="section pane-section">
      <div className="container">
        <div className="music-header">
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            Output
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            Original IP, In the Open
          </h2>
        </div>
        <div className="music-grid">
          {musicProjects.map((p) => (
            <VideoCard key={p.id} {...p} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .music-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        .music-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          max-width: 1080px;
          margin-inline: auto;
        }
        @media (max-width: 1024px) {
          .music-grid { grid-template-columns: 1fr; max-width: 460px; }
        }
      `}</style>
    </section>
  );
}
