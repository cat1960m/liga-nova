"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FILTER, FILTER_GROUP_TITLE } from "@/app/lib/constants";
import { AddTextDescriptionDeleteFeatureButtons } from "../../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";
import { ItemContainerUpdateDeleteTextDescription } from "../../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  parentFeatureId: number | null;
  params: MainParams;
};

export const FilterGroup = ({
  groupData,
  isEdit,
  staticTexts,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  params,
}: Props) => {
  const featureId = groupData[0]?.id;
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (!featureId) {
    return null;
  }

  const titleData = groupData.find(
    (item) => item.text_type === FILTER_GROUP_TITLE
  );
  console.log("titleData", titleData);

  const filters = groupData.filter((item) => item.text_type === FILTER);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: "10px",
      }}
    >
      {titleData ? (
        <ItemContainerUpdateDeleteTextDescription
          isEdit={isEdit}
          staticTexts={staticTexts}
          currentData={titleData}
          useItems={{ text: "simple" }}
          isChangeOrder={false}
          params={params}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {titleData?.text_content ?? "N/A-----"}
            {isExpanded ? (
              <ChevronUpIcon
                onClick={() => setIsExpanded(false)}
                style={{ width: "24px" }}
              />
            ) : (
              <ChevronDownIcon
                onClick={() => setIsExpanded(true)}
                style={{ width: "24px" }}
              />
            )}
          </div>
        </ItemContainerUpdateDeleteTextDescription>
      ) : null}

      {isExpanded || isEdit
        ? filters.map((filter) => {
            const textDescriptionId = filter.text_description_id;
            const inputValue =
              !!selectedFilterTextDescriptionIds?.includes(textDescriptionId);

            return (
              <ItemContainerUpdateDeleteTextDescription
                key={filter.text_description_id}
                isEdit={isEdit}
                staticTexts={staticTexts}
                currentData={filter}
                useItems={{ text: "simple", value: "icons" }}
                params={params}
                isHorizontal={false}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    disabled={isEdit}
                    checked={inputValue}
                    onChange={(event) => {
                      onFilterSelectionChanged({
                        filter,
                        value: event.target.checked,
                      });
                    }}
                  />
                  <div style={{ fontSize: 14 }}>
                    {filter.text_content ?? "N/A"}
                  </div>
                  {isEdit && filter.value ? (
                    <img src={filter.value} alt="icon" />
                  ) : null}
                </div>
              </ItemContainerUpdateDeleteTextDescription>
            );
          })
        : null}

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={FILTER}
        />
      ) : null}
    </div>
  );
};
