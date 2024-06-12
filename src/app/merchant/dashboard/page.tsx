import styles from "./page.module.css";
import { Icon } from "@iconify/react";

export default function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.navBar}>
        <h2 className={styles.pageTitle}>DASHBOARD</h2>
      </div>
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
            <h4 className={styles.mainCardtitle}>Revenue</h4>
          </div>
          <div className={styles.mainCardLastLine}>
            <h3 className={styles.mainCardValue}>3</h3>
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
            <h3 className={styles.cardValue}>43</h3>
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
            <h3 className={styles.cardValue}>342,000</h3>
          </div>
        </div>
      </div>
      <div className={styles.tableConatiner}>
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
            <div className={styles.tabdeRow}>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableDataCell}>10, june</p>
                <p className={styles.tableCustomerCell}>Tony Stark</p>
              </div>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableItemCell}>Vans</p>
                <p className={styles.tableCell}>12,000</p>
              </div>
            </div>
            <div className={styles.tabdeRow}>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableDataCell}>10, june</p>
                <p className={styles.tableCustomerCell}>Kelly</p>
              </div>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableItemCell}>Peter Parker</p>
                <p className={styles.tableCell}>27,000</p>
              </div>
            </div>
            <div className={styles.tabdeRow}>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableDataCell}>8, june</p>
                <p className={styles.tableCustomerCell}>Wanda Maximoff</p>
              </div>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableItemCell}>all star</p>
                <p className={styles.tableCell}>10,000</p>
              </div>
            </div>
            <div className={styles.tabdeRow}>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableDataCell}>7, june</p>
                <p className={styles.tableCustomerCell}>Steve Rogers</p>
              </div>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableItemCell}>air force</p>
                <p className={styles.tableCell}>19,000</p>
              </div>
            </div>
            <div className={styles.tabdeRow}>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableDataCell}>10, june</p>
                <p className={styles.tableCustomerCell}>Kelly</p>
              </div>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableItemCell}>Peter Parker</p>
                <p className={styles.tableCell}>27,000</p>
              </div>
            </div>
            <div className={styles.tabdeRow}>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableDataCell}>8, june</p>
                <p className={styles.tableCustomerCell}>Wanda Maximoff</p>
              </div>
              <div className={styles.dataLeftSection}>
                <p className={styles.tableItemCell}>all star</p>
                <p className={styles.tableCell}>10,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
