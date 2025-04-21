import { FullData, MainParams } from "@/app/lib/definitions";
import {
  ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
  SCHEDULE_GROUP_SUBTYPE,
  SERVICES_GROUP_SUBTYPE,
  FILTER_GROUPS_LIST_ITEMS_SUBTYPE,
  IMAGE_LIST_GROUP_SUBTYPE,
  IMAGE_LINKS_GROUP_SUBTYPE,
  PHOTO_GALLERY_GROUP_SUBTYPE,
  ACTION_BANNER_GROUP_SUBTYPE,
  LIGA_GROUP_SUBTYPE,
  CALENDAR_EVENTS_GROUP_SUBTYPE,
  INFO_CHECK_GROUP_SUBTYPE,
  INFO_CHECK_HEADER,
  INFO_CHECK_ITEM,
  IMAGE_GROUP_SUBTYPE,
  INFO_SUBTYPE,
  INFO_ACTION_SUBTYPES,
  IMAGE_ACTIONS_GROUP_SUBTYPE,
  ACTION_BANNER_LIST_GROUP_SUBTYPE,
  TEXT_LIST_GROUP_SUBTYPE,
  TEXT_GROUP_SUBTYPES,
} from "@/app/lib/constants";
import { InfoCheckGroup } from "./_infoCheckGroup/InfoCheckGroup";
import { ShowServicesGroup } from "./_service/ShowServicesGroup";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./__commonComponents/_buttons/DeleteFeatureButton";
import { ShowScheduleGroup } from "./_schedule/ShowScheduleGroup";
import { AdditionalPageDataGroup } from "./_additionalPageData/AdditionalPageDataGroup";
import { FilterGroupsListItemsGroup } from "./_filterGroupsListItems/FilterGroupsListItemsGroup";
import { ShowImageListGroup } from "./_imageListGroup/ShowImageListGroup";
import { ActionBannerGroup } from "./_actionBanner/ActionBannerGroup";
import { ShowLigaGroup } from "./_liga/ShowLigaGroup";
import { CalendarEventsGroup } from "./_calendarEvents/CalendarEventsGroup";
import { ShowImageGroup } from "./_imageGroup/ShowImageGroup";
import { ImageLinksGroup } from "./_imageLinksGroup/Image:LinksGroup";
import { ShowInfoGroup } from "./_info/ShowInfoGroup";
import { ImageActionsGroup } from "./_imageActionsGroup/ImageActionsGroup";
import { ActionBannerListGroup } from "./_actionBannerList/ActionBannerListGroup";
import { TextListGroup } from "./_textList/TextListGroup";
import { TextGroup } from "./_textGroup/TextGroup";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
  parentFeatureId: number;
  pageId: number;
};

export const ShowComplexGroup_Client = ({
  groupData,
  isEdit,
  staticTexts,
  pageFullDataList,
  params,
  parentFeatureId,
  pageId,
}: Props) => {
  const firstData = groupData[0];
  const isInfoCheckGroup = firstData?.subtype === INFO_CHECK_GROUP_SUBTYPE;
  const isInfoGroup =
    firstData?.subtype === INFO_SUBTYPE ||
    INFO_ACTION_SUBTYPES.includes(firstData?.subtype);

  const isServices = firstData?.subtype === SERVICES_GROUP_SUBTYPE;
  const isImageGroup = firstData?.subtype === IMAGE_GROUP_SUBTYPE;

  const isLigaGroup = firstData?.subtype === LIGA_GROUP_SUBTYPE;

  const isScheduleGroup = firstData?.subtype === SCHEDULE_GROUP_SUBTYPE;
  const isAdditionalPageDataGroup =
    firstData.subtype === ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE;
  const isFilterGroupsListItemsGroup =
    firstData?.subtype === FILTER_GROUPS_LIST_ITEMS_SUBTYPE;

  const isImageListGroup = firstData?.subtype === IMAGE_LIST_GROUP_SUBTYPE;
  const isImageLinksGroup = IMAGE_LINKS_GROUP_SUBTYPE === firstData?.subtype;
  const isImageActionsGroup =
    IMAGE_ACTIONS_GROUP_SUBTYPE === firstData?.subtype;

  const isActionBannerGroup =
    firstData?.subtype === ACTION_BANNER_GROUP_SUBTYPE;
  const isActionBannerListGroup =
    firstData?.subtype === ACTION_BANNER_LIST_GROUP_SUBTYPE;

  const isTextListGroup = firstData?.subtype === TEXT_LIST_GROUP_SUBTYPE;

  const isPhotoGalleryGroup =
    firstData?.subtype === PHOTO_GALLERY_GROUP_SUBTYPE;
  const isCalendarEventsGroup =
    firstData?.subtype === CALENDAR_EVENTS_GROUP_SUBTYPE;

  const isTextGroup = TEXT_GROUP_SUBTYPES.includes(firstData?.subtype);

  const isDeleteOnly =
    isAdditionalPageDataGroup ||
    isFilterGroupsListItemsGroup ||
    isCalendarEventsGroup;

  return (
    <div
      style={{
        width: "100%",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "10px" : undefined,
        margin: "20px 0 20px 0",
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
          params={params}
        />
      ) : null}

      {isTextGroup ? (
        <TextGroup
          data={groupData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          params={params}
        />
      ) : null}

      {isInfoGroup ? (
        <ShowInfoGroup
          groupData={groupData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          params={params}
        />
      ) : null}

      {isServices ? (
        <ShowServicesGroup
          groupData={groupData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          params={params}
        />
      ) : null}

      {isImageGroup ? (
        <ShowImageGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
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

      {isImageListGroup || isPhotoGalleryGroup ? (
        <ShowImageListGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
          countVisibleItems={isPhotoGalleryGroup ? 1 : undefined}
        />
      ) : null}

      {isImageLinksGroup ? (
        <ImageLinksGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
        />
      ) : null}

      {isImageActionsGroup ? (
        <ImageActionsGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
        />
      ) : null}

      {isActionBannerGroup ? (
        <ActionBannerGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
        />
      ) : null}

      {isTextListGroup ? (
        <TextListGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
          pageFullDataList={pageFullDataList}
        />
      ) : null}

      {isActionBannerListGroup ? (
        <ActionBannerListGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
          pageFullDataList={pageFullDataList}
        />
      ) : null}

      {isScheduleGroup ? (
        <ShowScheduleGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          params={params}
        />
      ) : null}

      {isAdditionalPageDataGroup ? (
        <AdditionalPageDataGroup
          currentData={firstData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          pageFullDataList={pageFullDataList}
          pageId={pageId}
          params={params}
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
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={groupData}
          />
        </div>
      ) : null}
    </div>
  );
};
