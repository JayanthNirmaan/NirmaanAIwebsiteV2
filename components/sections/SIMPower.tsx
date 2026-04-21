"use client";

import { useEffect, useRef } from "react";
import { FlowButton } from "@/components/ui/FlowButton";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { Kicker } from "@/components/ui/Kicker";
import { AnimatedBrain } from "@/components/illustrations/AnimatedBrain";
import { simPower } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

export function SIMPower() {
  const rootRef = useRef<HTMLElement | null>(null);
  const brainColRef = useRef<HTMLDivElement | null>(null);
  const copyColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      // Brain column slides in from right
      if (brainColRef.current) {
        gsap.from(brainColRef.current, {
          x: 60,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        });
      }

      // Copy column slides in from left
      if (copyColRef.current) {
        const kicker = copyColRef.current.querySelector(".kicker");
        const title = copyColRef.current.querySelector(".t-h1");
        const bullets = copyColRef.current.querySelectorAll(".sim-bullet");
        const btn = copyColRef.current.querySelector(".flow-btn");
        const closing = copyColRef.current.querySelector(".t-body.em");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
          defaults: { ease: "power3.out" },
        });

        if (kicker) tl.from(kicker, { x: -30, opacity: 0, duration: 0.6 }, 0);
        if (title) tl.from(title, { x: -40, opacity: 0, duration: 0.8 }, 0.15);
        if (bullets.length) tl.from(bullets, { x: -30, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.3);
        if (btn) tl.from(btn, { scale: 0.85, opacity: 0, duration: 0.6, ease: "back.out(1.6)" }, 0.65);
        if (closing) tl.from(closing, { opacity: 0, duration: 0.6 }, 0.8);
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="section section--dark" id="sim" ref={rootRef}>
      <InteractiveGrid cols={28} rows={10} style={{ opacity: 0.5 }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 64 }}>
          {/* Copy — left column */}
          <div ref={copyColRef}>
            <Kicker style={{ color: "var(--orange-500)", fontWeight: 700 }}>{simPower.kicker}</Kicker>
            <h2 className="t-h1" style={{ color: "#fff", fontSize: "clamp(28px, 4.4vw, 60px)" }}>
              {simPower.title.map((line, i) => (
                <span key={i} style={{ display: "block", color: i > 0 ? "var(--orange-500)" : undefined }}>{line}</span>
              ))}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "flex", flexDirection: "column", gap: 18 }}>
              {simPower.bullets.map((b, i) => (
                <li key={i} className="sim-bullet" style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    marginTop: 1,
                    borderRadius: "50%",
                    background: "rgba(255,90,31,0.15)",
                    border: "1.5px solid var(--orange-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" aria-hidden>
                      <path d="M1 3.5L4 6.5L10 1" stroke="#FF5A1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="t-body-lg" style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>{b.text}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 32 }}>
              <FlowButton variant="light" href="#demo">{simPower.cta}</FlowButton>
            </div>
            <p className="t-body em" style={{ marginTop: 32, color: "rgba(255,255,255,0.6)" }}>
              {simPower.closing}
            </p>
          </div>

          {/* Animated brain — right column */}
          <div ref={brainColRef} style={{ display: "grid", placeItems: "center", minHeight: 380 }}>
            <AnimatedBrain style={{ width: "100%", maxWidth: 420 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
