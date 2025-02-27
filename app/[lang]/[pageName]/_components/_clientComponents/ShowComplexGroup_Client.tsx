import { FullData } from "@/app/lib/definitions";
import {
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  INFO,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  SERVICE_ITEM,
  SERVICES,
} from "@/app/lib/constants";
import { ShowGroupColumn_Client } from "./ShowGroupColumn_Client";
import { ShowServices_Client } from "./ShowServices_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./DeleteFeatureButton";
import { AddGroupItemButton } from "./AddGroupItemButton";
import { ShowInfoGroup_Client } from "./ShowInfoGroup_Client";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowComplexGroup_Client = ({
  groupData,
  isEdit,
  staticTexts,
}: Props) => {
  const firstData = groupData[0];
  const featureId = firstData.id;
  const is2headers2columns = firstData?.subtype === GROUP_2COLUMNS_2HEADERS;
  const isServices = firstData?.subtype === SERVICES;
  const isAddButtonShown = isServices;
  const isInfoGroup = firstData?.subtype === INFO;

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
              <AddGroupItemButton
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
