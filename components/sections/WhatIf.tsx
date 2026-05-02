"use client";

import { useEffect, useRef } from "react";
import { Highlighter } from "@/components/ui/Highlighter";
import { whatIf } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

// Icon per bullet — simple SVG outlines tinted by variant color
const icons = [
  // Gap / target icon
  (color: string) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
    </svg>
  ),
  // Clock / anytime icon
  (color: string) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 16 14" />
    </svg>
  ),
  // Chat / visual explain icon
  (color: string) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="13" x2="13" y2="13" />
    </svg>
  ),
  // Tag / cost icon
  (color: string) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
];

const variantColor: Record<string, string> = {
  orange: "var(--orange-500)",
  sky: "var(--sky-500)",
  violet: "var(--violet-500)",
  mint: "var(--mint-500)",
};

const variantBg: Record<string, string> = {
  orange: "var(--orange-50)",
  sky: "var(--sky-50)",
  violet: "var(--violet-50)",
  mint: "var(--mint-50)",
};

// The colored keyword to highlight in each bullet
const highlights = [
  "where your gaps are",
  "until you truly understand",
  "tailored to how you understand best",
  "far less than a traditional tutor",
];

function highlightBullet(text: string, phrase: string, color: string) {
  const idx = text.indexOf(phrase);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color, fontWeight: 600 }}>{phrase}</span>
      {text.slice(idx + phrase.length)}
    </>
  );
}

export function WhatIf() {
  const isMobile = useIsMobile();
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 32,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 84%" },
        });
      }

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];

        // On mobile, show cards immediately — animation fires when scrolled in
        if (isMobile) {
          gsap.set(cards, { clearProps: "all" });
        } else {
          gsap.set(cards, { y: 48, opacity: 0, scale: 0.88, transformOrigin: "center bottom" });
        }

        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 82%",
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.65,
              ease: "back.out(1.4)",
              stagger: 0.1,
            });
          },
          ...(!isMobile && {
            onLeave: () => {
              gsap.to(cards, {
                scale: 0.92,
                opacity: 0,
                duration: 0.45,
                ease: "power2.in",
                stagger: 0.06,
              });
            },
            onEnterBack: () => {
              gsap.to(cards, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.55,
                ease: "power3.out",
                stagger: 0.08,
              });
            },
            onLeaveBack: () => {
              gsap.to(cards, {
                y: 48,
                opacity: 0,
                scale: 0.88,
                duration: 0.4,
                ease: "power2.in",
                stagger: 0.06,
              });
            },
          }),
        });
      }
    }, rootRef);

    return () => { ctx.revert(); };
  }, [isMobile]);

  return (
    <section
      className="section"
      id="whatif"
      ref={rootRef}
      style={{ background: "var(--ink-50)" }}
    >
      <div style={{ width: "100%", padding: isMobile ? "20px 20px" : "20px 5%" }}>
        {/* Heading */}
        <h2
          ref={titleRef}
          className="t-h1"
          style={{
            width: "100%",
            marginBottom: isMobile ? 32 : 56,
            lineHeight: 1.18,
            textAlign: "center",
            fontSize: "inherit",
            padding: isMobile ? "0 10px" : undefined,
          }}
        >
          <span style={{ fontSize: isMobile ? "20px" : "clamp(18px, 3.8vw, 50px)", display: "block" }}>
            {whatIf.titlePre}{" "}
            <Highlighter variant="marker-yellow">{whatIf.titleHl}</Highlighter>
          </span>
          <span style={{ fontSize: "clamp(14px, 2.4vw, 30px)", display: "block" }}>
            {whatIf.titlePost.trimStart()}
          </span>
        </h2>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {whatIf.bullets.map((b, i) => {
            const color = variantColor[b.variant] ?? variantColor.orange;
            const bg = variantBg[b.variant] ?? variantBg.orange;
            const IconFn = icons[i % icons.length];
            return (
              <div
                key={i}
                style={{
                  background: "var(--white)",
                  borderRadius: 24,
                  padding: "10px",
                  boxShadow: "0 2px 4px rgba(16, 16, 18, .10), 0 0 0 1px rgba(16, 16, 18, .08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  position: "relative",
                  minHeight: isMobile ? 140 : 200,
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px -8px rgba(255, 90, 31, 0.28), 0 0 0 1px rgba(255, 90, 31, 0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 4px rgba(16, 16, 18, .10), 0 0 0 1px rgba(16, 16, 18, .08)";
                }}
              >
                {/* Icon badge */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {IconFn(color)}
                </div>

                {/* Body text */}
                <p
                  className="t-body-lg"
                  style={{ color: "var(--ink-800)", lineHeight: 1.5, margin: 0, flex: 1, fontSize: "clamp(16px, 1.2vw, 20px)" }}
                >
                  {highlightBullet(b.text, highlights[i] ?? "", color)}
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
