import styles from "./showTitle.module.css";
import cn from "clsx";

export const ShowTitle = ({
  isEdit = false,
  color,
  title,
}: {
  isEdit?: boolean;
  title: string;
  color: string;
}) => {
  return (
    <div className={cn(styles.group, { [styles.edit]: isEdit })}>
      <div className={styles.title} style={{ color }}>
        {title ?? "N/A"}
      </div>
    </div>
  );
};
