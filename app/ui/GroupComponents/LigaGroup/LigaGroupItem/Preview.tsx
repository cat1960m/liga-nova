import { ICON_SIZE, LIGA_SERVICE } from "@/app/lib/constants";
import { PreviewParams } from "@/app/lib/definitions";
import styles from "./ligaGroupItem.module.css";
import Image from "next/image";

export const Preview = (props: PreviewParams) => {
    const {value, text, data} = props;
    return (
      <>
        {data.text_type === LIGA_SERVICE ? (
          <div className={styles.service}>
            <div className={styles.icon_text}>
              {value ? (
                <Image
                  src={value ?? ""}
                  alt="icon"
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
              ) : null}
              <div className={styles.text_service}>
                {text ?? "N/A"}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );

}