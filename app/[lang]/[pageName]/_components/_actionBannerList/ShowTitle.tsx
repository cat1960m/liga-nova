import { FullData, MainParams } from "@/app/lib/definitions";

import styles from "./actionBannerList.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import cn from "clsx";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
  title: FullData;
  color: string;
};

export const ShowTitle = ({
  isEdit,
  staticTexts,
  params,
  title,
  color,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      staticTexts={staticTexts}
      currentData={title}
      useItems={{ text: "simple" }}
      params={params}
      isChangeOrder={false}
    >
      <div className={cn(styles.group, { [styles.edit]: isEdit })}>
        <div className={styles.title} style={{ color }}>
          {title?.text_content ?? "N/A"}
        </div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
