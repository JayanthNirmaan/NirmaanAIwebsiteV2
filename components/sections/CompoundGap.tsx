"use client";

import { useEffect, useRef } from "react";
import { compound } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { Highlighter } from "@/components/ui/Highlighter";

export function CompoundGap() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    registerGSAP();

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      // Title fades up
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        });
      }

      // Body fades up after title
      if (bodyRef.current) {
        gsap.from(bodyRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: bodyRef.current, start: "top 82%" },
        });
      }
    }, wrapRef);

    // Video: play when in view, pause when out, loop
    const video = videoRef.current;
    const section = wrapRef.current;
    let playTimer: ReturnType<typeof setTimeout> | null = null;
    let loopTimer: ReturnType<typeof setTimeout> | null = null;
    let isInView = false;

    const onEnded = () => {
      if (!isInView) return;
      loopTimer = setTimeout(() => {
        if (!video || !isInView) return;
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 200);
    };

    if (video) video.addEventListener("ended", onEnded);

    const observer =
      video && section
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  isInView = true;
                  playTimer = setTimeout(() => {
                    if (!video) return;
                    video.currentTime = 0;
                    video.play().catch(() => {});
                  }, 300);
                } else {
                  isInView = false;
                  if (playTimer) { clearTimeout(playTimer); playTimer = null; }
                  if (loopTimer) { clearTimeout(loopTimer); loopTimer = null; }
                  video.pause();
                }
              }
            },
            { threshold: 0.3 }
          )
        : null;

    if (observer && section) observer.observe(section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (playTimer) clearTimeout(playTimer);
      if (loopTimer) clearTimeout(loopTimer);
      if (observer) observer.disconnect();
      if (video) video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section className="story" id="compound" ref={wrapRef}>
      <video
        ref={videoRef}
        className="compound__bg"
        src="/Compound/Section%203%20video.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="compound__bg-overlay" aria-hidden />

      <p className="compound__mid-label">So the Learning Gap is created</p>

      <div className="compound__content">
        <h2 ref={titleRef} className="compound__title">
          {compound.title}
        </h2>

        <p ref={bodyRef} className="compound__body">
          And slowly, many connected concepts begin to break silently.
          Until this grows into a large,{" "}
          <Highlighter variant="circle">
            <em className="compound__em">permanent gap......</em>
          </Highlighter>
          {" "}Affecting years that come next in the student&apos;s learning journey.
        </p>
      </div>
    </section>
  );
}
