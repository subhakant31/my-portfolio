import { dataocmsApiUrl } from "./constants";
import localPageData from "@/data/pageData.json";

interface DatoCMSResponse {
  data: any;
  errors?: any[];
}

const useLocalData = process.env.USE_LOCAL_DATA === "true";

/**
 * Fetch all page slugs and titles.
 * Returns array of { slug, pageTitle }
 */
export async function fetchAllSlugs(): Promise<{ slug: string; pageTitle: string }[]> {
  if (useLocalData) {
    return localPageData.data.allPages.map((page: any) => ({
      slug: page.slug || "home",
      pageTitle: page.pageTitle,
    }));
  }

  const response = await fetchAPI(`query getAllSlugs {
    allPages {
      slug
      pageTitle
    }
  }`);

  return response.data.allPages;
}

/**
 * Fetch full page data by slug.
 * Returns { pageTitle, components } or null if not found.
 */
export async function fetchPageBySlug(slug: string): Promise<{ pageTitle: string; components: any[] } | null> {
  if (useLocalData) {
    const page = localPageData.data.allPages.find(
      (p: any) => (p.slug || "home") === slug
    );
    if (!page) return null;
    return {
      pageTitle: page.pageTitle,
      components: page.components,
    };
  }

  const { pageBySlugQuery } = await import("./constants");
  const response = await fetchAPI(pageBySlugQuery, { slug });

  const page = response.data.allPages[0];
  if (!page) return null;

  return {
    pageTitle: page.pageTitle,
    components: page.components,
  };
}

/**
 * Low-level DatoCMS API call
 */
async function fetchAPI(
  query: string,
  variables?: Record<string, any>
): Promise<DatoCMSResponse> {
  const token = process.env.DATOCMS_API_TOKEN;

  const response = await fetch(dataocmsApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData?.errors?.[0]?.message || `DatoCMS API error: ${response.status}`
    );
  }

  return response.json();
}

// Keep backward compatible export
export const fetchFromDatoCMS = fetchAPI;
