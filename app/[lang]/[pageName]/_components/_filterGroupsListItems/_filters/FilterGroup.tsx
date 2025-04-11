"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { UpdateDeleteTextButtons } from "../../_buttons/UpdateDeleteTextButtons";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FILTER, FILTER_GROUP_TITLE } from "@/app/lib/constants";
import { AddTextDescriptionDeleteFeatureButtons } from "../../_buttons/AddTextDescriptionDeleteFeatureButtons";

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
};

export const FilterGroup = ({
  groupData,
  isEdit,
  staticTexts,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
}: Props) => {
  const featureId = groupData[0]?.id;
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (!featureId) {
    return null;
  }

  const titleData = groupData.find(
    (item) => item.text_type === FILTER_GROUP_TITLE
  );

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          border: isEdit ? "1px dotted magenta" : undefined,
          padding: "5px",
        }}
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
        {isEdit ? (
          <UpdateDeleteTextButtons
            staticTexts={staticTexts}
            currentData={titleData}
          />
        ) : null}
      </div>

      {isExpanded || isEdit
        ? filters.map((filter) => {
            const textDescriptionId = filter.text_description_id;
            const inputValue =
              !!selectedFilterTextDescriptionIds?.includes(textDescriptionId);
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  border: isEdit ? "1px dotted magenta" : undefined,
                  padding: "5px",
                }}
                key={filter.text_description_id}
              >
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
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
                {isEdit ? (
                  <UpdateDeleteTextButtons
                    staticTexts={staticTexts}
                    currentData={filter}
                    useIcons
                  />
                ) : null}
              </div>
            );
          })
        : null}

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureId={featureId}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          parentFeatureId={parentFeatureId}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={FILTER}
        />
      ) : null}
    </div>
  );
};
