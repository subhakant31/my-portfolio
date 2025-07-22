import RenderLayout from "@/layouts/LayoutRenderer";
import { dataocmsApiUrl, pageQuery } from "@/utilities/constants";
const SlugPage = ({
  pageComponentList,
  errorCode,
  errorMessage,
  pageTitle,
}: {
  pageComponentList: any;
  errorCode: number;
  errorMessage: string;
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
        query: pageQuery, // Pass the extracted GraphQL query string
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
        headerData: responseData.data.allPages[0].components.find(
          (component: any) => component.__typename === "HeaderRecord"
        ),
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

export default SlugPage;
