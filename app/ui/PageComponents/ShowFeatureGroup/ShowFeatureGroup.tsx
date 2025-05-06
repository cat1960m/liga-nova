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
  IMAGE_GROUP_SUBTYPE,
  INFO_SUBTYPE,
  INFO_ACTION_SUBTYPES,
  IMAGE_ACTIONS_GROUP_SUBTYPE,
  TEXT_LIST_GROUP_SUBTYPE,
  TEXT_GROUP_SUBTYPES,
  ACTION_BANNER_TRY_GROUP_SUBTYPE,
  TEXT_HEADER_GROUP_SUBTYPE,
  DIVIDER,
} from "@/app/lib/constants";
import { InfoCheckGroup } from "../../GroupComponents/InfoCheckGroup/InfoCheckGroup";
import { ServicesGroup } from "../../GroupComponents/ServicesGroup/ServicesGroup";
import { ShowScheduleGroup } from "../../GroupComponents/ScheduleGroup/ScheduleGroup";
import { AdditionalPageDataGroup } from "../../GroupComponents/AdditionalPageDataGroup/AdditionalPageDataGroup";
import { FilterGroupsListItemsGroup } from "../../GroupComponents/FilterGroupsListItemsGroup/FilterGroupsListItemsGroup/FilterGroupsListItemsGroup";
import { ShowImageListGroup } from "../../GroupComponents/ImageListGroup/ImageListGroup";
import { ActionBannerGroup } from "../../GroupComponents/ActionBannerGroup/ActionBannerGroup";
import { LigaGroup } from "../../GroupComponents/LigaGroup/LigaGroup";
import { CalendarEventsGroup } from "../../GroupComponents/CalendarEventsGroup/CalendarEventsGroup";
import { ShowImageGroup } from "../../GroupComponents/ImageGroup/ImageGroup";
import { ImageLinksGroup } from "../../GroupComponents/ImageLinksGroup/Image:LinksGroup";
import { InfoGroup } from "../../GroupComponents/InfoGroup/InfoGroup";
import { ImageActionsGroup } from "../../GroupComponents/ImageAtionGroup/ImageActionsGroup";
import { TextListGroup } from "../../GroupComponents/TextListGroup/TextListGroup";
import { TextGroup } from "../../GroupComponents/TextGroup/TextGroup";
import { DividerGroup } from "../../GroupComponents/DividerGroup/DividerGroup";
import { TextHeaderGroup } from "../../GroupComponents/TextHeaderGroup/TextHeaderGroup";

import styles from "./showFeatureGroup.module.css";

export type Props = {
  groupData: FullData[];
  pageFullDataList: FullData[];
  params: MainParams;
  pageId: number;
};

export const ShowFeatureGroup = ({
  groupData,
  pageFullDataList,
  params,
  pageId,
}: Props) => {
  const firstData = groupData[0];

  const isTextHeaderGroup = TEXT_HEADER_GROUP_SUBTYPE === firstData?.subtype;

  const isDivider = DIVIDER === firstData?.subtype;

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

  const isTextListGroup = firstData?.subtype === TEXT_LIST_GROUP_SUBTYPE;

  const isPhotoGalleryGroup =
    firstData?.subtype === PHOTO_GALLERY_GROUP_SUBTYPE;
  const isCalendarEventsGroup =
    firstData?.subtype === CALENDAR_EVENTS_GROUP_SUBTYPE;

  const isTextGroup = TEXT_GROUP_SUBTYPES.includes(firstData?.subtype);

  return (
    <div className={styles.container}>
      {isDivider ? (
        <DividerGroup featureData={groupData} params={params} />
      ) : null}

      {isTextHeaderGroup ? (
        <TextHeaderGroup data={groupData} params={params} />
      ) : null}

      {isInfoCheckGroup ? (
        <InfoCheckGroup groupData={groupData} params={params} />
      ) : null}

      {isTextGroup ? <TextGroup data={groupData} params={params} /> : null}

      {isInfoGroup ? <InfoGroup groupData={groupData} params={params} /> : null}

      {isServices ? (
        <ServicesGroup groupData={groupData} params={params} />
      ) : null}

      {isImageGroup ? (
        <ShowImageGroup groupData={groupData} params={params} />
      ) : null}

      {isLigaGroup ? <LigaGroup groupData={groupData} params={params} /> : null}

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

      {isScheduleGroup ? (
        <ShowScheduleGroup groupData={groupData} params={params} />
      ) : null}

      {isTextListGroup ? (
        <TextListGroup
          groupData={groupData}
          params={params}
          pageFullDataList={pageFullDataList}
        />
      ) : null}

      {isAdditionalPageDataGroup ? (
        <AdditionalPageDataGroup
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
