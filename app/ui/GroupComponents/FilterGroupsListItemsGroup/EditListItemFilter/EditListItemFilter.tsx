"use client";

import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import {
  TICKETS_PAGE_NAME,
  TRAINERS_PAGE_NAME,
} from "@/app/lib/constants";

import styles from "./editListItemFilter.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { EditSubscriptionItem } from "../_tickets/EditSubscriptionItem/EditSubscriptionItem";
import { EditTrainerItem } from "../_trainers/EditTrainerItem/EditTrainerItem";

export type Props = {
  pageFullDataList: FullData[];
  groupData: FullData[];
  onClose: () => void;
  editItemFeatureId: number;
  lang: string;
  staticTexts: StaticTexts;
  pageName: string;
  structuredFilterGroupData: StructuredFeatureData;
};

export const EditListItemFilter = ({
  pageFullDataList,
  groupData,
  onClose,
  editItemFeatureId,
  lang,
  staticTexts,
  pageName,
  structuredFilterGroupData,
}: Props) => {
  const currentData = pageFullDataList.filter(
    (data) => data.id === editItemFeatureId
  );

  const parentFeatureId = groupData[0]?.id;

  if (pageName === TICKETS_PAGE_NAME) {
    return (
      <div className={styles.container}>
        <EditSubscriptionItem
          currentData={currentData}
          pageName={pageName}
          staticTexts={staticTexts}
          lang={lang}
          onClose={onClose}
          editItemFeatureId={editItemFeatureId}
          parentFeatureId={parentFeatureId}
          structuredFilterGroupData={structuredFilterGroupData}
        />
      </div>
    );
  }
  if (pageName === TRAINERS_PAGE_NAME) {
    return (
      <div className={styles.container}>
        <EditTrainerItem
          currentData={currentData}
          pageName={pageName}
          staticTexts={staticTexts}
          lang={lang}
          onClose={onClose}
          editItemFeatureId={editItemFeatureId}
          parentFeatureId={parentFeatureId}
          structuredFilterGroupData={structuredFilterGroupData}
          pageFullDataList={pageFullDataList}
        />
      </div>
    );
  }

  return null;
};
