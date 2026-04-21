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
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        });
      }
      if (bodyRef.current) {
        gsap.from(bodyRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: bodyRef.current, start: "top 82%" },
        });
      }
    }, wrapRef);

    const video = videoRef.current;
    const section = wrapRef.current;
    const badge = badgeRef.current;
    let playTimer: ReturnType<typeof setTimeout> | null = null;
    let loopTimer: ReturnType<typeof setTimeout> | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let badgeShown = false;
    let isInView = false;

    const hideBadge = () => {
      if (!badge) return;
      badgeShown = false;
      gsap.to(badge, { opacity: 0, scale: 0.7, duration: 0.3, ease: "power2.in" });
    };

    const showBadge = () => {
      if (!badge || badgeShown) return;
      badgeShown = true;
      gsap.fromTo(
        badge,
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.8)" }
      );
    };

    const onTimeUpdate = () => {
      if (!video) return;
      if (video.currentTime >= 6 && !badgeShown) {
        showBadge();
      }
    };

    const onEnded = () => {
      if (!video) return;
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(hideBadge, 2000);
      if (loopTimer) clearTimeout(loopTimer);
      loopTimer = setTimeout(() => {
        if (!isInView) return;
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 2000);
    };

    if (video) {
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("ended", onEnded);
    }

    const observer =
      video && section
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  isInView = true;
                  if (playTimer) clearTimeout(playTimer);
                  playTimer = setTimeout(() => {
                    if (hideTimer) {
                      clearTimeout(hideTimer);
                      hideTimer = null;
                    }
                    video.currentTime = 0;
                    hideBadge();
                    video.play().catch(() => {});
                  }, 500);
                } else {
                  isInView = false;
                  if (playTimer) {
                    clearTimeout(playTimer);
                    playTimer = null;
                  }
                  if (loopTimer) {
                    clearTimeout(loopTimer);
                    loopTimer = null;
                  }
                  if (hideTimer) {
                    clearTimeout(hideTimer);
                    hideTimer = null;
                  }
                  video.pause();
                  hideBadge();
                }
              }
            },
            { threshold: 0.4 }
          )
        : null;

    if (observer && section) observer.observe(section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (playTimer) clearTimeout(playTimer);
      if (loopTimer) clearTimeout(loopTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (observer) observer.disconnect();
      if (video) {
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("ended", onEnded);
      }
    };
  }, []);

  return (
    <section className="story" id="compound" ref={wrapRef}>
      <div className="compound">
        <video
          ref={videoRef}
          className="compound__bg"
          src="/video/compound.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="compound__bg-overlay" aria-hidden />
        <div style={{ textAlign: "center", maxWidth: 780, position: "relative", zIndex: 1 }}>
          <h2 className="story__h" ref={titleRef}>{compound.title}</h2>
          <p className="story__body" ref={bodyRef}>
            And slowly, many connected concepts begin to break silently. Until this grows into a large,{" "}
            <Highlighter variant="circle">
              <em style={{ fontStyle: "italic", fontWeight: 600 }}>permanent gap</em>
            </Highlighter>
            {" "}... affecting years that come next in the student&apos;s learning journey.
          </p>
        </div>

        <div className="compound__badge" ref={badgeRef} aria-hidden>
          <img
            className="compound__badge-arrow"
            src="/other%20assets/arrow1.png"
            alt=""
          />
          <span className="compound__badge-text">Permanent Learning Gap</span>
        </div>
      </div>
    </section>
  );
}
