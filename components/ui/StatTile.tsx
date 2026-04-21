"use client";

import { useCountUp } from "@/lib/hooks/useCountUp";

export function StatTile({
  num,
  label,
  note,
  suffix = "",
  prefix = "",
  showPlus = false,
}: {
  num: number;
  label: string;
  note?: string;
  suffix?: string;
  prefix?: string;
  showPlus?: boolean;
}) {
  const ref = useCountUp(num, { suffix, prefix });
  return (
    <div className="stat">
      <div className="stat__num">
        <span ref={ref}>0</span>
        {showPlus ? <span className="stat__plus">+</span> : null}
      </div>
      <div className="stat__lbl">{label}</div>
      {note ? <div className="stat__note">{note}</div> : null}
    </div>
  );
}
