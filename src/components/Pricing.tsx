import ScrollReveal from "./ScrollReveal";
import styles from "./Pricing.module.css";

const categories = [
  {
    title: "Men's Shoes & Western Boots",
    tag: "— Most common",
    items: [
      { label: "Heels (shoes / boots)", price: "$26.95 / $28.95" },
      { label: "½ Soles (shoes / boots)", price: "$44.95 / $46.95" },
      { label: "¾ Soles & Heels", price: "$59.95 / $68.95" },
      { label: "Leather Full Soles", price: "$75 / $85" },
      { label: "Crepe Full Soles", price: "$58.95" },
      { label: "Sole Guard", price: "$23.95" },
    ],
  },
  {
    title: "Work Boots",
    tag: "— Heavy duty",
    items: [
      { label: "Full Soles", price: "$64.95 – $68.95" },
      { label: "Heels", price: "$28.95" },
      { label: "Waterproofing", price: "$10.00" },
      { label: "Welt repair", price: "$10 – $15" },
    ],
  },
  {
    title: "Women's Shoes",
    tag: "— Heels & soles",
    items: [
      { label: "Heels", price: "$12.95 – $18.95" },
      { label: "Soles", price: "$27.95" },
      { label: "Sole Guard", price: "$18.50" },
      { label: "Corner heel build-up", price: "$4.00" },
    ],
  },
  {
    title: "Birkenstocks",
    tag: "— Walk-in",
    items: [
      { label: "Heels", price: "$26.95" },
      { label: "Full Soles", price: "$45.95" },
      { label: "Full Recraft", price: "$80.00" },
      { label: "New Buckle", price: "$10.00" },
      { label: "Cork build-up (per area)", price: "$5.00" },
    ],
  },
  {
    title: "Boot Zippers",
    tag: "— Same week",
    items: [
      { label: "Short", price: "$20.00" },
      { label: "Tall", price: "$25.00" },
      { label: "Cut in new", price: "$30.00" },
    ],
  },
  {
    title: "Jackets & Misc.",
    tag: "— Quick fixes",
    items: [
      { label: "Jacket zipper slides", price: "$10 – $12" },
      { label: "Full jacket zipper", price: "$30 – $45" },
      { label: "Shoe shine", price: "$5.00" },
      { label: "Waterproofing", price: "$4.00" },
    ],
  },
];

export default function Pricing() {
  return (
    <section className={styles.pricing} id="pricing">
      <div className="container">
        <div className="section-head">
          <div>
            <ScrollReveal>
              <span className="eyebrow">03 · Pricing</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 style={{ marginTop: 18 }}>
                Honest pricing. <em>No surprises.</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="lede">
              Every job gets a fair quote before work begins. The table below
              covers our most common repairs — anything not listed, give us a
              call.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger className={styles.pricingGrid}>
          {categories.map((cat) => (
            <div key={cat.title} className={styles.priceCat}>
              <div className={styles.priceCatHead}>
                <h3>{cat.title}</h3>
                <span className={styles.tag}>{cat.tag}</span>
              </div>
              <ul className={styles.priceList}>
                {cat.items.map(({ label, price }) => (
                  <li key={label}>
                    <span className={styles.label}>{label}</span>
                    <span className={styles.price}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className={styles.pricingFoot}>
            <p>
              <strong>MINIMUM CHARGE</strong> · $5.00 — every repair, no
              exceptions.
            </p>
            <p>
              Prices subject to change. Call{" "}
              <strong>(701) 540-6614</strong> for an exact quote.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
