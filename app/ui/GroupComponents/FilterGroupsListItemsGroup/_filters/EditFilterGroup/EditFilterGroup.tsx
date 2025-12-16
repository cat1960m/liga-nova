import { FullData } from "@/app/lib/definitions";
import { FilterGroup } from "../FilterGroup/FilterGroup";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { EditTitleCancel } from "@/app/ui/CommonComponents/EditTitleCancel/EditTitleCancel";
import styles from "./editFilterGroup.module.css";

export type Props = {
  selectedFilterTextDescriptionIds: number[];
  lang: string;
  staticTexts: StaticTexts;
  setEditingFilterGroupId: (id: number | null) => void;
  editingFilterGroupData: FullData[];
};

export const EditFilterGroup = ({
  selectedFilterTextDescriptionIds,
  lang,
  staticTexts,
  setEditingFilterGroupId,
  editingFilterGroupData,
}: Props) => {
  const onCancel = () => setEditingFilterGroupId(null);
  return (
    <div className={styles.container}>
      <EditTitleCancel
        title={staticTexts.editFilterGroup ?? ""}
        onCancel={onCancel}
        staticTexts={staticTexts}
      />
      <div className={styles.group}>
        <FilterGroup
          filterGroupData={editingFilterGroupData}
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
