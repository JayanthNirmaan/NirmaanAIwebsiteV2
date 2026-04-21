"use client";

import { useEffect, useRef } from "react";
import { Quote } from "@/components/ui/Quote";
import { SectionHead } from "@/components/ui/SectionHead";
import { testimonials } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

function em(html: string) {
  const parts = html.split(/(<em>[^<]+<\/em>)/g);
  return parts.map((p, i) => {
    const m = p.match(/^<em>([^<]+)<\/em>$/);
    if (m) return <span key={i} className="em">{m[1]}</span>;
    return <span key={i}>{p}</span>;
  });
}

export function Testimonials() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);

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
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const loop = [...testimonials.items, ...testimonials.items];

  return (
    <section className="section" id="testimonials" ref={rootRef}>
      <div className="container">
        <div ref={headRef}>
          <SectionHead
            kicker={testimonials.kicker}
            title={em(testimonials.title)}
            meta={<div className="u-mono">{testimonials.meta}</div>}
          />
        </div>
      </div>

      <div className="quote-marquee">
        <div className="quote-marquee__track">
          {loop.map((t, i) => (
            <div className="quote-marquee__item" key={i}>
              <Quote {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
