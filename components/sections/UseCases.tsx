"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatTile } from "@/components/ui/StatTile";
import { useCases } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

function em(html: string) {
  const parts = html.split(/(<em>[^<]+<\/em>|<br\s*\/?>)/g);
  return parts.map((p, i) => {
    if (/^<br\s*\/?>$/.test(p)) return <br key={i} />;
    const m = p.match(/^<em>([^<]+)<\/em>$/);
    if (m) return <span key={i} className="em">{m[1]}</span>;
    return <span key={i}>{p}</span>;
  });
}

export function UseCases() {
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
        const cards = gridRef.current.querySelectorAll(".card");
        gsap.from(cards, {
          y: 70,
          opacity: 0,
          scale: 0.93,
          duration: 0.95,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
        });

        // Subject chips pop in
        gsap.from(gridRef.current.querySelectorAll(".chip"), {
          scale: 0,
          opacity: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "back.out(2)",
          scrollTrigger: { trigger: gridRef.current, start: "top 70%" },
        });

        // Stat tiles slide up with bounce
        gsap.from(gridRef.current.querySelectorAll(".stat-tile"), {
          y: 30,
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: gridRef.current, start: "top 65%" },
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="section" id="use-cases" style={{ background: "var(--ink-50)" }} ref={rootRef}>
      <div className="container">
        <div ref={headRef}>
          <SectionHead
            kicker={useCases.kicker}
            title={em(useCases.title)}
            meta={<>
              <div className="u-mono">{useCases.meta}</div>
            </>}
            kickerStyle={{ color: "var(--orange-500)", fontWeight: 700 }}
          />
        </div>

        <div ref={gridRef} className="grid grid-2" style={{ alignItems: "stretch" }}>
          {/* Students */}
          <Card style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--orange-500)" }}>
            <div>
              <Chip variant="default">Students</Chip>
              <h3 className="t-h2" style={{ marginTop: 16, color: "#fff" }}>{useCases.student.heading}</h3>
              <p className="t-body-lg" style={{ marginTop: 16, color: "rgba(255,255,255,0.92)" }}>{useCases.student.body}</p>
            </div>
            <div className="subject-chips" style={{ marginTop: 20 }}>
              {useCases.student.subjects.map((s) => (
                <Chip key={s.label} variant={s.variant}>{s.label}</Chip>
              ))}
              <Chip variant="default">{useCases.student.more}</Chip>
            </div>
          </Card>

          {/* Schools */}
          <Card dark style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <Chip variant="dark">Schools</Chip>
              <h3 className="t-h2" style={{ marginTop: 16, color: "#fff" }}>{useCases.school.heading}</h3>
              <p className="t-body-lg" style={{ marginTop: 16, color: "rgba(255,255,255,0.72)" }}>{useCases.school.body}</p>
            </div>

            <div
              style={{
                marginTop: 20,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {useCases.school.stats.map((s, i) => (
                <StatTile key={i} num={s.num} label={s.label} suffix={s.suffix} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
