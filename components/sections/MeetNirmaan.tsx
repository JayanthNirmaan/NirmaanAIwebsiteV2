"use client";

import { useEffect, useRef } from "react";
import { Highlighter } from "@/components/ui/Highlighter";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { meetNirmaan } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

export function MeetNirmaan() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLParagraphElement | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    registerGSAP();
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduced && headRef.current) {
        gsap.from(headRef.current, {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" },
        });
      }

      if (!reduced && closingRef.current) {
        gsap.from(closingRef.current, {
          y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: closingRef.current, start: "top 85%" },
        });
      }

      if (!reduced && stackRef.current) {
        const stack = stackRef.current;
        const cards = gsap.utils.toArray<HTMLElement>(".mn-card", stack);
        const n = cards.length;

        // All cards start at the same position (dead center), layered.
        // Card 0 (Feature 1) has the highest z-index so it sits on top.
        // z-index must be applied to the positioned ancestor (.mn-card-wrap).
        const wraps = gsap.utils.toArray<HTMLElement>(".mn-card-wrap", stack);
        wraps.forEach((wrap, i) => {
          gsap.set(wrap, { zIndex: n - i });
        });

        cards.forEach((card) => {
          gsap.set(card, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: 0,
            transformOrigin: "center center",
          });
        });

        // Single timeline driven by the pin scroll. Each exit = 1 segment
        // on the timeline. Total duration is normalized (we use 1 unit per
        // exit), and the ScrollTrigger scrubs the timeline end-to-end.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stack,
            start: "top top",
            end: () => `+=${(n - 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        for (let step = 0; step < n - 1; step++) {
          tl.to(
            cards[step],
            {
              x: () => -(window.innerWidth * 0.7 + 200),
              opacity: 0,
              rotation: -4,
              ease: "power2.in",
              duration: 1,
            },
            step // place on timeline at time = step
          );
        }
      }
    }, rootRef);

    // Play each video when it's visible, pause when not
    const videos = videoRefs.current;
    const observers = videos.map((video) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(video);
      return obs;
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section className="section meet-nirmaan-section" id="solution" ref={rootRef}>
      <InteractiveGrid cols={28} rows={16} className="meet-nirmaan-grid" />
      <div className="container">
        <div ref={headRef} className="meet-nirmaan-head">
          <div className="meet-nirmaan-kicker">{meetNirmaan.kicker}</div>
          <h2 className="t-h1 meet-nirmaan-title">
            An{" "}
            <Highlighter variant="circle">
              <span className="meet-nirmaan-ai-tutor">AI tutor</span>
            </Highlighter>
            {" "}that teaches like the{" "}
            <Highlighter variant="orange">
              <span className="em">best human tutor</span>
            </Highlighter>
            {" "}you&rsquo;ve ever had.
          </h2>
          <p className="u-mono meet-nirmaan-meta" style={{ fontSize: 14 }}>{meetNirmaan.meta}</p>
        </div>

        <div ref={stackRef} className="mn-stack">
          {meetNirmaan.cards.map((card, i) => (
            <div key={i} className="mn-card-wrap">
              <article className="mn-card">
                <div className="mn-card__media">
                  <video
                    src={`/MeetNirmaan/Feature${[1, 3, 4, 2][i]}.mp4`}
                    muted
                    playsInline
                    loop
                    preload="auto"
                    className="mn-card__video"
                    ref={(el) => { if (el) videoRefs.current[i] = el; }}
                  />
                </div>
                <div className="mn-card__content">
                  <div className="mn-card__index">0{i + 1}</div>
                  <h3 className="mn-card__heading">{card.heading}</h3>
                  <ul className="mn-card__points">
                    {card.points?.map((p, j) => (
                      <li key={j} className="mn-card__point">
                        <span className="mn-card__dot" aria-hidden />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>

        <p ref={closingRef} className="t-h3" style={{ textAlign: "center", marginTop: 64, maxWidth: 800, marginInline: "auto", fontSize: 18 }}>
          So learning finally feels {" "}
          <Highlighter variant="marker-yellow">Fun, Enjoyable and Personal</Highlighter>.
        </p>
      </div>
    </section>
  );
}
