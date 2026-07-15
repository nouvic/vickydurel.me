"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/app/v4.module.css";

const SEEN_KEY = "vd-boot-seen";

const SLIDES = [
  { k: "01 · The shift", t: "Every few months the ground moves again. New tools, new noise, louder promises." },
  { k: "02 · The edge", t: "Knowing about the shift was never the advantage. Adapting to it is." },
  { k: "03 · The ones who win", t: "Not the ones who watch. Not even the ones who know how. The ones who take action, and adapt." },
];

// phase: "init" | "splash" | 0..2 (slide) | "done" | "hidden"
export function MobileBoot() {
  const [phase, setPhase] = useState("init");
  const timer = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile || reduced || window.sessionStorage.getItem(SEEN_KEY)) {
      setPhase("hidden");
      return;
    }
    setPhase("splash");
  }, []);

  useEffect(() => {
    if (phase === "done") {
      try { window.sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      setPhase("hidden");
      return;
    }
    if (phase === "init" || phase === "hidden") return;
    const dur = phase === "splash" ? 1500 : 2600;
    timer.current = window.setTimeout(advance, dur);
    return () => window.clearTimeout(timer.current);
  }, [phase]);

  function advance() {
    window.clearTimeout(timer.current);
    setPhase((p) => {
      if (p === "splash") return 0;
      if (typeof p === "number" && p < SLIDES.length - 1) return p + 1;
      return "done";
    });
  }

  function skip() {
    window.clearTimeout(timer.current);
    setPhase("done");
  }

  if (phase === "init" || phase === "hidden") return null;

  const isSplash = phase === "splash";
  const slide = typeof phase === "number" ? SLIDES[phase] : null;

  return (
    <div className={styles.boot} role="dialog" aria-label="Introduction" onClick={advance}>
      {isSplash ? (
        <div className={styles.bootSplash}>
          <Image className={styles.bootSplashImg} src="/v4/vicky-durel-hero.png" alt="" fill priority sizes="100vw" />
          <div className={styles.bootSplashScrim} aria-hidden="true" />
          <div className={styles.bootSplashId}>
            <span>VD</span>
            <strong>Vicky Durel</strong>
            <small>Product · Systems · Operations</small>
          </div>
        </div>
      ) : (
        <div className={styles.bootSlide} key={phase}>
          <span className={styles.bootSlideKicker}>{slide.k}</span>
          <p className={styles.bootSlideText}>{slide.t}</p>
        </div>
      )}
      <button type="button" className={styles.bootSkip} onClick={(e) => { e.stopPropagation(); skip(); }}>
        Skip
      </button>
      <div className={styles.bootDots} aria-hidden="true">
        {SLIDES.map((_, i) => (
          <span key={i} className={typeof phase === "number" && phase >= i ? styles.bootDotOn : styles.bootDot} />
        ))}
      </div>
    </div>
  );
}
