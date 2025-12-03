import { DrawFeatureContainerEdit } from "../DrawFeatureContainerEdit";
import { FullData, MainParams } from "@/app/lib/definitions";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { ACTION_BANNER_LIST_GROUP_SUBTYPE, PAGE } from "@/app/lib/constants";
import { notFound } from "next/navigation";

import styles from "./showPage.module.css";
import { ActionBannerListGroup } from "../../GroupComponents/ActionBannerListGroup/ActionBannerListGroup";
import { DrawFeatureContainer } from "../DrawFeatureContainer/DrawFeatureContainer";
import { getPageData } from "@/app/lib/actionsContainer";

export type Props = {
  params: MainParams;
  isAuthenticated: boolean;
  isMain?: boolean;
};

export const ShowPage = async ({ params, isAuthenticated }: Props) => {
  const { lang, pageName, staticTexts } = params;
  const { isEdit } = getIsEditNoDelete(params);

  const pageFullData: FullData[] | null = await getPageData({
    lang,
    pageName,
  });

  if (!pageFullData) {
    return null;
  }

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
  groupsData.forEach(item => {
    set.add(item.id);
  });

  const groupFeatureIds = Array.from(set);
  console.log("groupFeatureIds", groupFeatureIds)


  return (
    <div className={styles.container}>
      {groupFeatureIds.map((groupFeatureId) => (
        <header key={groupFeatureId}>
          <ActionBannerListGroup
            params={params}
            pageFullDataList={pageFullData}
            groupFeatureId={groupFeatureId}
            groupData={groupsData.filter(item => item.id === groupFeatureId)}
          />
        </header>
      ))}
      <div className={styles.body}>
        {!isAuthenticated || !isEdit ? (
          <DrawFeatureContainer
            params={params}
            featureId={pageId}
            pageFullDataList={pageFullData}
            buttonText={staticTexts.addItemToPage ?? "N/A"}
            pageId={pageId}
          />
        ) : (
          <DrawFeatureContainerEdit
            params={params}
            featureId={pageId}
            pageFullDataList={pageFullData}
            buttonText={staticTexts.addItemToPage ?? "N/A"}
            pageId={pageId}
          />
        )}
      </div>
    </div>
  );
};
