"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { ShowAddEditTrainer } from "./ShowAddEditTrainer";
import { TrainerFilterGroups } from "./TrainerFilterGroups";
import {
  addChildFeature,
  RemoveFeature,
  RemoveFeatureBySubtype,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { WrappingContainerItems } from "../WrappingContainerItems";
import {
  TEMP_TRAINER_ITEM,
  TRAINER_ITEM,
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IMAGE,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
} from "@/app/lib/constants";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
};

export const TrainersGroup = ({
  groupData,
  pageFullDataList,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const trainerGroupFeatureId = groupData[0]?.id;
  const [addingTrainerFeatureId, setAddingTrainerFeatureId] = useState<
    number | null
  >(null);
  const [editingTrainerFeatureId, setEditingTrainerFeatureId] = useState<
    number | null
  >(null);
  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>([]);
  const pathName = usePathname();

  if (!trainerGroupFeatureId) {
    return null;
  }

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

  const handleAddTrainer = async () => {
    await RemoveFeatureBySubtype({ subtype: TEMP_TRAINER_ITEM, pathName });

    const resultId = await addChildFeature({
      parentId: trainerGroupFeatureId,
      type: TRAINER_ITEM,
      subtype: TEMP_TRAINER_ITEM,
      name: params.pageName,
      text_types: [
        TRAINER_ITEM_NAME,
        TRAINER_ITEM_IS_PREMIUM,
        TRAINER_ITEM_IMAGE,
        TRAINER_ITEM_DESCRIPTION,
      ],
      pathName,
    });

    setAddingTrainerFeatureId(resultId);
  };

  const handleAddEditCancel = async () => {
    if (addingTrainerFeatureId) {
      await RemoveFeature({ id: addingTrainerFeatureId, pathName });
      setAddingTrainerFeatureId(null);
    }

    if (editingTrainerFeatureId) {
      setEditingTrainerFeatureId(null);
    }
  };

  const handleAddEditSave = () => {
    if (addingTrainerFeatureId) {
      setAddingTrainerFeatureId(null);
    }

    if (editingTrainerFeatureId) {
      setEditingTrainerFeatureId(null);
    }
  };

  const isTrainerItemsShown =
    !addingTrainerFeatureId && !editingTrainerFeatureId;
  const trainerItemFeatureId =
    editingTrainerFeatureId || addingTrainerFeatureId;
  const addEditTitle = addingTrainerFeatureId
    ? staticTexts.addTrainer
    : staticTexts.editTrainer;

  const trainerFeatureId = groupData[0]?.id;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {trainerFeatureId ? (
        <TrainerFilterGroups
          isEdit={isEdit}
          staticTexts={staticTexts}
          parentFeatureId={trainerFeatureId}
          pageFullDataList={pageFullDataList}
          params={params}
          onFilterSelectionChanged={handleFilterSelectionChanged}
          selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
        />
      ) : null}

      <div
        style={{
          display: "flex",
          flexGrow: 2,
        }}
      >
        {trainerItemFeatureId ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {addEditTitle ?? "N/A"}
            </div>

            <ShowAddEditTrainer
              staticTexts={staticTexts}
              pageFullDataList={pageFullDataList}
              params={params}
              groupData={groupData}
              onCancel={handleAddEditCancel}
              onSave={handleAddEditSave}
              trainerItemFeatureId={trainerItemFeatureId}
            />
          </div>
        ) : null}

        {isTrainerItemsShown ? (
          <WrappingContainerItems
            isEdit={isEdit}
            staticTexts={staticTexts}
            pageFullDataList={pageFullDataList}
            onAddItemClick={handleAddTrainer}
            setEditingItemFeatureId={setEditingTrainerFeatureId}
            parentFeatureId={trainerGroupFeatureId}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            params={params}
            itemTypeSubtype={TRAINER_ITEM}
            editTextButton={staticTexts.editTrainer ?? "N/A"}
            addTextButton={staticTexts.addTrainer ?? "N/A"}
          />
        ) : null}
      </div>
    </div>
  );
};
