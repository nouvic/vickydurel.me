"use client";

import Link from "next/link";
import { Home, User, Layers3, Cpu, BookOpen, Mail } from "lucide-react";
import styles from "@/app/v4.module.css";

const TABS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about", label: "About", Icon: User },
  { href: "/#capacity", label: "Work", Icon: Layers3 },
  { href: "/#shift", label: "AI", Icon: Cpu },
  { href: "/insights", label: "Insights", Icon: BookOpen },
  { href: "/#contact", label: "Say hi", Icon: Mail },
];

export function BottomNav() {
  return (
    <nav className={styles.bottomNav} aria-label="Mobile navigation">
      {TABS.map(({ href, label, Icon }) => (
        <Link key={label} href={href} className={styles.bottomNavItem}>
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
