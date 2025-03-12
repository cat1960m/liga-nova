"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { ShowAddEditSubscription } from "./ShowAddEditSubscription";
import { SubscriptionFilterGroups } from "./SubscriptionFilterGroups";
import {
  addChildFeature,
  RemoveFeature,
  RemoveFeatureBySubtype,
} from "@/app/lib/actions_fitness";
import {
  SUBSCRIPTION_ITEM,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
  TEMP_SUBSCRIPTION_ITEM,
} from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { WrappingContainerItems } from "../WrappingContainerItems";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
};

export const SubscriptionGroup = ({
  groupData,
  pageFullDataList,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const subscriptionGroupFeatureId = groupData[0]?.id;
  const [addingSubscriptionFeatureId, setAddingSubscriptionFeatureId] =
    useState<number | null>(null);
  const [editingSubscriptionFeatureId, setEditingSubscriptionFeatureId] =
    useState<number | null>(null);
  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>([]);
  const pathName = usePathname();

  if (!subscriptionGroupFeatureId) {
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

  const handleAddSubscription = async () => {
    await RemoveFeatureBySubtype({ subtype: TEMP_SUBSCRIPTION_ITEM, pathName });

    const resultId = await addChildFeature({
      parentId: subscriptionGroupFeatureId,
      type: SUBSCRIPTION_ITEM,
      subtype: TEMP_SUBSCRIPTION_ITEM,
      name: params.pageName,
      text_types: [
        SUBSCRIPTION_ITEM_NAME,
        SUBSCRIPTION_ITEM_PRICE,
        SUBSCRIPTION_ITEM_OLD_PRICE,
        SUBSCRIPTION_ITEM_SHARE,
        SUBSCRIPTION_ITEM_DESCRIPTION,
      ],
      pathName,
    });

    setAddingSubscriptionFeatureId(resultId);
  };

  const handleAddEditCancel = async () => {
    if (addingSubscriptionFeatureId) {
      await RemoveFeature({ id: addingSubscriptionFeatureId, pathName });
      setAddingSubscriptionFeatureId(null);
    }

    if (editingSubscriptionFeatureId) {
      setEditingSubscriptionFeatureId(null);
    }
  };

  const handleAddEditSave = () => {
    if (addingSubscriptionFeatureId) {
      setAddingSubscriptionFeatureId(null);
    }

    if (editingSubscriptionFeatureId) {
      setEditingSubscriptionFeatureId(null);
    }
  };

  const isSubscriptionItemsShown =
    !addingSubscriptionFeatureId && !editingSubscriptionFeatureId;
  const subscriptionItemFeatureId =
    editingSubscriptionFeatureId || addingSubscriptionFeatureId;
  const addEditTitle = addingSubscriptionFeatureId
    ? staticTexts.addSubscription
    : staticTexts.editSubscription;

  const subscriptionFeatureId = groupData[0]?.id;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {subscriptionFeatureId ? (
        <SubscriptionFilterGroups
          isEdit={isEdit}
          staticTexts={staticTexts}
          parentFeatureId={subscriptionFeatureId}
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
        {subscriptionItemFeatureId ? (
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

            <ShowAddEditSubscription
              staticTexts={staticTexts}
              pageFullDataList={pageFullDataList}
              params={params}
              groupData={groupData}
              onCancel={handleAddEditCancel}
              onSave={handleAddEditSave}
              subscriptionItemFeatureId={subscriptionItemFeatureId}
            />
          </div>
        ) : null}

        {isSubscriptionItemsShown ? (
          <WrappingContainerItems
            isEdit={isEdit}
            staticTexts={staticTexts}
            pageFullDataList={pageFullDataList}
            onAddItemClick={handleAddSubscription}
            setEditingItemFeatureId={setEditingSubscriptionFeatureId}
            parentFeatureId={subscriptionGroupFeatureId}
            selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
            params={params}
            itemTypeSubtype={SUBSCRIPTION_ITEM}
            editTextButton={staticTexts.editSubscription ?? "N/A"}
            addTextButton={staticTexts.addSubscription ?? "N/A"}
          />
        ) : null}
      </div>
    </div>
  );
};
