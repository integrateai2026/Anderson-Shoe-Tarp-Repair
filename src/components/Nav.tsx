"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`} id="nav" ref={navRef}>
      <div className={`container ${styles.navInner}`}>
        <a href="#" className={styles.logo} onClick={(e) => handleAnchor(e, "#")}>
          <span className={styles.logoMark}>A</span>
          <span className={styles.logoText}>
            Anderson&apos;s
            <small>Shoe &amp; Tarp Repair · Est. 1990</small>
          </span>
        </a>

        <ul className={styles.navLinks}>
          {[
            { label: "Home", href: "#" },
            { label: "Services", href: "#services" },
            { label: "Pricing", href: "#pricing" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={(e) => handleAnchor(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a href="tel:7015406614" className={styles.navCta}>
          <span className={styles.phDot} />
          (701) 540-6614
        </a>
      </div>
    </nav>
  );
}
