import { FullData } from "@/app/lib/definitions";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";
import { UploadComponent } from "./UploadComponent";
import { DeleteTextDescriptionButton } from "../_buttons/DeleteTextDescriptionButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ChangeOrderButtons } from "../_buttons/ChangeOrderButtons";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";
import { IMAGE } from "@/app/lib/constants";

export type Props = {
  imagesData: FullData[];
  onImageUpload: (value: string) => void;
  onDeleteFinished?: () => void;
  isImageGroup?: boolean;
  staticTexts?: StaticTexts;
};

export const ManageImages = ({
  imagesData,
  onImageUpload,
  onDeleteFinished,
  isImageGroup,
  staticTexts,
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
              {isImageGroup && staticTexts ? (
                <UpdateDeleteTextButtons
                  staticTexts={staticTexts}
                  currentData={imageItem}
                  s3Key={imageItem.value}
                  isNoUpdate
                  flexDirection="column"
                  changeOrderTextType={IMAGE}
                  isHorizontal
                />
              ) : (
                <DeleteFeatureButton
                  featureId={imageItem.id}
                  deleteText="Delete"
                  onDeleteFinished={onDeleteFinished}
                  featureData={[imageItem]}
                  parentFeatureId={null}
                />
              )}
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
