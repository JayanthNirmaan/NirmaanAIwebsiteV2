"use client";

import { useEffect, useRef } from "react";
import { FlowButton } from "@/components/ui/FlowButton";
import { StoryBgCurve } from "@/components/illustrations/StoryBgCurve";
import { useWaitlist } from "@/components/ui/WaitlistContext";
import { closingCTA } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

function em(html: string) {
  const parts = html.split(/(<em>[^<]+<\/em>)/g);
  return parts.map((p, i) => {
    const m = p.match(/^<em>([^<]+)<\/em>$/);
    if (m) return <span key={i} className="em">{m[1]}</span>;
    return <span key={i}>{p}</span>;
  });
}

export function ClosingCTA() {
  const { open: openWaitlist } = useWaitlist();
  const rootRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (!rootRef.current || !innerRef.current) return;

      const tag = innerRef.current.querySelector(".story__tag");
      const lines = innerRef.current.querySelectorAll(".manifesto-line");
      const title = innerRef.current.querySelector(".t-display");
      const btns = innerRef.current.querySelectorAll(".flow-btn");
      const backBtn = innerRef.current.querySelector("button.t-micro");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        defaults: { ease: "power3.out" },
      });

      if (tag) tl.from(tag, { y: 20, opacity: 0, duration: 0.6 }, 0);
      if (lines.length) tl.from(lines, { y: 36, opacity: 0, duration: 0.8, stagger: 0.15 }, 0.15);
      if (title) tl.from(title, { y: 50, opacity: 0, scale: 0.95, duration: 1 }, 0.5);
      if (btns.length) tl.from(btns, { scale: 0.85, opacity: 0, duration: 0.6, stagger: 0.12, ease: "back.out(1.6)" }, 0.9);
      if (backBtn) tl.from(backBtn, { opacity: 0, duration: 0.5 }, 1.2);

      // Subtle background parallax
      const bg = rootRef.current.querySelector(".story-bg");
      if (bg) {
        gsap.to(bg, {
          y: -80,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="story" id="book" ref={rootRef}>
      <StoryBgCurve />
      <div className="story__scene" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div ref={innerRef} className="story__scene-inner in">

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            {closingCTA.manifesto.map((line, i) => (
              <p
                key={i}
                className="manifesto-line t-body-lg"
                style={{ color: "rgba(255,255,255,0.85)", fontSize: 18 }}
              >
                {em(line)}
              </p>
            ))}
          </div>
          <h2 className="t-display" style={{ color: "#fff", fontSize: "clamp(20px, 5vw, 60px)" }}>{closingCTA.title}</h2>
          <div style={{ marginTop: 48, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <FlowButton variant="accent" onClick={openWaitlist}>{closingCTA.ctaPrimary}</FlowButton>
            <FlowButton variant="light" href="#contact">{closingCTA.ctaSecondary}</FlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
