"use client";

import { useEffect, useRef } from "react";

/**
 * Adds `.in` to every element matching `selector` inside the ref
 * when it enters the viewport. Supplements CSS transitions on
 * `.reveal`, `.reveal-stagger`, `.story__scene`.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLElement>(
  selector = ".reveal, .reveal-stagger, .story__scene, [data-hl]"
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const scope = ref.current ?? document;
    const nodes = scope.querySelectorAll<HTMLElement>(selector);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [selector]);

  return ref;
}

/** Global, fire-once observer for app-wide reveal elements. */
export function useGlobalReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".reveal, .reveal-stagger, .story__scene"
    );
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}
