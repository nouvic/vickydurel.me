"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "@/app/v4.module.css";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.hamburger}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" />
      </button>
      {open && (
        <div className={styles.drawer} role="dialog" aria-label="Menu">
          <button type="button" className={styles.drawerClose} aria-label="Close menu" onClick={() => setOpen(false)}>
            <X aria-hidden="true" />
          </button>
          <nav className={styles.drawerNav} onClick={() => setOpen(false)}>
            <a href="#capacity">Capabilities</a>
            <a href="#shift">AI shift</a>
            <a href="#practice">Current practice</a>
            <Link href="/insights">Insights</Link>
            <a href="#contact">Let’s talk</a>
          </nav>
        </div>
      )}
    </>
  );
}
