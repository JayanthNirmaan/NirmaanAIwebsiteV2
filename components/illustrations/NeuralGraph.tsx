"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap";

const NODES: Array<{ cx: number; cy: number; r: number }> = [
  { cx: 80, cy: 120, r: 4 },
  { cx: 180, cy: 60, r: 5 },
  { cx: 280, cy: 160, r: 4 },
  { cx: 120, cy: 240, r: 6 },
  { cx: 320, cy: 300, r: 5 },
  { cx: 60, cy: 340, r: 4 },
  { cx: 240, cy: 400, r: 5 },
  { cx: 360, cy: 80, r: 3 },
];

const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [0, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6], [1, 7], [2, 7],
];

export function NeuralGraph({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    registerGSAP();
    const svg = ref.current;
    if (!svg) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dots = svg.querySelectorAll<SVGCircleElement>("circle");
    const tl = gsap.timeline({ repeat: -1, defaults: { duration: 1.2, ease: "sine.inOut" } });
    dots.forEach((d, i) => {
      tl.to(d, { opacity: 1, scale: 1.4, transformOrigin: "center" }, i * 0.15)
        .to(d, { opacity: 0.4, scale: 1 }, i * 0.15 + 0.6);
    });
    return () => { tl.kill(); };
  }, []);

  return (
    <svg
      ref={ref}
      className={className}
      style={style}
      viewBox="0 0 420 440"
      fill="none"
      aria-hidden
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].cx}
          y1={NODES[a].cy}
          x2={NODES[b].cx}
          y2={NODES[b].cy}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
        />
      ))}
      {NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={i % 3 === 0 ? "#FF5A1F" : "#FFA274"}
          opacity={0.45}
        />
      ))}
    </svg>
  );
}
