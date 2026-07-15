import Image from "next/image";
import Link from "next/link";
import { buildMetadata, PERSON_ID, SITE_NAME, SITE_URL } from "../lib/seo";
import styles from "./about.module.css";

export const metadata = buildMetadata({
  title: `About | ${SITE_NAME}`,
  description: "The early pattern behind Vicky Durel NOUPO’s work in digital adoption, software products, connected workflows and AI orchestration.",
  path: "/about",
});

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/about#profile-page`,
  url: `${SITE_URL}/about`,
  name: `About ${SITE_NAME}`,
  mainEntity: { "@id": PERSON_ID }
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/"><span>VD</span><strong>Vicky Durel NOUPO</strong></Link>
        <Link href="/">Return home</Link>
      </header>
      <main id="main-content">
        <section className={styles.hero}>
          <div className={styles.copy}>
            <span>About · An early pattern</span>
            <h1>The tools changed. The instinct did not.</h1>
            <p>More than a decade ago in Cameroon, social media management was still unfamiliar to many of the businesses around me. I was already learning it, training people and showing how a new digital channel could become useful business infrastructure.</p>
            <p>That beginning was local, but the question was universal: how does an organization turn a technological shift into practical advantage? It led from digital adoption to software products, from software to connected workflows, and now to AI orchestration across work in Cameroon, the UAE and the UK.</p>
          </div>
          <div className={styles.portrait}>
            <Image
              src="/v4/vicky-durel-profile-v1.png"
              alt="Portrait of Vicky Durel NOUPO in a grey suit"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 42vw"
            />
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>Vicky Durel NOUPO</span>
        <div><Link href="/insights">Insights</Link><a href="mailto:hi@vickydurel.me">Email</a></div>
      </footer>
    </div>
  );
}
