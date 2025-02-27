import { HEADER1, HEADER2 } from "@/app/lib/constants";
import { UpdateTextDescriptionData_new } from "./UpdateTextDescriptionData_new";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteTextDescriptionButton } from "./DeleteTextDescriptionButton";
import { FullData } from "@/app/lib/definitions";
import { UpdateDeleteText } from "./UpdateDeleteTexr";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  currentData: FullData;
};

export const ShowGroupColumnText_Client = ({
  isEdit,
  staticTexts,
  currentData,
}: Props) => {
  const isHeader = [HEADER1, HEADER2].includes(currentData.text_type);
  const canDelete = !!currentData.can_delete;

  const text = currentData.text_content ?? "N/A";
  const textDescriptionId = currentData.text_description_id;

  return (
    <div
      style={{
        flexGrow: 2,
        display: "flex",
        flexWrap: "wrap",
        fontWeight: isHeader ? 700 : 400,
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {!isHeader ? (
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "8px",
            border: "2px solid blue",
            color: "blue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "small",
          }}
        >
          v
        </div>
      ) : null}
      {text}
      {isEdit ? (
        <UpdateDeleteText currentData={currentData} staticTexts={staticTexts} />
      ) : null}
    </div>
  );
};
