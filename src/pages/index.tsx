import RenderLayout from "@/layouts/LayoutRenderer";
import localPageData from "@/data/pageData.json";

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
  const useLocalData = process.env.USE_LOCAL_DATA === "true";

  if (useLocalData) {
    const pageData = localPageData.data.allPages[0];
    return {
      props: {
        pageComponentList: pageData.components,
        pageTitle: pageData.pageTitle || "My Portfolio",
      },
    };
  }

  // DatoCMS fetch (production)
  const { dataocmsApiUrl, pageQuery } = await import("@/utilities/constants");
  const token = process.env.DATOCMS_API_TOKEN;

  try {
    const response = await fetch(dataocmsApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: pageQuery,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DatoCMS API Error:", errorData.data[0].attributes);
      return {
        props: {
          errorCode: response.status,
          errorMessage: errorData.error || "Failed to fetch data from DatoCMS",
        },
      };
    }
    const responseData = await response.json();

    return {
      props: {
        pageComponentList: responseData.data.allPages[0].components,
        pageTitle: responseData.data.allPages[0].pageTitle || "My Portfolio",
      },
    };
  } catch (error) {
    console.error("Error in fetching the page data:", error);
    return {
      props: {
        errorCode: 500,
        errorMessage: "Failed to fetch data from DatoCMS",
      },
    };
  }
};

export default IndexPage;
