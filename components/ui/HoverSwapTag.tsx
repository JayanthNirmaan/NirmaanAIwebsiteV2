"use client";

import { useState } from "react";

interface HoverSwapTagProps {
  defaultText?: string;
  hoverText?: string;
}

export function HoverSwapTag({
  defaultText = "Personalized 1:1 learning",
  hoverText = "anytime, anywhere, at any level",
}: HoverSwapTagProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        borderRadius: 999,
        border: "1px solid rgba(10, 10, 11, 0.08)",
        background:
          "linear-gradient(135deg, rgba(60, 60, 65, 0.95) 0%, rgba(40, 40, 45, 0.85) 50%, rgba(30, 30, 35, 0.75) 100%)",
        padding: "10px 18px",
        cursor: "pointer",
        transition: "all 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        font: "inherit",
        color: "#ffffff",
        boxShadow: "0 1px 2px rgba(16, 16, 18, 0.04)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.35)";
        e.currentTarget.style.background =
          "linear-gradient(135deg, rgba(50, 55, 50, 1) 0%, rgba(35, 45, 38, 0.95) 50%, rgba(30, 40, 32, 0.85) 100%)";
        e.currentTarget.style.boxShadow =
          "0 6px 24px rgba(16, 185, 129, 0.18), 0 0 0 1px rgba(16, 185, 129, 0.12)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "rgba(10, 10, 11, 0.08)";
        e.currentTarget.style.background =
          "linear-gradient(135deg, rgba(60, 60, 65, 0.95) 0%, rgba(40, 40, 45, 0.85) 50%, rgba(30, 30, 35, 0.75) 100%)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(16, 16, 18, 0.04)";
      }}
    >
      {/* Live pulse indicator */}
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          height: 8,
          width: 8,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "inline-flex",
            height: "100%",
            width: "100%",
            borderRadius: 999,
            background: "#10b981",
            opacity: 0.65,
            animation: "hoverSwapPing 1.6s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        />
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            height: 8,
            width: 8,
            borderRadius: 999,
            background: "#10b981",
          }}
        />
      </span>

      {/* Swap text */}
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          height: "1.2em",
          width: Math.max(defaultText.length, hoverText.length) * 0.52 + "em",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            textAlign: "center",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
            transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms",
            transform: isHovered ? "translateY(-110%)" : "translateY(0)",
            opacity: isHovered ? 0 : 1,
          }}
        >
          {defaultText}
        </span>
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            textAlign: "center",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
            color: "#059669",
            fontStyle: "italic",
            transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms",
            transform: isHovered ? "translateY(0)" : "translateY(110%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          {hoverText}
        </span>
      </span>

      {/* Arrow */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        style={{
          color: "var(--muted)",
          transition: "transform 300ms ease, opacity 300ms ease",
          transform: isHovered
            ? "translateX(2px) rotate(-45deg)"
            : "translateX(0) rotate(0)",
          opacity: isHovered ? 1 : 0.5,
          flexShrink: 0,
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>

      <style>{`
        @keyframes hoverSwapPing {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
