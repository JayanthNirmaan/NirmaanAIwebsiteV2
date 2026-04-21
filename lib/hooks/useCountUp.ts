"use client";

import { useEffect, useRef } from "react";

/**
 * Counts from 0 to `target` when the element enters the viewport.
 * Uses GSAP-style easing (out-cubic) with RAF. One-shot.
 */
export function useCountUp(target: number, opts?: { duration?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const duration = opts?.duration ?? 1400;
  const suffix = opts?.suffix ?? "";
  const prefix = opts?.prefix ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isFloat = target % 1 !== 0;
    const fmt = (v: number) => {
      if (isFloat) return v.toFixed(1);
      if (target >= 1000) return Math.round(v).toLocaleString();
      return Math.round(v).toString();
    };

    el.textContent = `${prefix}${fmt(0)}${suffix}`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = `${prefix}${fmt(eased * target)}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = `${prefix}${fmt(target)}${suffix}`;
          };
          requestAnimationFrame(tick);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, suffix, prefix]);

  return ref;
}
