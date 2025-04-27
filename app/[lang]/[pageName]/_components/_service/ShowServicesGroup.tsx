import { SERVICE_ITEM, TOOLTIP } from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowGroupServicesText } from "./ShowGroupServicesText";
import { UpdateDeleteTextButtons } from "../__commonComponents/_buttons/UpdateDeleteTextButtons";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const ShowServicesGroup = ({ groupData, params }: Props) => {
  const firstData = groupData[0];

  const texts = groupData.filter((data) => data.content_type !== TOOLTIP);
  const { isEdit, staticTexts } = params;

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      textDescriptionType={SERVICE_ITEM}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      price={0}
      isEdit={isEdit}
      isChangeOrderHorizontal={false}
      marginTop={20}
    >
      <div
        style={{
          width: "100%",
          border: "1px solid lightgray",
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
                  backgroundColor: !(index % 2) ? "#f8f8f8" : "white",
                  padding: "5px 10px",
                  display: "flex",
                  gap: "10px",
                  minHeight: "45px",
                  alignItems: "center",
                }}
                key={data.id + "_" + index}
              >
                <ShowGroupServicesText
                  staticTexts={staticTexts}
                  text={data.text_content ?? "N/A"}
                  title={title?.text_content ?? ""}
                  price={data.value ?? ""}
                />

                {isEdit ? (
                  <UpdateDeleteTextButtons
                    currentData={data}
                    isChangeOrder={data.text_type === SERVICE_ITEM}
                    useItems={{
                      text: "simple",
                      tooltip: "simple",
                      value: "price",
                    }}
                    params={params}
                  />
                ) : (
                  <div style={{ color: "#2575fc" }}>{staticTexts.register}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
