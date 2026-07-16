"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/v4.module.css";

const SEEN_KEY = "vd-boot-seen";
const SPLASH_DURATION = 1500;

// phase: "init" | "splash" | "hidden"
export function MobileBoot() {
  const [phase, setPhase] = useState("init");
  const timer = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = !!window.sessionStorage.getItem(SEEN_KEY); } catch {}
    if (!isMobile || reduced || seen) {
      setPhase("hidden");
      return;
    }
    setPhase("splash");
  }, []);

  useEffect(() => {
    if (phase !== "splash") return;
    timer.current = window.setTimeout(dismiss, SPLASH_DURATION);
    return () => window.clearTimeout(timer.current);
  }, [phase]);

  function dismiss() {
    window.clearTimeout(timer.current);
    try { window.sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    setPhase("hidden");
  }

  if (phase !== "splash") return null;

  return (
    <div className={styles.boot} role="dialog" aria-label="Introduction" onClick={dismiss}>
      <div className={styles.bootSplash}>
        <div className={styles.bootSplashScrim} aria-hidden="true" />
        <div className={styles.bootSplashId}>
          <span>VD</span>
          <strong>Vicky Durel</strong>
          <small>Product · Systems · Operations</small>
        </div>
      </div>
      <button type="button" className={styles.bootSkip} onClick={(e) => { e.stopPropagation(); dismiss(); }}>
        Skip
      </button>
    </div>
  );
}
