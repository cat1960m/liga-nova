import { FullData } from "@/app/lib/definitions";
import { AddTextDescriptionButton } from "./AddTextDescriptionButton";
import { DeleteFeatureButton } from "./DeleteFeatureButton";

export type Props = {
  onDeleteFinished?: () => void;
  featureData: FullData[];
  isHorizontal?: boolean;
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
  isHorizontal,
  deleteButtonText,
  addButtonText,
  textDescriptionType,
  isNoAddButton,
  price,
  onTextDescriptionAdded
}: Props) => {
  const featureFirst = featureData.length ? featureData[0]: undefined;
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
        gap: "10px",
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
        isHorizontal={isHorizontal}
        onDeleteFinished={onDeleteFinished}
      />
    </div>
  );
};
