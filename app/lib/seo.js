export const SITE_URL = "https://www.vickydurel.me";
export const SITE_NAME = "Vicky Durel";
export const PERSON_ID = `${SITE_URL}/#person`;
export const TAGLINE = "Product Builder & Systems Operator";
export const DESCRIPTION =
  "Vicky Durel has helped businesses turn technology into practical operating advantage through software, digital workflows and AI orchestration systems since 2013.";

/**
 * Builds a full per-page metadata object so openGraph/twitter always carry
 * this page's own title and url instead of inheriting the layout's.
 */
export function buildMetadata({ title, description, path = "/" }) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: path },
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Builds reusable metadata for authored field notes. */
export function buildArticleMetadata({
  title,
  description,
  path,
  publishedTime,
  modifiedTime = publishedTime,
}) {
  const metadata = buildMetadata({ title, description, path });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [PERSON_ID],
    },
  };
}
