import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddChildFeatureButton } from "../_buttons/AddChildFeatureButton";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";
import { FullData, MainParams } from "@/app/lib/definitions";
import {
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_GROUP_ITEM,
  ACTION_BANNER_LIST_IMAGE,
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
} from "@/app/lib/constants";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  onDeleteFinished?: () => void;
  onChildFeatureAdded?: (id: number) => void;
  addButtonText: string;
  deleteButtonText: string;
  textTypes: string[];
  featureType: string;
  featureSubtype: string;
};

export const AddChildFeatureDeleteFeatureButtons = ({
  groupData,
  params,
  onDeleteFinished,
  onChildFeatureAdded,
  addButtonText,
  deleteButtonText,
  textTypes,
  featureType,
  featureSubtype,
}: Props) => {
  const groupFeatureId = groupData[0]?.id;

  if (!groupFeatureId) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <AddChildFeatureButton
        parentFeatureId={groupFeatureId}
        text={addButtonText}
        params={params}
        textTypes={textTypes}
        type={featureType}
        subtype={featureSubtype}
        onChildFeatureAdded={onChildFeatureAdded}
      />
      <DeleteFeatureButton
        deleteText={deleteButtonText}
        featureData={groupData}
        onDeleteFinished={onDeleteFinished}
      />
    </div>
  );
};
