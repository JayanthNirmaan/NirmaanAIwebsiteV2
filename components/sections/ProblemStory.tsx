"use client";

import { useEffect, useRef } from "react";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { problemScenes } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

const SCENE_ILLUSTRATIONS = [
  () => (
    <svg viewBox="0 0 420 320" fill="none" aria-hidden className="pstory__illustration">
      <rect x="40" y="40" width="340" height="200" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      {[80, 112, 144, 176, 208].map((y) => (
        <line key={y} x1="70" y1={y} x2="350" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      <text x="100" y="105" fill="rgba(255,255,255,0.55)" fontSize="13" fontFamily="monospace">f(x) = ax² + bx + c</text>
      <text x="120" y="140" fill="rgba(255,255,255,0.35)" fontSize="11" fontFamily="monospace">Δ = b² − 4ac</text>
      <circle cx="370" cy="160" r="18" fill="rgba(255,90,31,0.25)" stroke="rgba(255,90,31,0.5)" strokeWidth="1.5" />
      <line x1="370" y1="178" x2="370" y2="218" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <line x1="370" y1="190" x2="350" y2="205" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <line x1="370" y1="218" x2="358" y2="245" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <line x1="370" y1="218" x2="382" y2="245" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      {[80, 120, 160, 200, 240, 280, 320].map((x) => (
        <g key={x}>
          <circle cx={x} cy="270" r="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <rect x={x - 12} y="282" width="24" height="14" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        </g>
      ))}
      <path d="M210 240 L210 256" stroke="rgba(255,90,31,0.4)" strokeWidth="1.5" markerEnd="url(#arr1)" />
      <defs>
        <marker id="arr1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,90,31,0.6)" />
        </marker>
      </defs>
    </svg>
  ),
  () => (
    <svg viewBox="0 0 420 320" fill="none" aria-hidden className="pstory__illustration">
      {[60, 110, 160, 210, 260, 310, 360].map((x, col) =>
        [60, 130, 200, 270].map((y, row) => (
          <g key={`${col}-${row}`}>
            <circle cx={x} cy={y} r={col === 2 && row === 1 ? 12 : 9}
              fill={col === 2 && row === 1 ? "rgba(255,90,31,0.35)" : "rgba(255,255,255,0.07)"}
              stroke={col === 2 && row === 1 ? "rgba(255,90,31,0.7)" : "rgba(255,255,255,0.14)"}
              strokeWidth="1" />
          </g>
        ))
      )}
      <line x1="160" y1="118" x2="148" y2="92" stroke="rgba(255,90,31,0.7)" strokeWidth="2.5" strokeLinecap="round" />
      <g transform="translate(330, 20)">
        <path d="M30 10 C30 10 15 20 15 40 L45 40 C45 20 30 10 30 10Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <circle cx="30" cy="43" r="4" fill="rgba(255,255,255,0.3)" />
        {[-18, -10, 10, 18].map((dx) => (
          <line key={dx} x1={30 + dx} y1="5" x2={30 + dx * 1.4} y2="-8" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        ))}
      </g>
      <rect x="80" y="90" width="54" height="28" rx="14" fill="rgba(255,90,31,0.15)" stroke="rgba(255,90,31,0.4)" strokeWidth="1" />
      <text x="107" y="109" fill="rgba(255,255,255,0.7)" fontSize="14" textAnchor="middle">?</text>
    </svg>
  ),
  () => (
    <svg viewBox="0 0 420 320" fill="none" aria-hidden className="pstory__illustration">
      <rect x="40" y="230" width="340" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
      <rect x="60" y="160" width="110" height="72" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
      <line x1="115" y1="160" x2="115" y2="232" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {[176, 192, 208, 224].map((y) => (
        <line key={y} x1="68" y1={y} x2="108" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      ))}
      <rect x="220" y="130" width="160" height="100" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <rect x="230" y="140" width="140" height="80" rx="4" fill="rgba(255,90,31,0.06)" />
      {[155, 172, 189].map((y, i) => (
        <rect key={y} x="238" y={y} width={60 + i * 18} height="8" rx="4" fill="rgba(255,255,255,0.12)" />
      ))}
      <polygon points="290,155 310,170 290,185" fill="rgba(255,90,31,0.5)" />
      <rect x="220" y="230" width="160" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <circle cx="150" cy="100" r="22" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <path d="M140 103 Q150 109 160 103" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="143" cy="95" r="2" fill="rgba(255,255,255,0.4)" />
      <circle cx="157" cy="95" r="2" fill="rgba(255,255,255,0.4)" />
      <text x="150" y="72" fill="rgba(255,90,31,0.6)" fontSize="16" textAnchor="middle" fontWeight="bold">?</text>
    </svg>
  ),
  () => (
    <svg viewBox="0 0 420 320" fill="none" aria-hidden className="pstory__illustration">
      {[
        { x: 80,  y: 80,  size: 48, op: 0.5 },
        { x: 200, y: 50,  size: 36, op: 0.3 },
        { x: 320, y: 90,  size: 28, op: 0.18 },
        { x: 140, y: 180, size: 22, op: 0.12 },
        { x: 300, y: 200, size: 16, op: 0.07 },
        { x: 60,  y: 240, size: 12, op: 0.05 },
      ].map(({ x, y, size, op }, i) => (
        <text key={i} x={x} y={y} fill={`rgba(255,90,31,${op})`} fontSize={size} textAnchor="middle" fontWeight="bold">?</text>
      ))}
      <circle cx="210" cy="190" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
      <line x1="210" y1="190" x2="210" y2="148" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />
      <line x1="210" y1="190" x2="238" y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line key={deg}
            x1={210 + 52 * Math.sin(rad)} y1={190 - 52 * Math.cos(rad)}
            x2={210 + 58 * Math.sin(rad)} y2={190 - 58 * Math.cos(rad)}
            stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        );
      })}
      <text x="210" y="278" fill="rgba(255,255,255,0.2)" fontSize="12" textAnchor="middle" letterSpacing="0.2em" fontFamily="monospace">LATER . . .</text>
    </svg>
  ),
];

export function ProblemStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const panels = track.querySelectorAll<HTMLElement>(".pstory__panel");
      const totalPanels = panels.length;

      const updateDots = (activeIndex: number) => {
        dotsRef.current.forEach((dot, i) => {
          if (!dot) return;
          dot.classList.toggle("active", i === activeIndex);
        });
      };
      updateDots(0);

      // Per-panel content slide-in tied to scroll progress
      panels.forEach((panel, i) => {
        const img  = panel.querySelector<HTMLElement>(".pstory__img-wrap");
        const tag  = panel.querySelector<HTMLElement>(".story__tag");
        const h    = panel.querySelector<HTMLElement>(".pstory__h");
        const body = panel.querySelector<HTMLElement>(".pstory__body");

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        if (img)  tl.from(img,  { x: 60, opacity: 0, duration: 0.7 }, 0);
        if (tag)  tl.from(tag,  { x: 40, opacity: 0, duration: 0.5 }, 0.1);
        if (h)    tl.from(h,    { x: 40, opacity: 0, duration: 0.7 }, 0.2);
        if (body) tl.from(body, { x: 30, opacity: 0, duration: 0.6 }, 0.35);

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          onUpdate: (self) => {
            const segmentSize = 1 / (totalPanels - 1);
            const panelStart = i === 0 ? 0 : (i - 0.35) * segmentSize;
            const panelEnd   = i === 0 ? 0.15 : (i - 0.05) * segmentSize;
            const progress   = Math.min(1, Math.max(0, (self.progress - panelStart) / (panelEnd - panelStart)));
            tl.progress(progress);

            const active = Math.round(self.progress * (totalPanels - 1));
            updateDots(active);
          },
        });
      });

      // Pin + horizontal scrub
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section className="pstory" id="why" ref={sectionRef}>
      <InteractiveGrid cols={28} square />
      <div className="pstory__track" ref={trackRef}>
        {problemScenes.map((scene, i) => {
          const Illustration = SCENE_ILLUSTRATIONS[i];
          return (
            <div key={i} className="pstory__panel">
              <div className="pstory__panel-inner">
                <div className="pstory__img-col">
                  <div className="pstory__img-wrap">
                    <Illustration />
                  </div>
                </div>
                <div className="pstory__text-col">
                  <div className="story__tag">{scene.tag}</div>
                  <h2 className="pstory__h">{scene.title}</h2>
                  <p className="pstory__body">{scene.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pstory__dots">
        {problemScenes.map((_, i) => (
          <div key={i} className="pstory__dot" ref={(el) => { dotsRef.current[i] = el; }} />
        ))}
      </div>
    </section>
  );
}
