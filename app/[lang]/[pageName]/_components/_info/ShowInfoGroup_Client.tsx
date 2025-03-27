"use client";

import { FullData } from "@/app/lib/definitions";
import {
  IMAGE,
  INFO_ADDRESS,
  INFO_BODY,
  INFO_TELEPHONE,
  INFO_TITLE,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowInfoGroupItem_Client } from "./ShowInfoGroupItem_Client";
import { AddTextDescriptionButton } from "../_buttons/AddTextDescriptionButton";
import { UploadComponent } from "../_clientComponents/UploadComponent";
import { updatePriceValue } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import Image from "next/image";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
};

export const ShowInfoGroup_Client = ({
  isEdit,
  staticTexts,
  groupData,
}: Props) => {
  const featureId = groupData[0]?.id;
  const pathName = usePathname();

  const dataTitle = groupData.find((item) => item.text_type === INFO_TITLE);

  const dataTelephone = groupData.find(
    (item) => item.text_type === INFO_TELEPHONE
  );

  const dataAddress = groupData.find((item) => item.text_type === INFO_ADDRESS);

  const dataBodyList = groupData.filter((item) => item.text_type === INFO_BODY);

  const imageData = groupData.find((item) => item.text_type === IMAGE);

  const handleUploaded = (value: string) => {
    if (!imageData || !pathName) {
      return;
    }

    updatePriceValue({
      textDescriptionId: imageData.text_description_id,
      pathName,
      value,
    });
  };

  if (!featureId) {
    return null;
  }

  return (
    <>
      <div style={{ display: "flex", width: "100%", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "50%",
            borderRadius: "10px",
            backgroundColor: "#f2f2f2",
            border: isEdit ? "1px dotted magenta" : undefined,
            padding: "20px",
          }}
        >
          <ShowInfoGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={dataTitle}
          />
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <ShowInfoGroupItem_Client
              isEdit={isEdit}
              staticTexts={staticTexts}
              data={dataTelephone}
            />

            <ShowInfoGroupItem_Client
              isEdit={isEdit}
              staticTexts={staticTexts}
              data={dataAddress}
            />
          </div>
          {dataBodyList.map((item, index) => {
            return (
              <div key={item.text_content_id ?? "" + "_" + index}>
                <ShowInfoGroupItem_Client
                  isEdit={isEdit}
                  staticTexts={staticTexts}
                  data={item}
                  isArea
                />
              </div>
            );
          })}
          {isEdit ? (
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <AddTextDescriptionButton
                featureId={featureId}
                buttonText={staticTexts.addGroupItem ?? "N/A"}
                textType={INFO_BODY}
                price={null}
              />
            </div>
          ) : null}
        </div>

        {isEdit ? (
          <div
            style={{
              display: "flex",
              gap: "10px",
              width: "50%",
              border: "1px dotted magenta",
              padding: "5px",
              flexDirection: "column",
              alignItems: isEdit ? "flex-start" : "stretch",
              backgroundImage: imageData?.value,
            }}
          >
            {imageData?.value ? (
              <img src={imageData?.value} alt="image" height="100%" />
            ) : null}
            <UploadComponent
              onUploaded={handleUploaded}
              s3Key={imageData?.value}
            />
          </div>
        ) : null}
        {!isEdit && imageData?.value ? (
          <div
            style={{
              width: "50%",
              border: "1px solid lightgray",
            }}
          >
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <Image
                src={imageData?.value}
                alt=""
                layout="fill" // Fill the container
                objectFit="cover" // Make sure it covers the entire container
                quality={100} // Optional, for higher quality
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
