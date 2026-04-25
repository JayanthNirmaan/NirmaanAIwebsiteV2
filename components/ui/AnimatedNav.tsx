"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { nav } from "@/content/home";

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring" as const, damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring" as const,
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 300,
      when: "afterChildren" as const,
      staggerChildren: 0.05,
      staggerDirection: -1 as const,
    },
  },
};

const itemVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 15 },
  },
  collapsed: {
    opacity: 0,
    x: -20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, damping: 15, stiffness: 300, delay: 0.15 },
  },
};

export function AnimatedNav() {
  const [isExpanded, setExpanded] = React.useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      whileHover={!isExpanded ? { scale: 1.1 } : {}}
      whileTap={!isExpanded ? { scale: 0.95 } : {}}
      onClick={handleNavClick}
      style={{
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: "999px",
        border: "none",
        background: "rgba(241,219,206,0.06)",
        backdropFilter: "saturate(180%) blur(16px)",
        WebkitBackdropFilter: "saturate(180%) blur(16px)",
        boxShadow: "0 4px 24px -4px rgba(16,16,18,0.14), 0 0 0 1px #FF9068",
        height: "48px",
        cursor: !isExpanded ? "pointer" : "default",
        justifyContent: !isExpanded ? "center" : undefined,
        position: "relative",
      }}
    >
      {/* Nav links */}
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: 0,
          pointerEvents: !isExpanded ? "none" : undefined,
        }}
      >
        {nav.links.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            variants={itemVariants}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: "13.5px",
              fontWeight: 500,
              color: "var(--ink-600)",
              padding: "6px 14px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
              transition: "color 0.18s, background 0.18s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--orange-300)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--ink-100)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-600)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            {item.label}
          </motion.a>
        ))}
      </motion.div>

      {/* Collapsed menu icon */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <motion.div
          variants={collapsedIconVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          <Menu size={20} color="var(--ink-700)" />
        </motion.div>
      </div>
    </motion.nav>
  );
}
