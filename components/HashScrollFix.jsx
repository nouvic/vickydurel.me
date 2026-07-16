"use client";

import { useEffect } from "react";

// Next.js <Link> updates the URL via history.pushState, which does not fire
// a native "hashchange" event — so neither a same-page hash tap (already on
// "/", tapping "Work") nor a cross-page one (from /insights to "/#contact")
// reliably lands on the target section on their own. Catch it at the click
// itself instead, and retry once to allow for the route transition to paint.
export function HashScrollFix() {
  useEffect(() => {
    const scrollToHash = (hash) => {
      if (!hash) return;
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant", block: "start" });
    };

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    function onClick(e) {
      const a = e.target.closest?.("a[href*='#']");
      if (!a) return;
      let url;
      try { url = new URL(a.getAttribute("href"), window.location.href); } catch { return; }
      if (!url.hash) return;
      window.setTimeout(() => scrollToHash(url.hash), 200);
      window.setTimeout(() => scrollToHash(url.hash), 500);
    }
    document.addEventListener("click", onClick);

    scrollToHash(window.location.hash);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
