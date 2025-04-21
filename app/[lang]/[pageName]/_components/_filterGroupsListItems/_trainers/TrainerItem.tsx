"use client";

import { FullData } from "@/app/lib/definitions";
import {
  ACTION_BUTTON_BACKGROUND,
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
} from "@/app/lib/constants";
import { useEffect, useMemo, useState } from "react";
import { getPageFullData } from "@/app/lib/actions_fitness";
import { getFilterIds } from "@/app/lib/utils";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ExpandedText } from "../../__commonComponents/_expandedText/ExpandedText";
import { CommonButton } from "../../__commonComponents/_buttons/CommonButton";

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
      const pageFullData: FullData[] | null = await getPageFullData({
        lang: "",
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

  const isPremiumValue = isPremium.value === "yes";

  const premiumIcon = icons.find((icon) => icon.value?.includes(PREMIUM));

  const photoValue = name.value;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {photoValue ? (
        <div
          style={{
            width: "100%",
            border: `1px solid ${ACTION_BUTTON_BACKGROUND}`,
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
          onMouseEnter={() => setIsMouseIn(true)}
          onMouseLeave={() => setIsMouseIn(false)}
        >
          <img src={photoValue} alt="photo" width="100%" />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              overflow: "hidden",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "flex-start",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              {isPremiumValue && premiumIcon ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  <img src={premiumIcon?.value ?? ""} alt="" width="44px" />
                  {isMouseIn ? <div>{staticTexts.isPremium}</div> : null}
                </div>
              ) : null}

              {isMouseIn
                ? filters.map((filter) =>
                    filter.value ? (
                      <div
                        key={filter.text_description_id}
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                          fontSize: 14,
                          color: "white",
                        }}
                      >
                        <img src={filter.value ?? ""} alt="" width="44px" />
                        <div>{filter.text_content}</div>
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          fontSize: 16,
          fontWeight: 700,
          color: isPremiumValue ? "blue" : "gray",
          padding: "10px 0",
        }}
      >
        {name.text_content ?? "N/A"}
      </div>

      <ExpandedText
        staticTexts={staticTexts}
        descriptions={descriptions.map((item) => item.text_content ?? "N/A")}
        fontSize={14}
        fontWeight={300}
      />

      <CommonButton isAction text={staticTexts.signUpForTraining} />
    </div>
  );
};
