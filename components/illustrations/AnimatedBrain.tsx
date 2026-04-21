"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap";

// Brain outline path (simplified organic shape)
const BRAIN_PATH =
  "M210 60 C165 40, 110 50, 90 90 C65 115, 60 145, 70 175 C55 195, 50 225, 65 250 C55 275, 65 305, 90 320 C105 345, 135 355, 160 350 C175 370, 200 375, 220 365 C240 375, 265 370, 280 350 C305 355, 335 345, 350 320 C375 305, 385 275, 375 250 C390 225, 385 195, 370 175 C380 145, 375 115, 350 90 C330 50, 275 40, 230 60 Z";

// Neuron nodes scattered inside the brain shape
const NEURONS: Array<{ cx: number; cy: number; r: number; color: string }> = [
  { cx: 130, cy: 110, r: 5, color: "#FF5A1F" },
  { cx: 200, cy: 90,  r: 4, color: "#FFA274" },
  { cx: 270, cy: 115, r: 5, color: "#FF5A1F" },
  { cx: 110, cy: 175, r: 4, color: "#FFA274" },
  { cx: 180, cy: 160, r: 6, color: "#FF5A1F" },
  { cx: 250, cy: 155, r: 4, color: "#FFA274" },
  { cx: 310, cy: 175, r: 5, color: "#FF5A1F" },
  { cx: 140, cy: 235, r: 5, color: "#FFA274" },
  { cx: 210, cy: 220, r: 7, color: "#FF5A1F" },
  { cx: 285, cy: 230, r: 4, color: "#FFA274" },
  { cx: 110, cy: 295, r: 4, color: "#FF5A1F" },
  { cx: 175, cy: 285, r: 5, color: "#FFA274" },
  { cx: 245, cy: 290, r: 5, color: "#FF5A1F" },
  { cx: 315, cy: 295, r: 4, color: "#FFA274" },
  { cx: 160, cy: 330, r: 4, color: "#FF5A1F" },
  { cx: 260, cy: 328, r: 4, color: "#FFA274" },
];

// Synaptic connections between neuron indices
const SYNAPSES: Array<[number, number]> = [
  [0, 1], [1, 2], [0, 4], [1, 4], [2, 4], [2, 6], [3, 4], [4, 5],
  [4, 7], [5, 6], [5, 8], [6, 9], [7, 8], [8, 9], [7, 10], [8, 11],
  [9, 12], [9, 13], [10, 11], [11, 14], [12, 15], [13, 15], [3, 7],
];

// Pulse particles travel along edges
const PULSES = SYNAPSES.slice(0, 10).map((edge, i) => ({
  edge,
  delay: i * 0.55,
  duration: 1.8 + (i % 4) * 0.3,
}));

export function AnimatedBrain({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    registerGSAP();
    const svg = ref.current;
    if (!svg) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Pulse neurons
    const circles = svg.querySelectorAll<SVGCircleElement>("circle.neuron");
    const tl = gsap.timeline({ repeat: -1 });
    circles.forEach((c, i) => {
      tl.to(c, { attr: { r: parseFloat(c.getAttribute("r") || "5") * 1.6 }, opacity: 1, duration: 0.6, ease: "sine.inOut" }, i * 0.18)
        .to(c, { attr: { r: parseFloat(c.getAttribute("r") || "5") }, opacity: 0.45, duration: 0.6, ease: "sine.inOut" }, i * 0.18 + 0.6);
    });

    // Animate pulse dots along paths
    const pulseDots = svg.querySelectorAll<SVGCircleElement>("circle.pulse");
    pulseDots.forEach((dot, i) => {
      const pulse = PULSES[i];
      if (!pulse) return;
      const from = NEURONS[pulse.edge[0]];
      const to = NEURONS[pulse.edge[1]];
      gsap.set(dot, { attr: { cx: from.cx, cy: from.cy }, opacity: 0 });
      gsap.timeline({ repeat: -1, delay: pulse.delay })
        .to(dot, { opacity: 1, duration: 0.1 })
        .to(dot, { attr: { cx: to.cx, cy: to.cy }, duration: pulse.duration, ease: "none" })
        .to(dot, { opacity: 0, duration: 0.15 })
        .set(dot, { attr: { cx: from.cx, cy: from.cy } });
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <svg
      ref={ref}
      className={className}
      style={{ width: "100%", maxWidth: 420, height: "auto", ...style }}
      viewBox="0 0 420 420"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="210" cy="210" rx="170" ry="155" fill="url(#brainGlow)" />

      {/* Brain outline */}
      <path
        d={BRAIN_PATH}
        stroke="rgba(255,90,31,0.35)"
        strokeWidth={1.5}
        fill="rgba(255,90,31,0.04)"
      />

      {/* Synaptic edges */}
      {SYNAPSES.map(([a, b], i) => (
        <line
          key={i}
          x1={NEURONS[a].cx}
          y1={NEURONS[a].cy}
          x2={NEURONS[b].cx}
          y2={NEURONS[b].cy}
          stroke="rgba(255,162,116,0.22)"
          strokeWidth={1}
        />
      ))}

      {/* Neuron nodes */}
      {NEURONS.map((n, i) => (
        <circle
          key={i}
          className="neuron"
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={n.color}
          opacity={0.45}
          filter="url(#glow)"
        />
      ))}

      {/* Traveling pulse particles */}
      {PULSES.map((pulse, i) => {
        const from = NEURONS[pulse.edge[0]];
        return (
          <circle
            key={`pulse-${i}`}
            className="pulse"
            cx={from.cx}
            cy={from.cy}
            r={2.5}
            fill="#fff"
            opacity={0}
          />
        );
      })}
    </svg>
  );
}
