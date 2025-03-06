import { SUBSCRIPTION_ITEM } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { useMemo } from "react";
import { SubscriptionItem } from "../_subscription/SubscriptionItem";

export type Props = {
  currentData: FullData;
  pageFullDataList: FullData[];
};

export const PageSubscriptionsGroupShow = ({
  currentData,
  pageFullDataList,
}: Props) => {
  const pageSubscriptionFeatureId = currentData.id;
  const filterTextDescriptionIds = getFilterIds(currentData.filter_ids);

  const containerFullData = useMemo(
    () =>
      pageSubscriptionFeatureId
        ? getContainerData({
            pageName: "tickets",
            pageFullData: pageFullDataList,
            parentFeatureId: null,
            type: SUBSCRIPTION_ITEM,
            subtype: SUBSCRIPTION_ITEM,
            selectedFilterTextDescriptionIds: filterTextDescriptionIds,
          })
        : null,
    [pageFullDataList, pageSubscriptionFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, subscriptionItemIds] = containerFullData;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        width: "100%",
        justifyContent: "center",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      {subscriptionItemIds.map((subscriptionItemId) => {
        return (
          <div
            key={subscriptionItemId}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "33.3%",
              minWidth: "190px",
              padding: "10px",
              flexGrow: 2,
              maxWidth: "50%",
            }}
          >
            <SubscriptionItem currentData={data[subscriptionItemId]} />
          </div>
        );
      })}
    </div>
  );
};
