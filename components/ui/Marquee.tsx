import React from "react";

export function Marquee({ children, speed = 32 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="marquee">
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {children}
        {children}
      </div>
    </div>
  );
}
