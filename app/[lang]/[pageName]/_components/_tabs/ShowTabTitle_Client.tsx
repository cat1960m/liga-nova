"use client";

import { FullData } from "@/app/lib/definitions";
import { CommonButton } from "../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateTextDescriptionData_new } from "../_clientComponents/UpdateTextDescriptionData_new";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";

export type Props = {
  tabTitle: FullData;
  selectedTabFeatureId: number | null;
  onSelectedTabFeatureIdChanged: (num: number) => void;
  isEdit: boolean;
  staticTexts: StaticTexts;
  tabIndex: number;
  pageFullDataList: FullData[];
};

export const ShowTabTitle_Client = ({
  tabTitle,
  selectedTabFeatureId,
  onSelectedTabFeatureIdChanged,
  isEdit,
  staticTexts,
  tabIndex,
  pageFullDataList,
}: Props) => {
  const isTabSelected = selectedTabFeatureId === tabTitle.id;

  const handleTabClick = () => {
    onSelectedTabFeatureIdChanged(tabTitle.id);
  };

  const backgroundColor = isTabSelected ? "lightblue" : "lightgray";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "5px" : undefined,
        gap: "10px",
      }}
    >
      <CommonButton
        backgroundColor={backgroundColor}
        text={tabTitle.text_content ?? "N/A"}
        onClick={handleTabClick}
      />

      {isEdit ? (
        <div style={{ display: "flex", gap: "20px" }}>
          <UpdateTextDescriptionData_new
            currentData={tabTitle}
            staticTexts={staticTexts}
          />

          {tabIndex > 0 ? (
            <DeleteFeatureButton
              featureId={tabTitle.id}
              deleteText={staticTexts.deleteTab ?? "N/A"}
              key={2}
              featureData={[tabTitle]}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
