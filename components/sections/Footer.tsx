"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Linkedin, Instagram, Youtube } from "lucide-react";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
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
            <Image src="/brand/Nirmaanlogo_white.png" alt="Nirmaan" width={180} height={40} />
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

          <div>
            <h5>FOLLOW US</h5>
            <div className="footer__socials-grid">
              <a href="https://wa.me/918431234711" aria-label="WhatsApp"><WhatsAppIcon size={18} /></a>
              <a href="https://www.linkedin.com/company/nirmaan-education" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.youtube.com/@NirmaanEducation" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><Youtube size={18} /></a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div>{footer.bottom.copyright}</div>
        </div>
      </div>
    </footer>
  );
}