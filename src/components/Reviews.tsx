import ScrollReveal from "./ScrollReveal";
import styles from "./Reviews.module.css";

const reviews = [
  {
    quote: "Tom resoled my Red Wings — boots I've worn for twelve years. They feel brand new and cost a fraction of replacing them. Honest work, honest price.",
    name: "Mike R.",
    location: "West Fargo, ND",
  },
  {
    quote: "Mailed my Birks in from Denver — came back in two weeks looking better than the day I bought them. Worth every penny of the shipping.",
    name: "Sarah L.",
    location: "Mail-in customer, CO",
  },
  {
    quote: "Tom patched our grain-truck tarp the morning before harvest. Drove out that afternoon and worked the rest of the season. Nobody else in town does this.",
    name: "Dale K.",
    location: "Casselton, ND",
  },
];

function Stars() {
  return (
    <div className={styles.stars} aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="16" height="16">
          <polygon
            fill="currentColor"
            points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className={styles.reviews}>
      <div className="container">
        <div className="section-head">
          <div>
            <ScrollReveal>
              <span className="eyebrow" style={{ color: "var(--tan)" }}>
                04 · Reviews
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 style={{ marginTop: 18, color: "var(--parchment)" }}>
                What folks <em style={{ color: "var(--tan)" }}>around Fargo</em> are saying.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="lede" style={{ color: "rgba(245,239,230,0.7)" }}>
              Word of mouth has kept this shop busy for 35 years. Here&apos;s a
              small sample.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger className={styles.reviewsGrid}>
          {reviews.map((r) => (
            <article key={r.name} className={styles.review}>
              <Stars />
              <blockquote>{r.quote}</blockquote>
              <div className={styles.reviewAuthor}>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.location}</span>
                </div>
                <span className={styles.gpin}>★ Google</span>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
