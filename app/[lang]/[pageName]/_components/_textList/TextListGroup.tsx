"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useMemo, useRef, useState } from "react";
import { ScrollContainer } from "../__commonComponents/_scrollContainer/ScrollContainer";
import {
  TEXT_LIST_BODY,
  TEXT_LIST_GROUP_ITEM,
  TEXT_LIST_NAME,
} from "@/app/lib/constants";
import { getContainerData } from "@/app/lib/utils";
import { ShowBody } from "./ShowBody";
import { ShowName } from "./ShowName";
import { ItemContainerAddChildFeatureDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddChildFeatureDeleteFeature";
import { ItemContainerDeleteChildFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerDeleteChildFeature";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
};

export const TextListGroup = ({
  isEdit,
  staticTexts,
  groupData,
  params,
  pageFullDataList,
}: Props) => {
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const groupFeatureId = groupData[0]?.id;

  if (!groupFeatureId) {
    return null;
  }

  const [textListItemsData, textListItemIds] = useMemo(() => {
    return getContainerData({
      pageName: params.pageName,
      pageFullData: pageFullDataList,
      parentFeatureId: groupFeatureId,
    });
  }, [pageFullDataList, groupFeatureId, params.pageName]);

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
        <ItemContainerDeleteChildFeature
          isEdit={isEdit}
          deleteText={staticTexts.delete ?? "N/A"}
          featureData={childFeatureData}
          isChangeOrderHorizontal={true}
          onDeleteFinished={handleDeleteFinished}
          marginTop={0}
        >
          <div
            style={{
              width: "100%",
              border: "1px dotted lightgray",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            {textName ? (
              <ShowName
                isMain={isMain}
                textName={textName}
                isEdit={isEdit}
                staticTexts={staticTexts}
                params={params}
              />
            ) : null}

            {textBody ? (
              <ShowBody
                isMain={isMain}
                textBody={textBody}
                isEdit={isEdit}
                staticTexts={staticTexts}
                params={params}
              />
            ) : null}
          </div>
        </ItemContainerDeleteChildFeature>
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
      isEdit={isEdit}
      groupData={groupData}
      params={params}
      onChildFeatureAdded={handleChildFeatureAdded}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      textTypes={[TEXT_LIST_NAME, TEXT_LIST_BODY]}
      featureType={TEXT_LIST_GROUP_ITEM}
      featureSubtype={TEXT_LIST_GROUP_ITEM}
      marginTop={20}
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
