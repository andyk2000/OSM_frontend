"use client";

import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Suspense, useState, useEffect } from "react";
import { CardSectionSkeleton, TableLoading } from "../skeleton/dashboard";
import { getCardData, getTableData } from "./action";
import { paidService } from "@/app/types/service.type";
import { PaymentCard } from "@/app/types/payment.type";
import Image from "next/image";

interface CardSectionProps {
  cardData: PaymentCard | undefined;
}

interface TableSectionProps {
  tableData: paidService[];
  dataAvailable: boolean;
}

function CardSection({ cardData }: CardSectionProps) {
  return (
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
          {cardData && (
            <h3 className={styles.mainCardValue}>{cardData.storeCount}</h3>
          )}
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
          {cardData && (
            <h3 className={styles.mainCardValue}>{cardData.serviceCount}</h3>
          )}
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
          {cardData && (
            <h3 className={styles.mainCardValue}>
              {cardData.totalPayment ? cardData.totalPayment : 0}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

function TableSection({ tableData, dataAvailable }: TableSectionProps) {
  return (
    <>
      <div
        className={clsx(styles.tableDataNotFoundActive, {
          [styles.tableDataNotFound]: dataAvailable,
        })}
      >
        <Image
          src="/image/empty.png"
          width={250}
          height={250}
          className={styles.logoImage}
          alt="urubuto logo"
        />
        <h3>
          <span>There are no transactions yet</span>
          <br /> Once customers start buying your services, the transactions
          will be shown here.
        </h3>
      </div>
      <div
        className={clsx(styles.tableActive, {
          [styles.table]: !dataAvailable,
        })}
      >
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
          {tableData.map((row: paidService, index: number) => (
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
    </>
  );
}

export default function Dashboard() {
  const [cardData, setCardData] = useState<PaymentCard>();
  const [tableData, setTableData] = useState<paidService[]>([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDataAvailable(tableData.length > 0);
  }, [tableData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getCardData();
      const tdata = await getTableData();
      if (result.success) {
        setCardData(result.data);
      }
      if (tdata.success && tdata.data) {
        setTableData(tdata.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.navBar}>
        <h2 className={styles.pageTitle}>DASHBOARD</h2>
      </div>
      <Suspense fallback={<CardSectionSkeleton />}>
        {loading ? (
          <CardSectionSkeleton />
        ) : (
          <CardSection cardData={cardData} />
        )}
      </Suspense>
      <div className={styles.tableContainer}>
        <div className={styles.tableTitleContainer}>
          <h2 className={styles.tableTitle}>Latest Purchase</h2>
        </div>
        <Suspense fallback={<TableLoading />}>
          {loading ? (
            <TableLoading />
          ) : (
            <TableSection tableData={tableData} dataAvailable={dataAvailable} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
