"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_BASE || "https://admin.polynovea.in/api/content";

type PortfolioStatusType = "active" | "progress" | "planned";

interface LiveEvent {
  id: string;
  title: string;
  date: string;
  dateLabel: string | null;
  time: string;
  venue: string;
  city: string;
  capacity: string;
  status: string;
  statusType: PortfolioStatusType;
  desc: string;
  cta: string;
  href: string;
  youtubeUrl?: string;
  youtubeEmbedUrl?: string | null;
}

interface CmsLiveEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  capacity: string;
  status: string;
  statusType?: "upcoming" | "completed" | PortfolioStatusType;
  description?: string;
  cta?: string;
  href?: string;
  youtubeUrl?: string;
}

interface VenuePartnership {
  id: string;
  name: string;
  city: string;
  capacity: string;
  type: string;
  desc: string;
  contactStatus: string;
  statusType: PortfolioStatusType;
  logo: string;
}

interface CmsVenuePartnership {
  id: string;
  name: string;
  city: string;
  capacity: string;
  type: string;
  description?: string;
  contactStatus?: string;
  statusType?: "upcoming" | "completed" | PortfolioStatusType;
  logo?: string;
  logo_url?: string;
}

interface Metric {
  id: string;
  label: string;
  value: string;
  period: string;
  trend: string;
  trendDirection: "up" | "down";
}

interface EventCardProps {
  event: LiveEvent;
  delay: number;
}

interface VenueCardProps {
  venue: VenuePartnership;
  delay: number;
}

interface MetricCardProps {
  metric: Metric;
  delay: number;
}



function formatEventDate(date: string) {
  if (!date) return null;
  const formatted = new Date(`${date}T00:00:00`);
  if (Number.isNaN(formatted.getTime())) return null;
  const month = formatted.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(formatted.getDate()).padStart(2, "0");
  return `${month} ${day}`;
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.pathname.startsWith("/embed/")) {
        const videoId = parsed.pathname.split("/embed/")[1]?.split("/")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function normalizeStatusType(statusType?: string): PortfolioStatusType {
  if (statusType === "completed") return "active";
  if (statusType === "upcoming") return "planned";
  if (statusType === "active" || statusType === "progress" || statusType === "planned") return statusType;
  return "planned";
}

function normalizeEvent(event: CmsLiveEvent): LiveEvent {
  const youtubeEmbedUrl = getYouTubeEmbedUrl(event.youtubeUrl);
  const fallbackHref = event.href ?? event.youtubeUrl ?? "#";

  return {
    id: event.id,
    title: event.title,
    date: event.date,
    dateLabel: formatEventDate(event.date),
    time: event.time,
    venue: event.venue,
    city: event.city,
    capacity: event.capacity,
    status: event.status,
    statusType: normalizeStatusType(event.statusType),
    desc: event.description ?? "",
    cta: event.cta ?? "Learn More",
    href: fallbackHref,
    youtubeUrl: event.youtubeUrl,
    youtubeEmbedUrl,
  };
}

function normalizeVenue(venue: CmsVenuePartnership): VenuePartnership {
  return {
    id: venue.id,
    name: venue.name,
    city: venue.city,
    capacity: venue.capacity,
    type: venue.type,
    desc: venue.description ?? "",
    contactStatus: venue.contactStatus ?? "",
    statusType: normalizeStatusType(venue.statusType),
    logo: venue.logo_url ?? venue.logo ?? "",
  };
}

function EventCard({ event, delay }: EventCardProps) {
  return (
    <article className="event-card card" data-reveal="true" data-reveal-delay={String(delay)}>
      <div className="event-header">
        {event.dateLabel ? <span className="date-badge">{event.dateLabel}</span> : <span className="date-badge date-badge-muted">Past Show</span>}
      </div>
      <h3>{event.title}</h3>
      <div className="event-meta">
        <span>{event.venue}</span>
        <span>{event.city}</span>
        {event.capacity ? <span>Capacity: {event.capacity}</span> : null}
        {event.time ? <span>{event.time}</span> : null}
      </div>
      <p>{event.desc}</p>
      {event.youtubeEmbedUrl ? (
        <div className="event-video">
          <iframe
            src={event.youtubeEmbedUrl}
            title={`${event.title} video`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : null}
      {event.href !== "#" ? (
        <a href={event.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          {event.cta}
        </a>
      ) : null}

      <style jsx>{`
        .event-card {
          --badge-active-bg: rgba(34, 197, 94, 0.12);
          --badge-active-color: #4ade80;
          --badge-progress-bg: rgba(124, 58, 237, 0.15);
          --badge-progress-color: #a78bfa;
          --badge-planned-bg: rgba(230, 211, 163, 0.1);
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
        }

        .event-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-md);
        }

        .date-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-sm) var(--space-md);
          background: var(--accent-intelligence);
          color: var(--text-primary);
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .date-badge-muted {
          background: rgba(230, 211, 163, 0.1);
          color: var(--accent-authority);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-pill);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          flex-shrink: 0;
        }

        .badge-active {
          background: var(--badge-active-bg);
          color: var(--badge-active-color);
        }

        .badge-active .status-dot {
          background: var(--badge-active-color);
        }

        .badge-progress {
          background: var(--badge-progress-bg);
          color: var(--badge-progress-color);
        }

        .badge-progress .status-dot {
          background: var(--badge-progress-color);
        }

        .badge-planned {
          background: var(--badge-planned-bg);
          color: var(--accent-authority);
        }

        .badge-planned .status-dot {
          background: var(--accent-authority);
        }

        h3 {
          margin: 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          line-height: 1.15;
        }

        .event-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm) var(--space-md);
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.5;
        }

        p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
        }

        .event-video {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid var(--border-muted);
          background: rgba(255, 255, 255, 0.02);
        }

        .event-video iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }

        @media (max-width: 600px) {
          .event-card {
            padding: var(--space-lg);
          }

          .event-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </article>
  );
}

function VenueCard({ venue, delay }: VenueCardProps) {
  return (
    <article className="venue-card card" data-reveal="true" data-reveal-delay={String(delay)}>
      <div className="venue-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={venue.logo} alt={venue.name} loading="lazy" />
      </div>
      <div className="venue-body">
        <div className="venue-top">
          <span className="type-badge">{venue.type}</span>
        </div>
        <h3>{venue.name}</h3>
        <div className="venue-meta">
          {venue.city} • Capacity: {venue.capacity}
        </div>
        <p>{venue.desc}</p>
        <a href="mailto:bookings@polynovea.com?subject=Venue%20Partnership%20Inquiry" className="btn btn-secondary">
          Contact Venue
        </a>
      </div>

      <style jsx>{`
        .venue-card {
          --badge-active-bg: rgba(34, 197, 94, 0.12);
          --badge-active-color: #4ade80;
          --badge-progress-bg: rgba(124, 58, 237, 0.15);
          --badge-progress-color: #a78bfa;
          --badge-planned-bg: rgba(230, 211, 163, 0.1);
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
        }

        .venue-image-wrap {
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-bottom: 1px solid var(--border-muted);
          background: var(--bg-secondary);
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .venue-body {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .venue-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-md);
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          padding: var(--space-xs) var(--space-sm);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-pill);
          color: var(--accent-authority);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-pill);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          flex-shrink: 0;
        }

        .badge-active {
          background: var(--badge-active-bg);
          color: var(--badge-active-color);
        }

        .badge-active .status-dot {
          background: var(--badge-active-color);
        }

        .badge-progress {
          background: var(--badge-progress-bg);
          color: var(--badge-progress-color);
        }

        .badge-progress .status-dot {
          background: var(--badge-progress-color);
        }

        .badge-planned {
          background: var(--badge-planned-bg);
          color: var(--accent-authority);
        }

        .badge-planned .status-dot {
          background: var(--accent-authority);
        }

        h3 {
          margin: 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          line-height: 1.15;
        }

        .venue-meta {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.5;
        }

        p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
        }

        @media (max-width: 600px) {
          .venue-body {
            padding: var(--space-lg);
          }

          .venue-top {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </article>
  );
}

export default function LivePortfolioExpanded() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [pastShows, setPastShows] = useState<LiveEvent[]>([]);
  const [venuePartnerships, setVenuePartnerships] = useState<VenuePartnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, showsRes, venuesRes] = await Promise.all([
          fetch(`${API_BASE}/live-events`),
          fetch(`${API_BASE}/past-shows`),
          fetch(`${API_BASE}/venue-partnerships`),
        ]);

        if (!eventsRes.ok || !showsRes.ok || !venuesRes.ok) {
          throw new Error("Failed to fetch portfolio data");
        }

        const eventsData = await eventsRes.json();
        const showsData = await showsRes.json();
        const venuesData = await venuesRes.json();

        setLiveEvents(((eventsData.data || []) as CmsLiveEvent[]).map(normalizeEvent));
        setPastShows(((showsData.data || []) as CmsLiveEvent[]).map(normalizeEvent));
        setVenuePartnerships(((venuesData.data || []) as CmsVenuePartnership[]).map(normalizeVenue));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;

    const root = sectionRef.current;
    if (!root) return;

    const revealEls = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (revealEls.length === 0) return;

    requestAnimationFrame(() => {
      revealEls.forEach((el) => {
        if (el.classList.contains("is-revealed")) return;
        el.classList.add("is-revealed");
      });
    });
  }, [loading, liveEvents, pastShows, venuePartnerships]);

  return (
    <section ref={sectionRef} className="section live-portfolio-expanded">
      <div className="container">
        <div className="hero-section" data-reveal="true">
          <div className="hero-copy">
            <span className="hero-label">Live Portfolio</span>
            <h1>
              Live events, real venues, and <span className="gradient-text">intelligence</span> in motion.
            </h1>
            <p>Book Polynovea for your venue. Real-time data driving real engagement.</p>
          </div>
          <div className="hero-actions">
            <Link href="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="block-header" data-reveal="true" data-reveal-delay="40">
          <span className="block-label">Upcoming Events</span>
        </div>
        <div className="events-grid">
          {liveEvents.length > 0 ? (
            liveEvents.map((event, index) => (
              <EventCard key={event.id} event={event} delay={index * 80} />
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>
              Check back soon for upcoming event announcements.
            </p>
          )}
        </div>

        <div className="block-header section-spacer" data-reveal="true" data-reveal-delay="40">
          <span className="block-label">Past Shows</span>
        </div>
        <div className="events-grid">
          {pastShows.length > 0 ? (
            pastShows.map((event, index) => (
              <EventCard key={event.id} event={event} delay={index * 80} />
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>
              Coming soon. Archive of past performances will be displayed here.
            </p>
          )}
        </div>

        <div id="partnership" className="block-header section-spacer" data-reveal="true" data-reveal-delay="40">
          <span className="block-label">Venue Partnerships</span>
        </div>
        <div className="venues-grid">
          {venuePartnerships.length > 0 ? (
            venuePartnerships.map((venue, index) => (
              <VenueCard key={venue.id} venue={venue} delay={index * 80} />
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>
              Partnership opportunities coming soon. Contact us for inquiries.
            </p>
          )}
        </div>

        <div className="block-header section-spacer" data-reveal="true" data-reveal-delay="40">
          <span className="block-label">Ready to Book?</span>
        </div>
        <div className="booking-cta card" data-reveal="true" data-reveal-delay="80">
          <h2>Get Polynovea for your event.</h2>
          <p>
            Whether it&apos;s a 100-person intimate show or a 5000-person festival, we bring the music and the
            intelligence. Contact us for inquiries, bookings, and collaborations.
          </p>
          <div className="booking-actions">
            <a
              href="mailto:bookings@polynovea.com?subject=Event%20Booking%20Inquiry"
              className="btn btn-secondary"
            >
              Book Now
            </a>
            <Link href="/live-portfolio#partnership" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .live-portfolio-expanded {
          --booking-bg-start: rgba(124, 58, 237, 0.12);
          --booking-bg-end: rgba(230, 211, 163, 0.08);
          background: rgba(9, 8, 16, 0.62); /* veil over the global neural scene */
        }

        .hero-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: var(--space-2xl);
          align-items: end;
          margin-bottom: var(--space-4xl);
        }

        .hero-copy {
          max-width: 44rem;
        }

        .hero-label {
          display: inline-block;
          color: var(--accent-authority-muted);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        h1 {
          margin: var(--space-md) 0 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(34px, 5vw, 64px);
          line-height: 1.04;
        }

        .hero-copy p {
          margin: var(--space-md) 0 0;
          max-width: 44rem;
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.65;
        }

        .hero-actions {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }

        .block-header {
          margin-bottom: var(--space-xl);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--border-muted);
        }

        .section-spacer {
          margin-top: var(--space-4xl);
        }

        .block-label {
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .events-grid,
        .venues-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-lg);
          align-items: start;
        }

        .booking-cta {
          padding: var(--space-3xl) var(--space-xl);
          background: linear-gradient(135deg, var(--booking-bg-start), var(--booking-bg-end));
          border: 1px solid var(--border-muted);
        }

        .booking-cta h2 {
          margin: 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.08;
        }

        .booking-cta p {
          margin: var(--space-md) 0 0;
          max-width: 48rem;
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.65;
        }

        .booking-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        @media (max-width: 1200px) {
          .events-grid,
          .venues-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
            align-items: flex-start;
          }

          .hero-actions {
            justify-content: flex-start;
          }

          .events-grid,
          .venues-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .events-grid,
          .venues-grid {
            grid-template-columns: 1fr;
          }

          .booking-cta {
            padding: var(--space-xl);
          }

          .booking-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
