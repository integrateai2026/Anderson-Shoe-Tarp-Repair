import ScrollReveal from "./ScrollReveal";
import styles from "./Process.module.css";

const steps = [
  {
    num: "01",
    title: "Drop off, or mail in.",
    body: "Bring it to the Fargo workshop, or print the mail-in form and ship from anywhere in the U.S.",
    link: { label: "Mail-in instructions →", href: "#mailin" },
  },
  {
    num: "02",
    title: "We repair it.",
    body: "Tom inspects the work, calls with a quote, and rebuilds by hand on the same bench he's worked since 1990.",
    link: { label: "See the craftsmanship →", href: "#gallery" },
  },
  {
    num: "03",
    title: "Pick it up, like new.",
    body: "Most jobs take 5–10 business days. We pack it carefully and hand it back — or ship it home.",
    link: { label: "See pricing →", href: "#pricing" },
  },
];

export default function Process() {
  return (
    <section className={styles.process} id="process">
      <div className="container">
        <div className="section-head">
          <div>
            <ScrollReveal>
              <span className="eyebrow">— How it works</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 style={{ marginTop: 18 }}>
                A simple, <em>calm process.</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="lede">
              Three steps from a worn-out pair to one you&apos;d buy again. No
              appointments, no surprises, no upsells.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger as="ol" className={styles.processGrid}>
          {steps.map((step) => (
            <li key={step.num} className={styles.processStep}>
              <div className={styles.pnum}>{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <a href={step.link.href} className={styles.plink}>
                {step.link.label}
              </a>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
