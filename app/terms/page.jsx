import Link from "next/link";
import { buildMetadata } from "../lib/seo";
import styles from "../insights/insights.module.css";

export const metadata = buildMetadata({
  title: "Terms of Service — Vicky Durel NOUPO",
  description: "The simple terms for using vickydurel.me.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/"><span>VD</span><strong>Vicky Durel NOUPO</strong></Link>
        <Link href="/">Return home</Link>
      </header>
      <main id="main-content">
        <header className={styles.articleHero}>
          <Link href="/">vickydurel.me</Link>
          <h1>Terms of Service</h1>
          <p>This is my personal site. A few plain terms for using it.</p>
          <div className={styles.articleMeta}><span>Last updated</span><span>July 2026</span></div>
        </header>
        <article className={styles.article}>
          <h2>What this site is</h2>
          <p>vickydurel.me is my personal home on the web. The writing, ideas, and design here are mine unless I have credited someone else. You are welcome to read it, learn from it, and link to it.</p>

          <h2>Using the content</h2>
          <p>Quote a line and point back here, that is fine and appreciated. Please do not republish whole pieces as your own, or present my words as if they came from someone else.</p>

          <h2>The contact form</h2>
          <p>It is there for real messages. Use it to reach me about genuine work or questions, not for spam, scraping, or anything abusive.</p>

          <h2>No warranty, no advice</h2>
          <p>Everything here is shared in good faith and for general information. It reflects how I think, but it is not formal professional, legal, or financial advice for your specific situation. Use your own judgment, and get proper advice where it matters.</p>

          <h2>Links out</h2>
          <p>Now and then I will link to other sites. I do not control them and cannot vouch for what they do, so treat those visits as your own.</p>

          <h2>Changes</h2>
          <p>I may update these terms as the site grows. The date above tells you when I last did.</p>

          <aside className={styles.articleCta}>
            <strong>Something unclear?</strong>
            <p>Ask me and I will explain in plain terms.</p>
            <Link href="/#contact">Get in touch</Link>
          </aside>
        </article>
      </main>
      <footer className={styles.footer}><span>Vicky Durel NOUPO</span><Link href="/">Return home</Link></footer>
    </div>
  );
}
