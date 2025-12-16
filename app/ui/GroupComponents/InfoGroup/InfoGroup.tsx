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
import styles from "./infoGroup.module.css";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { ItemContainerDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import { ItemContainerAddTextDescription } from "../../CommonComponents/_itemGroupContainer/ItemContainerAddTextDescription";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  countIndex: CountIndex;
};

export const InfoGroup = ({ groupData, params, countIndex }: Props) => {
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
    <ItemContainerDeleteFeature
      isEdit={isEdit}
      deleteText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      isChangeOrderHorizontal={false}
      marginTop={0}
      noDelete={noDelete}
      countIndex={countIndex}
      noChangeOrder={false}
    >
      <div className={styles.container}>
        <ShowInfoGroupItem
          data={dataTitle}
          staticTexts={staticTexts}
          lang={lang}
          isEdit={isEdit}
          countIndex={null}
        />
        {isInfoGroup ? (
          <PhoneAddress
            groupData={groupData}
            staticTexts={staticTexts}
            lang={lang}
            isEdit={isEdit}
          />
        ) : null}
        <ItemContainerAddTextDescription
          isEdit={isEdit}
          featureData={groupData}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={INFO_BODY}
          marginTop={0}
          heightValue="100%"
        >
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
                    countIndex={{ count: dataBodyList.length, index }}
                  />
                </div>
              );
            })}
          </div>
        </ItemContainerAddTextDescription>

        {!isInfoGroup ? (
          <div className={styles.actionButton}>
            <CommonButton isAction text={map[subtype] ?? ""} />
          </div>
        ) : null}
      </div>
    </ItemContainerDeleteFeature>
  );
};
