import { FullData, MainParams } from "@/app/lib/definitions";
import { DEFAULT_TEXT } from "@/app/lib/constants";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";

import styles from "./textHeaderGroup.module.css";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { CountIndex } from "@/app/dictionaries/definitions";
export type Props = {
  data: FullData[];
  params: MainParams;
  countIndex: CountIndex;
};

export const TextHeaderGroup = ({ data, params, countIndex }: Props) => {
  const firstItem = data[0];
  const textDescriptions = data.filter((item) => !!item.text_description_id);

  if (!textDescriptions.length) {
    return null;
  }

  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={firstItem}
      useItems={{ text: "simple" }}
      featureData={data}
      isChangeOrderHorizontal={false}
      marginTop={0}
      staticTexts={staticTexts}
      lang={lang}
      isEdit={isEdit}
      noDelete={noDelete}
      countIndex={countIndex}
    >
      <div className={styles.container}>
        <div className={styles.divider} />
        {textDescriptions[0].text_content ?? DEFAULT_TEXT}
      </div>
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
