"use client";

import { motion } from "framer-motion";

type Variant = "orange" | "sky" | "violet" | "mint";

const colorVar: Record<Variant, string> = {
  orange: "var(--orange-500)",
  sky: "var(--sky-500)",
  violet: "var(--violet-500)",
  mint: "var(--mint-500)",
};

export function CheckItem({
  children,
  variant = "orange",
}: {
  children: React.ReactNode;
  variant?: Variant;
}) {
  const color = colorVar[variant];

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.05 }}
        style={{
          flex: "0 0 auto",
          width: 22,
          height: 22,
          borderRadius: 6,
          background: color,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 4,
          boxShadow: `0 2px 6px -1px ${color}55`,
        }}
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 12.5 L10 17.5 L19 7.5"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
          />
        </svg>
      </motion.span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}
