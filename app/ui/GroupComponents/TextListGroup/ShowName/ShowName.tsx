import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

import styles from "./showName.module.css";
import cn from "clsx";

export type Props = {
  isMain: boolean;
  textName: FullData;
  params: MainParams;
};
export const ShowName = ({ isMain, textName, params }: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={textName}
      useItems={{ text: "simple" }}
      params={params}
      isChangeOrder={false}
    >
      <div className={cn(styles.container, { [styles.main]: isMain })}>
        {textName?.text_content ?? "N/A"}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
