const SITE_URL = "https://vickydurel.me";
const LAST_MODIFIED = "2026-07-16";

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/insights/where-ai-belongs`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.6
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
