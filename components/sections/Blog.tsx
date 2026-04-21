"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, BookOpen, Lightbulb, School } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { SectionHead } from "@/components/ui/SectionHead";
import { BlogArt } from "@/components/illustrations/BlogArt";
import { AnimatedList, AnimatedListItem } from "@/components/ui/AnimatedList";
import { Marquee } from "@/components/ui/Marquee";
import { blog } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// ─── Bento primitives ─────────────────────────────────────────────────────────

const BentoGrid = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("bento-grid", className)}>
      {children}
    </div>
  )
);
BentoGrid.displayName = "BentoGrid";

function BentoCard({
  name,
  description,
  chip,
  href,
  cta,
  className,
  background,
  Icon,
}: {
  name: React.ReactNode;
  description: string;
  chip?: string;
  href?: string;
  cta?: string;
  className?: string;
  background?: React.ReactNode;
  Icon?: React.ElementType;
}) {
  return (
    <div className={cn("bento-card blog-card", className)}>
      {/* Animated background layer */}
      <div className="bento-card__bg" aria-hidden>
        {background}
      </div>

      {/* Content pinned to bottom */}
      <div className="bento-card__body">
        {chip && <Chip variant="default" className="bento-card__chip">{chip}</Chip>}
        {Icon && <Icon size={18} className="bento-card__icon" aria-hidden />}
        <h3 className="t-h3 bento-card__title">{name}</h3>
        <p className="t-small bento-card__desc">{description}</p>
        {cta && href && (
          <a href={href} className="blog-more bento-card__cta">
            {cta} <ArrowRight size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Marquee background for card 1 ────────────────────────────────────────────

const marqueeItems = [
  { label: "Personalized learning", sub: "Adaptive AI tutoring for every student" },
  { label: "Voice conversations", sub: "Two-way dialogue that feels human" },
  { label: "Visual explanations", sub: "Live whiteboard breakdowns" },
  { label: "Doubt resolution", sub: "Instant answers, no waiting" },
  { label: "Student SIM", sub: "Deep model of how you think" },
  { label: "Gap detection", sub: "Finds what's been missing for years" },
];

function MarqueeBg() {
  return (
    <div className="bento-marquee-wrap">
      <Marquee speed={28}>
        {marqueeItems.map((item, i) => (
          <div key={i} className="bento-marquee-card">
            <span className="bento-marquee-label">{item.label}</span>
            <span className="bento-marquee-sub">{item.sub}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// ─── AnimatedList background for card 2 ───────────────────────────────────────

const listItems = [
  { icon: "🧠", text: "Gap detected: Quadratic equations" },
  { icon: "✅", text: "Concept mastered: Fractions" },
  { icon: "💬", text: "New session started" },
  { icon: "📈", text: "Confidence score up 12%" },
  { icon: "🎯", text: "Weak area: Trigonometry ratios" },
  { icon: "🔔", text: "Practice reminder sent" },
];

function AnimatedListBg() {
  return (
    <div className="bento-animlist-wrap">
      <AnimatedList delay={900} retrigger className="bento-animlist">
        {listItems.map((item, i) => (
          <AnimatedListItem key={i}>
            <div className="bento-animlist-item">
              <span className="bento-animlist-icon">{item.icon}</span>
              <span className="bento-animlist-text">{item.text}</span>
            </div>
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  );
}

// ─── Blog section ──────────────────────────────────────────────────────────────

function em(html: string) {
  const parts = html.split(/(<em>[^<]+<\/em>|<br\s*\/?>)/g);
  return parts.map((p, i) => {
    if (/^<br\s*\/?>$/.test(p)) return <br key={i} />;
    const m = p.match(/^<em>([^<]+)<\/em>$/);
    if (m) return <span key={i} className="em">{m[1]}</span>;
    return <span key={i}>{p}</span>;
  });
}

const ICONS = [Lightbulb, BookOpen, School];

export function Blog() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

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

      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll(".bento-card"), {
          y: 56,
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const [p0, p1, p2] = blog.posts;

  return (
    <section className="section" id="blog" ref={rootRef}>
      <div className="container">
        <div ref={headRef}>
          <SectionHead
            kicker={blog.kicker}
            title={em(blog.title)}
            meta={<div className="u-mono">{blog.meta}</div>}
          />
        </div>

        <BentoGrid ref={gridRef}>
          {/* Card 1 — large, 2-col, Marquee background */}
          <BentoCard
            className="bento-card--lg"
            chip={p0.chip}
            Icon={ICONS[0]}
            name={<>{p0.titlePre}<span className="em">{p0.titleEm}</span>{p0.titlePost}</>}
            description={p0.desc}
            href="#"
            cta="Read more"
            background={
              <>
                <BlogArt variant={p0.art} />
                <MarqueeBg />
              </>
            }
          />

          {/* Card 2 — 1-col, AnimatedList background */}
          <BentoCard
            className="bento-card--sm"
            chip={p1.chip}
            Icon={ICONS[1]}
            name={<>{p1.titlePre}<span className="em">{p1.titleEm}</span>{p1.titlePost}</>}
            description={p1.desc}
            href="#"
            cta="Read more"
            background={
              <>
                <BlogArt variant={p1.art} />
                <AnimatedListBg />
              </>
            }
          />

          {/* Card 3 — full-width horizontal, bell-curve art */}
          <BentoCard
            className="bento-card--wide"
            chip={p2.chip}
            Icon={ICONS[2]}
            name={<>{p2.titlePre}<span className="em">{p2.titleEm}</span>{p2.titlePost}</>}
            description={p2.desc}
            href="#"
            cta="Read more"
            background={<BlogArt variant={p2.art} />}
          />
        </BentoGrid>
      </div>
    </section>
  );
}
