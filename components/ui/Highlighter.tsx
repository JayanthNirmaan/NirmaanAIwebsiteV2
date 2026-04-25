"use client";

import React from "react";
import { useHighlighter } from "@/lib/hooks/useHighlighter";

type Variant = "orange" | "violet" | "sky" | "marker-sky" | "marker-orange" | "marker-yellow" | "marker-mint" | "marker-green" | "circle";

const variantClass: Record<Variant, string> = {
  orange: "hl--orange",
  violet: "hl--violet",
  sky: "hl--sky",
  "marker-sky": "hl--marker",
  "marker-orange": "hl--marker hl--orange",
  "marker-yellow": "hl--marker hl--yellow",
  "marker-mint": "hl--marker hl--mint",
  "marker-green": "hl--marker hl--green",
  circle: "hl--circle",
};

const pathFor = (variant: Variant) => {
  if (variant === "circle") {
    // Hand-drawn, imperfect loop — asymmetric curves, slight overshoot past start
    return "M 18 52 C 35 14, 180 6, 285 44 C 312 60, 292 90, 165 94 C 55 96, 2 78, 14 50 C 18 38, 35 28, 60 22";
  }
  // default underline stroke — hand-drawn, subtly curved
  return "M4 7 C 80 3, 200 10, 296 5";
};

const viewBoxFor = (variant: Variant) => (variant === "circle" ? "0 0 300 100" : "0 0 300 12");

export function Highlighter({
  children,
  variant = "orange",
  as = "span",
}: {
  children: React.ReactNode;
  variant?: Variant;
  as?: "span" | "em";
}) {
  const ref = useHighlighter<HTMLSpanElement>();
  const Tag = as as "span";
  return (
    <Tag ref={ref as React.Ref<HTMLSpanElement>} className={`hl ${variantClass[variant]}`}>
      <span>{children}</span>
      <svg className="hl__svg" preserveAspectRatio="none" viewBox={viewBoxFor(variant)} aria-hidden>
        <path className="hl__path" d={pathFor(variant)} />
      </svg>
    </Tag>
  );
}
