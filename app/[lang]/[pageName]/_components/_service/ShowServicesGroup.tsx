import { SERVICE_ITEM, TOOLTIP } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { ShowGroupServicesText } from "./ShowGroupServicesText";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";
import { AddTextDescriptionDeleteFeatureButtons } from "../_buttons/AddTextDescriptionDeleteFeatureButtons";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  parentFeatureId: number;
};

export const ShowServicesGroup = ({
  groupData,
  isEdit,
  staticTexts,
  parentFeatureId,
}: Props) => {
  const firstData = groupData[0];
  const featureId = firstData.id;

  const texts = groupData.filter((data) => data.content_type !== TOOLTIP);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                <ShowGroupServicesText
                  text={data.text_content ?? "N/A"}
                  title={title?.text_content ?? ""}
                  price={data.price ?? 0}
                />

                {isEdit ? (
                  <UpdateDeleteTextButtons
                    currentData={data}
                    staticTexts={staticTexts}
                    changeOrderTextType={SERVICE_ITEM}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureId={featureId}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          parentFeatureId={parentFeatureId}
          textDescriptionType={SERVICE_ITEM}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          price={0}
        />
      ) : null}
    </div>
  );
};
