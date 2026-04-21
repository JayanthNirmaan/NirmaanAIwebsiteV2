import React from "react";

type Variant = "default" | "accent" | "dark" | "sky" | "violet" | "mint" | "rose";

const variantClass: Record<Variant, string> = {
  default: "",
  accent: "chip--accent",
  dark: "chip--dark",
  sky: "chip--sky",
  violet: "chip--violet",
  mint: "chip--mint",
  rose: "chip--rose",
};

export function Chip({
  children,
  variant = "default",
  className = "",
  style,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`chip ${variantClass[variant]} ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}
