"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { CommonButton } from "../_clientComponents/CommonButton";
import { SubscriptionItem } from "./SubscriptionItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { getContainerData } from "@/app/lib/utils";
import { SUBSCRIPTION_ITEM } from "@/app/lib/constants";
import { useMemo } from "react";
import { DeleteFeatureButton } from "../_clientComponents/DeleteFeatureButton";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  setEditingSubscriptionFeatureId: (id: number | null) => void;
  onAddSubscriptionClick: () => void;
  subscriptionGroupFeatureId: number;
  selectedFilterTextDescriptionIds: number[];
  params: MainParams;
};

export const SubscriptionItems = ({
  isEdit,
  staticTexts,
  pageFullDataList,
  setEditingSubscriptionFeatureId,
  onAddSubscriptionClick,
  subscriptionGroupFeatureId,
  selectedFilterTextDescriptionIds,
  params,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      getContainerData({
        pageName: params.pageName,
        pageFullData: pageFullDataList,
        parentFeatureId: subscriptionGroupFeatureId,
        type: SUBSCRIPTION_ITEM,
        subtype: SUBSCRIPTION_ITEM,
        selectedFilterTextDescriptionIds,
      }),
    [
      pageFullDataList,
      subscriptionGroupFeatureId,
      selectedFilterTextDescriptionIds,
    ]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, subscriptionItemIds] = containerFullData;

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
        }}
      >
        {subscriptionItemIds.map((subscriptionItemId) => {
          return (
            <div
              key={subscriptionItemId}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "33.3%",
                minWidth: "190px",
                padding: "10px",
                flexGrow: 2,
                maxWidth: "50%",
              }}
            >
              <SubscriptionItem currentData={data[subscriptionItemId]} />

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
                    text={staticTexts.editSubscription ?? "N/A"}
                    onClick={() =>
                      setEditingSubscriptionFeatureId(
                        data[subscriptionItemId][0]?.id ?? null
                      )
                    }
                  />

                  <DeleteFeatureButton
                    featureId={data[subscriptionItemId][0]?.id}
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
          <CommonButton
            text={staticTexts.addSubscription ?? "N/A"}
            onClick={onAddSubscriptionClick}
          />
        </div>
      ) : null}
    </div>
  );
};
