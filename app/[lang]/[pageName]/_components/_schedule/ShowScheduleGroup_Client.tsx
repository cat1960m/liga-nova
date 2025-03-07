import { FullData, MainParams } from "@/app/lib/definitions";
import {
  SCHEDULE_ITEM1,
  SCHEDULE_ITEM2,
  SCHEDULE_ITEM3,
  SCHEDULE_ITEM4,
  SCHEDULE_ITEM5,
  SCHEDULE_ITEM6,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowSCheduleGroupItem_Client } from "./ShowScheduleGroupItem_Client";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
};

export const ShowScheduleGroup_Client = ({
  isEdit,
  staticTexts,
  groupData,
}: Props) => {
  const featureId = groupData[0]?.id;

  const item1 = groupData.find((item) => item.text_type === SCHEDULE_ITEM1);
  const item2 = groupData.find((item) => item.text_type === SCHEDULE_ITEM2);
  const item3 = groupData.find((item) => item.text_type === SCHEDULE_ITEM3);
  const item4 = groupData.find((item) => item.text_type === SCHEDULE_ITEM4);
  const item5 = groupData.find((item) => item.text_type === SCHEDULE_ITEM5);
  const item6 = groupData.find((item) => item.text_type === SCHEDULE_ITEM6);

  const style1 = {
    backgroundColor: "#d3d3d3",
    borderRadius: "10px 0 0 10px",
    border: "1px solid blue",
    borderRight: "none",
  };

  const style2 = {
    backgroundColor: "#f8f8f8",
    borderTop: "1px solid blue",
    borderBottom: "1px solid blue",
    borderRight: "1px solid #D3D3D3",
  };

  const style3 = {
    backgroundColor: "#f8f8f8",
    borderRadius: "0 10px 10px 0",
    border: "1px solid blue",
    borderLeft: "none",
    width: "100%",
  };

  if (!featureId) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div style={style1}>
          <ShowSCheduleGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={item1}
          />
        </div>
        <div style={style1}>
          <ShowSCheduleGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={item4}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div style={style2}>
          <ShowSCheduleGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={item2}
          />
        </div>
        <div style={style2}>
          <ShowSCheduleGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={item5}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          flexGrow: 2,
        }}
      >
        <div style={style3}>
          <ShowSCheduleGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={item3}
          />
        </div>
        <div style={style3}>
          <ShowSCheduleGroupItem_Client
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={item6}
          />
        </div>
      </div>
    </div>
  );
};
