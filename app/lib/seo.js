export const SITE_URL = "https://www.vickydurel.me";
export const SITE_NAME = "Vicky Durel";
export const TAGLINE = "Product Builder & Systems Operator";
export const DESCRIPTION =
  "Vicky Durel has helped businesses turn technology into practical operating advantage through software, digital workflows and AI orchestration systems since 2013.";

const HERO_IMAGE = {
  url: "/v4/vicky-durel-hero.png",
  alt: "Portrait of Vicky Durel, product builder and systems operator",
};

/**
 * Builds a full per-page metadata object so openGraph/twitter always carry
 * this page's own title and url instead of inheriting the layout's.
 */
export function buildMetadata({ title, description, path = "/" }) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      images: [HERO_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [HERO_IMAGE.url],
    },
  };
}
