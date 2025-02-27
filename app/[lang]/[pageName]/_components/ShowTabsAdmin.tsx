import { MainParams, TextDescription } from "@/app/lib/definitions";
import { ShowTabTitleAdmin } from "./ShowTabTitleAdmin";

import { DeleteTabsButton } from "./_clientComponents/DeleteTabsButton";
import { AddTabButton } from "./_clientComponents/AddTabButton";
import { auth } from "@/app/auth";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  tabTitles: TextDescription[];
  staticTexts: StaticTexts;
  tabsFeatureId: number;
  params: MainParams;
  tabLevel: number;
};

export const ShowTabsAdmin = async ({
  tabTitles,
  staticTexts,
  tabsFeatureId,
  params,
  tabLevel,
}: Props) => {
  const res = await auth();
  const iaAuthenticated = !!res?.user;

  return (
    <div
      style={{ border: "1px dotted lightgray", width: "100%", padding: "40px" }}
    >
      <div style={{ paddingBottom: "20px" }}>TABS</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          width: "100%",
          alignItems: "center",
        }}
      >
        {tabTitles.map((tabTitle, index) => {
          return (
            <div key={tabTitle.id}>
              <ShowTabTitleAdmin
                tabTitleTextDescription={tabTitle}
                tabIndex={index}
                staticTexts={staticTexts}
                params={params}
                tabLevel={tabLevel}
                iaAuthenticated={iaAuthenticated}
              />
            </div>
          );
        })}
        {iaAuthenticated ? (
          <AddTabButton
            tabsFeatureId={tabsFeatureId}
            text={staticTexts.addTab ?? "N/A"}
            params={params}
          />
        ) : null}
      </div>

      {iaAuthenticated ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <DeleteTabsButton
            tabsFeatureId={tabsFeatureId}
            text={staticTexts.deleteTabs ?? "N/A"}
          />
        </div>
      ) : null}
    </div>
  );
};
