"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useMemo, useRef, useState } from "react";
import { ScrollContainer } from "@/app/ui/CommonComponents/ScrollContainer/ScrollContainer";
import {
  TEXT_LIST_BODY,
  TEXT_LIST_GROUP_ITEM,
  TEXT_LIST_NAME,
} from "@/app/lib/constants";
import { getContainerData, getIsEditNoDelete } from "@/app/lib/utils";
import { ShowBody } from "./ShowBody/ShowBody";
import { ShowName } from "./ShowName/ShowName";
import { ItemContainerAddChildFeatureDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddChildFeatureDeleteFeature";
import { ItemContainerDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";

import styles from "./textListGroup.module.css";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
};

export const TextListGroup = ({
  groupData,
  params,
  pageFullDataList,
}: Props) => {
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const groupFeatureId = groupData[0]?.id;

  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  const [textListItemsData, textListItemIds]: [
    Record<string, FullData[]>,
    string[]
  ] = useMemo(() => {
    if (!groupFeatureId) {
      return [{}, []];
    }
    return getContainerData({
      pageName: params.pageName,
      pageFullData: pageFullDataList,
      parentFeatureId: groupFeatureId,
    });
  }, [pageFullDataList, groupFeatureId, params.pageName]);

  if (!groupFeatureId) {
    return null;
  }
  const ids = textListItemIds;

  const getItem = ({
    id,
    widthItem,
    index,
    scrollPosition,
    countItemsShown,
  }: {
    id: string;
    widthItem?: number;
    index: number;
    scrollPosition: number;
    countItemsShown: number;
    f: (value: "left" | "right") => void;
    indexSelected: (index: number) => void;
  }) => {
    if (!widthItem) {
      return <> </>;
    }
    const firstVisibleIndex = Math.round(
      ids.length - scrollPosition / widthItem
    );
    let isMain = false;

    if (countItemsShown > 1) {
      isMain =
        countItemsShown === 3
          ? index === firstVisibleIndex + 1
          : index === firstVisibleIndex;
    }

    const childFeatureData = textListItemsData[id];
    const textName = childFeatureData.find(
      (item) => item.text_type === TEXT_LIST_NAME
    );
    const textBody = childFeatureData.find(
      (item) => item.text_type === TEXT_LIST_BODY
    );

    return (
      <div
        style={{
          width: widthItem + "px",
          padding: "10px",
        }}
      >
        <ItemContainerDeleteFeature
          isEdit={isEdit}
          deleteText={staticTexts.delete ?? "N/A"}
          featureData={childFeatureData}
          isChangeOrderHorizontal={true}
          onDeleteFinished={handleDeleteFinished}
          marginTop={0}
        >
          <div className={styles.item}>
            {textName ? (
              <ShowName
                isMain={isMain}
                textName={textName}
                isEdit={isEdit}
                staticTexts={staticTexts}
                lang={lang}
              />
            ) : null}

            {textBody ? (
              <ShowBody
                isMain={isMain}
                textBody={textBody}
                isEdit={isEdit}
                staticTexts={staticTexts}
                lang={lang}
              />
            ) : null}
          </div>
        </ItemContainerDeleteFeature>
      </div>
    );
  };

  const handleChildFeatureAdded = (newId: number) => {
    setLastAddedId(newId);
  };

  const handleDeleteFinished = () => {
    setLastAddedId(null);
  };

  return (
    <ItemContainerAddChildFeatureDeleteFeature
      groupData={groupData}
      isEdit={isEdit}
      pageName={params.pageName}
      onChildFeatureAdded={handleChildFeatureAdded}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      textTypes={[TEXT_LIST_NAME, TEXT_LIST_BODY]}
      featureType={TEXT_LIST_GROUP_ITEM}
      featureSubtype={TEXT_LIST_GROUP_ITEM}
      marginTop={20}
      noDelete={noDelete}
    >
      <div ref={ref}>
        <ScrollContainer
          ids={ids}
          getItem={getItem}
          lastAddedId={lastAddedId}
          refParent={ref}
          iconMarginTop={30}
        />
      </div>
    </ItemContainerAddChildFeatureDeleteFeature>
  );
};
