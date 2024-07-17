import styles from "./editDashboard.module.css";
import { Icon } from "@iconify/react";

export function EditPhotoSkeleton() {
  return (
    <div className={styles.photoInput}>
      <div className={styles.photoFrameActive}>
        <Icon
          icon="ph:camera"
          style={{ color: "rgb(62, 97, 172)" }}
          height={50}
          width={50}
        />
      </div>
    </div>
  );
}
