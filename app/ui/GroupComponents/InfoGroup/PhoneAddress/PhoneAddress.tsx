import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowInfoGroupItem } from "../ShowInfoGroupItem/ShowInfoGroupItem";
import { INFO_ADDRESS, INFO_TELEPHONE } from "@/app/lib/constants";
import styles from "./phoneAddress.module.css";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const PhoneAddress = ({ groupData, params }: Props) => {
  const dataAddress = groupData.find((item) => item.text_type === INFO_ADDRESS);
  const dataTelephone = groupData.find(
    (item) => item.text_type === INFO_TELEPHONE
  );

  return (
    <div className={styles.container}>
      <ShowInfoGroupItem data={dataTelephone} params={params} />
      <ShowInfoGroupItem data={dataAddress} params={params} />
    </div>
  );
};
