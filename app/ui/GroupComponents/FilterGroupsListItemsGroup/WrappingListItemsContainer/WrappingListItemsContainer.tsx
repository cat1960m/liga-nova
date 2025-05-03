import { ItemGroupContainerCommon } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemGroupContainerCommon";
import { WrappingListItems } from "../WrappingListItems/WrappingListItems";
import { AddChildFeatureButton } from "@/app/ui/CommonComponents/_buttons/AddChildFeatureButton";
import { FullData } from "@/app/lib/definitions";
import { LIST_ITEM, PAGE_NAMES_TO_LIST_ITEMS_DATA } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import styles from "./wrappingListItemsContainer.module.css";

export type Props = {
  isEdit: boolean;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
  pageName: string;
  selectedFilterTextDescriptionIds: number[];
  setEditingListItemFeatureId: (value: number | null) => void;
  parentFeatureId: number;
};

export const WrappingListItemsContainer = ({
  isEdit,
  pageFullDataList,
  staticTexts,
  pageName,
  selectedFilterTextDescriptionIds,
  setEditingListItemFeatureId,
  parentFeatureId,
}: Props) => {
  const addText = PAGE_NAMES_TO_LIST_ITEMS_DATA[pageName].addText;
  const addListItemText = staticTexts[addText]?.toString() ?? "N/A";

  const editText = PAGE_NAMES_TO_LIST_ITEMS_DATA[pageName].editText;
  const editListItemText = staticTexts[editText]?.toString() ?? "N/A";

  const textTypes = PAGE_NAMES_TO_LIST_ITEMS_DATA[pageName]?.textTypes;

  const getEditButtons = () => (
    <div className={styles.buttonContainer}>
      <AddChildFeatureButton
        parentFeatureId={parentFeatureId}
        text={addListItemText}
        pageName={pageName}
        textTypes={textTypes}
        type={LIST_ITEM}
        subtype={LIST_ITEM}
      />
    </div>
  );

  return (
    <ItemGroupContainerCommon
      isEdit={isEdit}
      getEditButtons={getEditButtons}
      marginTop={isEdit ? 20 : 0}
    >
      <WrappingListItems
        pageFullDataList={pageFullDataList}
        setEditingItemFeatureId={setEditingListItemFeatureId}
        parentFeatureId={parentFeatureId}
        selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
        editTextButton={editListItemText}
        isEdit={isEdit}
        staticTexts={staticTexts}
        pageName={pageName}
      />
    </ItemGroupContainerCommon>
  );
};
