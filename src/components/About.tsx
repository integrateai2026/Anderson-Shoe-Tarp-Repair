import ScrollReveal from "./ScrollReveal";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={`container ${styles.aboutInner}`}>
        <ScrollReveal className={styles.aboutPhoto}>
          <img
            src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=900&q=80&auto=format&fit=crop&crop=focalpoint&fp-x=0.45&fp-y=0.5&fp-z=1.3"
            alt="Hands and tools at the workbench — the kind of work Tom has done since 1990."
          />
          <div className={styles.aboutPhotoOverlay} />
          <span className={styles.stampCorner}>Tom Anderson · Owner</span>
        </ScrollReveal>

        <div>
          <ScrollReveal>
            <span className="eyebrow">— Meet Tom</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 style={{ marginTop: 18 }}>
              35 years. Same bench. <em>Same standards.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={styles.p}>
              Tom Anderson opened his shop in 1990 with a single industrial
              stitcher and a stack of leather. Three and a half decades later,
              the stitcher is still there — and so is Tom.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className={styles.p}>
              He learned the trade the old way: from craftsmen who measured
              twice, glued once, and never sent a customer home with a job they
              didn&apos;t fully stand behind. That ethic still walks through the
              door every weekday morning at 9.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className={styles.p}>
              From farmers needing a grain-truck tarp patched before harvest to
              families shipping in three generations of Birkenstocks —
              Anderson&apos;s has stayed in business one careful repair at a
              time.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className={styles.aboutSig}>
              <div>
                <div className={styles.aboutSigName}>Tom Anderson</div>
                <div className={styles.aboutSigRole}>Owner &amp; Cobbler · Since 1990</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
