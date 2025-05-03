import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { UseItems } from "@/app/ui/CommonComponents/_upadeModal/UpdateTextDescriptionDataModalContent";

import styles from "./textItemField.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  fieldData: FullData;
  title?: string;
  staticTexts: StaticTexts;
  lang: string;
  isEdit: boolean;

  useItems: UseItems;
};

export const TextItemField = ({
  fieldData,
  title,
  staticTexts,
  lang,
  isEdit,
  useItems,
}: Props) => {
  return (
    <div className={styles.container} >
      {title ? <div className={styles.title}>{title}: </div> : null}

      <ItemContainerUpdateDeleteTextDescription
        currentData={fieldData}
        s3Key={fieldData.value}
        useItems={useItems}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
        isChangeOrder={fieldData.can_delete}
        isChangeOrderHorizontal={false}
      >
        <div className={styles.body}>
          {useItems.price ? <div>{fieldData.price ?? "0"}</div> : null}

          {useItems.text === "simple" ? (
            <div className={styles.simple_text}>
              {fieldData.text_content ?? "N/A"}
            </div>
          ) : null}

          {useItems.text === "quill" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: fieldData.text_content ?? "N/A",
              }}
            />
          ) : null}
        </div>
      </ItemContainerUpdateDeleteTextDescription>
    </div>
  );
};
