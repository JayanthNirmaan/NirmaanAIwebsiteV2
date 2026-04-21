"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { footer } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

export function Footer() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      // Brand column
      const brand = rootRef.current.querySelector(".footer__brand");
      if (brand) {
        gsap.from(brand, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 90%" },
        });
      }

      // Link columns stagger
      const cols = rootRef.current.querySelectorAll(".footer__grid > div:not(.footer__brand)");
      if (cols.length) {
        gsap.from(cols, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 88%" },
        });
      }

      // Bottom bar
      const bottom = rootRef.current.querySelector(".footer__bottom");
      if (bottom) {
        gsap.from(bottom, {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: bottom, start: "top 95%" },
        });
      }

      // Social icons pop in
      const socials = rootRef.current.querySelectorAll(".footer__socials a");
      if (socials.length) {
        gsap.from(socials, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "back.out(2)",
          scrollTrigger: { trigger: rootRef.current.querySelector(".footer__bottom"), start: "top 95%" },
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <footer className="footer" ref={rootRef}>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Image src="/brand/nirmaan-logo-full.png" alt="Nirmaan" width={180} height={40} />
            <p style={{ fontSize: 14, lineHeight: 1.55 }}>{footer.tagline}</p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <div>{footer.bottom.copyright}</div>
          <div style={{ display: "flex", gap: 24 }}>
            {footer.bottom.links.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>
          <div className="footer__socials">
            <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}