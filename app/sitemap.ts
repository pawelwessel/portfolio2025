import { MetadataRoute } from "next";
import { getDocuments, getBlogPosts } from "@/common/firebase";
import { getAllCitySlugs } from "@/lib/polishCities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://quixy.pl";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Get existing blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const [collectionDocs, legacyDoc]: any = await Promise.all([
      getDocuments("blog"),
      getBlogPosts(),
    ]);

    const legacyPosts = Array.isArray(legacyDoc?.posts) ? legacyDoc.posts : [];
    const combined = [...(collectionDocs || []), ...legacyPosts];

    blogPages = combined
      .filter((post) => post?.slug || post?.url || post?.postId)
      .map((post) => {
        const slug = post.slug || post.url || post.postId;
        return {
          url: `${baseUrl}/oferta/${slug}`,
          lastModified: new Date(post.creationTime || Date.now()),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      });
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  // Get all city-based pages
  const citySlugs = getAllCitySlugs();
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/oferta/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...blogPages, ...cityPages];
}
