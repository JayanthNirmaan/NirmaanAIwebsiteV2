export function BlogArt({ variant }: { variant: "waves" | "nodes" | "bell" }) {
  if (variant === "waves") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="bg-waves" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF5A1F" />
            <stop offset="100%" stopColor="#0A0A0B" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#bg-waves)" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${80 + i * 28} Q 100 ${60 + i * 28}, 200 ${80 + i * 28} T 400 ${80 + i * 28}`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1.2}
            fill="none"
          />
        ))}
      </svg>
    );
  }
  if (variant === "nodes") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="bg-nodes" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFA274" />
            <stop offset="100%" stopColor="#0A0A0B" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#bg-nodes)" />
        {[
          [80, 90], [200, 60], [320, 130], [120, 180], [280, 210], [60, 240], [220, 250], [340, 60],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 5 : 3} fill="#fff" opacity={0.7} />
        ))}
        {[[0, 1], [1, 2], [0, 3], [2, 4], [3, 4], [3, 5], [4, 6], [1, 7]].map(([a, b], i) => {
          const pts = [[80, 90], [200, 60], [320, 130], [120, 180], [280, 210], [60, 240], [220, 250], [340, 60]];
          return (
            <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
          );
        })}
      </svg>
    );
  }
  // bell
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bg-bell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFC6A3" />
          <stop offset="100%" stopColor="#0A0A0B" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg-bell)" />
      <path d="M20 240 C 100 240, 140 60, 200 60 C 260 60, 300 240, 380 240" stroke="rgba(255,255,255,0.8)" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M40 240 C 120 240, 150 100, 200 100 C 260 100, 280 240, 360 240" stroke="rgba(255,255,255,0.35)" strokeWidth={2} fill="none" strokeLinecap="round" />
    </svg>
  );
}
