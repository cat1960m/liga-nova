"use client";

import { getTextContents } from "@/app/lib/actions_fitness";
import { TextContent, TextDescription } from "@/app/lib/definitions";
import { getLocalizedText } from "@/app/lib/utils";
import { CommonButton } from "./_clientComponents/CommonButton";
import { UpdateTextDescriptionData } from "./_clientComponents/UpdateTextDescriptionData";
import { useCallback, useEffect, useState } from "react";
import { DeleteFeatureButton } from "./_clientComponents/DeleteFeatureButton";

export type Props = {
  tabTitleTextDescription: TextDescription;
  lang: string;
  tabIndex: number;
  staticTexts: any;
};

export const ShowTabTitleAdmin = ({
  tabTitleTextDescription,
  lang,
  tabIndex,
  staticTexts,
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

  const text = getLocalizedText({ textContents, lang });

  const handleUpdateFinished = () => {
    readTextContents();
  };

  if (!textContents) {
    return;
  }

  const backgroundColor = "lightgray";

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
      <CommonButton backgroundColor={backgroundColor} text={text} />
      <div style={{ display: "flex", gap: "20px" }}>
        <UpdateTextDescriptionData
          textContents={textContents ?? []}
          textDescriptionId={tabTitleTextDescription.id}
          staticTexts={staticTexts}
          onUpdateFinished={handleUpdateFinished}
          key={1}
        />
        {tabIndex > 0 ? (
          <>
            <DeleteFeatureButton
              featureId={tabTitleTextDescription.feature_id}
              deleteText={staticTexts["delete"]}
              onDeleteFInished={handleUpdateFinished}
              key={2}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
