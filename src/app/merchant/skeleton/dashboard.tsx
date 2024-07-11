"use client";

import styles from "./card.page.module.css";
import { Icon } from "@iconify/react";

export function CardSectionSkeleton() {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.mainCard}>
          <div className={styles.mainCardFirstLine}>
            <div className={styles.mainCardIconContainer}>
              <Icon
                icon="ph:storefront-light"
                style={{ color: "#3E61AC" }}
                fontSize={30}
              />
            </div>
            <h4 className={styles.mainCardtitle}>Store</h4>
          </div>
          <div className={styles.mainCardLastLine}>
            <h3 className={styles.mainCardValue}>waiting...</h3>
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
            <h4 className={styles.cardtitle}>Service</h4>
          </div>
          <div className={styles.cardLastLine}>
            <h3 className={styles.cardValue}>waiting...</h3>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardFirstLine}>
            <div className={styles.iconContainer}>
              <Icon
                icon="ph:credit-card-light"
                style={{ color: "#3E61AC" }}
                fontSize={30}
              />
            </div>
            <h4 className={styles.cardtitle}>Revenue</h4>
          </div>
          <div className={styles.cardLastLine}>
            <h3 className={styles.cardValue}>waiting...</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export function TableLoading() {
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
