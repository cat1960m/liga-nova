import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature } from "../DrawChildFeatures";
import { AddChildFeatureToContainer } from "../../CommonComponents/AddChildFeatureToContainer/AddChildFeatureToContainer";
import { getIsEditNoDelete } from "@/app/lib/utils";

import styles from "./drawFeatureContainer.module.css";
import cn from "clsx";
import { useContainerData } from "../../hooks/useContainerData";

export type Props = {
  featureId: number;
  pageFullDataList: FullData[];
  buttonText: string;
  params: MainParams;
  pageId: number;
  isOneChildren?: boolean;
};

export const DrawFeatureContainer = ({
  featureId,
  pageFullDataList,
  buttonText,
  params,
  pageId,
  isOneChildren,
}: Props) => {
  const structuredData = useContainerData({
    pageName: params.pageName,
    pageFullData: pageFullDataList,
    parentFeatureId: featureId,
  });
  const { pageName, staticTexts } = params;
  const { isDeepMode } = getIsEditNoDelete(params);
  const isAdd = isOneChildren
    ? isDeepMode && !structuredData.sortedChildFeaFeatureIds.length
    : isDeepMode;

  return (
    <div
      className={cn(styles.container, {
        [styles.oneItemContainer]: isOneChildren,
      })}
    >
      <div
        className={cn(styles.innerContainer, {
          [styles.oneItem]: isOneChildren,
        })}
      >
        {structuredData.sortedChildFeaFeatureIds.map((id, index) => (
          <DrawChildFeature
            childFeatureDataList={
              structuredData.childFeatureIdToFullDataList[id]
            }
            pageFullDataList={pageFullDataList}
            params={params}
            key={id}
            parentFeatureId={featureId}
            pageId={pageId}
            countIndex={{count: structuredData.sortedChildFeaFeatureIds.length, index}}
          />
        ))}

        {isAdd ? (
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
