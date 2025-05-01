import { LinkBody } from "../LinkBody/LInkBody";
import { LangSelector } from "../LangSelector";
import { PageData } from "@/app/lib/definitions";
import { LogInOut } from "../LogInOut/LogInOut";
import { Logo } from "../Logo/Logo";

import styles from "./mainMenu.module.css";
import { PhoneButton } from "../PhoneButton/PhoneButton";
import { WORK_SCHEDULE1, WORK_SCHEDULE2 } from "@/app/lib/constants";

export type Props = {
  mainPages: PageData[];
  isAuthenticated: boolean;
  lang: string;
};

export const MainMenu = ({ mainPages, isAuthenticated, lang }: Props) => {
  return (
    <div className={styles.container}>
      <Logo />

      <div className={styles.pages}>
        {mainPages?.map((page) => {
          return (
            <LinkBody
              pageName={page.name}
              isMain
              pageTitle={page.text_content}
              lang={lang}
              key={page.id}
            />
          );
        })}
      </div>

      <div className={styles.info}>
        <div className={styles.schedule}>
          <div>{WORK_SCHEDULE1}</div>

          <div>{WORK_SCHEDULE2}</div>
        </div>
        
        <PhoneButton />
      </div>

      <div className={styles.right}>
        <LangSelector />

        <LogInOut isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};
