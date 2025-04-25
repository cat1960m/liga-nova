import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemGroupContainerCommon } from "./ItemGroupContainerCommon";
import { AddChildFeatureDeleteFeatureButtons } from "./AddChildFeatureDeleteFeatureButtons";

export type Props = {
  children: React.ReactNode;
  isEdit: boolean;
  groupData: FullData[];
  params: MainParams;
  onDeleteFinished?: () => void;
  onChildFeatureAdded?: (id: number) => void;
  addButtonText: string;
  deleteButtonText: string;
  textTypes: string[];
  featureType: string;
  featureSubtype: string;
  marginTop: number;
};

export const ItemContainerAddChildFeatureDeleteFeature = ({
  isEdit,
  children,
  groupData,
  params,
  onDeleteFinished,
  onChildFeatureAdded,
  addButtonText,
  deleteButtonText,
  textTypes,
  featureType,
  featureSubtype,
  marginTop
}: Props) => {
  const getEditButtons = () => (
    <AddChildFeatureDeleteFeatureButtons
      groupData={groupData}
      params={params}
      onDeleteFinished={onDeleteFinished}
      onChildFeatureAdded={onChildFeatureAdded}
      addButtonText={addButtonText}
      deleteButtonText={deleteButtonText}
      textTypes={textTypes}
      featureType={featureType}
      featureSubtype={featureSubtype}
    />
  );
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
