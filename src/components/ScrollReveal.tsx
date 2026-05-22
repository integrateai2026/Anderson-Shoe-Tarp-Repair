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

/**
 * ScrollReveal — mobile-safe scroll animation.
 *
 * Uses CSS transitions (not GSAP) so animations run on the browser's
 * compositor thread with no JavaScript timing dependency. Triggered by
 * IntersectionObserver, which is fully reliable on iOS Safari.
 *
 * No async imports = no gap between element being hidden and animation
 * starting = no permanently-invisible elements on slow mobile connections.
 */

const DURATION = 0.85; // seconds for the CSS transition
const STAGGER  = 0.09; // seconds between staggered children

function show(el: HTMLElement, delay: number) {
  /**
   * Double-rAF pattern — critical for CSS transitions to fire reliably.
   *
   * If we set `transition` and `opacity:1` in the same frame the browser
   * batches them and skips the animation (already at target value).
   *
   * Frame 1: browser paints/commits the current opacity:0 state.
   * Frame 2: we change the value — now there is a real before/after
   *          difference for the transition to animate between.
   */
  requestAnimationFrame(() => {
    // Frame 1 — ensure opacity:0 is committed to the render pipeline
    void el.offsetHeight; // force a style recalculation
    requestAnimationFrame(() => {
      // Frame 2 — apply transition + new values; transition will fire
      el.style.transition = [
        `opacity ${DURATION}s ease ${delay}s`,
        `transform ${DURATION}s ease ${delay}s`,
      ].join(", ");
      el.style.opacity = "1";
      el.style.transform = "translateY(0) translateX(0)";
    });
  });
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

    // Respect reduced-motion — skip all animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Decide what we're animating: the wrapper itself, or its children
    const targets = stagger
      ? (Array.from(el.children) as HTMLElement[])
      : [el];

    const fromY = stagger ? 24 : 20;

    // ── 1. Hide targets synchronously (before any paint) ─────────────────
    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = `translateY(${fromY}px) translateX(${fromX}px)`;
    });

    // ── 2. Reveal helper ──────────────────────────────────────────────────
    const revealAll = () => {
      targets.forEach((t, i) => {
        show(t, delay + (stagger ? i * STAGGER : 0));
      });
    };

    // ── 3. If already in view on load, reveal immediately ────────────────
    const { top, bottom } = el.getBoundingClientRect();
    if (top < window.innerHeight * 0.95 && bottom > 0) {
      revealAll();
      return;
    }

    // ── 4. Otherwise, IntersectionObserver fires when element scrolls in ─
    // IntersectionObserver is natively reliable on iOS Safari, unlike
    // GSAP ScrollTrigger which can miss momentum-scroll events.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          revealAll();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger, fromX]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Component>
  );
}
