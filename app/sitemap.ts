import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://benoit-baillon.com", lastModified: new Date() }];
}
