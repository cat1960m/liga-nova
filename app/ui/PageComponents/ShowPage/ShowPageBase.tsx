import { FullData, MainParams } from "@/app/lib/definitions";
import { ACTION_BANNER_LIST_GROUP_SUBTYPE, PAGE } from "@/app/lib/constants";
import { notFound } from "next/navigation";

import styles from "./showPage.module.css";
import { ActionBannerListGroup } from "../../GroupComponents/ActionBannerListGroup/ActionBannerListGroup";
import { DrawFeatureContainer } from "../DrawFeatureContainer/DrawFeatureContainer";

export type Props = {
  params: MainParams;
  pageFullData: FullData[];
};

export const ShowPageBase = ({ params, pageFullData }: Props) => {
  const { pageName, staticTexts } = params;

  const currentPageData = pageFullData.find(
    (data) => data.name === pageName && data.type === PAGE
  );

  if (!currentPageData) {
    notFound();
  }

  const pageId = currentPageData.id;

  const groupsData = pageFullData.filter(
    (item) => item.subtype === ACTION_BANNER_LIST_GROUP_SUBTYPE
  );
  const set = new Set<number>();
  groupsData.forEach((item) => {
    set.add(item.id);
  });

  const groupFeatureIds = Array.from(set);

  return (
    <div className={styles.container}>
      <header>
        {groupFeatureIds.map((groupFeatureId) => (
          <ActionBannerListGroup
            params={params}
            pageFullDataList={pageFullData}
            groupFeatureId={groupFeatureId}
            groupData={groupsData.filter((item) => item.id === groupFeatureId)}
            key={groupFeatureId}
          />
        ))}
      </header>
      <div className={styles.body}>
        <DrawFeatureContainer
          params={params}
          featureId={pageId}
          pageFullDataList={pageFullData}
          buttonText={staticTexts.addItemToPage ?? "N/A"}
          pageId={pageId}
        />
      </div>
    </div>
  );
};
