import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon/ItemGroupContainerCommon";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton/DeleteFeatureButton";
import { AddChildFeatureButton } from "../_buttons/AddChildFeatureButton";
import { Buttons } from "./Buttons/Buttons";

export type Props = {
  children: React.ReactNode;
  groupData: FullData[];
  pageName: string;
  isEdit: boolean;
  onDeleteFinished?: () => void;
  onChildFeatureAdded?: (id: number) => void;
  addButtonText: string;
  deleteButtonText: string;
  textTypes: string[];
  featureType: string;
  featureSubtype: string;
  marginTop: number;
  noDelete: boolean;
  noAdd?: boolean;
};

export const ItemContainerAddChildFeatureDeleteFeature = ({
  children,
  groupData,
  pageName,
  isEdit,
  onDeleteFinished,
  onChildFeatureAdded,
  addButtonText,
  deleteButtonText,
  textTypes,
  featureType,
  featureSubtype,
  marginTop,
  noDelete,
  noAdd,
}: Props) => {
  const getEditButtons = () => {
    const groupFeatureId = groupData[0]?.id;

    if (!groupFeatureId) {
      return null;
    }

    return (
      <Buttons>
        <>
          {!noAdd ? (
            <AddChildFeatureButton
              parentFeatureId={groupFeatureId}
              text={addButtonText}
              pageName={pageName}
              textTypes={textTypes}
              type={featureType}
              subtype={featureSubtype}
              onChildFeatureAdded={onChildFeatureAdded}
            />
          ) : null}

          {!noDelete ? (
            <DeleteFeatureButton
              deleteText={deleteButtonText}
              featureData={groupData}
              onDeleteFinished={onDeleteFinished}
            />
          ) : null}
        </>
      </Buttons>
    );
  };
  return (
    <ItemGroupContainerCommon
      isEdit={isEdit}
      getEditButtons={getEditButtons}
      marginTop={marginTop}
    >
      {children}
    </ItemGroupContainerCommon>
  );
};
