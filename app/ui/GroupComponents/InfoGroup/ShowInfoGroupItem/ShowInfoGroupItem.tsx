import { FullData } from "@/app/lib/definitions";
import { INFO_BODY, INFO_TELEPHONE, INFO_TITLE } from "@/app/lib/constants";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import clsx from "clsx";
import styles from "./showInfoGroupItem.module.css";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  data?: FullData;
  isQuill?: boolean;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  countIndex: CountIndex | null;
};

export const ShowInfoGroupItem = ({
  data,
  isQuill,
  isEdit,
  staticTexts,
  lang,
  countIndex
}: Props) => {
  if (!data) {
    return null;
  }

  const isPhone = data.text_type === INFO_TELEPHONE;
  const isBody = data.text_type === INFO_BODY;

  return (
    <ItemContainerUpdateDeleteTextDescription
      useItems={{ text: isQuill ? "quill" : "simple" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      currentData={data}
      isChangeOrder={isBody}
      isChangeOrderHorizontal={false}
      countIndex={countIndex}
    >
      <div className={styles.container}>
        {isPhone ? <PhoneIcon className={styles.phoneIcon} /> : null}
        {!isQuill ? (
          <p
            className={clsx(styles.text, {
              [styles.titleText]: data.text_type === INFO_TITLE,
            })}
          >
            {data?.text_content ?? "N/A"}
          </p>
        ) : (
          <div
            style={{ wordBreak: "break-word", width: "100%" }}
            dangerouslySetInnerHTML={{
              __html: data.text_content ?? "N/A",
            }}
          />
        )}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
