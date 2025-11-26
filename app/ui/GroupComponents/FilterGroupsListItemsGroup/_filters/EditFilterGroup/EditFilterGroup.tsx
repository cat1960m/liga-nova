import { FullData } from "@/app/lib/definitions";
import { FilterGroup } from "../FilterGroup/FilterGroup";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { useMemo } from "react";
import { getContainerData } from "@/app/lib/utils";
import { FILTER_GROUP_SUBTYPE, GROUP } from "@/app/lib/constants";
import { EditTitleCancel } from "@/app/ui/CommonComponents/EditTitleCancel/EditTitleCancel";
import styles from "./editFilterGroup.module.css";

export type Props = {
  selectedFilterTextDescriptionIds: number[];
  lang: string;
  staticTexts: StaticTexts;
  pageName: string;
  setEditingFilterGroupId: (id: number | null) => void;
  parentFeatureId: number;
  editingFilterGroupId: number;
  pageFullDataList: FullData[];
};

export const EditFilterGroup = ({
  selectedFilterTextDescriptionIds,
  lang,
  staticTexts,
  pageName,
  setEditingFilterGroupId,
  parentFeatureId,
  pageFullDataList,
  editingFilterGroupId,
}: Props) => {
  const containerFullData = useMemo(
    () =>
      parentFeatureId
        ? getContainerData({
            pageName: pageName,
            pageFullData: pageFullDataList,
            parentFeatureId: parentFeatureId,
            type: GROUP,
            subtype: FILTER_GROUP_SUBTYPE,
          })
        : null,
    [pageName, pageFullDataList, parentFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, filterGroupIds] = containerFullData;

  const filterGroupData = data[editingFilterGroupId];
  const onCancel = () => setEditingFilterGroupId(null);
  return (
    <div className={styles.container}>
      <EditTitleCancel title={staticTexts.editFilterGroup?? ""} onCancel={onCancel} staticTexts={staticTexts}/>
      <div className={styles.group}>
        <FilterGroup
          filterGroupData={filterGroupData}
          onFilterSelectionChanged={() => {}}
          selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
          editMode={"groupItems"}
          lang={lang}
          staticTexts={staticTexts}
        />
      </div>
    </div>
  );
};
