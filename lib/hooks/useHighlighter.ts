"use client";

import { useEffect, useRef } from "react";

/** Adds `.is-on` to the .hl element when ≥50% of it is in view. One-shot. */
export function useHighlighter<T extends HTMLElement = HTMLSpanElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            target.classList.remove("is-on");
            void target.offsetWidth;
            target.classList.add("is-on");
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
