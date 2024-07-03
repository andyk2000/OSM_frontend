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
  filterData,
  redirectToLogin,
} from "./action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { format } from "date-fns";
import { StoreInfo, StoreCard } from "@/app/types/store.type";

interface Config {
  url: string;
}

const config: Config = {
  url: process.env.APP_URL || "http://localhost:3000",
};

export default function Store() {
  const [stores, setStores] = useState<StoreInfo[]>([
    {
      id: 0,
      name: "",
      address: "",
      description: "",
      storeUrl: "",
      userId: 0,
    },
  ]);
  const [activeStore, setActiveStore] = useState<StoreInfo | null>(null);
  const [cardData, setCardData] = useState<StoreCard>({
    revenue: 0,
    services: 0,
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
      id: 0,
      item_name: "",
      amount: 0,
      userId: 0,
      date: "",
      user: {
        names: "",
        email: "",
      },
    },
  ]);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [filterOn, setFilterOn] = useState(false);
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const availableStores = await getStores();
        setStores(availableStores.data || []);
        if (availableStores.data && availableStores.data.length > 0) {
          setActiveStore(availableStores.data[0]);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchCardData = async () => {
      if (activeStore) {
        try {
          const data = await getCardData(activeStore.id);
          const tableData = await getPrimaryTableData(activeStore.id);
          const stats = await getStats(activeStore.id);
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

  useEffect(() => {
    if (!stores) {
      localStorage.removeItem("token");
      redirectToLogin();
    }
  }, [activeStore, stores, tableRecords]);

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStoreId = parseInt(event.target.value, 10);
    const selectedStore =
      stores.find((store) => store.id === selectedStoreId) || null;
    setActiveStore(selectedStore);
  };

  const [activeCategory, setActiveCategory] = useState("customer");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCategoryChange = (e: { target: { value: any } }) => {
    setActiveCategory(e.target.value);
  };

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleChange = async (e: { target: { value: string } }) => {
    const newValue = e.target.value;
    if (newValue === "" && activeStore) {
      const tableData = await getPrimaryTableData(activeStore.id);
      setTableRecords(tableData.data);
      setSearch(newValue);
    } else {
      setSearch(newValue);

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(async () => {
        if (activeStore) {
          const s_result = await searchData(
            activeStore.id,
            newValue,
            activeCategory,
          );
          setTableRecords(s_result.data);
        }
      }, 600);

      setDebounceTimeout(timeout);
    }
  };

  const handleFilterVisibility = () => {
    setFilterOn(!filterOn);
  };

  const submitFilter = async () => {
    if (!activeStore) {
      console.error("Active store or token is missing");
      return;
    }

    try {
      let tableData;
      if (startDate && endDate) {
        const start = format(startDate, "yyyy-MM-dd");
        const end = format(endDate, "yyyy-MM-dd");
        tableData = await filterData(activeStore.id, start, end);
      } else if (!startDate && endDate) {
        const end = format(endDate, "yyyy-MM-dd");
        tableData = await filterData(activeStore.id, undefined, end);
      } else if (startDate && !endDate) {
        const start = format(startDate, "yyyy-MM-dd");
        tableData = await filterData(activeStore.id, start);
      } else {
        console.warn("Neither startDate nor endDate is provided");
        return;
      }

      setTableRecords(tableData.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
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
          <button className={styles.newStoreButton}>
            <Icon
              icon="ph:plus"
              style={{ color: "white" }}
              width={20}
              height={20}
            />
            New Store
          </button>
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
            <h3 className={styles.cardValue}>{cardData.services}</h3>
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
          <div className={styles.filter} onClick={handleFilterVisibility}>
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
      <div
        className={clsx(styles.fitlerContainer, {
          [styles.fitlerContainerActive]: filterOn,
        })}
      >
        <div className={styles.filterField}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            className={styles.datePicker}
            isClearable
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            className={styles.endDatePicker}
            isClearable
            placeholderText="End Date"
          />
        </div>
        <div className={styles.filterButtonSection}>
          <button className={styles.filterButton} onClick={submitFilter}>
            <p>Apply Filter</p>
            <Icon
              icon="ph:funnel"
              style={{ color: "white" }}
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
      <div className={styles.filterContainer}></div>
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
                      {record.user.names}
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
