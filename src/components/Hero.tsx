"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const BASE = "?w=900&q=80&auto=format&fit=crop&crop=center";

const STAGES = [
  {
    label: "Worn",
    stamp: "01 · The boots arrive",
    // worn leather boots — proven working image
    src: `https://images.unsplash.com/photo-1449505278894-297fdb3edbc1${BASE}`,
    filter: "grayscale(0.55) brightness(0.7) contrast(0.88) saturate(0.4)",
    alt: "Worn leather boots arriving at the shop before repair",
  },
  {
    label: "Stitched",
    stamp: "02 · Hand-stitching the welt",
    // cobbler tools + boot on workbench
    src: `https://images.unsplash.com/photo-1529953717281-81a40b131119${BASE}`,
    filter: "sepia(0.1) brightness(0.82) contrast(1.05) saturate(0.8)",
    alt: "Shoemaker tools and a leather boot on the workbench",
  },
  {
    label: "Polished",
    stamp: "03 · Polish & condition",
    // leather boots from a different angle — filtered to look mid-process
    src: `https://images.unsplash.com/photo-1511283402428-355853756676${BASE}`,
    filter: "brightness(0.88) contrast(1.1) saturate(0.85) sepia(0.08)",
    alt: "Leather boots mid-restoration — polishing and conditioning",
  },
  {
    label: "Restored",
    stamp: "04 · Restored, like new",
    // clean brown leather lace-up boots
    src: `https://images.unsplash.com/photo-1608256246200-53e635b5b65f${BASE}`,
    filter: "brightness(1.05) contrast(1.12) saturate(1.08)",
    alt: "Beautifully restored clean brown leather lace-up boots",
  },
];

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
          {STAGES.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt={s.alt}
              className={styles.stageImg}
              style={{
                opacity: i === stage ? 1 : 0,
                filter: s.filter,
              }}
            />
          ))}
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
