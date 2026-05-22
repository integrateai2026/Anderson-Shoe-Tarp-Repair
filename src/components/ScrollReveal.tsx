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

    // Skip animation entirely for reduced-motion users
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Is the element already visible on load?
    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

    // Pre-hide below-fold elements synchronously so they don't flash
    // visible before GSAP loads. Elements in view are left untouched.
    if (!inView) {
      if (stagger) {
        Array.from(el.children).forEach((c) => {
          (c as HTMLElement).style.opacity = "0";
        });
      } else {
        el.style.opacity = "0";
      }
    }

    // Run the GSAP animation (called once the element is in view)
    const animate = async () => {
      try {
        const { gsap } = await import("gsap");

        if (stagger) {
          gsap.fromTo(
            Array.from(el.children),
            { y: 24, opacity: 0, x: fromX },
            {
              y: 0,
              opacity: 1,
              x: 0,
              duration: 1.0,
              ease: "power2.out",
              stagger: 0.1,
              delay,
              clearProps: "transform,opacity",
            }
          );
        } else {
          gsap.fromTo(
            el,
            { y: 20, opacity: 0, x: fromX },
            {
              y: 0,
              opacity: 1,
              x: 0,
              duration: 1.1,
              ease: "power2.out",
              delay,
              clearProps: "transform,opacity",
            }
          );
        }
      } catch {
        // GSAP failed — just make the element visible
        if (stagger) {
          Array.from(el.children).forEach((c) => {
            (c as HTMLElement).style.opacity = "1";
            (c as HTMLElement).style.transform = "none";
          });
        } else {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      }
    };

    // Already visible on load → animate immediately, no observer needed
    if (inView) {
      animate();
      return;
    }

    // Below the fold → IntersectionObserver fires when user scrolls to it.
    // IntersectionObserver is fully reliable on iOS Safari; ScrollTrigger is not.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          animate();
        }
      },
      {
        // Trigger when at least 5% of the element enters the viewport.
        // Negative bottom margin gives a small head-start before fully in view.
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger, fromX]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Component>
  );
}
