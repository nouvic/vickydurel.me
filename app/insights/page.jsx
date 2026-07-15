import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "../lib/seo";
import styles from "./insights.module.css";

export const metadata = buildMetadata({
  title: "Insights on AI, Systems & Operations — Vicky Durel NOUPO",
  description: "Practical field notes from Vicky Durel NOUPO on AI adoption, workflow design and building business systems that remain accountable.",
  path: "/insights",
});

const lanes = [
  ["AI adoption", "Where AI creates real operating leverage, and where it just adds risk."],
  ["Workflow design", "How inputs, decisions, actions and exceptions become a system people can run."],
  ["Operator notes", "Practical lessons from building software products and operational systems since 2013."],
];

export default function InsightsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/"><span>VD</span><strong>Vicky Durel NOUPO</strong></Link>
        <Link href="/">Return home</Link>
      </header>
      <main id="main-content">
        <section className={styles.hero}>
          <div><span className={styles.eyebrow}>Insights · Field notes</span><h1>Clear thinking for the next operating shift.</h1></div>
          <p>Not AI news. Not tool roundups. Practical analysis for leaders deciding where intelligent systems belong inside a real business.</p>
        </section>
        <section className={styles.featured}>
          <div className={styles.featureVisual}>
            <Image
              src="/v4/vicky-durel-insights-v1.png"
              alt="Vicky Durel NOUPO beside a working session table"
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
            />
            <span className={styles.featureMeta}>Field note 001 · 7 min read</span>
          </div>
          <article>
            <h2>Where AI belongs in a business workflow.</h2>
            <p>The useful question isn’t “Which AI should we buy?” It’s “Which moment in the business deserves a better response, and what should stay under human judgment?”</p>
            <Link href="/insights/where-ai-belongs">Read the field note <ArrowRight aria-hidden="true" /></Link>
          </article>
        </section>
        <section className={styles.lanes}>
          <span className={styles.eyebrow}>Editorial focus</span>
          <h2>Three lanes. One operating question.</h2>
          <div className={styles.laneGrid}>{lanes.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>
      </main>
      <footer className={styles.footer}><span>Vicky Durel NOUPO · Insights</span><Link href="mailto:hi@vickydurel.me">hi@vickydurel.me</Link></footer>
    </div>
  );
}
