"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import {
  INFO_ACTION_CHILD_SUBTYPE,
  INFO_ACTION_COMMON_SUBTYPE,
  INFO_ACTION_FREE_SUBTYPE,
  INFO_BODY,
  INFO_SUBTYPE,
  INFO_TITLE,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowInfoGroupItem } from "./ShowInfoGroupItem";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";
import { PhoneAddress } from "./PhoneAddress";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
};

export const ShowInfoGroup = ({
  isEdit,
  staticTexts,
  groupData,
  params,
}: Props) => {
  const subtype = groupData[0]?.subtype;

  const dataTitle = groupData.find((item) => item.text_type === INFO_TITLE);

  const isInfoGroup = subtype === INFO_SUBTYPE;

  const dataBodyList = groupData.filter((item) => item.text_type === INFO_BODY);
  const map: Record<string, string> = {};
  map[INFO_ACTION_COMMON_SUBTYPE] = staticTexts.register ?? "N/A";
  map[INFO_ACTION_CHILD_SUBTYPE] = staticTexts.registerChild ?? "N/A";
  map[INFO_ACTION_FREE_SUBTYPE] = staticTexts.tryFree ?? "N/A";

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
          params={params}
        />
        {isInfoGroup ? (
          <PhoneAddress
            isEdit={isEdit}
            staticTexts={staticTexts}
            groupData={groupData}
            params={params}
          />
        ) : null}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
          }}
        >
          {dataBodyList.map((item, index) => {
            return (
              <div key={item.text_content_id ?? "" + "_" + index}>
                <ShowInfoGroupItem
                  isEdit={isEdit}
                  staticTexts={staticTexts}
                  data={item}
                  isQuill
                  params={params}
                />
              </div>
            );
          })}
        </div>
        {!isInfoGroup ? (
          <div style={{ marginTop: "20px" }}>
            <CommonButton isAction text={map[subtype] ?? ""} />
          </div>
        ) : null}
      </div>
      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={INFO_BODY}
        />
      ) : null}
    </div>
  );
};
