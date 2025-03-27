import { FullData, MainParams } from "@/app/lib/definitions";
import {
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  INFO_GROUP,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  ADDITIONAL_PAGE_DATA_GROUP,
  SCHEDULE_GROUP,
  SERVICE_ITEM,
  SERVICES_GROUP,
  FILTER_GROUPS_LIST_ITEMS,
  IMAGE_LIST_GROUP,
  PHOTO_GALLERY_GROUP,
  ACTION_BANNER_GROUP,
  LIGA_GROUP,
} from "@/app/lib/constants";
import { ShowGroupColumn } from "./_columnsGroup/ShowGroupColumn_Client";
import { ShowServices_Client } from "./_service/ShowServices_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./_buttons/DeleteFeatureButton";
import { AddTextDescriptionButton } from "./_buttons/AddTextDescriptionButton";
import { ShowInfoGroup_Client } from "./_info/ShowInfoGroup_Client";
import { ShowScheduleGroup_Client } from "./_schedule/ShowScheduleGroup_Client";
import { AdditionalPageDataGroup } from "./_additionalPageData/AdditionalPageDataGroup";
import { FilterGroupsListItemsGroup } from "./_filterGroupsListItems/FilterGroupsListItemsGroup";
import { ShowImageListGroup } from "./_imageGroup/ShowImageListGroup";
import { ActionBannerGroup } from "./_actionBanner/ActionBannerGroup";
import { ShowLigaGroup } from "./_liga/ShowLigaGroup";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
};

export const ShowComplexGroup_Client = ({
  groupData,
  isEdit,
  staticTexts,
  pageFullDataList,
  params,
}: Props) => {
  const firstData = groupData[0];
  const featureId = firstData.id;
  const is2headers2columns = firstData?.subtype === GROUP_2COLUMNS_2HEADERS;
  const isServices = firstData?.subtype === SERVICES_GROUP;
  const isAddButtonShown = isServices;
  const isInfoGroup = firstData?.subtype === INFO_GROUP;
  const isLigaGroup = firstData?.subtype === LIGA_GROUP;

  const isScheduleGroup = firstData?.subtype === SCHEDULE_GROUP;
  const isAdditionalPageDataGroup =
    firstData.subtype === ADDITIONAL_PAGE_DATA_GROUP;
  const isFilterGroupsListItemsGroup =
    firstData?.subtype === FILTER_GROUPS_LIST_ITEMS;
  const isImageListGroup = firstData?.subtype === IMAGE_LIST_GROUP;
  const isActionBannerGroup = firstData?.subtype === ACTION_BANNER_GROUP;
  const isPhotoGalleryGroup = firstData?.subtype === PHOTO_GALLERY_GROUP;

  return (
    <div
      style={{
        width: "100%",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "5px" : undefined,
      }}
    >
      {is2headers2columns ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          <ShowGroupColumn
            headerType={HEADER1}
            columnItemType={ITEM_COLUMN1}
            groupData={groupData}
            isEdit={isEdit}
            staticTexts={staticTexts}
          />
          <ShowGroupColumn
            headerType={HEADER2}
            columnItemType={ITEM_COLUMN2}
            groupData={groupData}
            isEdit={isEdit}
            staticTexts={staticTexts}
          />
        </div>
      ) : null}

      {isServices ? (
        <ShowServices_Client
          groupData={groupData}
          isEdit={isEdit}
          staticTexts={staticTexts}
        />
      ) : null}

      {isInfoGroup ? (
        <ShowInfoGroup_Client
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
        />
      ) : null}

      {isLigaGroup ? (
        <ShowLigaGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
        />
      ) : null}

      {isImageListGroup ? (
        <ShowImageListGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
        />
      ) : null}

      {isPhotoGalleryGroup ? (
        <ShowImageListGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          countVisibleItems={1}
        />
      ) : null}

      {isScheduleGroup ? (
        <ShowScheduleGroup_Client
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
        />
      ) : null}

      {isAdditionalPageDataGroup ? (
        <AdditionalPageDataGroup
          currentData={firstData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          pageFullDataList={pageFullDataList}
        />
      ) : null}

      {isFilterGroupsListItemsGroup ? (
        <FilterGroupsListItemsGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          pageFullDataList={pageFullDataList}
          params={params}
        />
      ) : null}

      {isActionBannerGroup ? (
        <ActionBannerGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
        />
      ) : null}

      {isEdit ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <DeleteFeatureButton
              featureId={featureId}
              deleteText={staticTexts.delete ?? "N/A"}
              featureData={groupData}
            />

            {isAddButtonShown ? (
              <AddTextDescriptionButton
                featureId={featureId}
                textType={SERVICE_ITEM}
                buttonText={staticTexts.addGroupItem ?? "N/A"}
                price={0}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
