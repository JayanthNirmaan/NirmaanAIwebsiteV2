"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { demoVideo } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

function em(html: string) {
  const parts = html.split(/(<em>[^<]+<\/em>)/g);
  return parts.map((p, i) => {
    const m = p.match(/^<em>([^<]+)<\/em>$/);
    if (m) return <span key={i} className="em">{m[1]}</span>;
    return <span key={i}>{p}</span>;
  });
}

export function DemoVideo() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.from(headRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" },
        });
      }

      if (frameRef.current) {
        gsap.from(frameRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: frameRef.current, start: "top 80%" },
        });

        // Subtle hover-lift parallax on scroll
        gsap.to(frameRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      if (captionRef.current) {
        gsap.from(captionRef.current, {
          opacity: 0,
          y: 16,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: captionRef.current, start: "top 88%" },
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="section" id="demo" ref={rootRef}>
      <div className="container">
        <div ref={headRef}>
          <SectionHead
            kicker={demoVideo.kicker}
            title={em(demoVideo.title)}
            meta={<div className="t-micro">{demoVideo.meta}</div>}
            kickerStyle={{ color: "var(--orange-500)", fontWeight: 700 }}
          />
        </div>

        <div className="video-frame" ref={frameRef}>
          <video
            ref={videoRef}
            src={demoVideo.src}
            poster={demoVideo.poster}
            controls={playing}
            preload="metadata"
            playsInline
            style={{ display: "block", opacity: playing ? 1 : 0.6 }}
          />
          {!playing ? (
            <button
              className="video-play"
              onClick={play}
              aria-label="Play demo video"
              style={{ border: 0, color: "#fff" }}
            >
              <div className="video-play__btn">
                <Play size={32} fill="currentColor" />
              </div>
            </button>
          ) : null}
        </div>

        
      </div>
    </section>
  );
}
