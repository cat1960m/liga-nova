"use client";

import { TabType, TextContent } from "@/app/lib/definitions";
import { useState } from "react";
import { UpdateTextDescriptionDataModal } from "./UpdateTextDescriptionDataModal";
import { addText, updatePrice, updateText } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { TOOLTIP } from "@/app/lib/constants";
import { CommonButton } from "./CommonButton";

export const UpdateTextDescriptionData = ({
  textContents,
  textContentsTooltip,
  textDescriptionId,
  staticTexts,
  currentPrice,
  isTooltipUsed,
}: {
  textContents: TextContent[];
  textContentsTooltip?: TextContent[] | null;
  textDescriptionId: number;
  staticTexts: any;
  currentPrice?: number;
  isTooltipUsed?: boolean;
}) => {
  const [isEditModalShown, setIsEditModalShown] = useState(false);

  const pathName = usePathname();

  const handleEdit = () => {
    setIsEditModalShown(true);
  };

  const saveTab = async ({
    text,
    id,
    tabLang,
    contentType,
  }: {
    text: string;
    id?: number;
    tabLang: string;
    contentType: string;
  }) => {
    const textUpdated = text; //!!text ? text : null;
    if (id) {
      await updateText({
        id,
        text: textUpdated,
        pathName,
        contentType,
      });
      return;
    }

    try {
      await addText({
        textDescriptionId,
        lang: tabLang,
        text: textUpdated,
        pathName,
        contentType,
      });
    } catch {}
  };

  const saveTabs = async ({
    tabs,
    tabsTooltip,
    price,
  }: {
    tabs: TabType[];
    price?: number;
    tabsTooltip: TabType[];
  }) => {
    tabs.forEach((tab) => {
      const tabLang = tab.lang.toLocaleLowerCase();
      const textContent = textContents.find(
        ({ language }) => language === tabLang
      );

      saveTab({
        text: tab.value,
        id: textContent?.id,
        tabLang,
        contentType: "main",
      });
    });

    if (isTooltipUsed) {
      tabsTooltip.forEach((tab) => {
        const tabLang = tab.lang.toLocaleLowerCase();

        const textContent = textContentsTooltip?.find(
          ({ language }) => language === tabLang
        );

        saveTab({
          text: tab.value,
          id: textContent?.id,
          tabLang,
          contentType: TOOLTIP,
        });
      });
    }

    if (price) {
      await updatePrice({ price, textDescriptionId, pathName });
    }
  };

  return (
    <>
      <CommonButton onClick={handleEdit} text={staticTexts["edit"]} />

      {isEditModalShown ? (
        <UpdateTextDescriptionDataModal
          textContents={textContents}
          textContentsTooltip={textContentsTooltip}
          isTooltipUsed={isTooltipUsed}
          onClose={(data?: {
            tabs: TabType[];
            price?: number;
            tabsTooltip: TabType[];
          }) => {
            if (data) {
              saveTabs(data);
            }
            setIsEditModalShown(false);
          }}
          staticTexts={staticTexts}
          currentPrice={currentPrice}
        />
      ) : null}
    </>
  );
};
