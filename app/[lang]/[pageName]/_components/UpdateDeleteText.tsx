import { FullData } from "@/app/lib/definitions";
import { DeleteTextDescriptionButton } from "./_clientComponents/DeleteTextDescriptionButton";
import { UpdateTextDescriptionData_new } from "./_clientComponents/UpdateTextDescriptionData_new";
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
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
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
