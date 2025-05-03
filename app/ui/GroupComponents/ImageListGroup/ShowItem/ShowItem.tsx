import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { ShowItemBody } from "../ShowItemBody/ShowItemBody";
import { FullData } from "@/app/lib/definitions";
import { StaticTexts } from "@/app/dictionaries/definitions";
import styles from "./showItem.module.css";

export type Props = {
  widthItem?: number;
  imageData: FullData;
  onDeleteFinished: () => void;
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
};

export const ShowItem = ({
  widthItem,
  imageData,
  onDeleteFinished,
  staticTexts,
  isEdit,
  lang,
}: Props) => {
  return (
    <div className={styles.container}>
      <ItemContainerUpdateDeleteTextDescription
        useItems={{ value: "image" }}
        s3Key={imageData.value}
        onDeleteFinished={onDeleteFinished}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
        currentData={imageData}
      >
        <ShowItemBody widthItem={widthItem} imageData={imageData} />
      </ItemContainerUpdateDeleteTextDescription>
    </div>
  );
};
