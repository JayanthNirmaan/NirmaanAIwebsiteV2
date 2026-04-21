import { Kicker } from "./Kicker";

export function SectionHead({
  kicker,
  title,
  meta,
  description,
  kickerStyle,
}: {
  kicker?: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  description?: React.ReactNode;
  kickerStyle?: React.CSSProperties;
}) {
  return (
    <div className="section-head">
      <div className="section-head__title">
        {kicker ? <Kicker style={kickerStyle}>{kicker}</Kicker> : null}
        <h2 className="t-h1">{title}</h2>
        {description ? <p className="t-body-lg" style={{ marginTop: 16, maxWidth: 580 }}>{description}</p> : null}
      </div>
      {meta ? <div className="section-head__meta">{meta}</div> : null}
    </div>
  );
}
