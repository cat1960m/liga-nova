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
import { DeleteFeatureButton } from "../__commonComponents/_buttons/DeleteFeatureButton";
import { AddChildFeatureButton } from "../__commonComponents/_buttons/AddChildFeatureButton";
import { ShowItem } from "./ShowItem";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
};

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
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <ScrollContainer
        ids={ids}
        getItem={getItem}
        countVisibleItems={1}
        lastAddedId={lastAddedId}
        isNoScrollItems={true}
        refParent={ref}
      />
      {isEdit ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            gap: "10px",
          }}
        >
          <AddChildFeatureButton
            parentFeatureId={groupFeatureId}
            text={staticTexts.addImage ?? "N/A"}
            params={params}
            textTypes={[
              ACTION_BANNER_LIST_SHARE,
              ACTION_BANNER_LIST_TICKET,
              ACTION_BANNER_LIST_DESCRIPTION,
              ACTION_BANNER_LIST_IMAGE,
            ]}
            type={ACTION_BANNER_LIST_GROUP_ITEM}
            subtype={ACTION_BANNER_LIST_GROUP_ITEM}
            onChildFeatureAdded={handleChildFeatureAdded}
          />
          <DeleteFeatureButton
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={groupData}
            onDeleteFinished={handleDeleteFinished}
          />
        </div>
      ) : null}
    </div>
  );
};
