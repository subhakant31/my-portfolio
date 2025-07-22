import PageComponentsRenderer from "@/components/PageComponentsRenderer";
import MainLayout from "./MainLayout";
const RenderLayout = ({ pageComponentList }: { pageComponentList: any }) => {
  return (
    <MainLayout>
      <PageComponentsRenderer pageComponentList={pageComponentList} />
    </MainLayout>
  );
};

export default RenderLayout;
