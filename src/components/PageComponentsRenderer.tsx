import { Suspense } from "react";
import { baseComponentRenderer } from "./ComponentList";

type ComponentName = keyof typeof baseComponentRenderer;

interface ComponentRenderers {
  [key: string]: React.ComponentType<any>;
}

export const componentRenderers: ComponentRenderers = {
  ...baseComponentRenderer,
};

const PageComponentsRenderer: React.FC<any> = ({ pageComponentList }) => {
  const pageComponentsListData = pageComponentList || [];
  return (
    <>
      {Array.isArray(pageComponentsListData) &&
        pageComponentsListData.map((component) => {
          if ((component.__typename as ComponentName) in componentRenderers) {
            const ComponentRenderer =
              componentRenderers[component.__typename as ComponentName];
            return (
              <Suspense
                key={component.id}
                fallback={
                  <div className='spinner-box'>
                    <div className='configure-border-1'>
                      <div className='configure-core'></div>
                    </div>
                    <div className='configure-border-2'>
                      <div className='configure-core'></div>
                    </div>
                  </div>
                }
              >
                <ComponentRenderer key={component.id} {...component} />
              </Suspense>
            );
          }
          return null;
        })}
    </>
  );
};

export default PageComponentsRenderer;
