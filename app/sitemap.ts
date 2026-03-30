import { MetadataRoute } from "next";

const KEYWORD_SLUGS = [
  "souzoku-zei-keisan",
  "souzoku-tetuzuki-nagare",
  "souzoku-houji-bukken",
  "isan-bunkatsu-kyougi",
  "souzoku-zei-kiso-koujo",
  "igon-tsukurikata",
  "souzoku-zei-sesuzei",
  "fudousan-souzoku",
  "souzoku-soudan-muryou",
  "seizen-zouyo-ai",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sozoku-ai.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tool`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blog/sozoku-zei-keisan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/sozoku-hoki-tetsuzuki`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/sozoku-timeline`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/isan-bunkatsu-kyogisho`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/souzoku-checklist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...KEYWORD_SLUGS.map((slug) => ({
      url: `${base}/keywords/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
