"use client";
import React, { useEffect, useRef, ReactNode, ElementType } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  fromX?: number;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
  fromX = 0,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ── Reduced motion: skip animation entirely, show immediately ─────────
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // element already visible at default opacity
    }

    // ── Safety fallback: if GSAP fails to initialise in 2 s, unhide ──────
    const fallback = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "none";
      if (stagger) {
        Array.from(el.children).forEach((c) => {
          (c as HTMLElement).style.opacity = "1";
          (c as HTMLElement).style.transform = "none";
        });
      }
    }, 2000);

    const run = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        clearTimeout(fallback);

        // ── Is element already in the viewport? Animate immediately ───────
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.95;

        const commonTo = {
          y: 0, opacity: 1, x: 0,
          duration: 1.0,
          ease: "power2.out",
          delay,
          force3D: false,
          clearProps: "transform,opacity",
        };

        const trigger = inView
          ? undefined   // already visible → no scroll trigger needed
          : {
              trigger: el,
              start: "top 92%",    // generous threshold — works on mobile
              toggleActions: "play none none none",
              once: true,           // fire once, never get "stuck"
              invalidateOnRefresh: true, // recalc on orientation change
            };

        if (stagger) {
          const kids = Array.from(el.children);
          gsap.fromTo(
            kids,
            { y: 24, opacity: 0, x: fromX },
            { ...commonTo, stagger: 0.1, scrollTrigger: trigger }
          );
        } else {
          gsap.fromTo(
            el,
            { y: 20, opacity: 0, x: fromX },
            { ...commonTo, duration: 1.1, scrollTrigger: trigger }
          );
        }

        // ── Refresh after a tick so iOS has laid out the page ─────────────
        requestAnimationFrame(() => ScrollTrigger.refresh());

      } catch {
        // GSAP failed — make element visible
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    };

    run();
    return () => clearTimeout(fallback);
  }, [delay, stagger, fromX]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Component>
  );
}
