"use client";

import { getTextContents } from "@/app/lib/actions_fitness";
import {
  MainParams,
  TextContent,
  TextDescription,
} from "@/app/lib/definitions";
import { getLocalizedText } from "@/app/lib/utils";
import { CommonButton } from "./_clientComponents/CommonButton";
import { UpdateTextDescriptionData } from "./_clientComponents/UpdateTextDescriptionData";
import { useCallback, useEffect, useState } from "react";
import { DeleteFeatureButton } from "./_clientComponents/DeleteFeatureButton";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { SHOW_TABS_WITH_SELECTION } from "@/app/lib/constants";

export type Props = {
  tabTitleTextDescription: TextDescription;
  tabIndex: number;
  staticTexts: StaticTexts;
  params: MainParams;
  tabLevel: number;
  iaAuthenticated: boolean;
};

export const ShowTabTitleAdmin = ({
  tabTitleTextDescription,
  tabIndex,
  staticTexts,
  params,
  tabLevel,
  iaAuthenticated,
}: Props) => {
  const [textContents, setTextContents] = useState<TextContent[] | null>(null);
  const router = useRouter();

  const readTextContents = useCallback(async () => {
    const textContents = await getTextContents({
      text_description_id: tabTitleTextDescription.id,
    });

    setTextContents(textContents ?? []);
  }, []);

  useEffect(() => {
    readTextContents();
  }, [readTextContents]);

  if (!textContents) {
    return;
  }

  const text = getLocalizedText({ textContents, lang: params.lang });

  const handleUpdateFinished = () => {
    readTextContents();
  };

  const pageNameParts = params.pageName.split("_");
  const [pageNameOnly, ...parts] = pageNameParts;
  const isTabSelected =
    parts[tabLevel] &&
    parts[tabLevel] === tabTitleTextDescription.feature_id.toString();

  const handleTabClick = () => {
    if (SHOW_TABS_WITH_SELECTION && parts[tabLevel] && !isTabSelected) {
      parts[tabLevel] = tabTitleTextDescription.feature_id.toString();

      const newParts: string[] = [];
      for (let i = 0; i <= tabLevel; i++) {
        newParts.push(parts[i]);
      }

      const newPageName = `${pageNameOnly}_${newParts.join("_")}`;
      const newPath = `/${params.lang}/${newPageName}`;
      router.push(newPath);
    }
  };

  const backgroundColor = isTabSelected ? "lightblue" : "lightgray";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        border: "1px solid lightgray",
        gap: "10px",
        padding: "10px",
      }}
    >
      <CommonButton
        backgroundColor={backgroundColor}
        text={text}
        onClick={handleTabClick}
      />
      {iaAuthenticated ? (
        <div style={{ display: "flex", gap: "20px" }}>
          <UpdateTextDescriptionData
            textContents={textContents ?? []}
            textDescriptionId={tabTitleTextDescription.id}
            staticTexts={staticTexts}
            onUpdateFinished={handleUpdateFinished}
            key={1}
          />
          {tabIndex > 0 ? (
            <DeleteFeatureButton
              featureId={tabTitleTextDescription.feature_id}
              deleteText={staticTexts.deleteTab ?? "N/A"}
              onDeleteFInished={handleUpdateFinished}
              key={2}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
