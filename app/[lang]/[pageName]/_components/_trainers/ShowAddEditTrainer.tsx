"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { TrainerFilterGroups } from "./TrainerFilterGroups";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ChangeEventHandler, useEffect, useState } from "react";
import { CommonButton } from "../_clientComponents/CommonButton";
import {
  TRAINER_ITEM,
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IMAGE,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
} from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { TextItemField } from "../TextItemField";
import { AddTextDescriptionButton } from "../_clientComponents/AddTextDescriptionButton";
import { TrainerItem } from "./TrainerItem";
import {
  updateFeatureSubtypeFilterIds,
  updateTextDescriptionValue,
} from "@/app/lib/actions_fitness";
import { getFilterIds } from "@/app/lib/utils/getFilterIds";
import { UploadComponent } from "../_clientComponents/UploadComponent";

export type Props = {
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
  groupData: FullData[];
  onCancel: () => void;
  onSave: () => void;
  trainerItemFeatureId: number;
};

export const ShowAddEditTrainer = ({
  staticTexts,
  pageFullDataList,
  params,
  groupData,
  onCancel,
  onSave,
  trainerItemFeatureId,
}: Props) => {
  const pathName = usePathname();

  const currentData = pageFullDataList.filter(
    (data) => data.id === trainerItemFeatureId
  );

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(getFilterIds(currentData[0]?.filter_ids));

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);

  useEffect(() => {
    const newSelectedFilterTextDescriptionIds =
      selectedFilterTextDescriptionIds.reduce<number[]>((result, id) => {
        if (pageFullDataList.find((item) => item.text_description_id === id)) {
          result.push(id);
        }

        return result;
      }, []);

    if (
      newSelectedFilterTextDescriptionIds.length <
      selectedFilterTextDescriptionIds.length
    ) {
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    }
  }, [pageFullDataList]);

  const handleFilterSelectionChanged = ({
    filter,
    value,
  }: {
    filter: FullData;
    value: boolean;
  }) => {
    if (value) {
      const newSelectedFilterTextDescriptionIds = [
        ...selectedFilterTextDescriptionIds,
      ];
      newSelectedFilterTextDescriptionIds.push(filter.text_description_id);
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    } else {
      const newSelectedFilterTextDescriptionIds =
        selectedFilterTextDescriptionIds.filter(
          (item) => item !== filter.text_description_id
        );

      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    }
  };

  const name = currentData.find((item) => item.text_type === TRAINER_ITEM_NAME);
  const isPremium = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IS_PREMIUM
  );
  const photo = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IMAGE
  );
  const descriptions = currentData.filter((item) =>
    [TRAINER_ITEM_DESCRIPTION].includes(item.text_type)
  );

  if (!name || !isPremium || !photo || !isPremium) {
    return null;
  }

  const handleSave = async () => {
    await updateFeatureSubtypeFilterIds({
      id: trainerItemFeatureId,
      pathName,
      subtype: TRAINER_ITEM,
      filterIds: selectedFilterTextDescriptionIds.join(","),
    });

    onSave();
  };

  const handleIsPremiumChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const value = event.target.checked ? "yes" : "no";
    setIsSaveDisabled(true);
    await updateTextDescriptionValue({
      value,
      textDescriptionId: isPremium.text_description_id,
      pathName,
    });
    setIsSaveDisabled(false);
  };

  const handlePhotoUploaded = async (value: string) => {
    setIsSaveDisabled(true);
    await updateTextDescriptionValue({
      value,
      textDescriptionId: photo.text_description_id,
      pathName,
    });
    setIsSaveDisabled(false);
  };

  const trainerFeatureId = groupData[0]?.id;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        width: "100%",
        alignItems: "flex-start",
        flexWrap: "wrap",
        border: "1px dotted magenta",
        padding: "10px",
      }}
    >
      <div
        style={{
          flexGrow: 2,
          border: "1px dotted magenta",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "5px",
          maxWidth: "40%",
          minWidth: "170px",
        }}
      >
        <TextItemField
          fieldData={name}
          staticTexts={staticTexts}
          title={staticTexts.name}
          importantDescriptionType=""
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
          }}
        >
          <div style={{ fontWeight: 700 }}>
            {staticTexts.isPremium ?? "N/A"}:{" "}
          </div>

          <input
            type="checkbox"
            checked={isPremium.value === "yes"}
            onChange={handleIsPremiumChange}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
          }}
        >
          <div style={{ fontWeight: 700 }}>{staticTexts.photo ?? "N/A"}: </div>

          <UploadComponent
            onUploaded={handlePhotoUploaded}
            isUpdate={!!photo.value}
            staticTexts={staticTexts}
          />
        </div>

        <div style={{ fontWeight: 700 }}>{staticTexts.descriptions}: </div>

        {descriptions.map((description) => {
          return (
            <TextItemField
              fieldData={description}
              staticTexts={staticTexts}
              key={description.text_description_id}
              importantDescriptionType=""
            />
          );
        })}

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            padding: "5px",
          }}
        >
          <AddTextDescriptionButton
            featureId={trainerItemFeatureId}
            textType={TRAINER_ITEM_DESCRIPTION}
            buttonText={staticTexts.addDescription ?? "N/A"}
            price={null}
          />
        </div>
      </div>

      <div style={{ width: "30%", minWidth: "190px" }}>
        <TrainerItem currentData={currentData} />
      </div>

      {trainerFeatureId ? (
        <TrainerFilterGroups
          isEdit={false}
          staticTexts={staticTexts}
          pageFullDataList={pageFullDataList}
          params={params}
          onFilterSelectionChanged={handleFilterSelectionChanged}
          selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
          parentFeatureId={trainerFeatureId}
        />
      ) : null}

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          padding: "10px 0",
          gap: "10px",
        }}
      >
        <CommonButton text="Cancel" onClick={onCancel} />
        <CommonButton
          text="Save"
          onClick={handleSave}
          isDisabled={isSaveDisabled}
        />
      </div>
    </div>
  );
};
