import { FullData, MainParams } from "@/app/lib/definitions";

import styles from "./actionBannerList.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import cn from "clsx";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
  description: FullData;
  color: string;
};

export const ShowDescription = ({
  isEdit,
  staticTexts,
  params,
  description,
  color,
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
      <div className={cn(styles.group, { [styles.edit]: isEdit })}>
        <div style={{ display: "flex", width: "100%", gap: "5px" }}>
          <div className={styles.line}>_______</div>
          <div className={styles.description} style={{ color }}>
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
