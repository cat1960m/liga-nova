import { FullData, MainParams } from "@/app/lib/definitions";
import {
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  INFO,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  PAGE_SUBSCRIPTIONS,
  SCHEDULE,
  SERVICE_ITEM,
  SERVICES,
  SUBSCRIPTIONS,
} from "@/app/lib/constants";
import { ShowGroupColumn_Client } from "./_columnsGroup/ShowGroupColumn_Client";
import { ShowServices_Client } from "./_service/ShowServices_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./_clientComponents/DeleteFeatureButton";
import { AddTextDescriptionButton } from "./_clientComponents/AddTextDescriptionButton";
import { ShowInfoGroup_Client } from "./_info/ShowInfoGroup_Client";
import { ShowScheduleGroup_Client } from "./_schedule/ShowScheduleGroup_Client";
import { SubscriptionGroup } from "./_subscription/SubscriptionGroup";
import { PageSubscriptionsGroup } from "./_pageSubscription/PageSubscriptionsGroup";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
};

export const ShowComplexGroup_Client = ({
  groupData,
  isEdit,
  staticTexts,
  pageFullDataList,
  params,
}: Props) => {
  const firstData = groupData[0];
  const featureId = firstData.id;
  const is2headers2columns = firstData?.subtype === GROUP_2COLUMNS_2HEADERS;
  const isServices = firstData?.subtype === SERVICES;
  const isAddButtonShown = isServices;
  const isInfoGroup = firstData?.subtype === INFO;
  const isScheduleGroup = firstData?.subtype === SCHEDULE;
  const isSubscriptionsGroup = firstData?.subtype === SUBSCRIPTIONS;
  const isPageSubscriptions = firstData.subtype === PAGE_SUBSCRIPTIONS;

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        border: isEdit ? "1px dotted magenta" : undefined,
      }}
    >
      {is2headers2columns ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          <ShowGroupColumn_Client
            headerType={HEADER1}
            columnItemType={ITEM_COLUMN1}
            groupData={groupData}
            isEdit={isEdit}
            staticTexts={staticTexts}
          />
          <ShowGroupColumn_Client
            headerType={HEADER2}
            columnItemType={ITEM_COLUMN2}
            groupData={groupData}
            isEdit={isEdit}
            staticTexts={staticTexts}
          />
        </div>
      ) : null}

      {isServices ? (
        <ShowServices_Client
          groupData={groupData}
          isEdit={isEdit}
          staticTexts={staticTexts}
        />
      ) : null}

      {isInfoGroup ? (
        <ShowInfoGroup_Client
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
        />
      ) : null}

      {isScheduleGroup ? (
        <ShowScheduleGroup_Client
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
        />
      ) : null}

      {isSubscriptionsGroup ? (
        <SubscriptionGroup
          isEdit={isEdit}
          staticTexts={staticTexts}
          groupData={groupData}
          pageFullDataList={pageFullDataList}
          params={params}
        />
      ) : null}

      {isPageSubscriptions ? (
        <PageSubscriptionsGroup
          currentData={firstData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          pageFullDataList={pageFullDataList}
        />
      ) : null}

      {isEdit ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <DeleteFeatureButton
              featureId={featureId}
              deleteText={staticTexts.delete ?? "N/A"}
            />

            {isAddButtonShown ? (
              <AddTextDescriptionButton
                featureId={featureId}
                textType={SERVICE_ITEM}
                buttonText={staticTexts.addGroupItem ?? "N/A"}
                price={0}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
