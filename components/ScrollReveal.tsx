"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Phones / touch devices get a dependency-free IntersectionObserver path.
// GSAP ScrollTrigger here is driven by Lenis's scroll event, which is
// unreliable on touch scrolling and was leaving reveal content permanently
// stuck at opacity:0. Desktop keeps the richer GSAP clip-path wipe.
const TOUCH_QUERY = "(max-width: 899px), (pointer: coarse)";

/**
 * Mobile reveal: toggle the existing `.is-revealed` CSS class as elements
 * enter the viewport. The clip-path headings need no handling here — their
 * hidden "from" state is only ever applied by the desktop GSAP timeline, so
 * on this path they're already visible.
 */
function initObserverReveals(): () => void {
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  const observed = new WeakSet<Element>();

  function observeNew(root: ParentNode) {
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (observed.has(el)) return;
      observed.add(el);
      io.observe(el);
    });
  }

  observeNew(document);

  // Watch for elements added after initial render (dynamic imports, data fetches).
  const mo = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const el = node as Element;
        if (el.matches("[data-reveal]")) {
          if (!observed.has(el)) { observed.add(el); io.observe(el); }
        }
        observeNew(el);
      });
    });
  });

  mo.observe(document.body, { childList: true, subtree: true });

  return () => { io.disconnect(); mo.disconnect(); };
}

/** Desktop reveal: GSAP batch fade-up + clip-path heading wipe (unchanged). */
async function initGsapReveals(): Promise<() => void> {
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  // Batch fade-up reveals
  ScrollTrigger.batch("[data-reveal]", {
    onEnter: (els) => {
      els.forEach((el) => {
        const delay = Number((el as HTMLElement).dataset.revealDelay ?? 0) / 1000;
        gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay, ease: "power2.out", overwrite: true });
      });
    },
    start: "top 88%",
    once: true,
  });

  // Clip-path wipe for all display headings inside sections
  document.querySelectorAll(".section .t-display-md, .section .t-display-lg, .section .t-display-xl").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0 102% 0 0)", opacity: 1 },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  });

  // Refresh ScrollTrigger to ensure correct layout calculations
  const refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);

  return () => {
    clearTimeout(refreshTimer);
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let disposed = false;

    if (window.matchMedia(TOUCH_QUERY).matches) {
      cleanup = initObserverReveals();
    } else {
      initGsapReveals().then((dispose) => {
        if (disposed) dispose();
        else cleanup = dispose;
      });
    }

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
