import { StaticTexts } from "../dictionaries/definitions";

export const TITLE = "title";
export const PAGE = "page";

export const GROUP1_SUBTYPE = "group1";
export const GROUP2_SUBTYPE = "group2";
export const SIMPLE_GROUP_ITEM = "simple_group_item";

export const GROUP = "group";

export const GROUP_2COLUMNS_2HEADERS_SUBTYPE = "group2columns2headers";
export const HEADER1 = "header1";
export const HEADER2 = "header2";
export const ITEM_COLUMN1 = "item_column1";
export const ITEM_COLUMN2 = "item_column2";

export const SERVICES_GROUP_SUBTYPE = "services";
export const SERVICE_ITEM = "service_item";
export const TOOLTIP = "tooltip";

export const INFO_GROUP_SUBTYPE = "info";
export const INFO_TITLE = "infoTitle";
export const INFO_TELEPHONE = "infoTelephone";
export const INFO_ADDRESS = "infoAddress";
export const INFO_BODY = "infoBody";

export const LIGA_GROUP_SUBTYPE = "liga_group";
export const LIGA_TITLE = "liga_itle";
export const LIGA_TELEPHONE = "liga_telephone";
export const LIGA_ADDRESS = "liga_address";
export const LIGA_SERVICE = "liga_service";

export const SCHEDULE_GROUP_SUBTYPE = "schedule";
export const SCHEDULE_ITEM1 = "scheduleItem1";
export const SCHEDULE_ITEM2 = "scheduleItem2";
export const SCHEDULE_ITEM3 = "scheduleItem3";
export const SCHEDULE_ITEM4 = "scheduleItem4";
export const SCHEDULE_ITEM5 = "scheduleItem5";
export const SCHEDULE_ITEM6 = "scheduleItem6";

export const IMAGE = "image";
export const ICON = "icon";
export const IMAGE_LIST_GROUP_SUBTYPE = "image_list";
export const PHOTO_GALLERY_GROUP_SUBTYPE = "photo_gallery";

export const TICKETS_PAGE_NAME = "tickets";

export const FILTER_GROUP_SUBTYPE = "FilterGroup";
export const FILTER_GROUP_TITLE = "FilterGroupTitle";
export const FILTER = "Filter";
export const FILTER_GROUPS_LIST_ITEMS_SUBTYPE = "filter_groups_list_items";

export const LIST_ITEM = "list_item";
export const TEMP_LIST_ITEM = "temp_list_item";

export const SUBSCRIPTION_ITEM_NAME = "subscription_item_name";
export const SUBSCRIPTION_ITEM_PRICE = "subscription_item_price";
export const SUBSCRIPTION_ITEM_OLD_PRICE = "subscription_item_old_price";
export const SUBSCRIPTION_ITEM_SHARE = "subscription_item_share";
export const SUBSCRIPTION_ITEM_DESCRIPTION = "subscription_item_description";
export const SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION =
  "subscription_item_important_description";

export const ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE = "additional_page_data_group";

export const TRAINERS_PAGE_NAME = "trainers";
export const TRAINER_ITEM_NAME = "trainer_item_name";
export const TRAINER_ITEM_IS_PREMIUM = "trainer_item_is_premium";
export const TRAINER_ITEM_IMAGE = "trainer_item_image";
export const TRAINER_ITEM_DESCRIPTION = "trainer_item_description";

export const ACTION_BANNER_GROUP_SUBTYPE = "action_banner_group";
export const ACTION_BANNER_TITLE = "action_banner_title";
export const ACTION_BANNER_IMAGE = "action_banner_image";

export const TABS = "tabs";
export const TAB = "tab";
export const TAB_TITLE = "tab_title";

export const LAYOUT_PARENT = "layout";
export const LAYOUT_ITEM = "layout_item";

export const LAYOUT_ITEM_LEFT = "layout_item_left";
export const LAYOUT_ITEM_RIGHT = "layout_item_right";

export const CALENDAR_EVENTS_GROUP_SUBTYPE = "calendar_events_group_subtype";
export const CALENDAR_EVENTS_ITEM_TYPE = "calendar_events_item_type";
export const CALENDAR_EVENTS_TITLE = "calendar_events_title";
export const CALENDAR_EVENTS_TRAINER = "calendar_events_trainer";
export const CALENDAR_EVENTS_PRICE = "calendar_events_price";
export const CALENDAR_EVENTS_COUNT = "calendar_events_count";
export const CALENDAR_EVENTS_TIME = "calendar_events_time";

export const CALENDAR_EVENTS_DESCRIPTION = "calendar_events_description";

export const CALENDAR_EVENTS_TYPE = "calendar_events_type";
export const CALENDAR_EVENTS_COMMON_SUBTYPE = "common";
export const CALENDAR_EVENTS_AUTHOR_SUBTYPE = "author";
export const CALENDAR_EVENTS_SPECIAL_SUBTYPE = "special";

export const CAN_NOT_DELETE = [
  HEADER1,
  HEADER2,
  INFO_TITLE,
  INFO_TELEPHONE,
  INFO_ADDRESS,
  INFO_BODY,
  SCHEDULE_ITEM1,
  SCHEDULE_ITEM2,
  SCHEDULE_ITEM3,
  SCHEDULE_ITEM4,
  SCHEDULE_ITEM5,
  SCHEDULE_ITEM6,
  FILTER_GROUP_TITLE,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
  ACTION_BANNER_TITLE,
  ACTION_BANNER_IMAGE,
  LIGA_TITLE,
  LIGA_TELEPHONE,
  LIGA_ADDRESS,
  CALENDAR_EVENTS_TITLE,
  CALENDAR_EVENTS_TYPE,
  CALENDAR_EVENTS_TRAINER,
  CALENDAR_EVENTS_PRICE,
  CALENDAR_EVENTS_COUNT,
  CALENDAR_EVENTS_TIME,
  CALENDAR_EVENTS_DESCRIPTION,
];
export const GROUP_TYPES_WITH_TOOLTIP = [SERVICES_GROUP_SUBTYPE];

export const GroupFeatureSubtypes = [
  GROUP1_SUBTYPE,
  GROUP2_SUBTYPE,
  GROUP_2COLUMNS_2HEADERS_SUBTYPE,
  SERVICES_GROUP_SUBTYPE,
  INFO_GROUP_SUBTYPE,
  LIGA_GROUP_SUBTYPE,
  SCHEDULE_GROUP_SUBTYPE,
  ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
  IMAGE_LIST_GROUP_SUBTYPE,
  ACTION_BANNER_GROUP_SUBTYPE,
  PHOTO_GALLERY_GROUP_SUBTYPE,
  CALENDAR_EVENTS_GROUP_SUBTYPE,
];

export const DEFAULT_TEXT = "Please enter text";

export const PAGE_NAMES_TO_LIST_ITEMS_DATA: Record<
  string,
  {
    addText: keyof StaticTexts;
    editText: keyof StaticTexts;
    textTypes: string[];
  }
> = {
  tickets: {
    addText: "addSubscription",
    editText: "editSubscription",
    textTypes: [
      SUBSCRIPTION_ITEM_NAME,
      SUBSCRIPTION_ITEM_PRICE,
      SUBSCRIPTION_ITEM_OLD_PRICE,
      SUBSCRIPTION_ITEM_SHARE,
      SUBSCRIPTION_ITEM_DESCRIPTION,
    ],
  },
  trainers: {
    addText: "addTrainer",
    editText: "editTrainer",
    textTypes: [
      TRAINER_ITEM_NAME,
      TRAINER_ITEM_IS_PREMIUM,
      TRAINER_ITEM_IMAGE,
      TRAINER_ITEM_DESCRIPTION,
    ],
  },
};

export const S3_TYPES = [TRAINER_ITEM_IMAGE, IMAGE, ICON];

export const MAX_PAGE_WIDTH = 1075;

export const ACTION_BUTTON_BACKGROUND = "#2575fc";
export const ACTION_BUTTON_BACKGROUND_NOT_SELECTED = "#65b5fc";
export const GRAY_BACKGROUND_COLOR = "#f8f8f8";
export const FILTER_GROUP_DEFAULT_WIDTH = "238px";

export const TRANSLATE_LANGUAGES = ["EN", "UA", "DE"];
