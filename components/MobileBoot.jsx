"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/v4.module.css";

const SLIDES = [
  { k: "01 · The shift", t: "Every few months the ground moves again. New tools, new noise, louder promises." },
  { k: "02 · The edge", t: "Knowing about the shift was never the advantage. Adapting to it is." },
  { k: "03 · The ones who win", t: "Not the ones who watch. Not even the ones who know how. The ones who take action, and adapt." },
];

// step: "splash" | 0..2 (slide) | "hidden" — advances only on tap, never on a timer.
export function MobileBoot() {
  const [step, setStep] = useState(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStep(isMobile && !reduced ? "splash" : "hidden");
  }, []);

  function advance() {
    setStep((s) => {
      if (s === "splash") return 0;
      if (typeof s === "number" && s < SLIDES.length - 1) return s + 1;
      return "hidden";
    });
  }

  function skip() {
    setStep("hidden");
  }

  if (step === null || step === "hidden") return null;

  const isSplash = step === "splash";
  const slide = typeof step === "number" ? SLIDES[step] : null;

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
          <span className={styles.bootTapHint}>Tap to continue</span>
        </div>
      ) : (
        <div className={styles.bootSlide} key={step}>
          <span className={styles.bootSlideKicker}>{slide.k}</span>
          <p className={styles.bootSlideText}>{slide.t}</p>
        </div>
      )}
      <button type="button" className={styles.bootSkip} onClick={(e) => { e.stopPropagation(); skip(); }}>
        Skip
      </button>
      <div className={styles.bootDots} aria-hidden="true">
        {SLIDES.map((_, i) => (
          <span key={i} className={typeof step === "number" && step >= i ? styles.bootDotOn : styles.bootDot} />
        ))}
      </div>
    </div>
  );
}
