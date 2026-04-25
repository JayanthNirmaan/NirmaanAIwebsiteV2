"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function WaitlistModal({ open, onClose }: Props) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Focus input on open */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setSubmitted(false);
      setValue("");
    }
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="waitlist-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Join the waitlist"
    >
      <div className="waitlist-panel">
        {/* Close button */}
        <button className="waitlist-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {submitted ? (
          <div className="waitlist-success">
            <div className="waitlist-success__icon" aria-hidden>✓</div>
            <p className="waitlist-hero-title">You&rsquo;re on the list!</p>
            <p className="waitlist-sub" style={{ marginTop: 8 }}>We&rsquo;ll reach out when we launch.</p>
          </div>
        ) : (
          <>
            {/* Top block */}
            <div className="waitlist-top">
              <p className="waitlist-hero-title">We are launching soon</p>
              <p className="waitlist-tagline">Good things take time</p>
            </div>

            {/* Divider gap */}
            <div style={{ height: 28 }} />

            {/* Join section */}
            <div className="waitlist-join">
              <p className="waitlist-join-title">Join the waitlist</p>
              <p className="waitlist-join-sub">
                Get early access to Nirmaan AI &mdash; the best AI tutor for your education
              </p>

              <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
                <input
                  ref={inputRef}
                  className="waitlist-input"
                  type="text"
                  placeholder="Email or phone number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoComplete="email"
                />
                <button type="submit" className="waitlist-btn">
                  <span>Get notified</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden width="16" height="16">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </form>

              <p className="waitlist-contact">
                Reach out to us on{" "}
                <a href="mailto:hello@nirmaan.education" className="waitlist-contact__link">
                  hello@nirmaan.education
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
