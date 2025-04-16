import { FullData, MainParams } from "@/app/lib/definitions";
import { UpdateDeleteTextButtons } from "./__commonComponents/_buttons/UpdateDeleteTextButtons";
import { StaticTexts } from "@/app/dictionaries/definitions";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        gap: "5px",
        border: "1px dotted magenta",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {title ? <div style={{ fontWeight: 700 }}>{title}: </div> : null}

        <div
          style={{
            fontWeight: isImportant ? 700 : undefined,
            whiteSpace: "pre-line",
          }}
        >
          {fieldData.text_content ?? "N/A"}
        </div>
      </div>
      <UpdateDeleteTextButtons
        staticTexts={staticTexts}
        currentData={fieldData}
        useItems={{ text: "simple" }}
        params={params}
      />
    </div>
  );
};
