"use client";

import { TabType, TextContent } from "@/app/lib/definitions";
import { useState } from "react";
import { ChangeText } from "./ChangeText";
import { addText, updateText } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";

export const EditText = ({
  textContents,
  textDescriptionId,
}: {
  textContents: TextContent[];
  textDescriptionId: number;
}) => {
  const [isEditShown, setIsEditShown] = useState(false);

  const pathName = usePathname();

  const handleEdit = () => {
    setIsEditShown(true);
  };

  const saveTab = async ({
    text,
    id,
    tabLang,
  }: {
    text: string;
    id?: number;
    tabLang: string;
  }) => {
    if (id) {
      await updateText({
        id,
        lang: tabLang,
        text,
        pathName,
      });
      return;
    }

    await addText({
      textDescriptionId,
      lang: tabLang,
      text,
      pathName,
    });
  };

  const saveTabs = async (tabs: TabType[]) => {
    tabs.forEach((tab) => {
      const tabLang = tab.lang.toLocaleLowerCase();
      const textContent = textContents.find(
        ({ language }) => language === tabLang
      );
      saveTab({
        text: tab.value,
        id: textContent?.id,
        tabLang,
      });
    });
  };

  return (
    <>
      <button
        onClick={handleEdit}
        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
      >
        Edit
      </button>{" "}
      {isEditShown ? (
        <ChangeText
          textContents={textContents}
          onClose={(tabs?: TabType[]) => {
            if (tabs) {
              saveTabs(tabs);
            }
            setIsEditShown(false);
          }}
        />
      ) : null}
    </>
  );
};
