import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import cn from "clsx";
import styles from "./showBody.module.css";
export type Props = {
  isMain: boolean;
  textBody: FullData;
  params: MainParams;
};

export const ShowBody = ({ isMain, textBody, params }: Props) => {
  const text = textBody?.text_content ?? "N/A";
  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={textBody}
      useItems={{ text: "area" }}
      params={params}
      isChangeOrder={false}
    >
      <div className={styles.mainName}>
        {isMain ? <div className={styles.start}>"</div> : null}
        <div className={cn(styles.text, { [styles.main]: isMain })}>{text}</div>
        {isMain ? <div className={styles.end}>"</div> : null}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
