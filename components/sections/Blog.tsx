"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, BellIcon, BookOpen, Brain, Share2, Lightbulb } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { SectionHead } from "@/components/ui/SectionHead";
import { BlogArt } from "@/components/illustrations/BlogArt";
import { AnimatedList, AnimatedListItem } from "@/components/ui/AnimatedList";
import { Marquee } from "@/components/ui/Marquee";
import { blog } from "@/content/home";
import { registerGSAP, gsap } from "@/lib/gsap";
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
    <div className={cn("bento-card blog-card group", className)}>
      <div className="bento-card__bg" aria-hidden>
        {background}
      </div>
      <div className="bento-card__body">
        {chip && <Chip variant="default" className="bento-card__chip">{chip}</Chip>}
        {Icon && <Icon size={18} className="bento-card__icon" aria-hidden />}
        <h3 className="t-h3 bento-card__title">{name}</h3>
        <p className="t-small bento-card__desc">{description}</p>
        {cta && href && (
          <a href={href} className="bento-card__cta">
            {cta} <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Backgrounds ──────────────────────────────────────────────────────────────

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

const features = (posts: typeof blog.posts) => [
  {
    Icon: Lightbulb,
    chip: posts[0].chip,
    name: <>{posts[0].titlePre}<span className="em">{posts[0].titleEm}</span>{posts[0].titlePost}</>,
    description: posts[0].desc,
    href: "#",
    cta: "Read more",
    className: "bento-card--lg",   // col span 2, row 1
    background: (
      <>
        <BlogArt variant={posts[0].art} />
        <MarqueeBg />
      </>
    ),
  },
  {
    Icon: BellIcon,
    chip: posts[1].chip,
    name: <>{posts[1].titlePre}<span className="em">{posts[1].titleEm}</span>{posts[1].titlePost}</>,
    description: posts[1].desc,
    href: "#",
    cta: "Read more",
    className: "bento-card--sm",   // col span 1, row 1
    background: (
      <>
        <BlogArt variant={posts[1].art} />
        <AnimatedListBg />
      </>
    ),
  },
  {
    Icon: Share2,
    chip: posts[2].chip,
    name: <>{posts[2].titlePre}<span className="em">{posts[2].titleEm}</span>{posts[2].titlePost}</>,
    description: posts[2].desc,
    href: "#",
    cta: "Read more",
    className: "bento-card--tall", // col span 1, row span 2
    background: <BlogArt variant={posts[2].art} />,
  },
  {
    Icon: Brain,
    chip: posts[3].chip,
    name: <>{posts[3].titlePre}<span className="em">{posts[3].titleEm}</span>{posts[3].titlePost}</>,
    description: posts[3].desc,
    href: "#",
    cta: "Read more",
    className: "bento-card--sm",   // col span 1, row 2
    background: <BlogArt variant={posts[3].art} />,
  },
  {
    Icon: BookOpen,
    chip: posts[4].chip,
    name: <>{posts[4].titlePre}<span className="em">{posts[4].titleEm}</span>{posts[4].titlePost}</>,
    description: posts[4].desc,
    href: "#",
    cta: "Read more",
    className: "bento-card--lg",   // col span 2, row 2
    background: <BlogArt variant={posts[4].art} />,
  },
];

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

    return () => { ctx.revert(); };
  }, []);

  const cards = features(blog.posts);

  return (
    <section className="section" id="blog" ref={rootRef}>
      <div className="container">
        <div ref={headRef}>
          <SectionHead
            kicker={blog.kicker}
            title={em(blog.title)}
            meta={
              <a href="/blog" className="btn-ghost" style={{ color: "var(--orange-700)" }}>
                View all Blogs <ArrowUpRight size={14} />
              </a>
            }
          />
        </div>

        <BentoGrid ref={gridRef}>
          {cards.map((card, idx) => (
            <BentoCard key={idx} {...card} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
