import { PageData } from "@/app/lib/definitions";
import styles from "./mobileMenuOpen.module.css";
import { LinkBody } from "../../LinkBody/LInkBody";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { WORK_SCHEDULE1, WORK_SCHEDULE2 } from "@/app/lib/constants";
import { PhoneButton } from "../../PhoneButton/PhoneButton";

export type Props = {
  basePages: PageData[];
  mainPages: PageData[];
  lang: string;
  onClose: () => void;
};

export const MobileMenuOpen = ({
  basePages,
  mainPages,
  lang,
  onClose,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.schedule}>
          <div>{WORK_SCHEDULE1}</div>
          <div>{WORK_SCHEDULE2}</div>
        </div>
        <XMarkIcon width="32px" onClick={onClose} />
      </div>
      <div className={styles.header1}>
        <PhoneButton />
      </div>
      <div className={styles.body}>
        {mainPages?.map((page) => {
          return (
            <LinkBody
              pageName={page.name}
              lang={lang}
              isMain
              pageTitle={page.text_content}
              key={page.id}
              onClick={onClose}
            />
          );
        })}
        {basePages?.map((page) => {
          return (
            <LinkBody
              pageName={page.name}
              lang={lang}
              pageTitle={page.text_content}
              key={page.id}
              onClick={onClose}
            />
          );
        })}
      </div>
    </div>
  );
};
