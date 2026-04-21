"use client";

import { useEffect, useRef, useState } from "react";
import { registerGSAP, gsap } from "@/lib/gsap";

export function SignatureWaves() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    registerGSAP();
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let time = 0;

    const updateWaves = () => {
      time += 0.005;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mid = 0.5;
      const amp = isMobile ? 0.2 : 0.3;

      const generateWave = (phaseOff: number, speedOff: number = 1) => {
        const d = [];
        const segments = 6;
        for (let i = 0; i <= segments; i++) {
          const x = i / segments;
          const k = Math.PI * 2;
          const w = speedOff;
          let y = mid + amp * Math.sin(k * x - time * w + phaseOff);
          d.push({ x: x * width, y: y * height });
        }

        let path = `M ${d[0].x} ${d[0].y}`;
        for (let i = 0; i < d.length - 1; i++) {
          const p0 = i > 0 ? d[i - 1] : d[0];
          const p1 = d[i];
          const p2 = d[i + 1];
          const p3 = i !== d.length - 2 ? d[i + 2] : p2;

          const cp1x = p1.x + (p2.x - p0.x) / 6;
          const cp1y = p1.y + (p2.y - p0.y) / 6;

          const cp2x = p2.x - (p3.x - p1.x) / 6;
          const cp2y = p2.y - (p3.y - p1.y) / 6;

          path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }
        return path;
      };

      if (wave1Ref.current) wave1Ref.current.setAttribute("d", generateWave(0, 1.2));
      if (wave2Ref.current) wave2Ref.current.setAttribute("d", generateWave(Math.PI / 3, 1.0));
      if (wave3Ref.current) wave3Ref.current.setAttribute("d", generateWave(Math.PI / 1.5, 0.8));
    };

    gsap.ticker.add(updateWaves);
    return () => gsap.ticker.remove(updateWaves);
  }, [isMobile]);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg style={{ width: "100%", height: "100%", willChange: "transform" }} preserveAspectRatio="none">
        <path
          ref={wave1Ref}
          fill="none"
          stroke="#FFB19A"
          strokeWidth="2"
          style={{ opacity: 0.35 }}
        />
        {!isMobile && (
          <path
            ref={wave2Ref}
            fill="none"
            stroke="#FF6B35"
            strokeWidth="3"
            style={{ opacity: 0.4 }}
          />
        )}
        <path
          ref={wave3Ref}
          fill="none"
          stroke="#E8330A"
          strokeWidth="4"
          style={{ opacity: 0.3 }}
        />
      </svg>
    </div>
  );
}
