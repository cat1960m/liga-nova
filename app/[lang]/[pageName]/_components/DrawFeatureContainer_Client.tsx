import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature_Client } from "./DrawChildFeatures_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddChildFeatureToContainer } from "./__commonComponents/_buttons/AddChildFeatureToContainer";
import { MAX_PAGE_WIDTH } from "@/app/lib/constants";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
  containerFullData: [Record<string, FullData[]>, string[]];
  isEdit: boolean;
  staticTexts: StaticTexts;
  buttonText: string;
  params: MainParams;
  pageId: number;
};

export const DrawFeatureContainer_Client = ({
  featureId,
  pageFullDataList,
  containerFullData,
  isEdit,
  staticTexts,
  buttonText,
  params,
  pageId,
}: Props) => {
  const [data, keys] = containerFullData;

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // gap: "20px",
          width: "100%",
          minHeight: "40px",
          maxWidth: `${MAX_PAGE_WIDTH}px`,
        }}
      >
        {keys.map((id) => {
          return (
            <DrawChildFeature_Client
              childFeatureDataList={data[id]}
              pageFullDataList={pageFullDataList}
              params={params}
              key={id}
              isEdit={isEdit}
              staticTexts={staticTexts}
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
            staticTexts={staticTexts}
          />
        ) : null}
      </div>
    </div>
  );
};
