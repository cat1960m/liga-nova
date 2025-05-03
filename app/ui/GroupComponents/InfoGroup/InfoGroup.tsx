"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import {
  INFO_ACTION_CHILD_SUBTYPE,
  INFO_ACTION_COMMON_SUBTYPE,
  INFO_ACTION_FREE_SUBTYPE,
  INFO_BODY,
  INFO_SUBTYPE,
  INFO_TITLE,
} from "@/app/lib/constants";
import { ShowInfoGroupItem } from "./ShowInfoGroupItem/ShowInfoGroupItem";
import { PhoneAddress } from "./PhoneAddress/PhoneAddress";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import styles from "./infoGroup.module.css";
import { getIsEditNoDelete } from "@/app/lib/utils";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const InfoGroup = ({ groupData, params }: Props) => {
  const subtype = groupData[0]?.subtype;

  const dataTitle = groupData.find((item) => item.text_type === INFO_TITLE);

  const isInfoGroup = subtype === INFO_SUBTYPE;
  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  const dataBodyList = groupData.filter((item) => item.text_type === INFO_BODY);
  const map: Record<string, string> = {};
  map[INFO_ACTION_COMMON_SUBTYPE] = staticTexts.register ?? "N/A";
  map[INFO_ACTION_CHILD_SUBTYPE] = staticTexts.registerChild ?? "N/A";
  map[INFO_ACTION_FREE_SUBTYPE] = staticTexts.tryFree ?? "N/A";

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={INFO_BODY}
      isChangeOrderHorizontal={false}
      marginTop={0}
      noDelete={noDelete}
    >
      <div className={styles.container}>
        <ShowInfoGroupItem
          data={dataTitle}
          staticTexts={staticTexts}
          lang={lang}
          isEdit={isEdit}
        />
        {isInfoGroup ? (
          <PhoneAddress
            groupData={groupData}
            staticTexts={staticTexts}
            lang={lang}
            isEdit={isEdit}
          />
        ) : null}
        <div className={styles.bodyContainer}>
          {dataBodyList.map((item, index) => {
            return (
              <div key={item.text_content_id ?? "" + "_" + index}>
                <ShowInfoGroupItem
                  data={item}
                  isQuill
                  staticTexts={staticTexts}
                  lang={lang}
                  isEdit={isEdit}
                />
              </div>
            );
          })}
        </div>
        {!isInfoGroup ? (
          <div className={styles.actionButton}>
            <CommonButton isAction text={map[subtype] ?? ""} />
          </div>
        ) : null}
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
