import { FullData } from "@/app/lib/definitions";
import {
  ICON_SIZE,
  LIGA_ADDRESS,
  LIGA_SERVICE,
  LIGA_TELEPHONE,
  LIGA_TITLE,
} from "@/app/lib/constants";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

import styles from "./ligaGroupItem.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import Image from "next/image";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
};

export const LigaGroupItem = ({ data, isEdit, staticTexts, lang }: Props) => {
  if (!data) {
    return null;
  }

  const isTitle = data.text_type === LIGA_TITLE;

  const isPhone = data.text_type === LIGA_TELEPHONE;

  const isAddress = data.text_type === LIGA_ADDRESS;

  const isService = data.text_type === LIGA_SERVICE;

  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={data}
      isChangeOrder={isService}
      useItems={{
        text: "simple",
        value: isService ? "icons" : undefined,
        link: isService,
      }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      isChangeOrderHorizontal={false}
    >
      <div className={styles.container}>
        {isTitle ? <div className={styles.divider} /> : null}

        <div className={styles.body}>
          <div className={styles.inner}>
            {isAddress ? <MapPinIcon className={styles.icon} /> : null}

            {isPhone ? <PhoneIcon className={styles.icon} /> : null}

            {!isService ? (
              <p
                className={
                  isTitle ? styles.text_title : styles.text_address_phone
                }
              >
                {data?.text_content ?? "N/A"}
              </p>
            ) : null}

            {isService ? (
              <div className={styles.service}>
                <div className={styles.icon_text}>
                  {data.value ? (
                    <Image src={data.value} alt="icon" width={ICON_SIZE} height={ICON_SIZE} />
                  ) : null}
                  <div className={styles.text_service}>
                    {data?.text_content ?? "N/A"}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
