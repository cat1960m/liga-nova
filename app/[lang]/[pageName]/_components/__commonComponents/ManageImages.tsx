import { FullData, MainParams } from "@/app/lib/definitions";
import { UploadComponent } from "./UploadComponent";
import { ItemContainerDeleteChildFeature } from "./_itemGroupContainer/ItemContainerDeleteChildFeature";

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
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "10px",
          paddingTop: "30px",
        }}
      >
        <div>
          <UploadComponent onUploaded={onImageUpload} />
        </div>
      </div>
    </div>
  );
};
