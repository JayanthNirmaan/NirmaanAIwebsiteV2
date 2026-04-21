export function Kicker({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div className="kicker t-micro" style={style}>{children}</div>;
}
