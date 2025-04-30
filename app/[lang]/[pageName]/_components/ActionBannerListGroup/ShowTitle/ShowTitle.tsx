import { FullData, MainParams } from "@/app/lib/definitions";

import styles from "./showTitle.module.css";
import { ItemContainerUpdateDeleteTextDescription } from "../../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import cn from "clsx";

export type Props = {
  params: MainParams;
  title: FullData;
  color: string;
};

export const ShowTitle = ({ params, title, color }: Props) => {
  const { isEdit } = params;

  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={title}
      useItems={{ text: "simple" }}
      params={params}
      isChangeOrder={false}
    >
      <div className={cn(styles.group, {[styles.edit]: isEdit})}>
        <div className={styles.title} style={{ color }}>
          {title?.text_content ?? "N/A"}
        </div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
