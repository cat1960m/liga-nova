import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature_Client } from "./DrawChildFeatures_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddChildFeatureToContainer } from "./_clientComponents/AddChildFeatureToContainer";
import { MAX_PAGE_WIDTH } from "@/app/lib/constants";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
  containerFullData: [Record<string, FullData[]>, string[]];
  isEdit: boolean;
  staticTexts: StaticTexts;
  isPageContainer?: boolean;
  params: MainParams;
};

export const DrawFeatureContainer_Client = ({
  featureId,
  pageFullDataList,
  containerFullData,
  isEdit,
  staticTexts,
  isPageContainer,
  params,
}: Props) => {
  const [data, keys] = containerFullData;

  const buttonText = !isPageContainer
    ? staticTexts.addItemToTab
    : staticTexts.addItemToPage;

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: isEdit ? "20px" : 0,
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
            />
          );
        })}

        {isEdit ? (
          <AddChildFeatureToContainer
            parentFeatureId={featureId}
            text={buttonText ?? "N/A"}
            params={params}
          />
        ) : null}
      </div>
    </div>
  );
};
