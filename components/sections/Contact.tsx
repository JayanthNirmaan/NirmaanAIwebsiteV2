"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin } from "lucide-react";
import { FlowButton } from "@/components/ui/FlowButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { contact } from "@/content/home";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("That doesn't look like an email"),
  role: z.string().min(1, "Pick a role"),
  message: z.string().min(10, "A little more context helps"),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const directCardRef = useRef<HTMLDivElement | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    reset();
  };

  useEffect(() => {
    registerGSAP();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.from(headRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" },
        });
      }

      if (formCardRef.current) {
        gsap.from(formCardRef.current, {
          x: -50,
          opacity: 0,
          scale: 0.97,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: formCardRef.current, start: "top 80%" },
        });

        // Form fields stagger in
        gsap.from(formCardRef.current.querySelectorAll(".field"), {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: formCardRef.current, start: "top 75%" },
        });

        // Submit button
        gsap.from(formCardRef.current.querySelectorAll(".flow-btn, button[type='submit']"), {
          scale: 0.85,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: formCardRef.current, start: "top 65%" },
        });
      }

      if (directCardRef.current) {
        gsap.from(directCardRef.current, {
          x: 50,
          opacity: 0,
          scale: 0.97,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: directCardRef.current, start: "top 80%" },
        });

        // Contact detail links
        gsap.from(directCardRef.current.querySelectorAll("a, .chip"), {
          y: 14,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: directCardRef.current, start: "top 72%" },
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="section contact-section" id="contact" ref={rootRef} style={{ position: "relative", overflow: "hidden" }}>
      <InteractiveGrid cols={28} rows={14} className="contact-grid" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div ref={headRef}>
          <SectionHead
            kicker={contact.kicker}
            title={<>{contact.title}</>}
            meta={<>
              <div className="t-micro">Reach us</div>
              <div className="u-mono" style={{ marginTop: 8 }}>{contact.meta}</div>
            </>}
          />
        </div>

        <div className="grid grid-2" style={{ alignItems: "stretch" }}>
          {/* Form */}
          <div ref={formCardRef}>
            <Card style={{ padding: 40 }}>
              {sent ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", padding: "40px 0" }}>
                  <Chip variant="mint">{contact.form.sentChip}</Chip>
                  <p className="t-body-lg">{contact.form.sentLine}</p>
                  <button
                    className="t-small"
                    style={{ color: "var(--ink-500)", cursor: "pointer", marginTop: 8 }}
                    onClick={() => setSent(false)}
                  >
                    &larr; Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 20 }} noValidate>
                  <div className="field">
                    <label className="label" htmlFor="name">{contact.form.nameLabel}</label>
                    <input
                      id="name"
                      className="input"
                      placeholder={contact.form.namePlaceholder}
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    {errors.name ? <div className="field__error">{errors.name.message}</div> : null}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="email">{contact.form.emailLabel}</label>
                    <input
                      id="email"
                      type="email"
                      className="input"
                      placeholder={contact.form.emailPlaceholder}
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    {errors.email ? <div className="field__error">{errors.email.message}</div> : null}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="role">{contact.form.roleLabel}</label>
                    <select id="role" className="select" defaultValue="" aria-invalid={!!errors.role} {...register("role")}>
                      <option value="" disabled>Pick a role&hellip;</option>
                      {contact.form.roles.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    {errors.role ? <div className="field__error">{errors.role.message}</div> : null}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="message">{contact.form.messageLabel}</label>
                    <textarea
                      id="message"
                      className="textarea"
                      placeholder={contact.form.messagePlaceholder}
                      aria-invalid={!!errors.message}
                      {...register("message")}
                    />
                    {errors.message ? <div className="field__error">{errors.message.message}</div> : null}
                  </div>

                  <div>
                    <FlowButton type="submit">
                      {isSubmitting ? contact.form.sending : contact.form.submit}
                    </FlowButton>
                  </div>
                </form>
              )}
            </Card>
          </div>

          {/* Direct */}
          <div ref={directCardRef}>
            <Card style={{ padding: 40, display: "flex", flexDirection: "column", gap: 24, background: "var(--ink-50)" }}>
              <h3 className="t-h3">{contact.direct.heading}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <a href={`mailto:${contact.direct.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  <Mail size={18} />
                  <span className="t-body">{contact.direct.email}</span>
                </a>
                <a href={`tel:${contact.direct.phone.replace(/[^+\d]/g, "")}`} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  <Phone size={18} />
                  <span className="t-body">{contact.direct.phone}</span>
                </a>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  <MapPin size={18} />
                  <Chip variant="default">{contact.direct.location}</Chip>
                </div>
              </div>

            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
