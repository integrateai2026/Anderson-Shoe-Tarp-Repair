"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./FAQ.module.css";

const faqs = [
  {
    q: "Do you really fix tarps?",
    a: "Yes — really. Grain truck tarps, flatbed covers, equipment covers, even old canvas. We patch, restitch, and reinforce. If it's woven and broken, bring it in or call ahead with photos so we can talk through what's possible.",
  },
  {
    q: "Can I mail in my Birkenstocks?",
    a: "Absolutely. Our mail-in program is one of the most popular things we do. Print the order form, ship the shoes to our Fargo workshop, and Tom will repair and ship them back — typically within two to three weeks. See the Mail-In section above for pricing.",
  },
  {
    q: "What's your minimum charge?",
    a: "$5.00 minimum on every repair, no exceptions — including the smallest zipper slide or shoe shine. It covers materials, time, and the careful inspection every job gets.",
  },
  {
    q: "How long do repairs usually take?",
    a: "Most shoe and boot repairs are ready in 5–10 business days. Birkenstock recrafts and larger jobs may take 2–3 weeks. We always give you an honest estimate when you drop off — no surprises.",
  },
  {
    q: "Do you take cards or just cash?",
    a: "Cash, check, and all major credit and debit cards. Payment is due when you pick up your repaired item.",
  },
  {
    q: "What if a repair isn't worth doing?",
    a: "Tom will tell you. We'd rather lose the job than waste your money on shoes or gear that's past saving. You'll get an honest opinion before any work begins.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.faq}>
      <div className={`container ${styles.faqInner}`}>
        <div className={styles.faqLeft}>
          <ScrollReveal>
            <span className="eyebrow">05 · FAQ</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 style={{ marginTop: 18 }}>
              Common <em>questions.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p>
              Six of the things people ask Tom most often. Don&apos;t see your
              question? Give us a call — we don&apos;t mind talking shop.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className={styles.faqHelp}>
              <strong>Still need help?</strong>
              <p>Tom answers the shop phone himself most days.</p>
              <a href="tel:7015406614">(701) 540-6614 →</a>
            </div>
          </ScrollReveal>
        </div>

        <div className={styles.faqList}>
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`${styles.faqItem} ${open === i ? styles.open : ""}`}
            >
              <button
                className={styles.faqQ}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className={styles.qnum}>Q{i + 1}</span>
                <span>{item.q}</span>
                <span className={styles.plus} aria-hidden="true" />
              </button>
              <div
                className={styles.faqA}
                style={{ maxHeight: open === i ? 300 : 0 }}
              >
                <div className={styles.faqAInner}>{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
