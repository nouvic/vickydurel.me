import Link from "next/link";
import { buildMetadata } from "../lib/seo";
import styles from "../insights/insights.module.css";

export const metadata = buildMetadata({
  title: "Privacy Policy — Vicky Durel",
  description: "How vickydurel.me handles the information you share, in plain language.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/"><span>VD</span><strong>Vicky Durel</strong></Link>
        <Link href="/">Return home</Link>
      </header>
      <main id="main-content">
        <header className={styles.articleHero}>
          <Link href="/">vickydurel.me</Link>
          <h1>Privacy Policy</h1>
          <p>Short and plain, because it should be. Here is what happens to anything you share with me on this site.</p>
          <div className={styles.articleMeta}><span>Last updated</span><span>July 2026</span></div>
        </header>
        <article className={styles.article}>
          <h2>What I collect</h2>
          <p>Only what you hand me. If you use the contact form, I receive the name, email address, and message you type in. That is all. I do not run advertising trackers or sell anything, so there is no hidden collection happening in the background.</p>

          <h2>Why I collect it</h2>
          <p>One reason: to read your message and reply. Your email lets me answer; your message tells me what you are working on. I do not add you to a marketing list or pass your details to anyone else.</p>

          <h2>Where it goes</h2>
          <p>Contact-form messages are delivered straight to my own inbox by email, where they sit like any other email I receive. The site is hosted on Vercel, which may set basic, non-tracking cookies that are needed simply to serve the pages.</p>

          <h2>How long I keep it</h2>
          <p>As long as it is useful to our conversation, and no longer than it needs to be. If you would like me to delete what you sent, just ask.</p>

          <h2>Your choices</h2>
          <p>Email me at <a href="mailto:hi@vickydurel.me">hi@vickydurel.me</a> to see what I hold about you, correct it, or have it removed. No forms, no runaround.</p>

          <h2>Changes</h2>
          <p>If any of this changes, I will update this page and the date above.</p>

          <aside className={styles.articleCta}>
            <strong>Questions about your data?</strong>
            <p>Reach me directly and I will answer honestly.</p>
            <Link href="/#contact">Get in touch</Link>
          </aside>
        </article>
      </main>
      <footer className={styles.footer}><span>Vicky Durel</span><Link href="/">Return home</Link></footer>
    </div>
  );
}
