"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import {
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_GROUP_ITEM,
  ACTION_BANNER_LIST_IMAGE,
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ScrollContainer } from "../__commonComponents/_scrollContainer/ScrollContainer";
import { useRef, useState } from "react";
import { getContainerData } from "@/app/lib/utils";
import { ShowItem } from "./ShowItem";
import { ItemContainerAddChildFeatureDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddChildFeatureDeleteFeature";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
};
//main page
export const ActionBannerListGroup = ({
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

  const [actionBannerListItemsData, actionBannerListItemIds] = getContainerData(
    {
      pageName: params.pageName,
      pageFullData: pageFullDataList,
      parentFeatureId: groupFeatureId,
    }
  );

  const ids = actionBannerListItemIds;

  const getItem = ({
    id,
    widthItem,
    indexSelected,
    f,
  }: {
    id: string;
    widthItem?: number;
    indexSelected: (index: number) => void;
    f: (value: "left" | "right") => void;
  }) => {
    return (
      <ShowItem
        actionBannerListItemsData={actionBannerListItemsData}
        id={id}
        widthItem={widthItem}
        isEdit={isEdit}
        staticTexts={staticTexts}
        params={params}
        indexSelected={indexSelected}
        f={f}
        ids={ids}
      />
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
      addButtonText={staticTexts.addImage ?? "N/A"}
      params={params}
      textTypes={[
        ACTION_BANNER_LIST_SHARE,
        ACTION_BANNER_LIST_TICKET,
        ACTION_BANNER_LIST_DESCRIPTION,
        ACTION_BANNER_LIST_IMAGE,
      ]}
      featureType={ACTION_BANNER_LIST_GROUP_ITEM}
      featureSubtype={ACTION_BANNER_LIST_GROUP_ITEM}
      onChildFeatureAdded={handleChildFeatureAdded}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      groupData={groupData}
      onDeleteFinished={handleDeleteFinished}
      isEdit={isEdit}
    >
      <div ref={ref}>
        <ScrollContainer
          ids={ids}
          getItem={getItem}
          countVisibleItems={1}
          lastAddedId={lastAddedId}
          isNoScrollItems={true}
          refParent={ref}
        />
      </div>
    </ItemContainerAddChildFeatureDeleteFeature>
  );
};
