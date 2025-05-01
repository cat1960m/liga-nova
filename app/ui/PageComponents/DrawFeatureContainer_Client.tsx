import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature } from "./DrawChildFeatures";
import { AddChildFeatureToContainer } from "../CommonComponents/_buttons/AddChildFeatureToContainer";
import { MAX_PAGE_WIDTH } from "@/app/lib/constants";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
  containerFullData: [Record<string, FullData[]>, string[]];
  buttonText: string;
  params: MainParams;
  pageId: number;
};

export const DrawFeatureContainer_Client = ({
  featureId,
  pageFullDataList,
  containerFullData,
  buttonText,
  params,
  pageId,
}: Props) => {
  const [data, keys] = containerFullData;
  const { isEdit } = params;

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "40px",
          maxWidth: `${MAX_PAGE_WIDTH}px`,
        }}
      >
        {keys.map((id) => {
          return (
            <DrawChildFeature
              childFeatureDataList={data[id]}
              pageFullDataList={pageFullDataList}
              params={params}
              key={id}
              parentFeatureId={featureId}
              pageId={pageId}
            />
          );
        })}

        {isEdit ? (
          <AddChildFeatureToContainer
            parentFeatureId={featureId}
            text={buttonText}
            params={params}
            pageFullDataList={pageFullDataList}
            pageId={pageId}
          />
        ) : null}
      </div>
    </div>
  );
};
