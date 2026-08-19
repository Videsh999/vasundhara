import { MetadataRoute } from "next";
import {
  MOCK_COLLECTIONS,
  MOCK_JEWELLERY,
  MOCK_EXPERIENCES,
} from "@/lib/supabase/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vasundharadiamondroof.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/collections",
    "/experiences",
    "/events",
    "/exhibitions",
    "/heritage",
    "/heritage/story",
    "/heritage/craftsmanship",
    "/bespoke",
    "/bespoke/process",
    "/bespoke/enquire",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Collection routes
  const collectionRoutes: MetadataRoute.Sitemap = MOCK_COLLECTIONS.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Jewellery routes
  const jewelleryRoutes: MetadataRoute.Sitemap = MOCK_JEWELLERY.map((j) => ({
    url: `${baseUrl}/jewellery/${j.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Event routes
  const eventRoutes: MetadataRoute.Sitemap = MOCK_EXPERIENCES.filter(
    (e) => e.eventType === "EVENT"
  ).map((evt) => ({
    url: `${baseUrl}/events/${evt.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic Exhibition routes
  const exhibitionRoutes: MetadataRoute.Sitemap = MOCK_EXPERIENCES.filter(
    (e) => e.eventType === "EXHIBITION"
  ).map((exh) => ({
    url: `${baseUrl}/exhibitions/${exh.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...jewelleryRoutes,
    ...eventRoutes,
    ...exhibitionRoutes,
  ];
}
