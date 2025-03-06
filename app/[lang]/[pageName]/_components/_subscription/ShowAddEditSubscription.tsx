"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { SubscriptionFilterGroups } from "./SubscriptionFilterGroups";
import { FullData, MainParams } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { CommonButton } from "../_clientComponents/CommonButton";
import {
  SUBSCRIPTION_ITEM,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
} from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { SubscriptionItemField } from "./SubscriptionItemField";
import { AddTextDescriptionButton } from "../_clientComponents/AddTextDescriptionButton";
import { SubscriptionItem } from "./SubscriptionItem";
import { updateFeatureSubtypeFilterIds } from "@/app/lib/actions_fitness";
import { getFilterIds } from "@/app/lib/utils/getFilterIds";

export type Props = {
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
  groupData: FullData[];
  onCancel: () => void;
  onSave: () => void;
  subscriptionItemFeatureId: number;
};

export const ShowAddEditSubscription = ({
  staticTexts,
  pageFullDataList,
  params,
  groupData,
  onCancel,
  onSave,
  subscriptionItemFeatureId,
}: Props) => {
  const pathName = usePathname();

  const currentData = pageFullDataList.filter(
    (data) => data.id === subscriptionItemFeatureId
  );

  const [
    selectedFilterTextDescriptionIds,
    setSelectedFilterTextDescriptionIds,
  ] = useState<number[]>(getFilterIds(currentData[0]?.filter_ids));

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
      alert("On   " + newSelectedFilterTextDescriptionIds.join(","));
    } else {
      const newSelectedFilterTextDescriptionIds =
        selectedFilterTextDescriptionIds.filter(
          (item) => item !== filter.text_description_id
        );

      alert("Off   " + newSelectedFilterTextDescriptionIds.join(","));
      setSelectedFilterTextDescriptionIds(newSelectedFilterTextDescriptionIds);
    }
  };

  const name = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_NAME
  );
  const share = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_SHARE
  );
  const price = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_PRICE
  );
  const oldPrice = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_OLD_PRICE
  );
  const descriptions = currentData.filter((item) =>
    [
      SUBSCRIPTION_ITEM_DESCRIPTION,
      SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION,
    ].includes(item.text_type)
  );

  if (!name || !price || !share || !oldPrice) {
    return null;
  }

  const handleSave = async () => {
    await updateFeatureSubtypeFilterIds({
      id: subscriptionItemFeatureId,
      pathName,
      subtype: SUBSCRIPTION_ITEM,
      filterIds: selectedFilterTextDescriptionIds.join(","),
    });

    onSave();
  };

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
        <SubscriptionItemField
          fieldData={name}
          staticTexts={staticTexts}
          title={staticTexts.name}
        />
        <SubscriptionItemField
          fieldData={price}
          staticTexts={staticTexts}
          title={staticTexts.price}
        />
        <SubscriptionItemField
          fieldData={share}
          staticTexts={staticTexts}
          title={staticTexts.share}
        />
        <SubscriptionItemField
          fieldData={oldPrice}
          staticTexts={staticTexts}
          title={staticTexts.oldPrice}
        />

        <div style={{ fontWeight: 700 }}>{staticTexts.descriptions}: </div>

        {descriptions.map((description) => {
          return (
            <SubscriptionItemField
              fieldData={description}
              staticTexts={staticTexts}
              key={description.text_description_id}
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
            featureId={subscriptionItemFeatureId}
            textType={SUBSCRIPTION_ITEM_DESCRIPTION}
            buttonText={staticTexts.addDescription ?? "N/A"}
            price={null}
          />

          <AddTextDescriptionButton
            featureId={subscriptionItemFeatureId}
            textType={SUBSCRIPTION_ITEM_IMPORTANT_DESCRIPTION}
            buttonText={staticTexts.addImportantDescription ?? "N/A"}
            price={null}
          />
        </div>
      </div>

      <div style={{ width: "30%", minWidth: "190px" }}>
        <SubscriptionItem currentData={currentData} />
      </div>

      <SubscriptionFilterGroups
        isEdit={false}
        staticTexts={staticTexts}
        groupData={groupData}
        pageFullDataList={pageFullDataList}
        params={params}
        onFilterSelectionChanged={handleFilterSelectionChanged}
        selectedFilterTextDescriptionIds={selectedFilterTextDescriptionIds}
      />

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
        <CommonButton text="Save" onClick={handleSave} />
      </div>
    </div>
  );
};
