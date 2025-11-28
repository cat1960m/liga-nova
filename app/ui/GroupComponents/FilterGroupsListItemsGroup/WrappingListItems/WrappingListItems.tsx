"use client";

import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { DeleteFeatureChangeOrderButtons } from "@/app/ui/CommonComponents/_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";
import { ListItem } from "../ListItem/ListItem";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

import styles from "./wrappingListItems.module.css";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ItemGroupContainerCommon } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemGroupContainerCommon/ItemGroupContainerCommon";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  pageFullDataList: FullData[];
  setEditingItemFeatureId: (id: number | null) => void;
  editTextButton: string;
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageName: string;
  filteredListItemsData: StructuredFeatureData;
};

export const WrappingListItems = ({
  pageFullDataList,
  setEditingItemFeatureId,
  editTextButton,
  isEdit,
  staticTexts,
  pageName,
  filteredListItemsData,
}: Props) => {
  if (!filteredListItemsData.sortedChildFeaFeatureIds.length) {
    return null;
  }

  const getEditButtons = ({
    currentData,
    countIndex,
  }: {
    currentData: FullData[];
    countIndex: CountIndex;
  }) => {
    const id = currentData[0]?.id ?? null;
    return (
      <div className={styles.buttons}>
        <CommonButton
          onClick={() => setEditingItemFeatureId(id)}
          width={ICON_BUTTON_WIDTH}
        >
          <PencilIcon width={ICON_IN_BUTTON_WIDTH} title={editTextButton} />
        </CommonButton>

        <DeleteFeatureChangeOrderButtons
          deleteText={staticTexts.delete ?? "N/A"}
          featureData={currentData}
          isChangeOrderHorizontal
          countIndex={countIndex}
        />
      </div>
    );
  };

  return (
    <div>
      <div className={styles.body}>
        {filteredListItemsData.sortedChildFeaFeatureIds.map((itemId, index) => {
          const listItemData = filteredListItemsData.childFeatureIdToFullDataList[itemId];
          return (
            <div key={itemId} className={styles.listItem}>
              <ItemGroupContainerCommon
                showGroupButtons={isEdit}
                getEditButtons={() =>
                  getEditButtons({
                    currentData: listItemData,
                    countIndex: {
                      count: filteredListItemsData.sortedChildFeaFeatureIds.length,
                      index,
                    },
                  })
                }
                marginTop={0}
                heightValue="100%"
              >
                <ListItem
                  currentData={listItemData}
                  pageName={pageName}
                  pageFullDataList={pageFullDataList}
                  staticTexts={staticTexts}
                />
              </ItemGroupContainerCommon>
            </div>
          );
        })}
      </div>
    </div>
  );
};
