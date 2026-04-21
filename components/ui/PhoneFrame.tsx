import React from "react";

export function PhoneFrame({
  children,
  lg = false,
  className = "",
  style,
}: {
  children?: React.ReactNode;
  lg?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`phone ${lg ? "phone--lg" : ""} ${className}`.trim()} style={style}>
      <div className="phone__notch" aria-hidden />
      <div className="phone__screen">{children}</div>
    </div>
  );
}
