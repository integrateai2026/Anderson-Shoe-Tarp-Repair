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
 * Uses CSS @keyframes (sr-reveal, defined in globals.css) triggered by
 * IntersectionObserver. Unlike CSS transitions, @keyframes animations
 * always play from their `from` state when the class is added — there is
 * no "same-frame batching" problem on iOS Safari's compositor thread.
 *
 * How it works:
 *   1. On mount: hide targets via opacity:0 inline + set CSS vars for
 *      the starting transform values used by the `from` keyframe.
 *   2. When element scrolls into view (or is already in view on load):
 *      add the .sr-revealed class. The browser immediately applies the
 *      animation's `from` state (opacity:0) and plays to `to` (opacity:1).
 *   3. animation-fill-mode: both keeps the element hidden during any
 *      stagger delay and visible after the animation finishes.
 */

const STAGGER = 0.09; // seconds between staggered children

function show(el: HTMLElement, delay: number) {
  el.style.setProperty("--sr-delay", `${delay}s`);
  el.classList.add("sr-revealed");
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

    // ── Mobile bail-out ───────────────────────────────────────────────────
    // On phones (< 768 px) we skip every opacity/transform trick and let
    // content render at full opacity. This guarantees visibility on iOS
    // Safari, where CSS-animation + inline-opacity interactions are buggy.
    // Scroll-reveal is a desktop enhancement; mobile users always see content.
    if (window.matchMedia("(max-width: 767px)").matches) return;

    // Respect reduced-motion — skip all animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Decide what we're animating: the wrapper itself, or its children
    const targets = stagger
      ? (Array.from(el.children) as HTMLElement[])
      : [el];

    const fromY = stagger ? 24 : 20;

    // ── 1. Hide targets synchronously (before any paint) ─────────────────
    // Store animation start values as CSS custom properties so the
    // `from` keyframe in globals.css can read them.
    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.setProperty("--sr-from-y", `${fromY}px`);
      t.style.setProperty("--sr-from-x", `${fromX}px`);
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
