import { FullData, MainParams } from "@/app/lib/definitions";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "./__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  fieldData: FullData;
  staticTexts: StaticTexts;
  title?: string;
  importantDescriptionType: string;
  params: MainParams;
};

export const TextItemField = ({
  fieldData,
  staticTexts,
  title,
  importantDescriptionType,
  params,
}: Props) => {
  const isImportant = fieldData.text_type === importantDescriptionType;
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={true}
      staticTexts={staticTexts}
      currentData={fieldData}
      s3Key={fieldData.value}
      useItems={{ text: "simple", value: "image" }}
      params={params}
      isChangeOrder={fieldData.can_delete}
      isHorizontal={false}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          alignItems: "center",
        }}
      >
        {title ? <div style={{ fontWeight: 700 }}>{title}: </div> : null}

        <div
          style={{
            fontWeight: isImportant ? 700 : 300,
            whiteSpace: "pre-line",
            fontSize: 14,
          }}
        >
          {fieldData.text_content ?? "N/A"}
        </div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
