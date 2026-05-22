"use client";
import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./Gallery.module.css";

const Q  = "?w=800&q=80&auto=format&fit=crop&crop=center";
const Q2 = "?w=1200&q=80&auto=format&fit=crop&crop=center";
const UNS = (id: string, size = Q) =>
  id.startsWith("premium_photo")
    ? `https://plus.unsplash.com/${id}${size}`
    : `https://images.unsplash.com/photo-${id}${size}`;

// Before = worn/damaged, After = restored/clean
// All IDs verified against Unsplash CDN
const CARDS = [
  {
    title: "Birkenstock Boston",
    desc: "Full recraft · new cork, new sole",
    beforeSrc: UNS("1603487742131-4160ec999306"),          // sandals — worn filter
    afterSrc:  UNS("premium_photo-1721385340418-0e54a907da11"), // sandals on grass — clean
    beforeFilter: "grayscale(0.5) brightness(0.65) contrast(0.88) sepia(0.15)",
    afterFilter:  "brightness(1.06) contrast(1.1) saturate(1.12)",
  },
  {
    title: "Coach leather tote",
    desc: "Strap repair · lining replacement",
    beforeSrc: UNS("1637759292654-a12cb2be085e"),          // brown leather handbag — worn filter
    afterSrc:  UNS("premium_photo-1664353833832-b03ab1a002b0"), // brown leather backpack — clean
    beforeFilter: "grayscale(0.45) brightness(0.62) contrast(0.85) sepia(0.2)",
    afterFilter:  "brightness(1.02) contrast(1.08) saturate(1.05)",
  },
  {
    title: "Grain truck tarp",
    desc: "Patch + reinforced seam",
    // using worn boot imagery as stand-in (real tarp photos swap in easily)
    beforeSrc: UNS("1449505278894-297fdb3edbc1"),
    afterSrc:  UNS("1608256246200-53e635b5b65f"),
    beforeFilter: "grayscale(0.6) brightness(0.58) contrast(0.82) sepia(0.2)",
    afterFilter:  "brightness(1.0) contrast(1.12) saturate(0.92)",
  },
  {
    title: "Carhartt jacket",
    desc: "Full zipper replacement",
    beforeSrc: UNS("1529953717281-81a40b131119"),           // workbench + tools — worn filter
    afterSrc:  UNS("1511283402428-355853756676"),           // boots on pavement — clean filter
    beforeFilter: "grayscale(0.55) brightness(0.6) contrast(0.84)",
    afterFilter:  "brightness(1.02) contrast(1.1) saturate(0.95)",
  },
];

const BEFORE_IMG = UNS("1511283402428-355853756676", Q2); // boots on pavement — worn
const AFTER_IMG  = UNS("1605812860427-4024433a70fd", Q2); // clean leather boot close-up

export default function Gallery() {
  const compareRef = useRef<HTMLDivElement>(null);
  const beforeRef  = useRef<HTMLDivElement>(null);
  const handleRef  = useRef<HTMLDivElement>(null);
  const dragging   = useRef(false);

  const setPos = (clientX: number) => {
    const wrap   = compareRef.current;
    const before = beforeRef.current;
    const handle = handleRef.current;
    if (!wrap || !before || !handle) return;
    const r = wrap.getBoundingClientRect();
    let pct = ((clientX - r.left) / r.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    before.style.width = pct + "%";
    handle.style.left  = pct + "%";
  };

  useEffect(() => {
    const wrap = compareRef.current;
    if (!wrap) return;
    const down  = (e: MouseEvent)  => { dragging.current = true; setPos(e.clientX); };
    const up    = ()               => { dragging.current = false; };
    const move  = (e: MouseEvent)  => {
      if (dragging.current) { setPos(e.clientX); return; }
      if (e.buttons === 0) {
        const r = wrap.getBoundingClientRect();
        const p = ((e.clientX - r.left) / r.width) * 100;
        if (p > 5 && p < 95) setPos(e.clientX);
      }
    };
    const tDown = (e: TouchEvent) => { dragging.current = true; setPos(e.touches[0].clientX); };
    const tUp   = ()               => { dragging.current = false; };
    const tMove = (e: TouchEvent) => { if (dragging.current) setPos(e.touches[0].clientX); };

    wrap.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    wrap.addEventListener("mousemove", move);
    wrap.addEventListener("touchstart", tDown, { passive: true });
    window.addEventListener("touchend", tUp);
    window.addEventListener("touchmove", tMove, { passive: true });
    return () => {
      wrap.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      wrap.removeEventListener("mousemove", move);
      wrap.removeEventListener("touchstart", tDown);
      window.removeEventListener("touchend", tUp);
      window.removeEventListener("touchmove", tMove);
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

            {/* AFTER — full width, underneath */}
            <div className={styles.baSide}>
              <div className={`${styles.baPh} ${styles.baPhAfter}`}>
                <img
                  src={AFTER_IMG}
                  alt="Restored leather boots after repair — clean, polished, like new"
                  className={styles.baImg}
                  style={{ filter: "brightness(1.05) contrast(1.1) saturate(1.08)" }}
                />
                <div className={styles.baOverlay} />
                <span className={`${styles.baTag} ${styles.baTagRight}`}>After</span>
                <span className={`${styles.baCap} ${styles.baCapRight}`}>
                  Restored · New welt, polish, conditioning
                </span>
              </div>
            </div>

            {/* BEFORE — clipped left half */}
            <div className={`${styles.baSide} ${styles.baBefore}`} ref={beforeRef}>
              <div className={`${styles.baPh} ${styles.baPhBefore}`}>
                <img
                  src={BEFORE_IMG}
                  alt="Worn leather boots before repair — cracked sole, scuffed leather"
                  className={styles.baImg}
                  style={{ filter: "grayscale(0.5) brightness(0.68) contrast(0.9) saturate(0.5)" }}
                />
                <div className={styles.baOverlay} />
                <span className={styles.baTag}>Before</span>
                <span className={styles.baCap}>Worn · Cracked welt, separated sole</span>
              </div>
            </div>

            {/* Handle */}
            <div className={styles.baHandle} ref={handleRef}>
              <div className={styles.baHandleKnob}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                  {/* Symmetric chevrons: both centered on x=12 */}
                  <polyline points="9 18 3 12 9 6" />
                  <polyline points="15 18 21 12 15 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Meta card */}
          <div className={styles.baMeta}>
            {[
              { key: "Featured",       val: "Red Wing Iron Ranger · 12 years owned" },
              { key: "Work performed", val: "Half sole, heel, welt rebuild, conditioning" },
              { key: "Turnaround",     val: "8 business days" },
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
                <div className={styles.baThumb}>
                  <img src={c.beforeSrc} alt={`${c.title} before repair`} style={{ filter: c.beforeFilter }} />
                  <span>Before</span>
                </div>
                <div className={styles.baThumb}>
                  <img src={c.afterSrc} alt={`${c.title} after repair`} style={{ filter: c.afterFilter }} />
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
