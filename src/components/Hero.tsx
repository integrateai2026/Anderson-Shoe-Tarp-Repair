"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const STAGES = [
  {
    label: "Worn",
    stamp: "01 · The boots arrive",
    filter: "grayscale(0.55) brightness(0.7) contrast(0.88) saturate(0.45)",
    zoom: "1.04",
    focalX: "0.5",
    focalY: "0.5",
    focalZ: "1",
  },
  {
    label: "Stitched",
    stamp: "02 · Hand-stitching the welt",
    filter: "sepia(0.15) brightness(0.82) contrast(1.0) saturate(0.75)",
    zoom: "2.5",
    focalX: "0.6",
    focalY: "0.45",
    focalZ: "2.5",
  },
  {
    label: "Polished",
    stamp: "03 · Polish & condition",
    filter: "brightness(0.95) contrast(1.08) saturate(0.95)",
    zoom: "1.8",
    focalX: "0.4",
    focalY: "0.6",
    focalZ: "1.8",
  },
  {
    label: "Restored",
    stamp: "04 · Restored, like new",
    filter: "brightness(1.05) contrast(1.18) saturate(1.18)",
    zoom: "1.15",
    focalX: "0.5",
    focalY: "0.5",
    focalZ: "1.15",
  },
];

const BASE_IMAGE =
  "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=900&q=80&auto=format&fit=crop";

export default function Hero() {
  const [stage, setStage] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const animatedIn = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animatedIn.current) return;
    animatedIn.current = true;

    const runAnim = async () => {
      const { gsap } = await import("gsap");

      const title = titleRef.current;
      const img = imgRef.current;
      const fades = heroRef.current?.querySelectorAll("[data-hero-fade]");

      if (!title || !img) return;

      gsap.set(title, { y: 28, opacity: 0 });
      gsap.set(img, { y: 40, opacity: 0, scale: 0.98 });
      if (fades) gsap.set(Array.from(fades), { y: 16, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (fades && fades.length > 0) {
        tl.to(fades[0], { y: 0, opacity: 1, duration: 0.8 });
      }
      tl.to(title, { y: 0, opacity: 1, duration: 1.2 }, "-=0.5");
      if (fades && fades.length > 1) {
        tl.to(Array.from(fades).slice(1), {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.14,
        }, "-=0.8");
      }
      tl.to(img, { y: 0, opacity: 1, scale: 1, duration: 1.6 }, "-=1.2");
    };

    runAnim();
  }, []);

  const imgUrl = `${BASE_IMAGE}&crop=focalpoint&fp-x=${STAGES[stage].focalX}&fp-y=${STAGES[stage].focalY}&fp-z=${STAGES[stage].focalZ}`;

  return (
    <header className={styles.hero} ref={heroRef}>
      <div className={styles.heroBg} />
      <div className={`container ${styles.heroGrid}`}>
        {/* Content */}
        <div className={styles.heroContent} ref={contentRef}>
          <span className={styles.heroEyebrow} data-hero-fade>
            Fargo, North Dakota · Est. 1990
          </span>
          <h1 ref={titleRef}>
            Restore the gear you <em>already love.</em>
          </h1>
          <p className={styles.heroSub} data-hero-fade>
            Boots, Birkenstocks, leather goods, tarps &amp; heavy-duty repairs
            —{" "}
            <strong>handcrafted in Fargo for over 35 years.</strong>
          </p>
          <div className={styles.heroCtas} data-hero-fade>
            <a href="#contact" className="btn-primary">
              Get a Repair Quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#gallery" className="btn-secondary">
              See Before &amp; Afters →
            </a>
          </div>
          <div className={styles.heroTrust} data-hero-fade>
            <span className={styles.htrust}>
              <strong>4.9★</strong> Google Reviews
            </span>
            <span className={styles.htrust}>
              <strong>35+ Years</strong> on the same bench
            </span>
            <span className={styles.htrust}>
              <strong>Mail-In</strong> Repairs Available
            </span>
          </div>
        </div>

        {/* Image */}
        <div className={styles.heroImage} ref={imgRef} aria-hidden="true">
          <img
            src={imgUrl}
            alt="Worn leather boots being restored by hand"
            className={styles.stageImg}
            style={{ filter: STAGES[stage].filter }}
          />
          <div className={styles.heroImgOverlay} />
          <span className={styles.stageStamp}>
            <span className={styles.stampDot} />
            {STAGES[stage].stamp}
          </span>
          <div className={styles.heroLoop}>
            <span className={styles.loopTitle}>Restoration Loop</span>
            <div className={styles.loopDots}>
              {STAGES.map((_, i) => (
                <span key={i} className={`${styles.loopDot} ${i === stage ? styles.loopDotActive : ""}`} />
              ))}
            </div>
            <div className={styles.loopLabel}>
              {STAGES[stage].label}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`container ${styles.heroBottom}`}>
        <div className={styles.hbBanner}>
          <span className={styles.hbRule} />
          <span className={styles.stamp}>Award-Winning Craftsmanship · Since 1990</span>
          <span className={styles.hbRule} />
        </div>
        <div className={styles.hbCards}>
          <div className={styles.hbItem}>
            <div className={styles.hbIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <span className={styles.hbKey}>Hours</span>
              <span className={styles.hbVal}>
                Mon–Fri · 9 AM – 5:30 PM
                <small>Closed Saturday &amp; Sunday</small>
              </span>
            </div>
          </div>
          <div className={styles.hbItem}>
            <div className={styles.hbIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <span className={styles.hbKey}>Location</span>
              <span className={styles.hbVal}>
                3060 D 25th St. S.<small>Fargo, ND 58103</small>
              </span>
            </div>
          </div>
          <div className={`${styles.hbItem} ${styles.hbItemLast}`}>
            <div>
              <span className={styles.hbKey}>Call the shop</span>
              <span className={styles.hbVal}>
                <a href="tel:7015406614" style={{ color: "inherit", textDecoration: "none" }}>(701) 540-6614</a>
                <small>Tom answers most days</small>
              </span>
            </div>
            <div className={styles.hbIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
