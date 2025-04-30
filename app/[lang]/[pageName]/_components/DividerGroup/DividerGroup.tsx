import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { FullData } from "@/app/lib/definitions";
import styles from "./dividerGroup.module.css";

export type Props = {
  staticTexts: StaticTexts;
  isEdit: boolean;
  featureData: FullData[];
};

export const DividerGroup = ({ staticTexts, isEdit, featureData }: Props) => {
  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isNoAddButton
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={featureData}
      isEdit={isEdit}
      addButtonText=""
      textDescriptionType=""
      isChangeOrderHorizontal={false}
      marginTop={10}
    >
      <div className={styles.divider} />
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
