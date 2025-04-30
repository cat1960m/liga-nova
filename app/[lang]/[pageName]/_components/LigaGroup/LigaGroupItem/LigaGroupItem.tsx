import { FullData, MainParams, PageData } from "@/app/lib/definitions";
import {
  ICON_IN_BUTTON_WIDTH,
  LIGA_ADDRESS,
  LIGA_SERVICE,
  LIGA_TELEPHONE,
  LIGA_TITLE,
} from "@/app/lib/constants";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ItemContainerUpdateDeleteTextDescription } from "../../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

import styles from "./ligaGroupItem.module.css";

export type Props = {
  data?: FullData;
  params: MainParams;
};

export const LigaGroupItem = ({ data, params }: Props) => {
  if (!data) {
    return null;
  }

  const isTitle = data.text_type === LIGA_TITLE;

  const textStyle = {
    fontWeight: isTitle ? 700 : undefined,
    fontSize: isTitle ? 24 : 16,
  };

  const isPhone = data.text_type === LIGA_TELEPHONE;

  const isAddress = data.text_type === LIGA_ADDRESS;

  const isService = data.text_type === LIGA_SERVICE;

  const textStyleService = {
    fontWeight: undefined,
    fontSize: 16,
  };

  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={data}
      isChangeOrder={isService}
      useItems={{
        text: "simple",
        value: isService ? "icons" : undefined,
        link: isService,
      }}
      params={params}
      isChangeOrderHorizontal={false}
    >
      <div className={styles.container}>
        {isTitle ? <div className={styles.divider} /> : null}

        <div className={styles.body}>
          <div className={styles.inner}>
            {isAddress ? (
              <MapPinIcon
                style={{ color: "blue", width: ICON_IN_BUTTON_WIDTH }}
              />
            ) : null}

            {isPhone ? (
              <PhoneIcon
                style={{ color: "blue", width: ICON_IN_BUTTON_WIDTH }}
              />
            ) : null}

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
                  <img src={data.value} alt="icon" />
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
