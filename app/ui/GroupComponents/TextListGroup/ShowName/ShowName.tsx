import { FullData } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

import styles from "./showName.module.css";
import cn from "clsx";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  isMain: boolean;
  textName: FullData;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
};
export const ShowName = ({
  isMain,
  textName,
  isEdit,
  staticTexts,
  lang,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={textName}
      useItems={{ text: "simple" }}
      isChangeOrder={false}
      lang={lang}
      staticTexts={staticTexts}
      isEdit={isEdit}
      countIndex={null}
    >
      <div className={cn(styles.container, { [styles.main]: isMain })}>
        {textName?.text_content ?? "N/A"}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
