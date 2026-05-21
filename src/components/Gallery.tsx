"use client";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./Gallery.module.css";

const CARDS = [
  { title: "Birkenstock Boston", desc: "Full recraft · new cork, new sole" },
  { title: "Coach leather tote", desc: "Strap repair · lining replacement" },
  { title: "Grain truck tarp", desc: "Patch + reinforced seam" },
  { title: "Carhartt jacket", desc: "Full zipper replacement" },
];

export default function Gallery() {
  const compareRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setPos = (clientX: number) => {
    const wrap = compareRef.current;
    const before = beforeRef.current;
    const handle = handleRef.current;
    if (!wrap || !before || !handle) return;
    const r = wrap.getBoundingClientRect();
    let pct = ((clientX - r.left) / r.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    before.style.width = pct + "%";
    handle.style.left = pct + "%";
  };

  useEffect(() => {
    const wrap = compareRef.current;
    if (!wrap) return;

    const onMouseDown = (e: MouseEvent) => { dragging.current = true; setPos(e.clientX); };
    const onMouseUp = () => { dragging.current = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (dragging.current) setPos(e.clientX);
      else if (e.buttons === 0) {
        const r = wrap.getBoundingClientRect();
        const hoverPct = ((e.clientX - r.left) / r.width) * 100;
        if (hoverPct > 5 && hoverPct < 95) setPos(e.clientX);
      }
    };
    const onTouchStart = (e: TouchEvent) => { dragging.current = true; setPos(e.touches[0].clientX); };
    const onTouchEnd = () => { dragging.current = false; };
    const onTouchMove = (e: TouchEvent) => { if (dragging.current) setPos(e.touches[0].clientX); };

    wrap.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      wrap.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <section className={styles.gallery} id="gallery">
      <div className="container">
        <div className="section-head">
          <div>
            <ScrollReveal>
              <span className="eyebrow">— The proof</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 style={{ marginTop: 18 }}>
                Before. <em>After.</em>
                <br />
                Same pair, second life.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="lede">
              Hover or drag the divider on the featured pair. Below: a small
              sample of recent restorations — photographed on the bench, no
              filters, no retouching.
            </p>
          </ScrollReveal>
        </div>

        {/* Featured slider */}
        <ScrollReveal className={styles.baFeature}>
          <div className={styles.baCompare} ref={compareRef}>
            {/* After (underneath, full width) */}
            <div className={styles.baSide}>
              <div className={`${styles.baPh} ${styles.baPhAfter}`}>
                <span className={`${styles.baTag} ${styles.baTagRight}`}>After</span>
                <span className={`${styles.baCap} ${styles.baCapRight}`}>
                  Restored · New welt, polish, conditioning
                </span>
              </div>
            </div>
            {/* Before (clipped to left) */}
            <div className={`${styles.baSide} ${styles.baBefore}`} ref={beforeRef} id="baBefore">
              <div className={`${styles.baPh} ${styles.baPhBefore}`}>
                <span className={styles.baTag}>Before</span>
                <span className={styles.baCap}>
                  Worn · Cracked welt, separated sole
                </span>
              </div>
            </div>
            {/* Handle */}
            <div className={styles.baHandle} ref={handleRef}>
              <div className={styles.baHandleKnob}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <polyline points="15 18 9 12 15 6" />
                  <polyline points="9 18 15 12 9 6" transform="translate(6 0)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Meta card */}
          <div className={styles.baMeta}>
            {[
              { key: "Featured", val: "Red Wing Iron Ranger · 12 years owned" },
              { key: "Work performed", val: "Half sole, heel, welt rebuild, conditioning" },
              { key: "Turnaround", val: "8 business days" },
            ].map(({ key, val }) => (
              <div key={key} className={styles.baMetaRow}>
                <span className={styles.baMetaKey}>{key}</span>
                <span className={styles.baMetaVal}>{val}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Strip */}
        <ScrollReveal stagger className={styles.baStrip}>
          {CARDS.map((c) => (
            <figure key={c.title} className={styles.baCard}>
              <div className={styles.baCardPair}>
                <div className={`${styles.baThumb} ${styles.baThumbBefore}`}>
                  <span>Before</span>
                </div>
                <div className={`${styles.baThumb} ${styles.baThumbAfter}`}>
                  <span>After</span>
                </div>
              </div>
              <figcaption>
                <strong>{c.title}</strong>
                <span>{c.desc}</span>
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
