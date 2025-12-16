import { FullData, MainParams } from "@/app/lib/definitions";
import styles from "./dividerGroup.module.css";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { ItemContainerDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  featureData: FullData[];
  params: MainParams;
  countIndex: CountIndex;
};

export const DividerGroup = ({ params, featureData, countIndex }: Props) => {
  const { staticTexts } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerDeleteFeature
      deleteText={staticTexts.delete ?? "N/A"}
      featureData={featureData}
      isEdit={isEdit}
      isChangeOrderHorizontal={false}
      marginTop={10}
      noDelete={noDelete}
      countIndex={countIndex}
      noChangeOrder={false}
    >
      <div className={styles.divider} />
    </ItemContainerDeleteFeature>
  );
};
