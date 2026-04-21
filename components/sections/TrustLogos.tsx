"use client";

import { useEffect, useRef } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { trustLogos } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

export function TrustLogos() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        });
      }

      // Fade + clip the whole section in
      if (rootRef.current) {
        gsap.from(rootRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 88%" },
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="section section--dark" style={{ padding: "80px 0" }} ref={rootRef}>
      <div ref={headerRef} className="container" style={{ textAlign: "center", marginBottom: 32 }}>
        <div className="t-micro">{trustLogos.header}</div>
      </div>
      <Marquee>
        {trustLogos.logos.map((l) => (
          <span key={l} className="marquee__item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path d="M12 2 L2 7 L12 12 L22 7 Z" />
              <path d="M2 17 L12 22 L22 17" />
              <path d="M2 12 L12 17 L22 12" />
            </svg>
            {l}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
