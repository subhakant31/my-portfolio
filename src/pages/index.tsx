import RenderLayout from "@/layouts/LayoutRenderer";
import { fetchAllSlugs, fetchPageBySlug } from "@/utilities/datocms";

const IndexPage = ({
  pageComponentList,
  errorCode,
  errorMessage,
  pageTitle,
}: {
  pageComponentList: any;
  errorCode?: number;
  errorMessage?: string;
  pageTitle: string;
}) => {
  if (errorCode) return <h1>{errorMessage}</h1>;
  return (
    <RenderLayout
      pageComponentList={pageComponentList}
      pageTitle={pageTitle}
    ></RenderLayout>
  );
};

export const getServerSideProps = async () => {
  try {
    // Step 1: Get all slugs to find the homepage
    const allPages = await fetchAllSlugs();

    if (!allPages || allPages.length === 0) {
      return {
        props: { errorCode: 404, errorMessage: "No pages found", pageComponentList: null, pageTitle: "" },
      };
    }

    // Use page with slug "home", or fall back to first page
    const homepage = allPages.find((p) => p.slug === "home") || allPages[0];

    // Step 2: Fetch full page data for the homepage
    const pageData = await fetchPageBySlug(homepage.slug);

    if (!pageData) {
      return {
        props: { errorCode: 404, errorMessage: "Homepage not found", pageComponentList: null, pageTitle: "" },
      };
    }

    return {
      props: {
        pageComponentList: pageData.components,
        pageTitle: pageData.pageTitle || "My Portfolio",
      },
    };
  } catch (error: any) {
    console.error("Error fetching page data:", error.message);
    return {
      props: { errorCode: 500, errorMessage: "Failed to fetch data", pageComponentList: null, pageTitle: "" },
    };
  }
};

export default IndexPage;
