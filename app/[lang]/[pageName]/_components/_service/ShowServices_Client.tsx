import { SERVICE_ITEM, TOOLTIP } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { ShowGroupServicesText_Client } from "./ShowGroupServicesText_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteText } from "../UpdateDeleteText";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";
import { AddTextDescriptionButton } from "../_buttons/AddTextDescriptionButton";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowServices_Client = ({
  groupData,
  isEdit,
  staticTexts,
}: Props) => {
  const firstData = groupData[0];
  const featureId = firstData.id;

  const texts = groupData.filter((data) => data.content_type !== TOOLTIP);

  return (
    <div>
      <div
        style={{
          width: "100%",
          border: "1px solid gray",
          borderRadius: "10px",
          minHeight: "40px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {texts.map((data, index) => {
            const title = groupData.find(
              (item) =>
                item.text_description_id === data.text_description_id &&
                item.content_type === TOOLTIP
            );
            return (
              <div
                style={{
                  width: "100%",
                  backgroundColor: !(index % 2) ? "pink" : "white",
                  padding: "5px 10px",
                  display: "flex",
                  gap: "10px",
                }}
                key={data.id + "_" + index}
              >
                <ShowGroupServicesText_Client
                  text={data.text_content ?? "N/A"}
                  title={title?.text_content ?? ""}
                  price={data.price ?? 0}
                />

                {isEdit ? (
                  <UpdateDeleteText
                    currentData={data}
                    staticTexts={staticTexts}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {isEdit ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <AddTextDescriptionButton
              featureId={featureId}
              textType={SERVICE_ITEM}
              buttonText={staticTexts.addGroupItem ?? "N/A"}
              price={0}
            />

            <DeleteFeatureButton
              featureId={featureId}
              deleteText={staticTexts.delete ?? "N/A"}
              featureData={groupData}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
