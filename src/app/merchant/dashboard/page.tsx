"use client";

import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { Suspense, useState, useEffect } from "react";
import { CardSectionSkeleton } from "../skeleton/dashboard";
import { getCardData, getTableData } from "./action";

export default function Dashboard() {
  const [cardData, setCardData] = useState({
    storeCount: 0,
    serviceCount: 0,
    totalPayment: 0,
  });
  const [tableData, setTableData] = useState([
    {
      item_name: "",
      amount: 0,
      date: "",
      user: {
        names: "",
        email: "",
      },
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getCardData();
      const tdata = await getTableData();
      if (result.success) {
        setCardData(result.data);
      }
      if (tdata.success) {
        setTableData(tdata.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <CardSectionSkeleton />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.navBar}>
        <h2 className={styles.pageTitle}>DASHBOARD</h2>
      </div>
      <Suspense fallback={<CardSectionSkeleton />}>
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
              <h3 className={styles.mainCardValue}>{cardData.storeCount}</h3>
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
              <h3 className={styles.cardValue}>{cardData.serviceCount}</h3>
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
              <h3 className={styles.cardValue}>{cardData.totalPayment}</h3>
            </div>
          </div>
        </div>
      </Suspense>
      <div className={styles.tableContainer}>
        <div className={styles.tableTitleContainer}>
          <h2 className={styles.tableTitle}>Latest Purchase</h2>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div className={styles.tableHeadLeftSection}>
              <h4 className={styles.headDateTitle}>Date</h4>
              <h4 className={styles.headCustomerTitle}>Customer</h4>
            </div>
            <div className={styles.tableHeadRightSection}>
              <h4 className={styles.headItemTitle}>Item</h4>
              <h4 className={styles.headTitle}>Amount</h4>
            </div>
          </div>
          <div className={styles.tableBody}>
            {tableData.map((row, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.dataLeftSection}>
                  <p className={styles.tableDataCell}>
                    {row.date.substring(0, 10)}
                  </p>
                  <p className={styles.tableCustomerCell}>{row.user.names}</p>
                </div>
                <div className={styles.dataRightSection}>
                  <p className={styles.tableItemCell}>{row.item_name}</p>
                  <p className={styles.tableCell}>{row.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
