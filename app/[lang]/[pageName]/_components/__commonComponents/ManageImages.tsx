import { FullData, MainParams } from "@/app/lib/definitions";
import { DeleteFeatureButton } from "./_buttons/DeleteFeatureButton";
import { UploadComponent } from "./UploadComponent";

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
            <div
              key={imageItem.text_description_id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <img
                src={imageItem.value}
                alt="image"
                style={{ maxWidth: "100px" }}
              />
              <DeleteFeatureButton
                deleteText="Delete"
                onDeleteFinished={onDeleteFinished}
                featureData={[imageItem]}
                noChangeOrder
              />
            </div>
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
