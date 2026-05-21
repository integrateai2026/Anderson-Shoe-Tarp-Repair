"use client";
import ScrollReveal from "./ScrollReveal";
import styles from "./Contact.module.css";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks — Tom will be in touch.");
  };

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <div>
            <ScrollReveal>
              <span className="eyebrow" style={{ color: "var(--tan)" }}>
                06 · Visit or write
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 style={{ marginTop: 18, color: "var(--parchment)" }}>
                Drop by the shop, <br />
                <em>or send us a note.</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="lede" style={{ color: "rgba(245,239,230,0.7)" }}>
              Walk-ins welcome Monday through Friday. For mail-in repairs, fill
              out the form below and we&apos;ll send shipping instructions.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.contactGrid}>
          {/* Info side */}
          <ScrollReveal className={styles.infoSide}>
            <div className={styles.infoBlock}>
              {[
                {
                  label: "Address",
                  value: (
                    <>
                      3060 D 25th St. S.
                      <br />
                      Fargo, ND 58103
                      <small>Just off 32nd Ave S, look for the leather-brown awning.</small>
                    </>
                  ),
                },
                {
                  label: "Phone",
                  value: (
                    <>
                      <a href="tel:7015406614">(701) 540-6614</a>
                      <small>Tom answers the phone himself most days.</small>
                    </>
                  ),
                },
                {
                  label: "Hours",
                  value: (
                    <>
                      Monday – Friday · 9:00 AM – 5:30 PM
                      <small>Closed Saturday &amp; Sunday.</small>
                    </>
                  ),
                },
                {
                  label: "Website",
                  value: (
                    <a href="#">andersonsshoeandtarprepair.com</a>
                  ),
                },
              ].map(({ label, value }) => (
                <div key={label} className={styles.infoRow}>
                  <span className={styles.infoLabel}>{label}</span>
                  <span className={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>

            {/* Map embed — OpenStreetMap (no API key required) */}
            <div className={styles.map}>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-96.8350%2C46.8430%2C-96.8100%2C46.8560&layer=mapnik&marker=46.8490%2C-96.8222"
                title="Anderson's Shoe & Tarp Repair — 3060 D 25th St. S., Fargo, ND"
                allowFullScreen
                loading="lazy"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=3060+D+25th+St+S,+Fargo,+ND+58103"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapOverlay}
              >
                <strong>Open in Google Maps</strong>
                3060 D 25th St. S., Fargo
              </a>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.15} className={styles.formCard}>
            <div className={styles.formCardHead}>
              <span className={styles.formEyebrow}>Request a repair</span>
              <h3>
                Tell us what needs <em>fixing.</em>
              </h3>
              <p className={styles.formSub}>
                A few details and Tom will get back to you with a quote and a
                turnaround estimate.
              </p>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Your Name</label>
                  <input type="text" placeholder="Jane Doe" required />
                </div>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input type="tel" placeholder="(701) 555-0000" />
                </div>
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" placeholder="you@example.com" required />
              </div>
              <div className={styles.field}>
                <label>What needs repair?</label>
                <textarea
                  rows={4}
                  placeholder="A pair of work boots, a grain-truck tarp, three Birkenstocks…"
                  required
                />
              </div>
              <button className={styles.formSubmit} type="submit">
                Send message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerGrid}>
            <div className={`${styles.footerCol} ${styles.footerBrand}`}>
              <div className={styles.fbLogo}>
                <span className={styles.fbMark}>A</span>
                <div>
                  <strong>Anderson&apos;s</strong>
                  <small>Shoe &amp; Tarp Repair · Est. 1990</small>
                </div>
              </div>
              <p className={styles.fbBlurb}>
                35 years of handcrafted repairs in Fargo, North Dakota. Boots,
                Birkenstocks, leather goods, tarps and beyond.
              </p>
            </div>

            <div className={styles.footerCol}>
              <h5>Visit</h5>
              <p className={styles.fAddr}>
                3060 D 25th St. S.
                <br />
                Fargo, ND 58103
              </p>
              <p className={styles.fHours}>
                <strong>Mon–Fri</strong> · 9 AM – 5:30 PM
                <br />
                <span>Closed Sat &amp; Sun</span>
              </p>
            </div>

            <div className={styles.footerCol}>
              <h5>Services</h5>
              <ul className={styles.fLinks}>
                {[
                  "Shoe & Boot Repair",
                  "Birkenstock Repair",
                  "Tarp Repair",
                  "Leather & Handbags",
                  "Zippers & Belts",
                  "Sports & Outerwear",
                ].map((s) => (
                  <li key={s}>
                    <a href="#services">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h5>Get in touch</h5>
              <ul className={styles.fLinks}>
                <li><a href="tel:7015406614">(701) 540-6614</a></li>
                <li><a href="#mailin">Mail-in Repairs</a></li>
                <li><a href="#gallery">Before &amp; Afters</a></li>
                <li><a href="#contact">Contact Form</a></li>
              </ul>
              <a href="#contact" className={styles.fCta}>
                Get a Repair Quote →
              </a>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span>© 1990–2026 Anderson&apos;s Shoe &amp; Tarp Repair</span>
            <span className={styles.fbTag}>Made by hand · Same as always</span>
            <span>
              <a href="#">Privacy</a> · <a href="#">Terms</a>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
