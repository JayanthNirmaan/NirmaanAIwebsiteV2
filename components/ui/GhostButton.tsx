import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
};

const sizeStyle = {
  sm: { padding: "10px 16px", fontSize: 13 },
  md: {},
  lg: { padding: "16px 26px", fontSize: 16 },
} as const;

export function GhostButton({ children, href, onClick, className = "", size = "md", type = "button" }: Props) {
  const classes = ["btn-ghost", className].filter(Boolean).join(" ");
  const style = sizeStyle[size];
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external) {
      return (
        <a className={classes} href={href} style={style}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} style={style} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
