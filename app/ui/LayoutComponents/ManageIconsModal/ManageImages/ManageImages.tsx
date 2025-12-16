import { FullData } from "@/app/lib/definitions";
import { UploadComponent } from "../UploadComponent/UploadComponent";
import { ItemContainerDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import styles from "./manageImages.module.css";
import Image from "next/image";

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
        {imagesData.map((imageItem, index) => {
          return (
            <ItemContainerDeleteFeature
              deleteText="Delete"
              onDeleteFinished={onDeleteFinished}
              featureData={[imageItem]}
              noChangeOrder={true}
              isEdit={true}
              key={imageItem.text_description_id}
              marginTop={0}
              countIndex={{count: imagesData.length, index}}
              isWithoutHistory={true}
            >
              {imageItem.value ? (
                <Image
                  src={imageItem.value}
                  alt="icon"
                  width={44}
                  height={44}
                />
              ) : null}
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
