import ScrollReveal from "./ScrollReveal";
import styles from "./Services.module.css";

const services = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 30c2-1 4-3 6-3s6 2 10 2 8-4 14-4 8 2 8 2v6c0 1-1 2-2 2H8c-1 0-2-1-2-2z"/>
        <path d="M12 27c0-3 0-7 2-9s5-3 7-3"/>
        <path d="M22 18c2 0 4 1 4 3s-1 4 0 5"/>
      </svg>
    ),
    title: "Shoe & Boot Repair",
    body: "Heels, soles, sole guards, and welts for dress shoes, work boots, and Western boots. New life from the ground up.",
    arrow: "From $26.95 →",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14c-2 4-4 8-4 14v10h8v-10c0-4 1-6 3-8M30 14c2 4 4 8 4 14v10h-8v-10"/>
        <path d="M14 14c0-4 4-6 10-6s10 2 10 6"/>
        <path d="M18 24h4M26 24h4"/>
      </svg>
    ),
    title: "Birkenstock Repair",
    body: "Reheel, resole, and full recraft. Cork build-ups, new buckles, and the original footbed feel restored.",
    arrow: "From $26.95 →",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 12h36v24H6z"/>
        <path d="M6 12l6 4M42 12l-6 4M6 36l6-4M42 36l-6-4"/>
        <circle cx="14" cy="14" r="1.5"/><circle cx="34" cy="14" r="1.5"/>
        <circle cx="14" cy="34" r="1.5"/><circle cx="34" cy="34" r="1.5"/>
        <path d="M18 22l4 4 8-8" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Tarp Repair",
    body: "Yes — we really fix tarps. Grain trucks, equipment covers, flatbeds. Industrial-grade patching and reinforcement.",
    arrow: "Request a quote →",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 16c0-3 2-6 6-6h16c4 0 6 3 6 6v22a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z"/>
        <path d="M18 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/>
        <path d="M16 22h16"/>
      </svg>
    ),
    title: "Leather & Handbag Repair",
    body: "Straps, stitching, lining, and conditioning. Keep a beloved bag going for another decade.",
    arrow: "By estimate →",
  },
  {
    num: "05",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6v36"/>
        <path d="M20 10h8M19 14h10M20 18h8M19 22h10M20 26h8M19 30h10M20 34h8M19 38h10"/>
        <circle cx="24" cy="42" r="3"/>
      </svg>
    ),
    title: "Zipper & Belt Repair",
    body: "Slides, full zippers, belt holes, and buckles — boots, jackets, coats, bags. Often same-week turnaround.",
    arrow: "From $10 →",
  },
  {
    num: "06",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 28c0-8 6-14 14-14s14 6 14 14"/>
        <path d="M8 28h28"/>
        <path d="M14 36l4-6M30 36l-4-6M22 36v-8"/>
        <circle cx="22" cy="14" r="3"/>
      </svg>
    ),
    title: "Sports Equipment & Outerwear",
    body: "Hockey bags, ski gear, hunting jackets, work coats. We waterproof, restitch, and reinforce for another season.",
    arrow: "By estimate →",
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <ScrollReveal>
              <span className="eyebrow">02 · What we fix</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 style={{ marginTop: 18 }}>
                If it&apos;s broken, <em>Tom can fix it.</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="lede">
              Three and a half decades of muscle memory. Resoling Birkenstocks, patching grain truck tarps, replacing zippers on hockey bags — same bench, same hands.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger className={styles.serviceGrid}>
          {services.map((s) => (
            <article key={s.num} className={styles.serviceCard}>
              <span className={styles.num}>— {s.num}</span>
              <div className={styles.icon}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className={styles.arrow}>{s.arrow}</span>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
