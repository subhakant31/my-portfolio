import RenderLayout from "@/layouts/LayoutRenderer";
import { fetchPageBySlug } from "@/utilities/datocms";
import { GetServerSidePropsContext } from "next";

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
    };
  } catch (error: any) {
    console.error(`Error fetching page "${pageSlug}":`, error.message);
    return { notFound: true };
  }
};

export default SlugPage;
