"use client";

import { Feature } from "@/app/lib/definitions";
import {
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  SERVICES,
} from "@/app/lib/constants";
import { ShowGroupColumn_Client } from "./ShowGroupColumn_Client";
import { DeleteFeatureButton } from "./DeleteFeatureButton";
import { ShowServices_Client } from "./ShowServices_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  featureChild: Feature;
  lang: string;
};

export const ShowComplexGroup_Client = ({ featureChild, lang }: Props) => {
  const is2headers2columns = featureChild.subtype === GROUP_2COLUMNS_2HEADERS;
  const isServices = featureChild.subtype === SERVICES;

  return (
    <div
      style={{ width: "100%", padding: "40px", border: "1px dotted lightgray" }}
    >
      {is2headers2columns ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "40px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexGrow: 2,
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <ShowGroupColumn_Client
              featureId={featureChild.id}
              groupType={featureChild.subtype}
              lang={lang}
              headerType={HEADER1}
              columnItemType={ITEM_COLUMN1}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexGrow: 2,
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <ShowGroupColumn_Client
              featureId={featureChild.id}
              groupType={featureChild.subtype}
              lang={lang}
              headerType={HEADER2}
              columnItemType={ITEM_COLUMN2}
            />
          </div>
        </div>
      ) : null}

      {isServices ? (
        <ShowServices_Client
          featureId={featureChild.id}
          lang={lang}
          groupType={featureChild.subtype}
        />
      ) : null}
    </div>
  );
};
