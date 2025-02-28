import { Feature } from "@/app/lib/definitions";
import {
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  SERVICES,
} from "@/app/lib/constants";
import { DeleteFeatureButton } from "./_clientComponents/DeleteFeatureButton";
import { ShowGroupColumn } from "./ShowGroupColumn";
import { getDictionary } from "../../dictionaries";
import { ShowServices } from "./ShowServices";
import { auth } from "@/app/auth";

export type Props = {
  featureChild: Feature;
  lang: string;
};

export const ShowComplexGroup = async ({ featureChild, lang }: Props) => {
  const res = await auth();
  const iaAuthenticated = !!res?.user;

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
            <ShowGroupColumn
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
            <ShowGroupColumn
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

      {iaAuthenticated ? (
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
            deleteText={dict.common.delete ?? "N/A"}
          />
        </div>
      ) : null}
    </div>
  );
};
