"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0.9, opacity: 0, y: 12 },
    animate: { scale: 1, opacity: 1, y: 0, originY: 0 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: "spring" as const, stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout>
      {children}
    </motion.div>
  );
}

export function AnimatedList({
  children,
  delay = 1000,
  startDelay = 0,
  retrigger = false,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  startDelay?: number;
  retrigger?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
          } else if (retrigger) {
            setInView(false);
            setStarted(false);
            setIndex(0);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [retrigger]);

  useEffect(() => {
    if (!inView) return;
    if (startDelay === 0) {
      setStarted(true);
      return;
    }
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [inView, startDelay]);

  useEffect(() => {
    if (!inView || !started) return;
    if (index >= childrenArray.length) return;
    const t = setTimeout(() => setIndex((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [index, childrenArray.length, delay, inView, started]);

  const itemsToShow = childrenArray.slice(0, index);

  return (
    <div ref={rootRef} className={className} style={style}>
      <AnimatePresence>
        {itemsToShow.map((item, i) => {
          const el = item as React.ReactElement;
          return (
            <AnimatedListItem key={`${(el.key ?? i)}-${inView ? "on" : "off"}`}>
              {el}
            </AnimatedListItem>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
