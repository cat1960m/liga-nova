import { FeatureChild } from "@/app/lib/definitions";
import {
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  SERVICES,
} from "@/app/lib/constants";
import { DeleteFeatureButton } from "./DeleteFeatureButton";
import { GroupColumn } from "./GroupColumn";
import { getDictionary } from "../../dictionaries";
import { ShowServices } from "./ShowServices";

export const ShowComplexGroup = async ({
  featureChild,
  lang,
}: {
  featureChild: FeatureChild;
  lang: string;
}) => {
  const dict = await getDictionary(lang as "en" | "ua"); // en

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
            <GroupColumn
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
            <GroupColumn
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
        <ShowServices
          featureId={featureChild.id}
          lang={lang}
          groupType={featureChild.subtype}
        />
      ) : null}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <DeleteFeatureButton
          featureId={featureChild.id}
          deleteText={dict.common.delete}
        />
      </div>
    </div>
  );
};
