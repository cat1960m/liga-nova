"use client";

import {
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_GROUP_ITEM,
  ACTION_BANNER_LIST_IMAGE,
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useRef, useState } from "react";
import {getIsEditNoDelete } from "@/app/lib/utils";
import { ShowItem } from "./ShowItem/ShowItem";
import { ItemContainerAddChildFeatureDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerAddChildFeatureDeleteFeature";
import { ScrollContainer } from "../../CommonComponents/ScrollContainer/ScrollContainer";
import { useContainerData } from "../../hooks/useContainerData";

export type Props = {
  params: MainParams;
  pageFullDataList: FullData[];
  groupData: FullData[];
  groupFeatureId: number;
};
//main page
export const ActionBannerListGroup = ({ params, pageFullDataList, groupFeatureId , groupData}: Props) => {
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);


  const {childFeatureIdToFullDataList, sortedChildFeaFeatureIds} = useContainerData(
    {
      pageName: params.pageName,
      pageFullData: pageFullDataList,
      parentFeatureId: groupFeatureId,
    }
  );

  if (!groupFeatureId) {
    return null;
  }

  const { staticTexts, pageName, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

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
        actionBannerListItemsData={childFeatureIdToFullDataList}
        id={id}
        widthItem={widthItem}
        indexSelected={indexSelected}
        f={f}
        ids={sortedChildFeaFeatureIds}
        staticTexts={staticTexts}
        isEdit={isEdit}
        lang={lang}
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
      pageName={pageName}
      isEdit={isEdit}
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
      marginTop={20}
      noDelete={noDelete}
    >
      <div ref={ref}>
        <ScrollContainer
          ids={sortedChildFeaFeatureIds}
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
