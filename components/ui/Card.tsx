import React from "react";

export function Card({
  children,
  dark = false,
  className = "",
  style,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`card ${dark ? "card--dark" : ""} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
