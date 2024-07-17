"use client";

import styles from "./store.module.css";
import { Icon } from "@iconify/react";

export function StoreCardSkeleton() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.mainCard}>
        <div className={styles.mainCardFirstLine}>
          <div className={styles.mainCardIconContainer}>
            <Icon
              icon="ph:credit-card-light"
              style={{ color: "#3E61AC" }}
              fontSize={30}
            />
          </div>
          <h4 className={styles.mainCardtitle}>Revenue</h4>
        </div>
        <div className={styles.mainCardLastLine}>
          <h3 className={styles.mainCardValue}>Waiting...</h3>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardFirstLine}>
          <div className={styles.iconContainer}>
            <Icon
              icon="ph:hand-arrow-up-thin"
              style={{ color: "#3E61AC" }}
              fontSize={30}
            />
          </div>
          <h4 className={styles.cardtitle}>All Services</h4>
        </div>
        <div className={styles.cardLastLine}>
          <h3 className={styles.cardValue}>Waiting...</h3>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardFirstLine}>
          <div className={styles.iconContainer}>
            <Icon
              icon="ph:hand-arrow-up-thin"
              style={{ color: "#3E61AC" }}
              fontSize={30}
            />
          </div>
          <h4 className={styles.cardtitle}>Services Sold</h4>
        </div>
        <div className={styles.cardLastLine}>
          <h3 className={styles.cardValue}>Waiting...</h3>
        </div>
      </div>
    </div>
  );
}

export function SubHeaderSkeleton() {
  return (
    <div className={styles.subHeader}>
      <div className={styles.locationSection}>
        <Icon
          icon="ph:map-pin-simple-fill"
          style={{ color: "rgba(62, 97, 172, 0.8)" }}
          height={40}
          width={20}
        />
        <p className={styles.locationText}>N/A</p>
      </div>
      <p>|</p>
      <div className={styles.storeURLSection}>
        <Icon
          icon="ph:link"
          style={{ color: "rgba(62, 97, 172)" }}
          height={40}
          width={20}
        />
        <p className={styles.storeURLText}>N/A</p>
      </div>
      <p>|</p>
      <div className={styles.editStoreSection}>
        <div>
          <Icon
            icon="ph:trash"
            height={25}
            width={25}
            className={styles.deleteIcon}
          />
        </div>
      </div>
      <p>|</p>
      <div className={styles.editStoreSection}>
        <Icon
          icon="ph:pencil-simple-fill"
          style={{ color: "rgba(62, 97, 172)" }}
          height={40}
          width={20}
        />
      </div>
      <p>|</p>
      <div className={styles.viewStore}>
        <div className={styles.viewSection}>
          <p>view</p>
        </div>
      </div>
    </div>
  );
}

export function StoreTableDataLoading() {
  return (
    <>
      <div className={styles.tableContainer}>
        <Icon
          icon="ph:spinner-gap-light"
          style={{ color: "rgba(0,0,0,0.8)" }}
          height={75}
          width={75}
          className={styles.spinner}
        />
      </div>
    </>
  );
}
