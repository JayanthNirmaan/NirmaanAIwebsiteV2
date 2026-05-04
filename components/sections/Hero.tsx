"use client";

import { useEffect, useRef } from "react";
import { FlowButton } from "@/components/ui/FlowButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { Highlighter } from "@/components/ui/Highlighter";
import { HoverSwapTag } from "@/components/ui/HoverSwapTag";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { BellCurve } from "@/components/illustrations/BellCurve";
import { SignatureWaves } from "@/components/illustrations/SignatureWaves";
import { useWaitlist } from "@/components/ui/WaitlistContext";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { hero } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

export function Hero() {
  const { open: openWaitlist } = useWaitlist();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (eyebrowRef.current) {
        tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0);
      }
      if (titleRef.current) {
        tl.from(
          titleRef.current.querySelectorAll(".hero-word"),
          { y: 60, opacity: 0, duration: 0.9, stagger: 0.09, rotateX: -20 },
          0.15
        );
      }
      if (subRef.current) {
        tl.from(subRef.current, { y: 24, opacity: 0, duration: 0.7 }, 0.6);
      }
      if (ctaRef.current) {
        tl.from(
          ctaRef.current.children,
          { y: 20, opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.12, ease: "back.out(1.6)" },
          0.8
        );
      }

      if (phoneRef.current) {
        tl.from(
          phoneRef.current,
          { y: 80, opacity: 0, scale: 0.9, duration: 1.1 },
          0.5
        );
        gsap.to(phoneRef.current, {
          y: -80,
          scrollTrigger: {
            trigger: phoneRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // Floating chips drift in then bob
      chipRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 20,
          scale: 0.8,
          delay: 1.1 + i * 0.12,
          duration: 0.7,
          ease: "back.out(1.8)",
        });
        gsap.to(el, {
          y: "+=10",
          duration: 3 + i * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.9 + i * 0.2,
        });
      });

      // Parallax background grid/bell on scroll
      if (sectionRef.current) {
        const bell = sectionRef.current.querySelector(".hero__bell");
        if (bell) {
          gsap.to(bell, {
            y: 120,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="hero" id="product" ref={sectionRef}>
      <InteractiveGrid cols={28} rows={14} colorful />
      <SignatureWaves />
      <div className="hero__grid" />

      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginLeft: "auto", marginRight: "auto", maxWidth: "none" }}>
        <div className="hero__inner" style={{ width: "100%", maxWidth: "none", boxSizing: "border-box" }}>
          <div ref={eyebrowRef} style={{ display: "inline-block", marginBottom: "20px" }}>
            <HoverSwapTag
              defaultText="Personalized 1:1 learning"
              hoverText="anytime, anywhere, at any level"
            />
          </div>

          <h1 ref={titleRef} className="hero__title t-display" style={{ fontSize: isMobile ? "clamp(32px, 9vw, 48px)" : "clamp(20px, 5vw, 58px)", whiteSpace: isMobile ? "normal" : "nowrap", fontWeight: 400, lineHeight: 1.12, marginTop: isMobile ? 12 : 25, letterSpacing: "-0.02em" }}>
            <span style={{ display: "block", whiteSpace: isMobile ? "normal" : "nowrap" }}>
              <span className="hero-word" style={{ display: "inline-block", fontWeight: 600 }}>An AI tutor</span>
              <span className="hero-word" style={{ display: "inline-block" }}>&nbsp;that actually teaches,</span>
            </span>
            <span style={{ display: "block", whiteSpace: isMobile ? "normal" : "nowrap" }}>
              <span className="hero-word" style={{ display: "inline-block" }}>just like a&nbsp;</span>
              <span className="hero-word em hero-human-teacher" style={{ display: "inline-block", fontWeight: 400, fontStyle: "italic", color: "var(--orange-500)" }}>
                <Highlighter variant="circle">human teacher.</Highlighter>
              </span>
            </span>
          </h1>

          <p className="hero__sub" ref={subRef} style={{ marginTop: isMobile ? 48 : 90, fontSize: isMobile ? "16px" : "clamp(10px, 1.35vw, 16px)", fontStyle: "italic", opacity: 0.85, textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>Finally, learning that feels personal.</p>

          <div className="hero__ctas" ref={ctaRef} style={{ marginTop: isMobile ? 28 : 25, display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 10 : 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <FlowButton variant="accent" onClick={openWaitlist}>{hero.ctaPrimary}</FlowButton>
            <FlowButton href="#demo" variant="light">{hero.ctaSecondary}</FlowButton>
          </div>

        </div>
      </div>

      <div className="scroll-indicator" style={{ position: "absolute", bottom: "5%", right: "5%", display: isMobile ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "2px", color: "var(--muted)" }}>
        <span style={{ fontFamily: "inherit", fontSize: "inherit", letterSpacing: "inherit" }}>SCROLL</span>
        <div className="scroll-arrow" style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--muted), transparent)", borderRadius: 1, position: "relative" }}>
          <div
            className="scroll-arrow__dot"
            style={{
              position: "absolute",
              top: 0,
              left: -2,
              width: 5,
              height: 12,
              background: "var(--orange-500)",
              borderRadius: 3,
              animation: "scrollArrowBounce 1.5s ease-in-out infinite"
            }}
          />
        </div>
        <style>{`
          @keyframes scrollArrowBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(28px); }
          }
        `}</style>
      </div>
    </section>
  );
}