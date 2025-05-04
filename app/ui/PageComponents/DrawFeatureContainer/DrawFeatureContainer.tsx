import styles from "./drawFeatureContainer.module.css";
import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature } from "../DrawChildFeatures";
import { AddChildFeatureToContainer } from "../../CommonComponents/AddChildFeatureToContainer/AddChildFeatureToContainer";
import { getContainerData, getIsEditNoDelete } from "@/app/lib/utils";
import { useMemo } from "react";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
  buttonText: string;
  params: MainParams;
  pageId: number;
};

export const DrawFeatureContainer = ({
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
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {keys.map((id) => (
          <DrawChildFeature
            childFeatureDataList={data[id]}
            pageFullDataList={pageFullDataList}
            params={params}
            key={id}
            parentFeatureId={featureId}
            pageId={pageId}
          />
        ))}

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
