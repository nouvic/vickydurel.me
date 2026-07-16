import "./globals.css";
import { inter, spaceGrotesk } from "./fonts";
import { BottomNav } from "@/components/BottomNav";
import { SITE_URL, SITE_NAME, TAGLINE, DESCRIPTION, PERSON_ID } from "./lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: "%s"
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Vicky Durel",
    "product builder",
    "systems operator",
    "AI orchestration",
    "business workflow automation",
    "software product development",
    "digital operations",
    "Cameroon",
    "UAE",
    "UK"
  ],
  alternates: { canonical: "/", languages: { en: "/" } },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
  },
  category: "technology"
};

export const viewport = {
  themeColor: "#070b0d"
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  email: "hi@vickydurel.me",
  jobTitle: TAGLINE,
  description: DESCRIPTION,
  image: `${SITE_URL}/v4/vicky-durel-hero.png`,
  sameAs: [
    "https://www.linkedin.com/in/vicky-durel/",
    "https://github.com/nouvic"
  ],
  knowsAbout: [
    "AI orchestration",
    "Business workflow design",
    "Software product development",
    "Digital operations",
    "Systems architecture"
  ],
  worksFor: {
    "@type": "Organization",
    name: "Independent practice"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": PERSON_ID }
};

/** @param {{ children: import('react').ReactNode }} props */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <BottomNav />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
