"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FlowButton } from "./FlowButton";
import { AnimatedNav } from "./AnimatedNav";
import { nav } from "@/content/home";
import { registerGSAP, gsap } from "@/lib/gsap";

export function Nav() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Entrance: logo + CTA slide down on load */
  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from([logoRef.current, ctaRef.current], {
        y: -24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Floating nav wrapper — pointer-events off so page content is clickable ── */}
      <div className="nav-wrap">

        {/* Logo island */}
        <div ref={logoRef} className="nav-island nav-island--logo">
          <a href="#top" className="nav__logo" aria-label="Nirmaan">
            <Image
              src="/brand/nirmaan-logo-full.png"
              alt="Nirmaan"
              width={148}
              height={32}
              priority
              style={{ height: 32, width: "auto", objectFit: "contain" }}
            />
          </a>
        </div>

        {/* Center — Framer Motion animated pill nav */}
        <div className="nav-island nav-island--links">
          <AnimatedNav />
        </div>

        {/* CTA island */}
        <div ref={ctaRef} className="nav-island nav-island--cta">
          <FlowButton href="#contact" size="sm" variant="accent">{nav.demo}</FlowButton>
        </div>

        {/* Mobile burger (hidden on desktop) */}
        <button
          className="nav__burger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
            <rect y="0" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="13" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`nav__mobile ${menuOpen ? "is-open" : ""}`}>
        <button
          className="nav__close"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
          <FlowButton href="#contact" variant="accent">{nav.demo}</FlowButton>
        </div>
      </div>
    </>
  );
}