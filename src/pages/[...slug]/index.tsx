import RenderLayout from "@/layouts/LayoutRenderer";
import { fetchAllSlugs, fetchPageBySlug } from "@/utilities/datocms";
import { GetStaticPropsContext } from "next";

const SlugPage = ({
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

export const getStaticPaths = async () => {
  try {
    const allPages = await fetchAllSlugs();
    const paths = allPages
      .filter((p) => p.slug && p.slug !== "home")
      .map((p) => ({
        params: { slug: p.slug.split("/") },
      }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params || {};
  const pageSlug = Array.isArray(slug) ? slug.join("/") : slug;

  if (!pageSlug) {
    return { notFound: true };
  }

  try {
    const pageData = await fetchPageBySlug(pageSlug);

    if (!pageData) {
      return { notFound: true };
    }

    return {
      props: {
        pageComponentList: pageData.components,
        pageTitle: pageData.pageTitle || "My Portfolio",
      },
      revalidate: 60,
    };
  } catch (error: any) {
    console.error(`Error fetching page "${pageSlug}":`, error.message);
    return { notFound: true };
  }
};

export default SlugPage;
