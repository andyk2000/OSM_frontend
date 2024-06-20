"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import {
  getStores,
  getCardData,
  getPrimaryTableData,
  getStats,
  searchData,
} from "./action";

interface Store {
  id: number;
  name: string;
  address: string;
  description: string;
  storeUrl: string;
}

interface Config {
  url: string;
}

const config: Config = {
  url: process.env.APP_URL || "http://localhost:3000",
};

export default function Store() {
  const [stores, setStores] = useState<Store[]>([]);
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [cardData, setCardData] = useState({
    revenue: 0,
    availableServices: 0,
    serviceSold: 0,
  });

  const [bestUser, setBestUser] = useState([
    {
      id: 0,
      name: "",
      recurrence: 0,
    },
  ]);

  const [bestProduct, setBestProduct] = useState([
    {
      name: "",
      recurrence: 0,
    },
  ]);

  const [tableRecords, setTableRecords] = useState([
    {
      item_name: "",
      amount: 0,
      customer: "",
      date: "",
    },
  ]);

  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchStores = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const availableStores = await getStores(token);
          setStores(availableStores.data);
          if (availableStores.data.length > 0) {
            setActiveStore(availableStores.data[0]);
          }
        } catch (error) {
          console.error("Error fetching stores:", error);
        }
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchCardData = async () => {
      const token = localStorage.getItem("token");
      if (activeStore && token) {
        try {
          const data = await getCardData(activeStore.id, token);
          const tableData = await getPrimaryTableData(activeStore.id, token);
          const stats = await getStats(activeStore.id, token);
          console.log(stats);
          setCardData(data.data);
          setTableRecords(tableData.data);
          setBestUser(stats.data.users);
          setBestProduct(stats.data.services);
        } catch (error) {
          console.error("Error fetching card data:", error);
        }
      }
    };

    fetchCardData();
  }, [activeStore]);

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStoreId = parseInt(event.target.value, 10);
    const selectedStore =
      stores.find((store) => store.id === selectedStoreId) || null;
    setActiveStore(selectedStore);
  };

  const [activeCategory, setActiveCategory] = useState("customer");
  const handleCategoryChange = (e: { target: { value: any } }) => {
    setActiveCategory(e.target.value);
  };

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleChange = async (e: { target: { value: string } }) => {
    const token = localStorage.getItem("token");
    const newValue = e.target.value;
    if (newValue === "" && activeStore && token) {
      const tableData = await getPrimaryTableData(activeStore.id, token);
      setTableRecords(tableData.data);
    } else {
      setSearch(newValue);

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(async () => {
        console.log("Search value:", newValue);
        if (activeStore && token) {
          const s_result = await searchData(
            activeStore.id,
            token,
            newValue,
            activeCategory,
          );
          setSearchResult(s_result.data);
          setTableRecords(s_result.data);
        }
      }, 600);

      setDebounceTimeout(timeout);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeftSection}>
          <select className={styles.storeTitle} onChange={handleStoreChange}>
            {stores.map((store) => (
              <option
                key={store.id}
                className={styles.storeNames}
                value={store.id}
              >
                {store.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.headerRightSection}>
          <div className={styles.newStoreButton}>
            <Icon
              icon="ph:plus"
              style={{ color: "white" }}
              width={20}
              height={20}
            />
            <h4 className={styles.newStoreButtonText}>New Store</h4>
          </div>
        </div>
      </div>
      <div className={styles.subHeader}>
        <div className={styles.locationSection}>
          <Icon
            icon="ph:map-pin-simple-fill"
            style={{ color: "rgba(62, 97, 172, 0.8)" }}
            height={40}
            width={20}
          />
          <p className={styles.locationText}>{activeStore?.address || "N/A"}</p>
        </div>
        <div className={styles.storeURLSection}>
          <Icon
            icon="ph:link"
            style={{ color: "rgba(62, 97, 172)" }}
            height={40}
            width={20}
          />
          <p className={styles.storeURLText}>
            {config.url + "/" + (activeStore?.storeUrl || "N/A")}
          </p>
        </div>
        <div className={styles.editStoreSection}>
          <Icon
            icon="ph:pencil-simple-fill"
            style={{ color: "rgba(62, 97, 172)" }}
            height={40}
            width={20}
          />
        </div>
        <div className={styles.viewStore}>
          <div className={styles.viewSection}>
            <p>view</p>
          </div>
        </div>
      </div>
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
            <h3 className={styles.mainCardValue}>{cardData.revenue}</h3>
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
            <h3 className={styles.cardValue}>{cardData.availableServices}</h3>
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
            <h3 className={styles.cardValue}>{cardData.serviceSold}</h3>
          </div>
        </div>
      </div>
      <div className={styles.serviceNav}>
        <div className={styles.searchFilter}>
          <div className={styles.searchBar}>
            <select className={styles.category} onChange={handleCategoryChange}>
              <option className={styles.storeNames} value="customer">
                Customer
              </option>
              <option className={styles.storeNames} value="item">
                Item
              </option>
            </select>
            <input
              type="text"
              name="search"
              placeholder="Search"
              className={styles.searchInput}
              value={search}
              onChange={handleChange}
            />
            <Icon
              icon="ph:magnifying-glass-bold"
              style={{ color: "rgba(0,0,0,0.4)" }}
              height={20}
              width={20}
            />
          </div>
          <div className={styles.filter}>
            <p>Filter</p>
            <Icon
              icon="ph:sliders-horizontal"
              style={{ color: "rgba(0,0,0,0.4)" }}
              height={30}
              width={30}
            />
          </div>
        </div>
        <button className={styles.newService}>
          <Icon
            icon="ph:plus-bold"
            style={{ color: "white" }}
            height={20}
            width={20}
          />
          <p>New Service</p>
        </button>
      </div>
      <div className={styles.filter}></div>
      <div className={styles.tableSection}>
        <div className={styles.primaryTable}>
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
              {tableRecords.map((record, index) => (
                <div key={index} className={styles.tableRow}>
                  <div className={styles.dataLeftSection}>
                    <p className={styles.tableDateCell}>
                      {record.date.substring(0, 10)}
                    </p>
                    <p className={styles.tableCustomerCell}>
                      {record.customer}
                    </p>
                  </div>
                  <div className={styles.dataRightSection}>
                    <p className={styles.tableItemCell}>{record.item_name}</p>
                    <p className={styles.tableCell}>{record.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.sideTables}>
          <div className={styles.table}>
            <div className={styles.sideTableHead}>
              <p className={styles.tableTitle}>Popular Services</p>
              <Icon
                icon="ph:caret-down-bold"
                style={{ color: "rgb(62, 97, 172)" }}
                height={20}
                width={20}
              />
            </div>
            {bestProduct.map((service, index) => (
              <div key={index} className={styles.sideTableRow}>
                <p className={styles.rowName}>{service.name}</p>
                <p className={styles.rowValue}>{service.recurrence}</p>
              </div>
            ))}
          </div>
          <div className={styles.table}>
            <div className={styles.sideTableHead}>
              <p className={styles.tableTitle}>Best Customer</p>
              <Icon
                icon="ph:caret-down-bold"
                style={{ color: "rgb(62, 97, 172)" }}
                height={20}
                width={20}
              />
            </div>
            {bestUser.map((customer, index) => (
              <div key={index} className={styles.sideTableRow}>
                <p className={styles.rowName}>{customer.name}</p>
                <p className={styles.rowValue}>{customer.recurrence}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
