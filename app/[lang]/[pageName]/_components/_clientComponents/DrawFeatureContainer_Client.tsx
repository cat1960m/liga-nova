import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature_Client } from "./DrawChildFeatures_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddChildFeatureToContainer } from "./AddChildFeatureToContainer";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
  containerFullData: Record<string, FullData[]>;
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
  const keys = Object.keys(containerFullData);

  const buttonText = !isPageContainer
    ? staticTexts.addItemToTab
    : staticTexts.addItemToPage;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        minHeight: "40px",
      }}
    >
      {keys.map((id) => {
        return (
          <DrawChildFeature_Client
            childFeatureDataList={containerFullData[id]}
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
  );
};
