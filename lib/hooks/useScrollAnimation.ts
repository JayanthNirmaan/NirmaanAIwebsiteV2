"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

type Options = {
  /** Selector for elements to stagger-reveal inside the container. */
  childSelector?: string;
  /** Animate the container itself (wrapper title/panel). */
  animateSelf?: boolean;
  /** Trigger start position. */
  start?: string;
  /** Y offset for the reveal. */
  y?: number;
  /** Stagger time. */
  stagger?: number;
  /** Animate children from a slight scale too. */
  scale?: boolean;
};

/**
 * Drop-in scroll reveal: pass a ref onto any container and every direct child
 * (or matching selector) fades/slides in on scroll. Uses GSAP + ScrollTrigger.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  childSelector,
  animateSelf = false,
  start = "top 85%",
  y = 40,
  stagger = 0.12,
  scale = false,
}: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = childSelector
        ? el.querySelectorAll(childSelector)
        : el.children;

      if (animateSelf) {
        gsap.from(el, {
          y,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start },
        });
      }

      if (targets && (targets as ArrayLike<Element>).length) {
        gsap.from(targets as ArrayLike<Element>, {
          y,
          opacity: 0,
          scale: scale ? 0.95 : 1,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start },
        });
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [childSelector, animateSelf, start, y, stagger, scale]);

  return ref;
}

/**
 * Animate a section's header bits + any direct children ("cards") on scroll.
 * Used for most grid/card sections.
 */
export function useSectionReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const head = el.querySelector(".section-head, .t-h1, .t-h2, .t-display");
      const kicker = el.querySelector(".kicker");
      const meta = el.querySelector(".section-head__meta, .section-head__rule");
      const cards = el.querySelectorAll(
        ".card, .quote, .blog-card, .stat-tile"
      );
      const buttons = el.querySelectorAll(
        ".flow-btn, .ghost-btn, button[type='submit']"
      );
      const bodies = el.querySelectorAll(
        "p.t-body, p.t-body-lg, p.t-small"
      );

      if (kicker) {
        gsap.from(kicker, {
          y: 14,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      }
      if (head) {
        gsap.from(head, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      }
      if (meta) {
        gsap.from(meta, {
          opacity: 0,
          x: 20,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      }
      if (bodies.length) {
        gsap.from(bodies, {
          y: 18,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      }
      if (cards.length) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%" },
        });
      }
      if (buttons.length) {
        gsap.from(buttons, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 78%" },
        });
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return ref;
}
