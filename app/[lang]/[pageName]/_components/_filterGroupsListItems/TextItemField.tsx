import { FullData, MainParams } from "@/app/lib/definitions";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { UseItems } from "../__commonComponents/_upadeModal/UpdateTextDescriptionDataModalContent";

export type Props = {
  fieldData: FullData;
  staticTexts: StaticTexts;
  title?: string;
  params: MainParams;
  useItems: UseItems;
};

export const TextItemField = ({
  fieldData,
  staticTexts,
  title,
  params,
  useItems,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        border: "1px dotted magenta",
      }}
    >
      {title ? <div style={{ fontWeight: 700 }}>{title}: </div> : null}

      <ItemContainerUpdateDeleteTextDescription
        isEdit={true}
        staticTexts={staticTexts}
        currentData={fieldData}
        s3Key={fieldData.value}
        useItems={useItems}
        params={params}
        isChangeOrder={fieldData.can_delete}
        isChangeOrderHorizontal={false}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            alignItems: "center",
          }}
        >
          {useItems.price ? <div>{fieldData.price ?? "0"}</div> : null}

          {useItems.text === "simple" ? (
            <div
              style={{
                fontWeight: 300,
                whiteSpace: "pre-line",
                fontSize: 14,
              }}
            >
              {fieldData.text_content ?? "N/A"}
            </div>
          ) : null}

          {useItems.text === "quill" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: fieldData.text_content ?? "N/A",
              }}
            />
          ) : null}
        </div>
      </ItemContainerUpdateDeleteTextDescription>
    </div>
  );
};
