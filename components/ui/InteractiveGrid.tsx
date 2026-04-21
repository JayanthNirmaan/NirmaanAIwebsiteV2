"use client";

import { useEffect, useRef } from "react";
import { mountIGrid } from "@/lib/igrid";

export function InteractiveGrid({
  cols = 20,
  rows = 10,
  colorful = false,
  square = false,
  className = "",
  style,
}: {
  cols?: number;
  rows?: number;
  colorful?: boolean;
  square?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return mountIGrid(el);
  }, [cols, rows, square]);

  return (
    <div
      ref={ref}
      className={`igrid ${colorful ? "igrid--colorful" : ""} ${className}`.trim()}
      data-igrid
      data-cols={cols}
      data-rows={rows}
      data-square={square ? "true" : undefined}
      style={style}
      aria-hidden
    />
  );
}
