import Link from "next/link";
import React from "react";

type Variant = "default" | "accent" | "outline" | "light";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "sm" | "md" | "lg";
};

const variantClass: Record<Variant, string> = {
  default: "",
  accent: "flow-btn--accent",
  outline: "flow-btn--outline",
  light: "flow-btn--light",
};

const sizeStyle = {
  sm: { padding: "10px 16px", fontSize: 13 },
  md: {},
  lg: { padding: "16px 26px", fontSize: 16 },
} as const;

const Arrow = ({ inbound = false }: { inbound?: boolean }) => (
  <svg
    className={inbound ? "flow-btn__arrow-in" : "flow-btn__arrow-out"}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export function FlowButton({
  children,
  href,
  variant = "default",
  className = "",
  onClick,
  type = "button",
  size = "md",
}: Props) {
  const classes = ["flow-btn", variantClass[variant], className].filter(Boolean).join(" ");
  const style = sizeStyle[size];

  const inner = (
    <>
      <span className="flow-btn__label">{children}</span>
      <span className="flow-btn__icon">
        <Arrow />
        <Arrow inbound />
      </span>
    </>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external) {
      return (
        <a className={classes} href={href} style={style}>
          {inner}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} style={style}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} style={style} type={type} onClick={onClick}>
      {inner}
    </button>
  );
}
