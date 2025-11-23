"use client";

import { FullData } from "@/app/lib/definitions";
import {
  ICON_SIZE,
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
  YES,
} from "@/app/lib/constants";
import { useEffect, useMemo, useState } from "react";
import { getFilterIds } from "@/app/lib/utils";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ExpandedText } from "@/app/ui/CommonComponents/ExpandedText/ExpandedText";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import styles from "./trainerItem.module.css";
import cn from "clsx";
import { Register } from "../Register/Register";
import Image from "next/image";
import { getPageData } from "@/app/lib/actionsContainer";

const PREMIUM = "premium%28--0%29";

export type Props = {
  currentData: FullData[];
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
};

export const TrainerItem = ({
  currentData,
  pageFullDataList,
  staticTexts,
}: Props) => {
  const [icons, setIcons] = useState<FullData[]>([]);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);

  const filters = useMemo(() => {
    if (!currentData.length) {
      return [];
    }
    const filterIds = getFilterIds(currentData[0].filter_ids);

    return pageFullDataList.filter((data) =>
      filterIds.includes(data.text_description_id)
    );
  }, [currentData, pageFullDataList]);

  useEffect(() => {
    const getIcons = async () => {
      const pageFullData: FullData[] | null = await getPageData({
        lang: "en",
        pageName: "icon",
      });

      setIcons(pageFullData ?? []);
    };
    getIcons();
  }, []);

  const name = currentData.find((item) => item.text_type === TRAINER_ITEM_NAME);
  const isPremium = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IS_PREMIUM
  );
  const descriptions = currentData.filter((item) =>
    [TRAINER_ITEM_DESCRIPTION].includes(item.text_type)
  );

  if (!name || !isPremium) {
    return null;
  }

  const isPremiumValue = isPremium.value === YES;

  const premiumIcon = icons.find((icon) => icon.value?.includes(PREMIUM));

  const photoValue = name.value;

  const handleClick = () => {
    setIsFormShown(true);
  };

  return (
    <div className={styles.container}>
      {photoValue ? (
        <div
          className={styles.photo_container}
          onMouseEnter={() => setIsMouseIn(true)}
          onMouseLeave={() => setIsMouseIn(false)}
        >
          <Image
            src={photoValue}
            alt="photo"
            width={800}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />

          <div className={styles.photo_info_container}>
            <div className={styles.photo_info}>
              {isPremiumValue && premiumIcon ? (
                <div className={styles.premium_icon}>
                  <Image
                    src={premiumIcon?.value ?? ""}
                    alt=""
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />

                  {isMouseIn ? <div>{staticTexts.isPremium}</div> : null}
                </div>
              ) : null}

              {isMouseIn
                ? filters.map((filter) =>
                    filter.value ? (
                      <div
                        key={filter.text_description_id}
                        className={styles.filter}
                      >
                        <Image
                          src={filter.value ?? ""}
                          alt=""
                          width={ICON_SIZE}
                          height={ICON_SIZE}
                        />

                        <div>{filter.text_content}</div>
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className={cn(styles.name, { [styles.premium]: isPremiumValue })}>
        {name.text_content ?? "N/A"}
      </div>

      <ExpandedText
        staticTexts={staticTexts}
        descriptions={descriptions.map((item) => item.text_content ?? "N/A")}
        fontSize={14}
        fontWeight={300}
        isHTML
      />

      <CommonButton
        isAction
        text={staticTexts.signUpForTraining}
        onClick={handleClick}
      />

      {isFormShown ? (
        <Register setIsFormShown={setIsFormShown} id={currentData[0]?.id} />
      ) : null}
    </div>
  );
};
