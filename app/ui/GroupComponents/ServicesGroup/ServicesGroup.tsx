import { SERVICE_ITEM, TOOLTIP } from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ServicesText } from "./ServicesText/ServicesText";
import { UpdateDeleteTextButtons } from "@/app/ui/CommonComponents/_buttons/UpdateDeleteTextButtons";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

import styles from "./servicesGroup.module.css";
import cn from "clsx";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const ServicesGroup = ({ groupData, params }: Props) => {
  const texts = groupData.filter((data) => data.content_type !== TOOLTIP);
  const { isEdit, staticTexts } = params;

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      textDescriptionType={SERVICE_ITEM}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      price={0}
      isEdit={isEdit}
      isChangeOrderHorizontal={false}
      marginTop={20}
    >
      <div className={styles.container}>
        <div className={styles.body}>
          {texts.map((data, index) => {
            const title = groupData.find(
              (item) =>
                item.text_description_id === data.text_description_id &&
                item.content_type === TOOLTIP
            );
            return (
              <div
                className={cn(styles.text_container, {
                  [styles.odd]: index % 2 === 0,
                })}
                key={data.id + "_" + index}
              >
                <ServicesText
                  staticTexts={staticTexts}
                  text={data.text_content ?? "N/A"}
                  title={title?.text_content ?? ""}
                  price={data.value ?? ""}
                />

                {isEdit ? (
                  <UpdateDeleteTextButtons
                    currentData={data}
                    isChangeOrder={data.text_type === SERVICE_ITEM}
                    useItems={{
                      text: "simple",
                      tooltip: "simple",
                      value: "price",
                    }}
                    params={params}
                  />
                ) : (
                  <div className={styles.register}>{staticTexts.register}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
