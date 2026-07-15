import { SITE_URL } from "./lib/seo";

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-07-16",
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: "2026-07-16",
      changeFrequency: "yearly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: "2026-07-16",
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/insights/where-ai-belongs`,
      lastModified: "2026-07-16",
      changeFrequency: "yearly",
      priority: 0.6
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: "2026-07-16",
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: "2026-07-16",
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
