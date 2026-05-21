import ScrollReveal from "./ScrollReveal";
import styles from "./MailIn.module.css";

export default function MailIn() {
  return (
    <section className={styles.mailin} id="mailin">
      <div className={`container ${styles.mailinInner}`}>
        <div>
          <ScrollReveal>
            <span className="eyebrow" style={{ color: "var(--leather-deep)" }}>
              — Nationwide service
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 style={{ marginTop: 18 }}>
              Birkenstocks worn out? <em>Ship them to Tom.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={styles.lede}>
              Anderson&apos;s mail-in Birkenstock repair program brings 35 years
              of craftsmanship to your doorstep — from Maine to California. Box
              them up, send them in, get them back better than new.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className={styles.mailinSteps}>
            {[
              { num: "01", title: "Print the form", body: "Download, fill out, drop in the box." },
              { num: "02", title: "Ship them in", body: "Mail to our Fargo workshop." },
              { num: "03", title: "Get them back", body: "Repaired and shipped to your door." },
            ].map((s) => (
              <div key={s.num} className={styles.mailinStep}>
                <div className={styles.stepNum}>{s.num}</div>
                <strong>{s.title}</strong>
                <span>{s.body}</span>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className={styles.mailinCtas}>
              <a href="#" className="btn-dark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Order Form
              </a>
              <a href="#contact" className={styles.mailinLink}>
                Ask Tom a question →
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <aside className={styles.mailinCard}>
            <h4>Mail-In Pricing · Per Pair</h4>
            <ul className={styles.mailinPrices}>
              {[
                { label: "Reheel", price: "$26.95" },
                { label: "Full Soles", price: "$50.00" },
                { label: "Full Recraft", price: "$90.00" },
                { label: "Recork (per end)", price: "$5.00" },
                { label: "Cork Renew product", price: "$5.95" },
              ].map(({ label, price }) => (
                <li key={label}>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.price}>{price}</span>
                </li>
              ))}
            </ul>
            <p className={styles.footnote}>
              RETURN SHIPPING — $12.95 first pair, $6.00 each additional.
              Prices reflect 2022 schedule; call to confirm current rates.
            </p>
          </aside>
        </ScrollReveal>
      </div>
    </section>
  );
}
