import { ItemGroupContainerCommon } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemGroupContainerCommon/ItemGroupContainerCommon";
import { WrappingListItems } from "../WrappingListItems/WrappingListItems";
import { AddChildFeatureButton } from "@/app/ui/CommonComponents/_buttons/AddChildFeatureButton";
import {
  FullData,
  StructuredFeatureData,
} from "@/app/lib/definitions";
import { LIST_ITEM, PAGE_NAMES_TO_LIST_ITEMS_DATA } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import styles from "./wrappingListItemsContainer.module.css";

export type Props = {
  isEdit: boolean;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
  pageName: string;
  setEditingListItemFeatureId: (value: number | null) => void;
  parentFeatureId: number;
  filteredListItemsData: StructuredFeatureData;
};

export const WrappingListItemsContainer = ({
  isEdit,
  pageFullDataList,
  staticTexts,
  pageName,
  setEditingListItemFeatureId,
  parentFeatureId,
  filteredListItemsData,
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
      showGroupButtons={isEdit}
      getEditButtons={getEditButtons}
      marginTop={isEdit ? 20 : 0}
    >
      <WrappingListItems
        pageFullDataList={pageFullDataList}
        setEditingItemFeatureId={setEditingListItemFeatureId}
        editTextButton={editListItemText}
        isEdit={isEdit}
        staticTexts={staticTexts}
        pageName={pageName}
        filteredListItemsData={filteredListItemsData}
      />
    </ItemGroupContainerCommon>
  );
};
