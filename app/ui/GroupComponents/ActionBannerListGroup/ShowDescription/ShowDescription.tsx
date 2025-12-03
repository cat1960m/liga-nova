
import styles from "./showDescription.module.css";
import cn from "clsx";

export type Props = {
  isEdit?: boolean;
  description: string;
  color: string;
};

export const ShowDescription = ({ isEdit = false, description, color }: Props) => {
  return (
      <div className={cn(styles.group, { [styles.edit]: isEdit })}>
        <div className={styles.description_container}>
          <div className={styles.line} style={{ borderColor: color }} />
          <div style={{ color }}>
            <div
              dangerouslySetInnerHTML={{
                __html: description ?? "N/A",
              }}
            />
          </div>
        </div>
      </div>
  );
};
