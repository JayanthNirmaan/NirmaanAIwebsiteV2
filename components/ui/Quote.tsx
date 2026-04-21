export function Quote({
  text,
  name,
  role,
  initials,
  avatar = "ink",
}: {
  text: string;
  name: string;
  role: string;
  initials: string;
  avatar?: "orange" | "ink";
}) {
  return (
    <div className="quote">
      <span className="quote__mark" aria-hidden>&ldquo;</span>
      <p className="quote__text">{text}</p>
      <div className="quote__who">
        <div className={`quote__avatar quote__avatar--${avatar}`}>{initials}</div>
        <div>
          <div className="quote__name">{name}</div>
          <div className="quote__role">{role}</div>
        </div>
      </div>
    </div>
  );
}
