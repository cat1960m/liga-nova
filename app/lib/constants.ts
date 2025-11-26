import { NameValueUrl, StaticTexts } from "../dictionaries/definitions";

export const TITLE = "title";
export const PAGE = "page";

export const TEXT_HEADER_GROUP_SUBTYPE = "group1";
export const TEXT_COMMON_GROUP_SUBTYPE = "group2";
export const TEXT_GROUP_EXPANDED_SUBTYPE = "group_expanded";
export const TEXT_GROUP_HIDDEN_SUBTYPE = "text_group_hidden_subtype";

export const SIMPLE_GROUP_ITEM = "simple_group_item";

export const GROUP = "group";

export const INFO_CHECK_GROUP_SUBTYPE = "info_check_group_subtitle";
export const INFO_CHECK_HEADER = "info_check_header";
export const INFO_CHECK_ITEM = "info_check_item";

export const INFO_SUBTYPE = "info";
export const INFO_ACTION_COMMON_SUBTYPE = "info_action_common";
export const INFO_ACTION_CHILD_SUBTYPE = "info_action_child";
export const INFO_ACTION_FREE_SUBTYPE = "info_action_free";
export const INFO_ACTION_SUBTYPES = [
  INFO_ACTION_COMMON_SUBTYPE,
  INFO_ACTION_CHILD_SUBTYPE,
  INFO_ACTION_FREE_SUBTYPE,
];

export const INFO_ADDRESS = "info_address";
export const INFO_TELEPHONE = "info_telephone";
export const INFO_TITLE = "info_title";
export const INFO_BODY = "info_body";

export const SERVICES_GROUP_SUBTYPE = "services";
export const SERVICE_ITEM = "service_item";
export const CONTENT_TYPE_TOOLTIP = "tooltip";
export const CONTENT_TYPE_MAIN = "main";

export const IMAGE_GROUP_SUBTYPE = "image_group_subtitle";

export const LIGA_GROUP_SUBTYPE = "liga_group";
export const LIGA_TITLE = "liga_itle";
export const LIGA_TELEPHONE = "liga_telephone";
export const LIGA_ADDRESS = "liga_address";
export const LIGA_SERVICE = "liga_service";

export const SCHEDULE_GROUP_SUBTYPE = "schedule";
export const SCHEDULE_NAME = "schedule_name";
export const SCHEDULE_ITEM = "schedule_item";

export const IMAGE = "image";
export const ICON = "icon";
export const IMAGE_LIST_GROUP_SUBTYPE = "image_list";
export const PHOTO_GALLERY_GROUP_SUBTYPE = "photo_gallery";

export const IMAGE_LINKS_GROUP_SUBTYPE = "image_links_group_subtype";
export const IMAGE_LINKS_ITEM = "image_links_item";

export const IMAGE_ACTIONS_GROUP_SUBTYPE = "image_actions_group_subtype";
export const IMAGE_ACTIONS_ITEM = "image_actions_item";

export const TICKETS_PAGE_NAME = "tickets";

export const FILTER_GROUP_SUBTYPE = "FilterGroup";
export const FILTER_GROUP_TITLE = "FilterGroupTitle";
export const FILTER = "Filter";
export const FILTER_GROUPS_LIST_ITEMS_SUBTYPE = "filter_groups_list_items";

export const LIST_ITEM = "list_item";

export const SUBSCRIPTION_ITEM_NAME = "subscription_item_name";
export const SUBSCRIPTION_ITEM_PRICE = "subscription_item_price";
export const SUBSCRIPTION_ITEM_OLD_PRICE = "subscription_item_old_price";
export const SUBSCRIPTION_ITEM_SHARE = "subscription_item_share";
export const SUBSCRIPTION_ITEM_DESCRIPTION = "subscription_item_description";
export const SUBSCRIPTION_ITEM_CAN_POSTPONE = "subscription_item_can_postpone";

export const ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE = "additional_page_data_group";

export const TRAINERS_PAGE_NAME = "trainers";
export const TRAINER_ITEM_NAME = "trainer_item_name";
export const TRAINER_ITEM_IS_PREMIUM = "trainer_item_is_premium";
export const TRAINER_ITEM_DESCRIPTION = "trainer_item_description";

export const ACTION_BANNER_GROUP_SUBTYPE = "action_banner_group";
export const ACTION_BANNER_TRY_GROUP_SUBTYPE = "action_banner_try_group";

export const ACTION_BANNER_TITLE_IMAGE = "action_banner_title_image";

export const ACTION_BANNER_LIST_GROUP_SUBTYPE = "action_banner_list_group";

export const ACTION_BANNER_LIST_GROUP_ITEM = "action_banner_list_group_item";
export const ACTION_BANNER_LIST_SHARE = "action_banner_list_share";
export const ACTION_BANNER_LIST_TICKET = "action_banner_list_ticket";
export const ACTION_BANNER_LIST_DESCRIPTION = "action_banner_list_description";
export const ACTION_BANNER_LIST_IMAGE = "action_banner_list_description";

export const TEXT_LIST_GROUP_SUBTYPE = "text_list_group_subtype";
export const TEXT_LIST_GROUP_ITEM = "text_list_group_item";
export const TEXT_LIST_NAME = "text_list_name";
export const TEXT_LIST_BODY = "text_list_body";

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
export const DIVIDER = "divider";

export const CAN_NOT_DELETE = [
  INFO_CHECK_HEADER,
  SCHEDULE_NAME,
  FILTER_GROUP_TITLE,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_CAN_POSTPONE,
  ACTION_BANNER_TITLE_IMAGE,
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
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_IMAGE,
  TEXT_LIST_NAME,
  TEXT_LIST_BODY,
];
export const GROUP_TYPES_WITH_TOOLTIP = [SERVICES_GROUP_SUBTYPE];


export const GroupFeatureSubtypes: NameValueUrl[] = [
  {
    value: TEXT_HEADER_GROUP_SUBTYPE,
    name: "Header text",
    url: "/images/header.png",
  },
  {
    value: TEXT_COMMON_GROUP_SUBTYPE,
    name: "HTML text",
    url: "/images/htmlText.png",
  },
  {
    value: TEXT_GROUP_EXPANDED_SUBTYPE,
    name: "Expanded text(trainer)",
    url: "/images/expandingText.png",
  },
  {
    value: TEXT_GROUP_HIDDEN_SUBTYPE,
    name: "Hidden text(about us)",
    url: "/images/hiddenText.png",
  },
  {
    value: TEXT_LIST_GROUP_SUBTYPE,
    name: "Text collection of author/content (main page bottom)",
    url: "/images/authoContentCollection.png",
  },
  {
    value: INFO_CHECK_GROUP_SUBTYPE,
    name: "Text collection with blue checkboxes (trainers school)",
    url: "/images/listWithBlueCheckboxes.png",
  },
  {
    value: INFO_SUBTYPE,
    name: "Text in gray rect (massage)",
    url: "/images/textOnGrayRect.png",
  },
  {
    value: INFO_ACTION_COMMON_SUBTYPE,
    name: "Text in gray rect with registration (solarium)",
    url: "/images/textsWithRegistration.png",
  },
  {
    value: INFO_ACTION_CHILD_SUBTYPE,
    name: "Text in gray rect with child registration (children studious)",
    url: "/images/textsWithChildrenRegistration.png",
  },
  {
    value: INFO_ACTION_FREE_SUBTYPE,
    name: "Text in gray rect with try button (children studious)",
    url: "/images/textsWithTry.png",
  },
  {
    value: IMAGE_GROUP_SUBTYPE,
    name: "Image (massage, solarium)",
    url: "/images/image.png",
  },
  {
    value: IMAGE_LIST_GROUP_SUBTYPE,
    name: "Image list with scroll (personal trainers)",
    url: "/images/scrollingImageCollection.png",
  },
  {
    value: IMAGE_LINKS_GROUP_SUBTYPE,
    name: "Image list with links (main page)",
    url: "/images/imageListWithLink.png",
  },
  {
    value: IMAGE_ACTIONS_GROUP_SUBTYPE,
    name: "Image list with action buttons ( shares)",
    url: "/images/imageListWithActionButton.png",
  },
  {
    value: PHOTO_GALLERY_GROUP_SUBTYPE,
    name: "Image photo gallery( about us)",
    url: "/images/photoGallery.png",
  },
  {
    value: ACTION_BANNER_GROUP_SUBTYPE,
    name: "Image with registration (trainers school bottom)",
    url: "/images/imageWithRegistration.png",
  },
  {
    value: ACTION_BANNER_TRY_GROUP_SUBTYPE,
    name: "Image with try (children studious bottom)",
    url: "/images/imageWithTry.png",
  },
  {
    value: ACTION_BANNER_LIST_GROUP_SUBTYPE,
    name: "Scrolling Image list with action buttons( main page top)",
    url: "/images/scrollingImagesWithActionButtons.png",
  },
  {
    value: SERVICES_GROUP_SUBTYPE,
    name: "Service list (massage, manicure)",
    url: "/images/serviceList.png",
  },
  {
    value: LIGA_GROUP_SUBTYPE,
    name: "Icon lists on gray rect (about us)",
    url: "/images/iconList.png",
  },
  {
    value: SCHEDULE_GROUP_SUBTYPE,
    name: "Schedule (sauna)",
    url: "/images/schedule.png",
  },
  {
    value: CALENDAR_EVENTS_GROUP_SUBTYPE,
    name: "Events calendar (group studious)",
    url: "/images/eventsCalendar.png",
  },
  { value: DIVIDER, name: "Divider (gray line)", url: "/images/divider.png" },
];

export const TEXT_GROUP_SUBTYPES = [
  TEXT_COMMON_GROUP_SUBTYPE,
  TEXT_GROUP_EXPANDED_SUBTYPE,
  TEXT_GROUP_HIDDEN_SUBTYPE,
];

export const DEFAULT_TEXT = "Please enter text";

export const PAGE_NAMES_TO_LIST_ITEMS_DATA: Record<
  string,
  {
    addText: keyof StaticTexts;
    editText: keyof StaticTexts;
    textTypes: string[];
    linkText: keyof StaticTexts;
  }
> = {
  tickets: {
    addText: "addSubscription",
    editText: "editSubscription",
    linkText: "moreSubscriptions",
    textTypes: [
      SUBSCRIPTION_ITEM_NAME,
      SUBSCRIPTION_ITEM_PRICE,
      SUBSCRIPTION_ITEM_OLD_PRICE,
      SUBSCRIPTION_ITEM_SHARE,
      SUBSCRIPTION_ITEM_DESCRIPTION,
      SUBSCRIPTION_ITEM_CAN_POSTPONE, //!!!
    ],
  },
  trainers: {
    addText: "addTrainer",
    editText: "editTrainer",
    linkText: "moreTrainers",
    textTypes: [
      TRAINER_ITEM_NAME,
      TRAINER_ITEM_IS_PREMIUM,
      TRAINER_ITEM_DESCRIPTION,
    ],
  },
};

export const S3_TYPES = [IMAGE, ICON];

export const MAX_PAGE_WIDTH = 1075;

export const ACTION_BUTTON_BACKGROUND = "#2575fc";
export const ACTION_BUTTON_BACKGROUND_NOT_SELECTED = "#65b5fc";
export const GRAY_BACKGROUND_COLOR = "#f8f8f8";
export const FILTER_GROUP_DEFAULT_WIDTH = "238px";

export const TRANSLATE_LANGUAGES = ["EN", "UA", "DE"];
export const CONTAINER_TYPES = [TAB, LAYOUT_ITEM];
export const ICON_BUTTON_WIDTH = "36px";
export const ICON_IN_BUTTON_WIDTH = "20px";
export const YES = "yes";
export const HOME = "home";

export const WORK_SCHEDULE1 = "пн-сб 07:00-23:00";
export const WORK_SCHEDULE2 = "нд 09:00-21:00";
export const PHONE = "(073) 33 77 565";
export const EDIT_MODE = "editMode";
export const ICON_SIZE = 44;
