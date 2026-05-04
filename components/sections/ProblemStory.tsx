"use client";

import { useEffect, useRef } from "react";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { problemScenes } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const SCENE_ILLUSTRATIONS = [
  () => <img src="/Problemstory/Problemstory1.png" alt="" aria-hidden className="pstory__illustration" />,
  () => <img src="/Problemstory/Problemstory2.png" alt="" aria-hidden className="pstory__illustration" />,
  () => <img src="/Problemstory/Problemstory3.png" alt="" aria-hidden className="pstory__illustration" />,
];

export function ProblemStory() {
  const isMobile = useIsMobile();
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
      if (isMobile) {
        // Mobile: panels are visible by default, simple scroll-reveal
        const panels = track.querySelectorAll<HTMLElement>(".pstory__panel");
        panels.forEach((panel) => {
          const img = panel.querySelector<HTMLElement>(".pstory__img-wrap");
          const text = panel.querySelector<HTMLElement>(".pstory__text-col");

          // Ensure visible immediately — animation is a bonus on top
          if (img)  gsap.set(img,  { clearProps: "all" });
          if (text) gsap.set(text, { clearProps: "all" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 90%",
              toggleActions: "play none none none",
            }
          });

          if (img) tl.fromTo(img,
            { y: 40, opacity: 0, scale: 0.92 },
            { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power4.out" },
            0
          );
          if (text) tl.fromTo(text,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
            0.18
          );
        });
        return;
      }

      const panels = track.querySelectorAll<HTMLElement>(".pstory__panel");
      const totalPanels = panels.length;

      const updateDots = (activeIndex: number) => {
        dotsRef.current.forEach((dot, i) => {
          if (!dot) return;
          dot.classList.toggle("active", i === activeIndex);
        });
      };

      // Pre-build per-panel content timelines
      const panelTimelines: gsap.core.Timeline[] = [];
      panels.forEach((panel) => {
        const img  = panel.querySelector<HTMLElement>(".pstory__img-wrap");
        const tag  = panel.querySelector<HTMLElement>(".story__tag");
        const h    = panel.querySelector<HTMLElement>(".pstory__h");
        const body = panel.querySelector<HTMLElement>(".pstory__body");

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        if (img)  tl.from(img,  { x: 60, opacity: 0, duration: 0.7 }, 0);
        if (tag)  tl.from(tag,  { x: 40, opacity: 0, duration: 0.5 }, 0);
        if (h)    tl.from(h,    { x: 40, opacity: 0, duration: 0.7 }, 0);
        if (body) tl.from(body, { x: 30, opacity: 0, duration: 0.6 }, 0);
        panelTimelines.push(tl);
      });

      // Show panel 0 content immediately
      panelTimelines[0]?.progress(1);
      updateDots(0);

      let currentPanel = 0;
      let isAnimating = false;

      const goToPanel = (index: number) => {
        if (index < 0 || index >= totalPanels || index === currentPanel || isAnimating) return;
        const prev = currentPanel;
        currentPanel = index;
        isAnimating = true;
        updateDots(index);

        // Reset and play the content animation for the new panel
        panelTimelines[index]?.progress(0).play();

        gsap.to(track, {
          x: () => -index * window.innerWidth,
          duration: 1.2,
          ease: "power3.inOut",
          onComplete: () => { isAnimating = false; },
        });
        void prev;
      };

      const stripPinBorders = () => {
        document.querySelectorAll<HTMLElement>(".pin-spacer, [data-pin-spacer]").forEach((el) => {
          el.style.setProperty("border", "none", "important");
          el.style.setProperty("border-top", "none", "important");
          el.style.setProperty("border-bottom", "none", "important");
          el.style.setProperty("border-left", "none", "important");
          el.style.setProperty("border-right", "none", "important");
          el.style.setProperty("outline", "none", "important");
        });
      };

      // Pin the section for the full duration it's active
      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalPanels - 1)}`,
        pin: true,
        pinSpacing: true,
        onUpdate: () => { /* no scrub */ },
        onRefresh: () => { stripPinBorders(); },
      });

      requestAnimationFrame(stripPinBorders);
      const mo = new MutationObserver(stripPinBorders);
      mo.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["style"] });

      // Gated wheel handler — requires accumulated delta to exceed threshold
      const THRESHOLD = 120; // roughly one full wheel "notch" or trackpad gesture
      let accumDelta = 0;
      let lastWheelTime = 0;

      const onWheel = (e: WheelEvent) => {
        // Only intercept while section is pinned / active
        if (!pinTrigger.isActive) return;

        // If at first panel scrolling up, or last panel scrolling down — allow normal scroll
        if (currentPanel === 0 && e.deltaY < 0) return;
        if (currentPanel === totalPanels - 1 && e.deltaY > 0) return;

        e.preventDefault();

        const now = performance.now();
        // Reset accumulator if user paused
        if (now - lastWheelTime > 200) accumDelta = 0;
        lastWheelTime = now;

        if (isAnimating) return;

        accumDelta += e.deltaY;

        if (accumDelta > THRESHOLD) {
          accumDelta = 0;
          goToPanel(currentPanel + 1);
        } else if (accumDelta < -THRESHOLD) {
          accumDelta = 0;
          goToPanel(currentPanel - 1);
        }
      };

      window.addEventListener("wheel", onWheel, { passive: false });

      // Touch support
      let touchStartY = 0;
      const onTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (!pinTrigger.isActive) return;
        const dy = touchStartY - e.touches[0].clientY;
        if (currentPanel === 0 && dy < 0) return;
        if (currentPanel === totalPanels - 1 && dy > 0) return;
        e.preventDefault();
        if (isAnimating) return;
        if (dy > 60) { touchStartY = e.touches[0].clientY; goToPanel(currentPanel + 1); }
        else if (dy < -60) { touchStartY = e.touches[0].clientY; goToPanel(currentPanel - 1); }
      };
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });

      mo.disconnect();
      return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
      };
    }, sectionRef);

    return () => { ctx.revert(); };
  }, [isMobile]);

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
