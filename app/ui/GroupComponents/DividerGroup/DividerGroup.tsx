import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { FullData, MainParams } from "@/app/lib/definitions";
import styles from "./dividerGroup.module.css";

export type Props = {
  featureData: FullData[];
  params: MainParams;
};

export const DividerGroup = ({ params, featureData }: Props) => {
  const { staticTexts, isEdit } = params;

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
