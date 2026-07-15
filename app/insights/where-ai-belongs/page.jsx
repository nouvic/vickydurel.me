import Link from "next/link";
import { buildArticleMetadata, PERSON_ID, SITE_NAME, SITE_URL } from "../../lib/seo";
import styles from "../insights.module.css";

const ARTICLE_PATH = "/insights/where-ai-belongs";
const ARTICLE_URL = `${SITE_URL}${ARTICLE_PATH}`;
const ARTICLE_TITLE = "Where AI Belongs in a Business Workflow";
const ARTICLE_DATE = "2026-07-16";

export const metadata = buildArticleMetadata({
  title: `${ARTICLE_TITLE} — ${SITE_NAME}`,
  description: "A practical framework for deciding where AI should enter a business workflow, what it may automate and where human judgment must remain.",
  path: ARTICLE_PATH,
  publishedTime: ARTICLE_DATE,
  modifiedTime: ARTICLE_DATE,
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${ARTICLE_URL}#article`,
  headline: ARTICLE_TITLE,
  datePublished: ARTICLE_DATE,
  dateModified: ARTICLE_DATE,
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
  image: `${SITE_URL}/v4/vicky-durel-insights-v1.png`,
  mainEntityOfPage: { "@type": "WebPage", "@id": ARTICLE_URL }
};

export default function WhereAiBelongsPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/"><span>VD</span><strong>Vicky Durel NOUPO</strong></Link>
        <Link href="/insights">All Insights</Link>
      </header>
      <main id="main-content">
        <header className={styles.articleHero}>
          <Link href="/insights">Insights / AI adoption</Link>
          <h1>Where AI belongs in a business workflow.</h1>
          <p>Start with the operating event, not the model. The goal is not to add AI to the business. It is to improve how the business responds when something consequential happens.</p>
          <div className={styles.articleMeta}><span>Vicky Durel NOUPO</span><span>Field note 001</span><span>7 min read</span></div>
        </header>
        <article className={styles.article}>
          <p>Most AI conversations begin one level too high. A leader sees a demonstration, hears that competitors are moving and asks which platform the company should adopt. That question produces a list of tools. It rarely produces an operating advantage.</p>
          <p>A better starting point is smaller and more concrete: what happened inside the business, what response should follow, and where does the current handoff break?</p>

          <h2>Before AI, software stored the work.</h2>
          <p>Traditional business software is good at recording customers, transactions, tickets and tasks. But people still do much of the coordination around those records. They read the request, interpret its meaning, move information between systems, decide who should respond and remember which exceptions matter.</p>
          <p>That human layer is valuable when judgment is required. It is expensive and unreliable when people are merely relaying information, rewriting the same response or checking whether an expected action happened.</p>

          <h2>Now software can help coordinate the work.</h2>
          <p>AI changes the boundary. A system can now interpret an unstructured message, classify intent, prepare a response, route a decision and watch for the next event. This does not make the system autonomous in every sense. It gives the business another way to handle routine coordination.</p>
          <blockquote>The useful unit of AI adoption is not the tool. It is the workflow.</blockquote>
          <p>A workflow gives the technology context. It defines the triggering event, the information available, the allowed actions, the exceptions and the outcome that can be measured.</p>

          <h2>Use five questions before choosing technology.</h2>
          <ol>
            <li><strong>What event starts the work?</strong> A new lead, missed call, payment exception or support request is concrete. “Use AI in sales” is not.</li>
            <li><strong>What response is expected?</strong> Define the action, its timing and the information required.</li>
            <li><strong>What is routine?</strong> Repeated interpretation, routing and preparation are candidates for automation.</li>
            <li><strong>What requires judgment?</strong> Ambiguity, high-value exceptions and consequential decisions need a clear human destination.</li>
            <li><strong>What proves improvement?</strong> Measure a business outcome: response time, completed handoffs, recovered opportunities or reduced administrative work.</li>
          </ol>

          <h2>Do not choose between people and AI.</h2>
          <p>The simplistic debate says a company must either protect every manual task or automate people away. Serious operating design does neither. It removes routine coordination while making human responsibility more explicit.</p>
          <p>People should not have to remember every follow-up or move every piece of information by hand. AI should not quietly make consequential decisions without boundaries, evidence or an accountable owner. The stronger system gives each side the work it is suited to perform.</p>

          <h2>Start narrow enough to inspect.</h2>
          <p>A useful first deployment is small enough to explain on one page. One trigger. One workflow. A defined set of actions. A visible exception route. A measurable result. If the business cannot inspect how the system behaves, it is not ready to expand it.</p>
          <p>This is slower than buying a tool after a compelling demonstration. It is considerably faster than spending six months deploying technology that nobody trusts or uses.</p>

          <aside className={styles.articleCta}>
            <strong>Working through an operating problem?</strong>
            <p>Send the context, the handoff that fails and the result the business needs.</p>
            <Link href="/#contact">Start a conversation</Link>
          </aside>
        </article>
      </main>
      <footer className={styles.footer}><span>Vicky Durel NOUPO · Insights</span><Link href="/">Return home</Link></footer>
    </div>
  );
}
