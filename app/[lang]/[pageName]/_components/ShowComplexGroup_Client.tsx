import { FullData, MainParams } from "@/app/lib/definitions";
import {
  GROUP_2COLUMNS_2HEADERS_SUBTYPE,
  HEADER1,
  HEADER2,
  INFO_GROUP_SUBTYPE,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
  SCHEDULE_GROUP_SUBTYPE,
  SERVICES_GROUP_SUBTYPE,
  FILTER_GROUPS_LIST_ITEMS_SUBTYPE,
  IMAGE_LIST_GROUP_SUBTYPE,
  PHOTO_GALLERY_GROUP_SUBTYPE,
  ACTION_BANNER_GROUP_SUBTYPE,
  LIGA_GROUP_SUBTYPE,
  CALENDAR_EVENTS_GROUP_SUBTYPE,
} from "@/app/lib/constants";
import { ShowGroupColumn } from "./_columnsGroup/ShowGroupColumn_Client";
import { ShowServices_Client } from "./_service/ShowServices_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./_buttons/DeleteFeatureButton";
import { ShowInfoGroup_Client } from "./_info/ShowInfoGroup_Client";
import { ShowScheduleGroup_Client } from "./_schedule/ShowScheduleGroup_Client";
import { AdditionalPageDataGroup } from "./_additionalPageData/AdditionalPageDataGroup";
import { FilterGroupsListItemsGroup } from "./_filterGroupsListItems/FilterGroupsListItemsGroup";
import { ShowImageListGroup } from "./_imageGroup/ShowImageListGroup";
import { ActionBannerGroup } from "./_actionBanner/ActionBannerGroup";
import { ShowLigaGroup } from "./_liga/ShowLigaGroup";
import { CalendarEventsGroup } from "./_calendarEvents/CalendarEventsGroup";

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
  const is2headers2columns =
    firstData?.subtype === GROUP_2COLUMNS_2HEADERS_SUBTYPE;
  const isServices = firstData?.subtype === SERVICES_GROUP_SUBTYPE;
  const isInfoGroup = firstData?.subtype === INFO_GROUP_SUBTYPE;
  const isLigaGroup = firstData?.subtype === LIGA_GROUP_SUBTYPE;

  const isScheduleGroup = firstData?.subtype === SCHEDULE_GROUP_SUBTYPE;
  const isAdditionalPageDataGroup =
    firstData.subtype === ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE;
  const isFilterGroupsListItemsGroup =
    firstData?.subtype === FILTER_GROUPS_LIST_ITEMS_SUBTYPE;
  const isImageListGroup = firstData?.subtype === IMAGE_LIST_GROUP_SUBTYPE;
  const isActionBannerGroup =
    firstData?.subtype === ACTION_BANNER_GROUP_SUBTYPE;
  const isPhotoGalleryGroup =
    firstData?.subtype === PHOTO_GALLERY_GROUP_SUBTYPE;
  const isCalendarEventsGroup =
    firstData?.subtype === CALENDAR_EVENTS_GROUP_SUBTYPE;

  const isAddButtonShown = isServices || isCalendarEventsGroup;

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

      {isCalendarEventsGroup ? (
        <CalendarEventsGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
          pageFullData={pageFullDataList}
        />
      ) : null}

      {isEdit && !isAddButtonShown ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <DeleteFeatureButton
            featureId={featureId}
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={groupData}
          />
        </div>
      ) : null}
    </div>
  );
};
