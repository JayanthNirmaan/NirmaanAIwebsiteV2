export function BellCurve({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 1000 700" fill="none" aria-hidden>
      <path
        d="M50 620 C 280 620, 340 90, 550 90 C 720 90, 740 620, 950 620"
        stroke="#FFC6A3"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d="M80 620 C 320 620, 420 160, 620 160 C 780 160, 790 620, 960 620"
        stroke="#FF8448"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d="M120 620 C 360 620, 520 120, 720 120 C 860 120, 860 620, 970 620"
        stroke="#FF5A1F"
        strokeWidth={18}
        strokeLinecap="round"
      />
    </svg>
  );
}
