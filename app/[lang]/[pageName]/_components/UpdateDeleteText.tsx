import { FullData } from "@/app/lib/definitions";
import { DeleteTextDescriptionButton } from "./_buttons/DeleteTextDescriptionButton";
import { UpdateTextDescriptionData } from "./_clientComponents/UpdateTextDescriptionData";
import { StaticTexts } from "@/app/dictionaries/definitions";
export type Props = {
  currentData?: FullData;
  staticTexts: StaticTexts;
  useIcons?: boolean;
  isArea?: boolean;
  isQuill?: boolean;
};

export const UpdateDeleteText = ({
  currentData,
  staticTexts,
  useIcons,
  isArea,
  isQuill,
}: Props) => {
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
      <UpdateTextDescriptionData
        currentData={currentData}
        staticTexts={staticTexts}
        useIcons={useIcons}
        isArea={isArea}
        isQuill={isQuill}
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
