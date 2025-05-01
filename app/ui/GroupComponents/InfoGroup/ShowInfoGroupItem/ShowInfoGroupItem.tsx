import { FullData, MainParams } from "@/app/lib/definitions";
import { INFO_BODY, INFO_TELEPHONE, INFO_TITLE } from "@/app/lib/constants";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import clsx from "clsx";
import styles from "./showInfoGroupItem.module.css";

export type Props = {
  data?: FullData;
  isQuill?: boolean;
  params: MainParams;
};

export const ShowInfoGroupItem = ({ data, isQuill, params }: Props) => {
  if (!data) {
    return null;
  }

  const isPhone = data.text_type === INFO_TELEPHONE;
  const isBody = data.text_type === INFO_BODY;

  return (
    <ItemContainerUpdateDeleteTextDescription
      useItems={{ text: isQuill ? "quill" : "simple" }}
      params={params}
      currentData={data}
      isChangeOrder={isBody}
      isChangeOrderHorizontal={false}
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
            dangerouslySetInnerHTML={{
              __html: data.text_content ?? "N/A",
            }}
          />
        )}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
