import { FullData, MainParams } from "@/app/lib/definitions";

import styles from "./actionBannerList.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
  description: FullData;
};

export const ShowDescription = ({
  isEdit,
  staticTexts,
  params,
  description,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      staticTexts={staticTexts}
      currentData={description}
      useItems={{ text: "quill" }}
      params={params}
      isChangeOrder={false}
    >
      <div className={styles.group}>
        <div style={{ display: "flex", width: "100%", gap: "5px" }}>
          <div className={styles.line}>_______</div>
          <div className={styles.description}>
            <div
              dangerouslySetInnerHTML={{
                __html: description?.text_content ?? "N/A",
              }}
            />
          </div>
        </div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
