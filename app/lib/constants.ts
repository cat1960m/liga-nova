import { StaticTexts } from "../dictionaries/definitions";

export const TITLE = "title";
export const PAGE = "page";
export const GROUP1 = "group1";
export const GROUP2 = "group2";
export const GROUP = "group";
export const GROUP_2COLUMNS_2HEADERS = "group2columns2headers";
export const HEADER1 = "header1";
export const HEADER2 = "header2";
export const ITEM_COLUMN1 = "item_column1";
export const ITEM_COLUMN2 = "item_column2";
export const SIMPLE_GROUP_ITEM = "simple_group_item";
export const SERVICES = "services";
export const SERVICE_ITEM = "service_item";
export const TOOLTIP = "tooltip";
export const TABS = "tabs";
export const TAB = "tab";
export const TAB_TITLE = "tab_title";
export const INFO = "info";
export const INFO_TITLE = "infoTitle";
export const INFO_TELEPHONE = "infoTelephone";
export const INFO_ADDRESS = "infoAddress";
export const INFO_BODY = "infoBody";
export const SCHEDULE = "schedule";
export const SCHEDULE_ITEM1 = "scheduleItem1";
export const SCHEDULE_ITEM2 = "scheduleItem2";
export const SCHEDULE_ITEM3 = "scheduleItem3";
export const SCHEDULE_ITEM4 = "scheduleItem4";
export const SCHEDULE_ITEM5 = "scheduleItem5";
export const SCHEDULE_ITEM6 = "scheduleItem6";

export const IMAGE = "image";
export const ICON = "icon";
export const IMAGE_LIST = "image_list";

export const TICKETS = "tickets";
export const FILTER_GROUP = "FilterGroup";
export const FILTER_GROUP_TITLE = "FilterGroupTitle";
export const FILTER = "Filter";
export const LIST_ITEM = "list_item";
export const TEMP_LIST_ITEM = "temp_list_item";
export const SUBSCRIPTION_ITEM_NAME = "subscription_item_name";
export const SUBSCRIPTION_ITEM_PRICE = "subscription_item_price";
export const SUBSCRIPTION_ITEM_OLD_PRICE = "subscription_item_old_price";
export const SUBSCRIPTION_ITEM_SHARE = "subscription_item_share";
export const SUBSCRIPTION_ITEM_DESCRIPTION = "subscription_item_description";
export const SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION =
  "subscription_item_important_description";

export const ADDITIONAL_PAGE_DATA_GROUP = "additional_page_data_group";

export const TRAINERS = "trainers";
export const TRAINER_ITEM_NAME = "trainer_item_name";
export const TRAINER_ITEM_IS_PREMIUM = "trainer_item_is_premium";
export const TRAINER_ITEM_IMAGE = "trainer_item_image";
export const TRAINER_ITEM_DESCRIPTION = "trainer_item_description";

export const FILTER_GROUPS_LIST_ITEMS = "filter_groups_list_items";
export const ACTION_BANNER_GROUP = "action_banner_group";
export const ACTION_BANNER_TITLE = "action_banner_title";
export const ACTION_BANNER_IMAGE = "action_banner_image";

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
];
export const GROUP_TYPES_WITH_TOOLTIP = [SERVICES];

export const FeatureTypes = {
  GROUP: [
    GROUP1,
    GROUP2,
    GROUP_2COLUMNS_2HEADERS,
    SERVICES,
    INFO,
    SCHEDULE,
    ADDITIONAL_PAGE_DATA_GROUP,
    IMAGE_LIST,
    ACTION_BANNER_GROUP,
  ],
};

export const DEFAULT_TEXT = "Please enter text";
export const DEFAULT_TEXT_CLIENT = "N/A";

export const SHOW_TABS_WITH_SELECTION = true;

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
