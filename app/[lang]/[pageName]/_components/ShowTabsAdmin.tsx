import { TextDescription } from "@/app/lib/definitions";
import { ShowTabTitleAdmin } from "./ShowTabTitleAdmin";

import { DeleteTabsButton } from "./_clientComponents/DeleteTabsButton";
import { AddTabButton } from "./_clientComponents/AddTabButton";

export type Props = {
  tabTitles: TextDescription[];
  lang: string;
  staticTexts: any;
  tabsFeatureId: number;
  children: React.ReactNode;
};

export const ShowTabsAdmin = ({
  tabTitles,
  lang,
  staticTexts,
  tabsFeatureId,
  children,
}: Props) => {
  return (
    <div style={{ border: "4px dashed magenta" }}>
      <div style={{ border: "1px dotted lightgray", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
            padding: "40px",
            alignItems: "center",
          }}
        >
          {tabTitles.map((tabTitle, index) => {
            return (
              <div key={tabTitle.id}>
                <ShowTabTitleAdmin
                  tabTitleTextDescription={tabTitle}
                  lang={lang}
                  tabIndex={index}
                  staticTexts={staticTexts}
                />
              </div>
            );
          })}
          <AddTabButton tabsFeatureId={tabsFeatureId} />
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <DeleteTabsButton tabsFeatureId={tabsFeatureId} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          width: "100%",
          padding: "40px",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
