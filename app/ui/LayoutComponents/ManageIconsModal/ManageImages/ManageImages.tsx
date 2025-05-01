import { FullData, MainParams } from "@/app/lib/definitions";
import { UploadComponent } from "../UploadComponent/UploadComponent";
import { ItemContainerDeleteChildFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerDeleteChildFeature";
import styles from "./manageImages.module.css";

export type Props = {
  imagesData: FullData[];
  onImageUpload: (value: string) => void;
  onDeleteFinished?: () => void;
};

export const ManageImages = ({
  imagesData,
  onImageUpload,
  onDeleteFinished,
}: Props) => {
  return (
    <div className={styles.styles}>
      <div className={styles.body}>
        {imagesData.map((imageItem) => {
          return (
            <ItemContainerDeleteChildFeature
              deleteText="Delete"
              onDeleteFinished={onDeleteFinished}
              featureData={[imageItem]}
              noChangeOrder
              isEdit={true}
              key={imageItem.text_description_id}
              marginTop={0}
            >
              <img
                src={imageItem.value}
                alt="image"
                style={{ maxWidth: "100px" }}
              />
            </ItemContainerDeleteChildFeature>
          );
        })}
      </div>

      <div className={styles.upload}>
        <div>
          <UploadComponent onUploaded={onImageUpload} />
        </div>
      </div>
    </div>
  );
};
