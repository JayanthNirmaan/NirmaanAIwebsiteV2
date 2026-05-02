"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { trustLogos } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export function TrustLogos() {
  const isMobile = useIsMobile();
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
    <section className="section section--dark" style={{ padding: isMobile ? "48px 0" : "80px 0" }} ref={rootRef}>
      <div ref={headerRef} className="container" style={{ textAlign: "center", marginBottom: 32 }}>
        <div className="t-micro">{trustLogos.header}</div>
      </div>
      <Marquee>
        {trustLogos.logos.map((l) => (
          <span key={l.src} className="marquee__item">
            <Image
              src={l.src}
              alt={l.alt}
              width={160}
              height={60}
              style={{
                width: "auto",
                height: 48,
                objectFit: "contain",
              }}
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
