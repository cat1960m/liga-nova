import { FullData } from "@/app/lib/definitions";
import { AddTextDescriptionButton } from "./AddTextDescriptionButton";
import { DeleteFeatureButton } from "./DeleteFeatureButton";

export type Props = {
  featureId?: number;
  onDeleteFinished?: () => void;
  featureData: FullData[];
  parentFeatureId: number | null;
  isHorizontal?: boolean;
  deleteButtonText: string;
  addButtonText: string;
  textDescriptionType: string;
  isNoAddButton?: boolean;
  price?: number;
};

export const AddTextDescriptionDeleteFeatureButtons = ({
  featureId,
  onDeleteFinished,
  featureData,
  parentFeatureId,
  isHorizontal,
  deleteButtonText,
  addButtonText,
  textDescriptionType,
  isNoAddButton,
  price,
}: Props) => {
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
        />
      ) : null}

      <DeleteFeatureButton
        featureId={featureId}
        deleteText={deleteButtonText}
        featureData={featureData}
        parentFeatureId={parentFeatureId}
        isHorizontal={isHorizontal}
        onDeleteFinished={onDeleteFinished}
      />
    </div>
  );
};
