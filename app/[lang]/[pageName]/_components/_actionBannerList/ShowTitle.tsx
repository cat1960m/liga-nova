import { FullData, MainParams } from "@/app/lib/definitions";

import styles from "./actionBannerList.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
  title: FullData;
};

export const ShowTitle = ({ isEdit, staticTexts, params, title }: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      staticTexts={staticTexts}
      currentData={title}
      useItems={{ text: "simple" }}
      params={params}
      isChangeOrder={false}
    >
      <div className={styles.group}>
        <div className={styles.title}>{title?.text_content ?? "N/A"}</div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
