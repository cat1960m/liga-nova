
import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawChildFeature } from "../DrawChildFeatures";
import { AddChildFeatureToContainer } from "../../CommonComponents/AddChildFeatureToContainer/AddChildFeatureToContainer";
import { getContainerData, getIsEditNoDelete } from "@/app/lib/utils";
import { useMemo } from "react";

import styles from "./drawFeatureContainer.module.css";
import cn from "clsx";

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
  const isAdd = isOneChildren ? isDeepMode && !keys.length : isDeepMode;

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
