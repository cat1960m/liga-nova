"use client";

import { FullData } from "@/app/lib/definitions";
import {
  IMAGE,
  INFO_ADDRESS,
  INFO_BODY,
  INFO_TELEPHONE,
  INFO_TITLE,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowInfoGroupItem } from "./ShowInfoGroupItem";
import { AddTextDescriptionButton } from "../_buttons/AddTextDescriptionButton";
import { usePathname } from "next/navigation";
import { AddTextDescriptionDeleteFeatureButtons } from "../_buttons/AddTextDescriptionDeleteFeatureButtons";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  parentFeatureId: number;
};

export const ShowInfoGroup = ({
  isEdit,
  staticTexts,
  groupData,
  parentFeatureId,
}: Props) => {
  const featureId = groupData[0]?.id;

  const dataTitle = groupData.find((item) => item.text_type === INFO_TITLE);

  const dataTelephone = groupData.find(
    (item) => item.text_type === INFO_TELEPHONE
  );

  const dataAddress = groupData.find((item) => item.text_type === INFO_ADDRESS);

  const dataBodyList = groupData.filter((item) => item.text_type === INFO_BODY);

  const imageData = groupData.find((item) => item.text_type === IMAGE);

  if (!featureId) {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#f2f2f2",
          border: isEdit ? "1px dotted magenta" : undefined,
          padding: "20px",
        }}
      >
        <ShowInfoGroupItem
          isEdit={isEdit}
          staticTexts={staticTexts}
          data={dataTitle}
        />
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <ShowInfoGroupItem
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={dataTelephone}
          />

          <ShowInfoGroupItem
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={dataAddress}
          />
        </div>
        {dataBodyList.map((item, index) => {
          return (
            <div key={item.text_content_id ?? "" + "_" + index}>
              <ShowInfoGroupItem
                isEdit={isEdit}
                staticTexts={staticTexts}
                data={item}
                isArea
              />
            </div>
          );
        })}
      </div>
      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureId={featureId}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          parentFeatureId={parentFeatureId}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={INFO_BODY}
        />
      ) : null}
    </div>
  );
};
