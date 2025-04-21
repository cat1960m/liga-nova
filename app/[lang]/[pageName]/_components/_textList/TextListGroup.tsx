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
import { UpdateTextDescriptionData } from "../__commonComponents/_upadeModal/UpdateTextDescriptionData";
import { DeleteFeatureButton } from "../__commonComponents/_buttons/DeleteFeatureButton";
import { AddChildFeatureButton } from "../__commonComponents/_buttons/AddChildFeatureButton";

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
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: widthItem + "px",
        }}
      >
        <div
          style={{
            padding: "10px",
            width: "100%",
          }}
        >
          <div
            style={{
              border: "1px dotted lightgray",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: isMain ? 18 : 12,
                  fontWeight: 400,
                  color: isMain ? "red" : "black",
                }}
              >
                {textName?.text_content ?? "N/A"}
              </div>
              {isEdit && textName ? (
                <UpdateTextDescriptionData
                  staticTexts={staticTexts}
                  currentData={textName}
                  useItems={{ text: "simple" }}
                  params={params}
                />
              ) : null}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                {isMain ? (
                  <div
                    style={{
                      height: "20px",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      fontSize: "40px",
                      color: "#6f6fff",
                      lineHeight: "30px",
                    }}
                  >
                    "
                  </div>
                ) : null}
                <div
                  style={{
                    fontSize: isMain ? 16 : 12,
                    fontWeight: 200,
                    whiteSpace: "pre-line",
                    padding: isMain ? "0 30px" : undefined,
                  }}
                >
                  {textBody?.text_content ?? "N/A"}
                </div>
                {isMain ? (
                  <div
                    style={{
                      height: "40px",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontSize: "40px",
                      color: "#6f6fff",
                      lineHeight: "30px",
                    }}
                  >
                    "
                  </div>
                ) : null}
              </div>

              {isEdit && textBody ? (
                <UpdateTextDescriptionData
                  staticTexts={staticTexts}
                  currentData={textBody}
                  useItems={{ text: "area" }}
                  params={params}
                />
              ) : null}
            </div>
          </div>
        </div>

        {isEdit ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DeleteFeatureButton
              deleteText={staticTexts.delete ?? "N/A"}
              featureData={childFeatureData}
              isHorizontal={true}
              onDeleteFinished={handleDeleteFinished}
            />
          </div>
        ) : null}
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
        lastAddedId={lastAddedId}
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
            textTypes={[TEXT_LIST_NAME, TEXT_LIST_BODY]}
            type={TEXT_LIST_GROUP_ITEM}
            subtype={TEXT_LIST_GROUP_ITEM}
            onChildFeatureAdded={handleChildFeatureAdded}
          />
          <DeleteFeatureButton
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={groupData}
          />
        </div>
      ) : null}
    </div>
  );
};
