import PageComponentsRenderer from "@/components/PageComponentsRenderer";
import MainLayout from "./MainLayout";
const RenderLayout = ({
  pageComponentList,
  pageTitle,
}: {
  pageComponentList: any;
  pageTitle: string;
}) => {
  return (
    <MainLayout pageTitle={pageTitle}>
      <PageComponentsRenderer pageComponentList={pageComponentList} />
    </MainLayout>
  );
};

export default RenderLayout;
