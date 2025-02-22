"use client";

import { TextContent, TextDescription } from "@/app/lib/definitions";
import {
  GROUP_2COLUMNS_2HEADERS,
  GROUP_TYPES_WITH_TOOLTIP,
  SERVICES,
  TOOLTIP,
} from "@/app/lib/constants";
import { getTextContents } from "@/app/lib/actions_fitness";
import { useEffect, useState } from "react";
import { ShowGroupColumnText } from "../ShowGroupColumnText";
import { ShowGroupServicesText } from "../ShowGroupServicesText";
import { UpdateTextDescriptionData } from "./UpdateTextDescriptionData";
import { DeleteTextDescriptionButton } from "./DeleteTextDescriptionButton";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  textDescription: TextDescription;
  lang: string;
  textType: string;
  groupType: string;
};

export const GroupItemEditDelete_Client = ({
  textDescription,
  lang,
  textType,
  groupType,
}: Props) => {
  const [textContentsAll, setTextContentsAll] = useState<TextContent[] | null>(
    null
  );

  useEffect(() => {
    const getContents = async () => {
      const textContentsAll = await getTextContents({
        text_description_id: textDescription.id,
      });

      setTextContentsAll(textContentsAll ?? []);
    };

    getContents();
  }, []);

  if (!textContentsAll) {
    return null;
  }

  const isTooltipUsed = GROUP_TYPES_WITH_TOOLTIP.includes(groupType);

  const textContents =
    textContentsAll?.filter(
      (textContent) => textContent.content_type !== TOOLTIP
    ) ?? null;

  const textContentsTooltip = isTooltipUsed
    ? textContentsAll?.filter(
        (textContent) => textContent.content_type === TOOLTIP
      ) ?? null
    : null;

  const isGroupColumns = groupType === GROUP_2COLUMNS_2HEADERS;
  const isServices = groupType === SERVICES;

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
    >
      {isGroupColumns ? (
        <ShowGroupColumnText
          textContents={textContents}
          lang={lang}
          textType={textType}
        />
      ) : null}

      {isServices ? (
        <ShowGroupServicesText
          textContents={textContents}
          textContentsTooltip={textContentsTooltip}
          lang={lang}
          textType={textType}
          price={textDescription.price ?? 0}
        />
      ) : null}
    </div>
  );
};
