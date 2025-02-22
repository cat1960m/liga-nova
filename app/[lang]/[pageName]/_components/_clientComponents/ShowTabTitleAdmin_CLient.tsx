"use client";

import { getTextContents } from "@/app/lib/actions_fitness";
import {
  MainParams,
  TextContent,
  TextDescription,
} from "@/app/lib/definitions";
import { getLocalizedText } from "@/app/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { CommonButton } from "./CommonButton";

export type Props = {
  tabTitleTextDescription: TextDescription;
  lang: string;
  selectedTabFeatureId: number | null;
  setSelectedTabFeatureId: (num: number) => void;
};

export const ShowTabTitleAdmin_Client = ({
  tabTitleTextDescription,
  lang,
  selectedTabFeatureId,
  setSelectedTabFeatureId,
}: Props) => {
  const [textContents, setTextContents] = useState<TextContent[] | null>(null);

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

  const text = getLocalizedText({ textContents, lang });

  const isTabSelected =
    selectedTabFeatureId === tabTitleTextDescription.feature_id;

  const handleTabClick = () => {
    setSelectedTabFeatureId(tabTitleTextDescription.feature_id);
  };

  const backgroundColor = isTabSelected ? "lightblue" : "lightgray";

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <CommonButton
        backgroundColor={backgroundColor}
        text={text}
        onClick={handleTabClick}
      />
    </div>
  );
};
