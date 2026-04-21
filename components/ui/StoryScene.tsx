"use client";

import React, { useEffect, useRef } from "react";

export function StoryScene({
  tag,
  children,
  scrollHint,
  last = false,
}: {
  tag?: string;
  children: React.ReactNode;
  scrollHint?: string;
  last?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="story__scene">
      <div className="story__scene-inner">
        {tag ? <div className="story__tag">{tag}</div> : null}
        {children}
      </div>
      {scrollHint && !last ? (
        <div className="story__scroll-hint">
          <span>{scrollHint}</span>
          <span aria-hidden>&darr;</span>
        </div>
      ) : null}
    </div>
  );
}
