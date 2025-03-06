import { FullData } from "@/app/lib/definitions";
import { UpdateDeleteText } from "../UpdateDeleteText";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION } from "@/app/lib/constants";

export type Props = {
  fieldData: FullData;
  staticTexts: StaticTexts;
  title?: string;
};

export const SubscriptionItemField = ({
  fieldData,
  staticTexts,
  title,
}: Props) => {
  const isImportant =
    fieldData.text_type === SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION;
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

        <div style={isImportant ? { fontWeight: 700 } : undefined}>
          {fieldData.text_content ?? "N/A"}
        </div>
      </div>
      <UpdateDeleteText staticTexts={staticTexts} currentData={fieldData} />
    </div>
  );
};
