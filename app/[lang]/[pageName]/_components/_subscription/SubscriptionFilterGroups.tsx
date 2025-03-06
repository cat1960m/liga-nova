"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { getContainerData } from "@/app/lib/utils";
import { ShowFilterGroup } from "../ShowFilterGroup";
import { AddChildFeatureButton } from "../_clientComponents/AddChildFeatureButton";
import {
  GROUP,
  SUBSCRIPTIONS_FILTER,
  SUBSCRIPTIONS_FILTER_GROUP,
  SUBSCRIPTIONS_FILTER_GROUP_TITLE,
} from "@/app/lib/constants";
import { useMemo } from "react";
import { DeleteFeatureButton } from "../_clientComponents/DeleteFeatureButton";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
};

export const SubscriptionFilterGroups = ({
  groupData,
  pageFullDataList,
  isEdit,
  staticTexts,
  params,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
}: Props) => {
  const subscriptionFeatureId = groupData[0]?.id;
  if (!subscriptionFeatureId) {
    return null;
  }

  const containerFullData = useMemo(
    () =>
      subscriptionFeatureId
        ? getContainerData({
            pageName: params.pageName,
            pageFullData: pageFullDataList,
            parentFeatureId: subscriptionFeatureId,
            type: GROUP,
            subtype: SUBSCRIPTIONS_FILTER_GROUP,
          })
        : null,
    [pageFullDataList, subscriptionFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, filterGroupIds] = containerFullData;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f8f8",
        border: "1px solid lightgray",
        borderRadius: "10px",
        width: isEdit ? undefined : "238px",
        minWidth: "238px",
      }}
    >
      {filterGroupIds.map((filterGroupId, index) => {
        const filterGroupData = data[filterGroupId];
        return (
          <div key={filterGroupId}>
            {!!index ? (
              <div
                style={{ padding: "5px 0", borderTop: "1px solid lightgray" }}
              />
            ) : null}
            <ShowFilterGroup
              isEdit={isEdit}
              staticTexts={staticTexts}
              groupData={filterGroupData}
              titleTextType={SUBSCRIPTIONS_FILTER_GROUP_TITLE}
              itemTextType={SUBSCRIPTIONS_FILTER}
              onFilterSelectionChanged={onFilterSelectionChanged}
              selectedFilterTextDescriptionIds={
                selectedFilterTextDescriptionIds
              }
            />
          </div>
        );
      })}

      {isEdit ? (
        <div
          style={{
            margin: "10px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: "5px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <AddChildFeatureButton
            parentFeatureId={subscriptionFeatureId}
            text={staticTexts.addGroup ?? "N/A"}
            params={params}
            textTypes={[SUBSCRIPTIONS_FILTER_GROUP_TITLE, SUBSCRIPTIONS_FILTER]}
            type={GROUP}
            subtype={SUBSCRIPTIONS_FILTER_GROUP}
          />
        </div>
      ) : null}
    </div>
  );
};
