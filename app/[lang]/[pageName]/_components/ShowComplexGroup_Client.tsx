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
  ACTION_BANNER_TRY_GROUP_SUBTYPE,
  HOME,
} from "@/app/lib/constants";
import { InfoCheckGroup } from "./InfoCheckGroup/InfoCheckGroup";
import { ServicesGroup } from "./ServicesGroup/ServicesGroup";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowScheduleGroup } from "./ScheduleGroup/ScheduleGroup";
import { AdditionalPageDataGroup } from "./AdditionalPageDataGroup/AdditionalPageDataGroup";
import { FilterGroupsListItemsGroup } from "./FilterGroupsListItemsGroup/FilterGroupsListItemsGroup/FilterGroupsListItemsGroup";
import { ShowImageListGroup } from "./ImageListGroup/ImageListGroup";
import { ActionBannerGroup } from "./ActionBannerGroup/ActionBannerGroup";
import { LigaGroup } from "./LigaGroup/LigaGroup";
import { CalendarEventsGroup } from "./CalendarEventsGroup/CalendarEventsGroup";
import { ShowImageGroup } from "./ImageGroup/ImageGroup";
import { ImageLinksGroup } from "./ImageLinksGroup/Image:LinksGroup";
import { InfoGroup } from "./InfoGroup/InfoGroup";
import { ImageActionsGroup } from "./ImageAtionGroup/ImageActionsGroup";
import { ActionBannerListGroup } from "./ActionBannerListGroup/ActionBannerListGroup";
import { TextListGroup } from "./TextListGroup/TextListGroup";
import { TextGroup } from "./TextGroup/TextGroup";

export type Props = {
  groupData: FullData[];
  pageFullDataList: FullData[];
  params: MainParams;
  parentFeatureId: number;
  pageId: number;
};

export const ShowComplexGroup_Client = ({
  groupData,
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

  const isActionBannerGroup = [
    ACTION_BANNER_GROUP_SUBTYPE,
    ACTION_BANNER_TRY_GROUP_SUBTYPE,
  ].includes(firstData?.subtype);
  const isActionBannerListGroup =
    firstData?.subtype === ACTION_BANNER_LIST_GROUP_SUBTYPE &&
    params.pageName !== HOME;

  const isTextListGroup = firstData?.subtype === TEXT_LIST_GROUP_SUBTYPE;

  const isPhotoGalleryGroup =
    firstData?.subtype === PHOTO_GALLERY_GROUP_SUBTYPE;
  const isCalendarEventsGroup =
    firstData?.subtype === CALENDAR_EVENTS_GROUP_SUBTYPE;

  const isTextGroup = TEXT_GROUP_SUBTYPES.includes(firstData?.subtype);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {isInfoCheckGroup ? (
        <InfoCheckGroup
          headerType={INFO_CHECK_HEADER}
          columnItemType={INFO_CHECK_ITEM}
          groupData={groupData}
          parentFeatureId={parentFeatureId}
          params={params}
        />
      ) : null}

      {isTextGroup ? <TextGroup data={groupData} params={params} /> : null}

      {isInfoGroup ? (
        <InfoGroup groupData={groupData} params={params} />
      ) : null}

      {isServices ? (
        <ServicesGroup groupData={groupData} params={params} />
      ) : null}

      {isImageGroup ? (
        <ShowImageGroup groupData={groupData} params={params} />
      ) : null}

      {isLigaGroup ? (
        <LigaGroup groupData={groupData} params={params} />
      ) : null}

      {isImageListGroup || isPhotoGalleryGroup ? (
        <ShowImageListGroup
          groupData={groupData}
          params={params}
          countVisibleItems={isPhotoGalleryGroup ? 1 : undefined}
        />
      ) : null}

      {isImageLinksGroup ? (
        <ImageLinksGroup groupData={groupData} params={params} />
      ) : null}

      {isImageActionsGroup ? (
        <ImageActionsGroup groupData={groupData} params={params} />
      ) : null}

      {isActionBannerGroup ? (
        <ActionBannerGroup groupData={groupData} params={params} />
      ) : null}

      {isTextListGroup ? (
        <TextListGroup
          groupData={groupData}
          params={params}
          pageFullDataList={pageFullDataList}
        />
      ) : null}

      {isActionBannerListGroup ? (
        <ActionBannerListGroup
          groupData={groupData}
          params={params}
          pageFullDataList={pageFullDataList}
        />
      ) : null}

      {isScheduleGroup ? (
        <ShowScheduleGroup groupData={groupData} params={params} />
      ) : null}

      {isAdditionalPageDataGroup ? (
        <AdditionalPageDataGroup
          currentData={firstData}
          pageFullDataList={pageFullDataList}
          pageId={pageId}
          params={params}
          groupData={groupData}
        />
      ) : null}

      {isFilterGroupsListItemsGroup ? (
        <FilterGroupsListItemsGroup
          groupData={groupData}
          pageFullDataList={pageFullDataList}
          params={params}
        />
      ) : null}

      {isCalendarEventsGroup ? (
        <CalendarEventsGroup
          groupData={groupData}
          params={params}
          pageFullData={pageFullDataList}
        />
      ) : null}
    </div>
  );
};
