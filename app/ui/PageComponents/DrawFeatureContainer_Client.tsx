import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature } from "./DrawChildFeatures";
import { AddChildFeatureToContainer } from "../CommonComponents/_buttons/AddChildFeatureToContainer";
import { MAX_PAGE_WIDTH } from "@/app/lib/constants";
import { getContainerData, getIsEditNoDelete } from "@/app/lib/utils";
import { useMemo } from "react";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
  buttonText: string;
  params: MainParams;
  pageId: number;
};

export const DrawFeatureContainer_Client = ({
  featureId,
  pageFullDataList,
  buttonText,
  params,
  pageId,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      getContainerData({
        pageName: params.pageName,
        pageFullData: pageFullDataList,
        parentFeatureId: featureId,
      }),
    [params.pageName, pageFullDataList, featureId]
  );

  const [data, keys] = containerFullData;
  const { pageName, staticTexts } = params;
  const { isDeepMode } = getIsEditNoDelete(params);

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

        {isDeepMode ? (
          <AddChildFeatureToContainer
            parentFeatureId={featureId}
            text={buttonText}
            pageFullDataList={pageFullDataList}
            pageId={pageId}
            staticTexts={staticTexts}
            pageName={pageName}
          />
        ) : null}
      </div>
    </div>
  );
};
