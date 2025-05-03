import { FullData, MainParams } from "@/app/lib/definitions";
import { UploadComponent } from "../UploadComponent/UploadComponent";
import { ItemContainerDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
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
            <ItemContainerDeleteFeature
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
            </ItemContainerDeleteFeature>
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
