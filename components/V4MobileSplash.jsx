"use client";

import { useEffect, useState } from "react";
import styles from "@/app/v4.module.css";

const SPLASH_KEY = "v4-mobile-entry-seen";

export function V4MobileSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = !!window.sessionStorage.getItem(SPLASH_KEY); } catch {}

    if (!mobile || reducedMotion || seen) {
      const hideTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(hideTimer);
    }

    const timer = window.setTimeout(() => {
      try { window.sessionStorage.setItem(SPLASH_KEY, "true"); } catch {}
      setVisible(false);
    }, 1150);

    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    try { window.sessionStorage.setItem(SPLASH_KEY, "true"); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.mobileSplash} role="status" aria-label="Opening Vicky Durel's website">
      <button type="button" onClick={dismiss} aria-label="Skip introduction">Skip</button>
      <div className={styles.splashIdentity}>
        <span>VD</span>
        <strong>Vicky Durel</strong>
        <small>Product · Systems · Operations</small>
      </div>
      <div className={styles.splashProgress} aria-hidden="true"><span /></div>
    </div>
  );
}
