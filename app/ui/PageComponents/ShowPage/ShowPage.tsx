import { getPageFullData } from "@/app/lib/actions_fitness";
import { DrawFeatureContainerEdit } from "../DrawFeatureContainerEdit";
import { FullData, MainParams } from "@/app/lib/definitions";
import { getContainerData, getIsEditNoDelete } from "@/app/lib/utils";
import {
  ACTION_BANNER_LIST_GROUP_SUBTYPE,
  PAGE,
} from "@/app/lib/constants";

import styles from "./showPage.module.css";
import { ActionBannerListGroup } from "../../GroupComponents/ActionBannerListGroup/ActionBannerListGroup";
import { DrawFeatureContainer_Client } from "../DrawFeatureContainer_Client";

export type Props = {
  params: MainParams;
  isAuthenticated: boolean;
  isMain?: boolean;
};

export const ShowPage = async ({ params, isAuthenticated, isMain }: Props) => {
  const { lang, pageName, staticTexts } = params;
  const { isEdit } = getIsEditNoDelete(params);

  const pageFullData: FullData[] | null = await getPageFullData({
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
    return null;
  }

  const pageId = currentPageData.id;

  const containerFullData = pageId
    ? getContainerData({
        pageName,
        pageFullData: pageFullData,
        parentFeatureId: pageId,
      })
    : null;

  if (!containerFullData) {
    return null;
  }

  const headerData = isMain
    ? pageFullData.filter(
        (item) => item.subtype === ACTION_BANNER_LIST_GROUP_SUBTYPE
      )
    : null;

  return (
    <div className={styles.container}>
      {headerData ? (
        <header>
          <ActionBannerListGroup
            groupData={headerData}
            params={params}
            pageFullDataList={pageFullData}
          />
        </header>
      ) : null}
      <div className={styles.body}>
        {!isAuthenticated || !isEdit ? (
          <DrawFeatureContainer_Client
            params={params}
            featureId={pageId}
            pageFullDataList={pageFullData}
            containerFullData={containerFullData}
            buttonText={staticTexts.addItemToPage ?? "N/A"}
            pageId={pageId}
          />
        ) : (
          <DrawFeatureContainerEdit
            params={params}
            featureId={pageId}
            pageFullDataList={pageFullData}
            containerFullData={containerFullData}
            buttonText={staticTexts.addItemToPage ?? "N/A"}
            pageId={pageId}
          />
        )}
      </div>
    </div>
  );
};
