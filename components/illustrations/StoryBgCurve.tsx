export function StoryBgCurve() {
  return (
    <svg
      className="story__bg-curve"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Light background sweep */}
      <path
        d="M -100 820 C 300 820, 600 200, 1050 80 C 1250 20, 1380 120, 1600 320"
        stroke="#FFB19A"
        strokeWidth={18}
        strokeLinecap="round"
        fill="none"
        opacity={0.45}
      />
      {/* Mid coral sweep */}
      <path
        d="M -100 860 C 280 860, 580 280, 1020 120 C 1230 50, 1370 160, 1600 400"
        stroke="#FF6B35"
        strokeWidth={28}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />
      {/* Dominant red-orange — thickest, most forward */}
      <path
        d="M -100 900 C 260 900, 560 360, 990 160 C 1210 80, 1360 200, 1600 480"
        stroke="#E8330A"
        strokeWidth={42}
        strokeLinecap="round"
        fill="none"
        opacity={0.65}
      />
    </svg>
  );
}
