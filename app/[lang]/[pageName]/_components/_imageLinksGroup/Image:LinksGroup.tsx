import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { AddTextDescriptionDeleteFeatureButtons } from "../_buttons/AddTextDescriptionDeleteFeatureButtons";
import { IMAGE_LINKS_ITEM } from "@/app/lib/constants";
import styles from "./imageLinks.module.css";
import { ImageLink } from "./ImageLink";
import { UpdateTextDescriptionData } from "../_clientComponents/UpdateTextDescriptionData";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";

export type Props = {
  groupData: FullData[];
  staticTexts: StaticTexts;
  isEdit: boolean;
  parentFeatureId: number;
};

export const ImageLinksGroup = ({
  groupData,
  isEdit,
  staticTexts,
  parentFeatureId,
}: Props) => {
  const featureId = groupData[0]?.id;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      <div className={styles.container}>
        {groupData.map((item) => (
          <div className={styles.itemContainer} key={item.text_description_id}>
            <ImageLink data={item} />
            {/*  <UpdateDeleteTextButtons /> */}
          </div>
        ))}
      </div>
      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureId={featureId}
          featureData={groupData}
          parentFeatureId={parentFeatureId}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={IMAGE_LINKS_ITEM}
        />
      ) : null}
    </div>
  );
};
