"use client";

import { useEffect, useRef } from "react";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { CheckItem } from "@/components/ui/CheckItem";
import { Highlighter } from "@/components/ui/Highlighter";
import { Kicker } from "@/components/ui/Kicker";
import { whatIf } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

export function WhatIf() {
  const rootRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (kickerRef.current) {
        gsap.from(kickerRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: kickerRef.current, start: "top 85%" },
        });
      }

      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
        });
      }

    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="section" id="whatif" ref={rootRef}>
      <div className="container" style={{ maxWidth: 940, textAlign: "center" }}>
        <div ref={kickerRef} style={{ display: "flex", justifyContent: "center" }}>
          <Kicker>{whatIf.kicker}</Kicker>
        </div>
        <h2 ref={titleRef} className="t-h1" style={{ maxWidth: 900, margin: "0 auto", fontSize: "clamp(17.92px, 3.2vw, 40.96px)" }}>
          {whatIf.titlePre}{" "}
          <Highlighter variant="marker-yellow">{whatIf.titleHl}</Highlighter>
          {whatIf.titlePost}
        </h2>

        <AnimatedList
          delay={350}
          startDelay={200}
          retrigger
          style={{
            margin: "64px auto 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            textAlign: "left",
            maxWidth: 860,
          }}
        >
          {whatIf.bullets.map((b, i) => (
            <CheckItem key={i} variant={b.variant}>
              <p className="t-body-lg" style={{ color: "var(--ink-900)" }}>{b.text}</p>
            </CheckItem>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}
