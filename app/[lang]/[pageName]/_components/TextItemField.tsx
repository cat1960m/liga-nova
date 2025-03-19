import { FullData } from "@/app/lib/definitions";
import { UpdateDeleteText } from "./UpdateDeleteText";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  fieldData: FullData;
  staticTexts: StaticTexts;
  title?: string;
  importantDescriptionType: string;
};

export const TextItemField = ({
  fieldData,
  staticTexts,
  title,
  importantDescriptionType,
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
      <UpdateDeleteText staticTexts={staticTexts} currentData={fieldData} />
    </div>
  );
};
