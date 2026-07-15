import "./globals.css";
import { inter, spaceGrotesk } from "./fonts";

const SITE_URL = "https://vickydurel.me";
const SITE_NAME = "Vicky Durel";
const TAGLINE = "Product Builder & Systems Operator";
const DESCRIPTION =
  "Vicky Durel has helped businesses turn technology into practical operating advantage through software, digital workflows and AI orchestration systems since 2013.";

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
  alternates: { canonical: "/" },
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
    images: [
      {
        url: "/v4/vicky-durel-hero.png",
        alt: "Portrait of Vicky Durel, product builder and systems operator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: ["/v4/vicky-durel-hero.png"]
  },
  category: "technology"
};

export const viewport = {
  themeColor: "#070b0d"
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  email: "hi@vickydurel.me",
  jobTitle: TAGLINE,
  description: DESCRIPTION,
  image: `${SITE_URL}/v4/vicky-durel-hero.png`,
  sameAs: ["https://www.linkedin.com/in/vicky-durel/"],
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

/** @param {{ children: import('react').ReactNode }} props */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
