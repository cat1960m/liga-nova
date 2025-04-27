import { FullData, MainParams } from "@/app/lib/definitions";

import styles from "./actionBannerList.module.css";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import cn from "clsx";

export type Props = {
  params: MainParams;
  description: FullData;
  color: string;
};

export const ShowDescription = ({
  params,
  description,
  color,
}: Props) => {
  const {  isEdit } = params;

  return (
    <ItemContainerUpdateDeleteTextDescription
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
