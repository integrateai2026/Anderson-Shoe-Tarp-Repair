"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Nav.module.css";

const NAV_LINKS = [
  { label: "Home",     href: "#" },
  { label: "Services", href: "#services" },
  { label: "Pricing",  href: "#pricing" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
];

// Sections to watch (in page order). The last one whose top has
// crossed 40 % of viewport height becomes the active nav item.
const WATCHED = ["services", "pricing", "about", "contact"];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("#");   // tracks current section href
  const [menuOpen,  setMenuOpen]  = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // ── Nav scroll shadow ──────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section scrollspy ───────────────────────────────────────────
  useEffect(() => {
    const detect = () => {
      if (window.scrollY < 80) {
        setActive("#");
        return;
      }
      const threshold = window.innerHeight * 0.42;
      let current = "#";
      for (const id of WATCHED) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          current = `#${id}`;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", detect, { passive: true });
    detect();
    return () => window.removeEventListener("scroll", detect);
  }, []);

  // ── Close mobile menu on resize ───────────────────────────────────────
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  // ── Close mobile menu on scroll — delayed 150 ms so the tap that ──────
  // ── opened the menu doesn't trigger a micro-scroll that closes it ─────
  useEffect(() => {
    if (!menuOpen) return;
    let timer: ReturnType<typeof setTimeout>;
    const close = () => setMenuOpen(false);
    timer = setTimeout(() => {
      window.addEventListener("scroll", close, { passive: true });
    }, 150);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", close);
    };
  }, [menuOpen]);

  // ── Lock body scroll when menu is open ────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Smooth anchor scroll ───────────────────────────────────────────────
  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
        id="nav"
        ref={navRef}
      >
        <div className={`container ${styles.navInner}`}>
          {/* Logo */}
          <a href="#" className={styles.logo} onClick={(e) => handleAnchor(e, "#")}>
            <span className={styles.logoMark}>A</span>
            <span className={styles.logoText}>
              Anderson&apos;s
              <small>Shoe &amp; Tarp Repair · Est. 1990</small>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className={styles.navLinks}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={active === href ? styles.activeLink : ""}
                  onClick={(e) => handleAnchor(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: phone CTA + hamburger */}
          <div className={styles.navRight}>
            <a href="tel:7015406614" className={styles.navCta}>
              {/* Green dot — desktop only */}
              <span className={styles.phDot} />
              {/* Phone icon — mobile only */}
              <svg
                className={styles.phoneIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className={styles.ctaLabel}>(701) 540-6614</span>
            </a>

            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          <nav>
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={active === href ? styles.mobileLinkActive : ""}
                    onClick={(e) => handleAnchor(e, href)}
                  >
                    {label}
                    {active === href && (
                      <span className={styles.activeDot} aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="tel:7015406614" className={styles.mobileCta}>
            <span className={styles.phDot} />
            (701) 540-6614
          </a>
        </div>
      )}
    </>
  );
}
