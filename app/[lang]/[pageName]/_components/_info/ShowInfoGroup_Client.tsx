import { FullData } from "@/app/lib/definitions";
import {
  INFO_ADDRESS,
  INFO_BODY,
  INFO_TELEPHONE,
  INFO_TITLE,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowInfoGroupItem_Client } from "./ShowInfoGroupItem_Client";
import { AddTextDescriptionButton } from "../_clientComponents/AddTextDescriptionButton";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
};

export const ShowInfoGroup_Client = ({
  isEdit,
  staticTexts,
  groupData,
}: Props) => {
  const featureId = groupData[0]?.id;

  const dataTitle = groupData.find((item) => item.text_type === INFO_TITLE);

  const dataTelephone = groupData.find(
    (item) => item.text_type === INFO_TELEPHONE
  );

  const dataAddress = groupData.find((item) => item.text_type === INFO_ADDRESS);

  const dataBodyList = groupData.filter((item) => item.text_type === INFO_BODY);

  if (!featureId) {
    return null;
  }

  return (
    <div style={{ display: "flex", width: "100%", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "50%",
          borderRadius: "10px",
          backgroundColor: "rgb(230, 230, 230)",
          border: isEdit ? "1px dotted magenta" : undefined,
          padding: "20px",
        }}
      >
        <ShowInfoGroupItem_Client
          isEdit={isEdit}
          staticTexts={staticTexts}
          data={dataTitle}
        />
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <ShowInfoGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={dataTelephone}
          />
          <ShowInfoGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={dataAddress}
          />
        </div>
        {dataBodyList.map((item, index) => {
          return (
            <div key={item.text_content_id ?? "" + "_" + index}>
              <ShowInfoGroupItem_Client
                isEdit={isEdit}
                staticTexts={staticTexts}
                data={item}
              />
            </div>
          );
        })}
        {isEdit ? (
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <AddTextDescriptionButton
              featureId={featureId}
              buttonText={staticTexts.addGroupItem ?? "N/A"}
              textType={INFO_BODY}
              price={null}
            />
          </div>
        ) : null}
      </div>

      <div
        style={{ display: "flex", width: "50%", border: "1px solid lightgray" }}
      ></div>
    </div>
  );
};
