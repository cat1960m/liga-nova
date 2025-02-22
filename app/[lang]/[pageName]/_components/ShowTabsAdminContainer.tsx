import { MainParams, TextDescription } from "@/app/lib/definitions";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowTabsAdmin } from "./ShowTabsAdmin";

export type Props = {
  tabTitles: TextDescription[];
  staticTexts: StaticTexts;
  tabsFeatureId: number;
  children: React.ReactNode;
  params: MainParams;
  tabLevel: number;
};

export const ShowTabsAdminContainer = async ({
  tabTitles,
  staticTexts,
  tabsFeatureId,
  params,
  tabLevel,
  children,
}: Props) => {
  return (
    <div>
      <ShowTabsAdmin
        tabTitles={tabTitles ?? []}
        staticTexts={staticTexts}
        tabsFeatureId={tabsFeatureId}
        params={params}
        tabLevel={tabLevel}
      />
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
