"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { CommonButton } from "../../__commonComponents/_buttons/CommonButton";
import { getContainerData } from "@/app/lib/utils";
import { useMemo } from "react";
import { DeleteFeatureButton } from "../../__commonComponents/_buttons/DeleteFeatureButton";
import { ListItem } from "../ListItem";
import {
  ICON_BUTTON_WIDTH,
  ICON_IN_BUTTON_WIDTH,
  LIST_ITEM,
} from "@/app/lib/constants";

import styles from "./wrappingListItems.module.css";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ItemGroupContainerCommon } from "../../__commonComponents/_itemGroupContainer/ItemGroupContainerCommon";

export type Props = {
  pageFullDataList: FullData[];
  setEditingItemFeatureId: (id: number | null) => void;
  parentFeatureId: number;
  selectedFilterTextDescriptionIds: number[];
  params: MainParams;
  editTextButton: string;
};

export const WrappingListItems = ({
  pageFullDataList,
  setEditingItemFeatureId,
  parentFeatureId,
  selectedFilterTextDescriptionIds,
  params,
  editTextButton,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      getContainerData({
        pageName: params.pageName,
        pageFullData: pageFullDataList,
        parentFeatureId,
        type: LIST_ITEM,
        subtype: LIST_ITEM,
        selectedFilterTextDescriptionIds,
      }),
    [pageFullDataList, parentFeatureId, selectedFilterTextDescriptionIds]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, itemIds] = containerFullData;
  const { staticTexts, isEdit } = params;

  const getEditButtons = ({ currentData }: { currentData: FullData[] }) => {
    const id = currentData[0]?.id ?? null;
    return (
      <div className={styles.buttons}>
        <CommonButton
          onClick={() => setEditingItemFeatureId(id)}
          width={ICON_BUTTON_WIDTH}
        >
          <PencilIcon width={ICON_IN_BUTTON_WIDTH} title={editTextButton} />
        </CommonButton>

        <DeleteFeatureButton
          deleteText={staticTexts.delete ?? "N/A"}
          featureData={currentData}
          isChangeOrderHorizontal
        />
      </div>
    );
  };

  return (
    <div>
      <div className={styles.body}>
        {itemIds.map((itemId) => {
          const currentData = data[itemId];
          return (
            <div key={itemId} className={styles.listItem}>
              <ItemGroupContainerCommon
                isEdit={isEdit}
                getEditButtons={() => getEditButtons({ currentData })}
                marginTop={0}
                heightValue="100%"
              >
                <ListItem
                  currentData={currentData}
                  pageName={params.pageName}
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
