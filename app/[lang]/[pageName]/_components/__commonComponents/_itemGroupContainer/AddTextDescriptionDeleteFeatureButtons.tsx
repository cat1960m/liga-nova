import { FullData } from "@/app/lib/definitions";
import { AddTextDescriptionButton } from "../_buttons/AddTextDescriptionButton";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";

export type Props = {
  onDeleteFinished?: () => void;
  featureData: FullData[];
  isChangeOrderHorizontal?: boolean;
  deleteButtonText: string;
  addButtonText: string;
  textDescriptionType: string;
  isNoAddButton?: boolean;
  price?: number;
  onTextDescriptionAdded?: (newId: number) => void;
};

export const AddTextDescriptionDeleteFeatureButtons = ({
  onDeleteFinished,
  featureData,
  isChangeOrderHorizontal,
  deleteButtonText,
  addButtonText,
  textDescriptionType,
  isNoAddButton,
  price,
  onTextDescriptionAdded,
}: Props) => {
  const featureFirst = featureData.length ? featureData[0] : undefined;
  const featureId = featureFirst?.id;
  const isAddShown = !!featureId && !isNoAddButton;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: "5px",
      }}
    >
      {isAddShown ? (
        <AddTextDescriptionButton
          featureId={featureId}
          textType={textDescriptionType}
          buttonText={addButtonText}
          price={price ?? null}
          onTextDescriptionAdded={onTextDescriptionAdded}
        />
      ) : null}

      <DeleteFeatureButton
        deleteText={deleteButtonText}
        featureData={featureData}
        isChangeOrderHorizontal={isChangeOrderHorizontal}
        onDeleteFinished={onDeleteFinished}
      />
    </div>
  );
};
