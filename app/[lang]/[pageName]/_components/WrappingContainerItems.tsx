"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { CommonButton } from "./_clientComponents/CommonButton";
import { SubscriptionItem } from "./_subscription/SubscriptionItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { getContainerData } from "@/app/lib/utils";
import { useMemo } from "react";
import { DeleteFeatureButton } from "./_clientComponents/DeleteFeatureButton";
import { SUBSCRIPTION_ITEM, TRAINER_ITEM } from "@/app/lib/constants";
import { TrainerItem } from "./_trainers/TrainerItem";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  setEditingItemFeatureId: (id: number | null) => void;
  onAddItemClick: () => void;
  parentFeatureId: number;
  selectedFilterTextDescriptionIds: number[];
  params: MainParams;
  itemTypeSubtype: string;
  editTextButton: string;
  addTextButton: string;
};

export const WrappingContainerItems = ({
  isEdit,
  staticTexts,
  pageFullDataList,
  setEditingItemFeatureId,
  onAddItemClick,
  parentFeatureId,
  selectedFilterTextDescriptionIds,
  params,
  itemTypeSubtype,
  editTextButton,
  addTextButton,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      getContainerData({
        pageName: params.pageName,
        pageFullData: pageFullDataList,
        parentFeatureId,
        type: itemTypeSubtype,
        subtype: itemTypeSubtype,
        selectedFilterTextDescriptionIds,
      }),
    [pageFullDataList, parentFeatureId, selectedFilterTextDescriptionIds]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, itemIds] = containerFullData;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "5px" : 0,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          width: "100%",
          justifyContent: "center",
          justifyItems: "center",
          alignContent: "center",
          //  gap: "20px",
        }}
      >
        {itemIds.map((itemId) => {
          return (
            <div
              key={itemId}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "33.3%",
                minWidth: "190px",
                flexGrow: 2,
                maxWidth: "33.3%", //"50%",
                border: isEdit ? "1px dotted magenta" : undefined,
                padding: "10px",
              }}
            >
              {itemTypeSubtype === SUBSCRIPTION_ITEM ? (
                <SubscriptionItem currentData={data[itemId]} />
              ) : null}

              {itemTypeSubtype === TRAINER_ITEM ? (
                <TrainerItem currentData={data[itemId]} />
              ) : null}

              {isEdit ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CommonButton
                    text={editTextButton}
                    onClick={() =>
                      setEditingItemFeatureId(data[itemId][0]?.id ?? null)
                    }
                  />

                  <DeleteFeatureButton
                    featureId={data[itemId][0]?.id}
                    deleteText={staticTexts.delete ?? "N/A"}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {isEdit ? (
        <div
          style={{
            margin: "10px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <CommonButton text={addTextButton} onClick={onAddItemClick} />
        </div>
      ) : null}
    </div>
  );
};
