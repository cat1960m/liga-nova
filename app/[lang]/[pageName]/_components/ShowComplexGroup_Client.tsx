import { FullData, MainParams } from "@/app/lib/definitions";
import {
  INFO_GROUP_SUBTYPE,
  ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
  SCHEDULE_GROUP_SUBTYPE,
  SERVICES_GROUP_SUBTYPE,
  FILTER_GROUPS_LIST_ITEMS_SUBTYPE,
  IMAGE_LIST_GROUP_SUBTYPE,
  PHOTO_GALLERY_GROUP_SUBTYPE,
  ACTION_BANNER_GROUP_SUBTYPE,
  LIGA_GROUP_SUBTYPE,
  CALENDAR_EVENTS_GROUP_SUBTYPE,
  INFO_CHECK_GROUP_SUBTYPE,
  INFO_CHECK_HEADER,
  INFO_CHECK_ITEM,
  IMAGE_GROUP_SUBTYPE,
} from "@/app/lib/constants";
import { InfoCheckGroup } from "./_infoCheckGroup/InfoCheckGroup";
import { ShowServicesGroup } from "./_service/ShowServicesGroup";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./_buttons/DeleteFeatureButton";
import { ShowInfoGroup } from "./_info/ShowInfoGroup";
import { ShowScheduleGroup } from "./_schedule/ShowScheduleGroup";
import { AdditionalPageDataGroup } from "./_additionalPageData/AdditionalPageDataGroup";
import { FilterGroupsListItemsGroup } from "./_filterGroupsListItems/FilterGroupsListItemsGroup";
import { ShowImageListGroup } from "./_imageListGroup/ShowImageListGroup";
import { ActionBannerGroup } from "./_actionBanner/ActionBannerGroup";
import { ShowLigaGroup } from "./_liga/ShowLigaGroup";
import { CalendarEventsGroup } from "./_calendarEvents/CalendarEventsGroup";
import { ShowImageGroup } from "./_imageGroup/ShowImageGroup";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
  parentFeatureId: number;
};

export const ShowComplexGroup_Client = ({
  groupData,
  isEdit,
  staticTexts,
  pageFullDataList,
  params,
  parentFeatureId,
}: Props) => {
  const firstData = groupData[0];
  const featureId = firstData.id;
  const isInfoCheckGroup = firstData?.subtype === INFO_CHECK_GROUP_SUBTYPE;

  const isServices = firstData?.subtype === SERVICES_GROUP_SUBTYPE;
  const isInfoGroup = firstData?.subtype === INFO_GROUP_SUBTYPE;
  const isImageGroup = firstData?.subtype === IMAGE_GROUP_SUBTYPE;

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

  const isDeleteOnly =
    isImageGroup ||
    isImageListGroup ||
    isPhotoGalleryGroup ||
    isActionBannerGroup ||
    isScheduleGroup ||
    isAdditionalPageDataGroup ||
    isFilterGroupsListItemsGroup ||
    isCalendarEventsGroup;

  return (
    <div
      style={{
        width: "100%",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "10px" : undefined,
      }}
    >
      {isInfoCheckGroup ? (
        <InfoCheckGroup
          headerType={INFO_CHECK_HEADER}
          columnItemType={INFO_CHECK_ITEM}
          groupData={groupData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          parentFeatureId={parentFeatureId}
        />
      ) : null}

      {isServices ? (
        <ShowServicesGroup
          groupData={groupData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          parentFeatureId={parentFeatureId}
        />
      ) : null}

      {isInfoGroup ? (
        <ShowInfoGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          parentFeatureId={parentFeatureId}
        />
      ) : null}

      {isImageGroup ? (
        <ShowImageGroup
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
          parentFeatureId={parentFeatureId}
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

      {isActionBannerGroup ? (
        <ActionBannerGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
        />
      ) : null}

      {isScheduleGroup ? (
        <ShowScheduleGroup
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

      {isCalendarEventsGroup ? (
        <CalendarEventsGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
          pageFullData={pageFullDataList}
          parentFeatureId={parentFeatureId}
        />
      ) : null}

      {isEdit && isDeleteOnly ? (
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
            parentFeatureId={parentFeatureId}
          />
        </div>
      ) : null}
    </div>
  );
};
