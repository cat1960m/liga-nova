"use client";

import { Feature, TextContent, TextDescription } from "@/app/lib/definitions";
import { GROUP1 } from "@/app/lib/constants";
import {
  getTextContents,
  getTextDescriptions,
} from "@/app/lib/actions_fitness";
import { getLocalizedText } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export type Props = {
  featureChild: Feature;
  lang: string;
};

export const ShowSimpleGroup_Client = ({ featureChild, lang }: Props) => {
  const [textDescriptions, setTextDescriptions] = useState<
    TextDescription[] | null
  >(null);

  const [textContents, setTextContents] = useState<TextContent[] | null>(null);

  useEffect(() => {
    const getTextDescriptionsInner = async () => {
      const textDescriptionsInner = await getTextDescriptions({
        featureId: featureChild.id,
      });

      setTextDescriptions(textDescriptionsInner);

      if (!textDescriptionsInner?.length) {
        return null;
      }

      const textDescription = textDescriptionsInner[0]; //only 1 text in group

      const textContentsInner: TextContent[] | null = await getTextContents({
        text_description_id: textDescription.id,
      });

      setTextContents(textContentsInner ?? []);
    };

    getTextDescriptionsInner();
  }, []);

  const textDescription = textDescriptions?.[0]; //only 1 text in group

  if (!textDescription || !textContents) {
    return null;
  }

  const isLarge = featureChild.subtype === GROUP1;
  const style = {
    fontSize: isLarge ? "xx-large" : "large",
    fontWeight: isLarge ? 700 : 400,
    padding: "20px",
    border: "1px dotted gray",
  };

  const text = getLocalizedText({ textContents, lang });

  return (
    <div style={style}>
      {isLarge ? (
        <div
          style={{
            width: "200px",
            height: 0,
            marginBottom: "20px",
            border: "2px solid blue",
          }}
        />
      ) : null}
      {text}
    </div>
  );
};
