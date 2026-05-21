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

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (stagger) {
        const children = Array.from(el.children);
        gsap.fromTo(
          children,
          { y: 24, opacity: 0, x: fromX },
          {
            y: 0,
            opacity: 1,
            x: 0,
            duration: 1.0,
            ease: "power2.out",
            stagger: 0.1,
            delay,
            force3D: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
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
            force3D: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    run();
  }, [delay, stagger, fromX]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Component>
  );
}
