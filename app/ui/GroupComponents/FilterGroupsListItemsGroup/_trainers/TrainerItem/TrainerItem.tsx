"use client";

import { ICON_SIZE } from "@/app/lib/constants";
import {  useState } from "react";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ExpandedText } from "@/app/ui/CommonComponents/ExpandedText/ExpandedText";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import styles from "./trainerItem.module.css";
import cn from "clsx";
import { Register } from "../Register/Register";
import Image from "next/image";

export type Props = {
  currentDataId?: number;
  staticTexts: StaticTexts;
  srcPremiumIcon?: string;
  isPremiumValue: boolean;
  srcPhotoValue?: string;
  name: string;
  description?: string;
  filters: { value: string; text: string }[];
};

export const TrainerItem = ({
  currentDataId,
  staticTexts,
  srcPremiumIcon,
  isPremiumValue,
  srcPhotoValue,
  name,
  description,
  filters,
}: Props) => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);
  const handleClick = () => {
    if (currentDataId) {
      setIsFormShown(true);
    }
  };



  return (
    <div className={styles.container}>
      {srcPhotoValue ? (
        <div
          className={styles.photo_container}
          onMouseEnter={() => setIsMouseIn(true)}
          onMouseLeave={() => setIsMouseIn(false)}
        >
          <Image
            src={srcPhotoValue}
            alt="photo"
            width={800}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />

          <div className={styles.photo_info_container}>
            <div className={styles.photo_info}>
              {isPremiumValue && srcPremiumIcon ? (
                <div className={styles.premium_icon}>
                  <Image
                    src={srcPremiumIcon ?? ""}
                    alt=""
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />

                  {isMouseIn ? <div>{staticTexts.isPremium}</div> : null}
                </div>
              ) : null}

              {isMouseIn
                ? filters.map((filter, index) =>
                    filter.value ? (
                      <div
                        key={filter.value + "_" + index}
                        className={styles.filter}
                      >
                        <Image
                          src={filter.value ?? ""}
                          alt=""
                          width={ICON_SIZE}
                          height={ICON_SIZE}
                        />

                        <div>{filter.text}</div>
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className={cn(styles.name, { [styles.premium]: isPremiumValue })}>
        {name ?? "N/A"}
      </div>

      <ExpandedText
        staticTexts={staticTexts}
        descriptions={[description ?? "N/A"]}
        fontSize={14}
        fontWeight={300}
        isHTML
      />

      <CommonButton
        isAction
        text={staticTexts.signUpForTraining}
        onClick={handleClick}
      />

      {isFormShown && currentDataId ? (
        <Register setIsFormShown={setIsFormShown} id={currentDataId} />
      ) : null}
    </div>
  );
};
