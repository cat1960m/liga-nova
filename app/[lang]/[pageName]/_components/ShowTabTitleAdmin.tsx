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

export type Props = {
  tabTitleTextDescription: TextDescription;
  lang: string;
  tabIndex: number;
  staticTexts: any;
  params: MainParams;
};

export const ShowTabTitleAdmin = ({
  tabTitleTextDescription,
  lang,
  tabIndex,
  staticTexts,
  params,
}: Props) => {
  const [textContents, setTextContents] = useState<TextContent[] | null>(null);
  const path = usePathname();
  const pathParams = useParams();
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

  const text = getLocalizedText({ textContents, lang });

  const handleUpdateFinished = () => {
    readTextContents();
  };

  const handleTabClick = () => {
    const pageNameParts = params.pageName.split("_");
    const [pageName, ...pageTabFeatureIds] = pageNameParts;
  };

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
      <CommonButton
        backgroundColor={backgroundColor}
        text={text}
        onClick={handleTabClick}
      />
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
            deleteText={staticTexts["delete"]}
            onDeleteFInished={handleUpdateFinished}
            key={2}
          />
        ) : null}
      </div>
    </div>
  );
};
