"use client";

import { TabType, TextContent } from "@/app/lib/definitions";
import { useState } from "react";
import { UpdateTextDescriptionDataModal } from "./UpdateTextDescriptionDataModal";
import {
  addText,
  revalidate,
  updatePrice,
  updateText,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { TOOLTIP } from "@/app/lib/constants";
import { CommonButton } from "./CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";

export const UpdateTextDescriptionData = ({
  textContents,
  textContentsTooltip,
  textDescriptionId,
  staticTexts,
  currentPrice,
  isTooltipUsed,
  onUpdateFinished,
}: {
  textContents: TextContent[];
  textContentsTooltip?: TextContent[] | null;
  textDescriptionId: number;
  staticTexts: StaticTexts;
  currentPrice?: number;
  isTooltipUsed?: boolean;
  onUpdateFinished?: () => void;
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
      return updateText({
        id,
        text: textUpdated,
        pathName,
        contentType,
      });
    }

    return addText({
      textDescriptionId,
      lang: tabLang,
      text: textUpdated,
      pathName,
      contentType,
    });
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
    const promises: Promise<any>[] = [];

    tabs.forEach((tab) => {
      const tabLang = tab.langUpperCase.toLocaleLowerCase();
      const textContent = textContents.find(
        ({ language }) => language === tabLang
      );

      promises.push(
        saveTab({
          text: tab.value,
          id: textContent?.id,
          tabLang,
          contentType: "main",
        })
      );
    });

    if (isTooltipUsed) {
      tabsTooltip.forEach((tab) => {
        const tabLang = tab.langUpperCase.toLocaleLowerCase();

        const textContent = textContentsTooltip?.find(
          ({ language }) => language === tabLang
        );

        promises.push(
          saveTab({
            text: tab.value,
            id: textContent?.id,
            tabLang,
            contentType: TOOLTIP,
          })
        );
      });
    }

    if (price) {
      promises.push(updatePrice({ price, textDescriptionId, pathName }));
    }

    await Promise.all(promises);
    await revalidate(pathName);
    onUpdateFinished?.();
  };

  return (
    <>
      <CommonButton onClick={handleEdit} text={staticTexts.edit ?? "N/A"} />

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
