import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CircleDot,
  Globe2,
  Layers3,
  MoveRight,
  ShieldCheck,
} from "lucide-react";
import { V4ContactForm } from "@/components/V4ContactForm";
import { MobileBoot } from "@/components/MobileBoot";
import { BottomNav } from "@/components/BottomNav";
import { MobileMenu } from "@/components/MobileMenu";
import { buildMetadata, SITE_URL, SITE_NAME, TAGLINE, DESCRIPTION, PERSON_ID } from "./lib/seo";
import styles from "./v4.module.css";

export const metadata = buildMetadata({
  title: `${SITE_NAME} — ${TAGLINE}`,
  description: DESCRIPTION,
  path: "/",
});

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile-page`,
  url: `${SITE_URL}/`,
  name: `${SITE_NAME} — ${TAGLINE}`,
  mainEntity: { "@id": PERSON_ID }
};

const capabilities = [
  {
    number: "01",
    title: "Find the useful leverage",
    copy: "Find the one change that actually moves the operation, not the one that looks good in a demo.",
    image: "/v4/capability-leverage.png",
    alt: "A complex operating system with one useful path illuminated",
  },
  {
    number: "02",
    title: "Translate complexity",
    copy: "Turn technical possibility into something an operating team can understand and use.",
    image: "/v4/capability-translate.png",
    alt: "A dense technical architecture resolving into clear operating modules",
  },
  {
    number: "03",
    title: "Engineer the workflow",
    copy: "Connect inputs, decisions, actions and human handoffs into one operating path.",
    image: "/v4/capability-workflow.png",
    alt: "Inputs moving through decision points and a human review route",
  },
  {
    number: "04",
    title: "Design for trust",
    copy: "Make ownership, exceptions and evidence visible where decisions carry consequences.",
    image: "/v4/capability-trust.png",
    alt: "A transparent workflow with checkpoints and an exception path",
  },
];

const principles = [
  ["Start with the operating event", "Map what happened, who owns the next action and where the handoff fails before selecting technology."],
  ["Design for exceptions", "The system earns trust when ambiguity, urgency and edge cases have a clear human destination."],
  ["Make proof inspectable", "A serious claim should connect to an artifact, a source record, an accountable person or a measurable outcome."],
];

export default function V4Homepage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <MobileBoot />
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Vicky Durel home">
          <span>VD</span>
          <strong>Vicky Durel</strong>
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#capacity">Capabilities</a>
          <a href="#shift">AI shift</a>
          <a href="#practice">Current practice</a>
          <Link href="/insights">Insights</Link>
        </nav>
        <a className={styles.navCta} href="#contact">
          Let’s talk <ArrowUpRight aria-hidden="true" />
        </a>
        <MobileMenu />
      </header>

      <main id="main-content">
        <section className={styles.hero}>
          <div className={styles.heroNoise} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><CircleDot aria-hidden="true" /> Product builder · Systems operator</p>
            <h1>I build systems that hold up after the demo.</h1>
            <p className={styles.heroLead}>
              I’m Vicky Durel. Since 2013 I’ve helped businesses turn technology into something they can actually use. Software products, digitized workflows, and now the AI orchestration taking shape. The tools keep changing. What I hold onto doesn’t: technology should make the business work better, or it isn’t worth much.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#practice">See what I’m building <ArrowDownRight aria-hidden="true" /></a>
              <a className={styles.textButton} href="#capacity">How I actually work <MoveRight aria-hidden="true" /></a>
            </div>
            <div className={styles.heroProof} aria-label="Professional summary">
              <span><Check aria-hidden="true" /> Client delivery since 2013</span>
              <span><Check aria-hidden="true" /> Product and systems work</span>
              <span><Check aria-hidden="true" /> Cameroon, UAE and UK experience</span>
            </div>
          </div>

          <div className={styles.portrait}>
            <Image
              className={styles.portraitImage}
              src="/v4/vicky-durel-hero-v2.png"
              alt="Portrait of Vicky Durel in a charcoal blazer"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 42vw"
            />
            <div className={styles.portraitShade} aria-hidden="true" />
            <div className={styles.portraitTop}><span>Vicky Durel</span><span>2026 / 01</span></div>
            <div className={styles.portraitLabel}>
              <span>Independent practice</span>
              <strong>Technology made operational</strong>
            </div>
            <div className={styles.portraitBottom}>
              <span>Product</span><span>Systems</span><span>Operations</span>
            </div>
          </div>
        </section>

        <section className={styles.signal} aria-label="Current positioning">
          <span>Current thesis</span>
          <strong>Technology creates advantage only when the business can actually use it.</strong>
          <ArrowRight aria-hidden="true" />
        </section>

        <section id="capacity" className={styles.section}>
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionIndex}>01 / What I bring to the work</span>
              <h2>How the work takes shape.</h2>
            </div>
            <div>
              <p>These aren’t invented case studies. They’re the moves that show up again and again in the systems I build: find the leverage, make it clear, wire the workflow, and design it so people can trust it.</p>
              <small>I name clients only where I’m allowed to.</small>
            </div>
          </div>
          <div className={styles.capabilityGrid}>
            {capabilities.map((item) => (
              <article className={styles.capabilityCard} key={item.title}>
                <div className={styles.capabilityVisual}>
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 25vw" />
                  <span>{item.number}</span>
                </div>
                <div className={styles.capabilityCopy}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.namedTrack}>
            <span>Track record, in context</span>
            <div><strong>Client delivery since 2013</strong><small>Software products, architecture and operational systems</small></div>
            <div><strong>Cameroon · UAE · UK</strong><small>Local understanding with international operating exposure</small></div>
            <div><strong>Public and private work</strong><small>Named evidence only where disclosure is appropriate</small></div>
          </div>
        </section>

        <section id="shift" className={styles.shift}>
          <div className={styles.shiftHeader}>
            <div>
              <span className={styles.sectionIndex}>02 / The current technological shift</span>
              <h2>AI changes what software can do. It also changes what leaders have to decide.</h2>
            </div>
            <div>
              <p>Businesses are not short of AI tools. They are short of clarity about where AI belongs, what it should be allowed to do and where people must remain accountable.</p>
              <Link href="/insights/where-ai-belongs">Read the deeper field note <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>

          <div className={styles.operatingShift}>
            <article>
              <span>Before</span>
              <h3>Software stored the work.</h3>
              <p>People read the information, moved it between tools, chased the next action and remembered the exceptions.</p>
            </article>
            <ArrowRight aria-hidden="true" />
            <article className={styles.operatingNow}>
              <span>Now</span>
              <h3>Software can help coordinate the work.</h3>
              <p>AI can read inputs, draft responses, route decisions, and watch a workflow, all inside the boundaries the business sets.</p>
            </article>
          </div>

          <div className={styles.adoptionGrid}>
            <article><span>Why it feels confusing</span><p>The market sells models and tools. A business needs an operating decision: which workflow, which boundary and which result?</p></article>
            <article><span>What not to fear</span><p>Useful adoption starts small. One workflow can be tested, inspected and improved before anything expands.</p></article>
            <article><span>Where people belong</span><p>Don’t automate judgment away. And don’t make people babysit every routine step either. Automate the repetition; keep people on the exceptions and the accountability.</p></article>
          </div>
        </section>

        <section id="practice" className={styles.practice}>
          <div className={styles.practiceKicker}><span>03 / What I am building now</span><Globe2 aria-hidden="true" /></div>
          <div className={styles.practiceGrid}>
            <div>
              <p className={styles.overline}>Current evolution · Orchestrated business workflows</p>
              <h2>The next digital advantage is not another tool. It is a system that can coordinate the work.</h2>
            </div>
            <div className={styles.practiceCopy}>
              <p>Right now I’m applying AI orchestration to real business workflows: tying together inputs, approved decisions, routine actions, human judgment, and outcomes you can measure, into one path you can actually control.</p>
              <p>The first real product is lead response and recovery for owner-run HVAC companies. That offer will get its own page. It comes from the same instinct that shaped everything before it: build around a real advantage, not around whatever tool happens to be new.</p>
            </div>
          </div>
          <div className={styles.practiceRail}>
            <div><span>01</span><strong>Map</strong><small>the actual handoff</small></div>
            <ArrowRight aria-hidden="true" />
            <div><span>02</span><strong>Constrain</strong><small>language and routes</small></div>
            <ArrowRight aria-hidden="true" />
            <div><span>03</span><strong>Operate</strong><small>with human exceptions</small></div>
            <ArrowRight aria-hidden="true" />
            <div><span>04</span><strong>Measure</strong><small>source-linked outcomes</small></div>
          </div>
        </section>

        <section id="principles" className={styles.section}>
          <div className={styles.principlesHead}>
            <span className={styles.sectionIndex}>04 / Operating principles</span>
            <h2>Good systems make the hard parts visible.</h2>
          </div>
          <div className={styles.principlesGrid}>
            {principles.map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.insightsBand}>
          <div>
            <span className={styles.sectionIndex}>05 / Insights</span>
            <h2>Notes for leaders navigating the next operating shift.</h2>
          </div>
          <div>
            <p>Practical writing on AI adoption, workflow design and the decisions that sit between a convincing demonstration and a system a business can trust.</p>
            <Link href="/insights">Explore Insights <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className={styles.about}>
          <div className={styles.aboutMark} aria-hidden="true"><span>13</span><small>years of<br />client delivery</small></div>
          <div className={styles.aboutCopy}>
            <span className={styles.sectionIndex}>06 / An early pattern</span>
            <h2>The tools changed. The instinct did not.</h2>
            <p>More than a decade ago in Cameroon, social media management was still unfamiliar to many of the businesses around me. I was already learning it, training people and showing how a new digital channel could become useful business infrastructure.</p>
            <p>That beginning was local, but the question was universal: how does an organization turn a technological shift into practical advantage? It led from digital adoption to software products, from software to connected workflows, and now to AI orchestration across work in Cameroon, the UAE and the UK.</p>
          </div>
          <div className={styles.aboutStandards}>
            <div><Layers3 aria-hidden="true" /><span><strong>Product depth</strong><small>From architecture to the operating edge</small></span></div>
            <div><ShieldCheck aria-hidden="true" /><span><strong>Controlled automation</strong><small>Human judgment has an explicit place</small></span></div>
            <div><Building2 aria-hidden="true" /><span><strong>Commercial reality</strong><small>Built for the team that must run it</small></span></div>
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <div className={styles.contactIntro}>
            <span>If you’d rather just talk</span>
            <h2>If you searched my name before replying, this page did its job.</h2>
            <p>This is my professional home, not a funnel dressed up as a bio. If the way I think fits what you’re working on, tell me about it.</p>
            <a className={styles.contactLink} href="mailto:hi@vickydurel.me">hi@vickydurel.me <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <V4ContactForm />
        </section>
      </main>

      <footer className={styles.footer}>
        <Link href="/"><span>VD</span><strong>Vicky Durel</strong></Link>
        <p>Product builder and systems operator · Client delivery since 2013</p>
        <div><Link href="/about">About</Link><Link href="/insights">Insights</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="https://www.linkedin.com/in/vicky-durel/">LinkedIn</a><a href="mailto:hi@vickydurel.me">Email</a></div>
      </footer>
      <BottomNav />
    </div>
  );
}
