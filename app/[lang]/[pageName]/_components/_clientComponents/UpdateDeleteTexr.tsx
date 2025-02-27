import { FullData } from "@/app/lib/definitions";
import { DeleteTextDescriptionButton } from "./DeleteTextDescriptionButton";
import { UpdateTextDescriptionData_new } from "./UpdateTextDescriptionData_new";
import { StaticTexts } from "@/app/dictionaries/definitions";
export type Props = {
  currentData?: FullData;
  staticTexts: StaticTexts;
};

export const UpdateDeleteText = ({ currentData, staticTexts }: Props) => {
  if (!currentData) {
    return null;
  }
  const canDelete = !!currentData.can_delete;
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <UpdateTextDescriptionData_new
        currentData={currentData}
        staticTexts={staticTexts}
      />

      {canDelete ? (
        <DeleteTextDescriptionButton
          textDescriptionId={currentData.text_description_id}
          deleteText={staticTexts.delete ?? "N/A"}
        />
      ) : null}
    </div>
  );
};
