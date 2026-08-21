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

export const getStaticProps = async () => {
  try {
    const allPages = await fetchAllSlugs();

    if (!allPages || allPages.length === 0) {
      return {
        props: { errorCode: 404, errorMessage: "No pages found", pageComponentList: null, pageTitle: "" },
        revalidate: 60,
      };
    }

    const homepage = allPages.find((p) => p.slug === "home") || allPages[0];
    const pageData = await fetchPageBySlug(homepage.slug);

    if (!pageData) {
      return {
        props: { errorCode: 404, errorMessage: "Homepage not found", pageComponentList: null, pageTitle: "" },
        revalidate: 60,
      };
    }

    return {
      props: {
        pageComponentList: pageData.components,
        pageTitle: pageData.pageTitle || "My Portfolio",
      },
      revalidate: 60, // ISR: regenerate every 60 seconds
    };
  } catch (error: any) {
    console.error("Error fetching page data:", error.message);
    return {
      props: { errorCode: 500, errorMessage: "Failed to fetch data", pageComponentList: null, pageTitle: "" },
      revalidate: 30,
    };
  }
};

export default IndexPage;
