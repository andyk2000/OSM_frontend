"use client";

import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";

const pagePaths = {
  dashboard: "/merchant/dashboard",
  store: "/merchant/store",
  service: "/merchant/service",
  login: "/login",
};

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.NEXT_PUBLIC_BACKEND_LINK || "http://localhost:3001",
};

const getMerchantData = async () => {
  const postLink = `${config.backend}/user/getUserData/merchant`;
  try {
    const response = await axios.get(postLink, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");

  useEffect(() => {
    const fetchMerchantData = async () => {
      const result = await getMerchantData();
      if (result.success && result.data) {
        setEmail(result.data.email);
        setNames(result.data.names);
        console.log(result.data);
      }
    };

    fetchMerchantData();
    setCurrentPath(pathname);
  }, [pathname]);

  const handleClick = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sideBar}>
        <Icon
          icon="ph:user-circle-thin"
          style={{ color: "#3E61AC" }}
          fontSize={90}
        />
        <p className={styles.userNames}>{names}</p>
        <p className={styles.email}>{email}</p>
        <div className={styles.tabsContainer}>
          <div className={styles.upperTabs}>
            <Link
              className={clsx(styles.tabContainer, {
                [styles.tabContainerActive]:
                  currentPath === pagePaths.dashboard,
              })}
              href={pagePaths.dashboard}
              onClick={() => handleClick(pagePaths.dashboard)}
            >
              <Icon
                icon="ph:layout-light"
                style={{
                  color:
                    currentPath === pagePaths.dashboard ? "#3E61AC" : "black",
                }}
                width={25}
                height={25}
                className={styles.tabIcon}
              />
              <h4 className={styles.tabLabel}>Home</h4>
            </Link>
            <Link
              className={clsx(styles.tabContainer, {
                [styles.tabContainerActive]: currentPath === pagePaths.store,
              })}
              href={pagePaths.store}
              onClick={() => handleClick(pagePaths.store)}
            >
              <Icon
                icon="ph:storefront-light"
                style={{
                  color: currentPath === pagePaths.store ? "#3E61AC" : "black",
                }}
                width={25}
                height={25}
              />
              <h4 className={styles.tabLabel}>Store</h4>
            </Link>
            <Link
              className={clsx(styles.tabContainer, {
                [styles.tabContainerActive]: currentPath === pagePaths.service,
              })}
              href={pagePaths.service}
              onClick={() => handleClick(pagePaths.service)}
            >
              <Icon
                icon="ph:hand-arrow-up-thin"
                style={{
                  color:
                    currentPath === pagePaths.service ? "#3E61AC" : "black",
                }}
                width={25}
                height={25}
              />
              <h4 className={styles.tabLabel}>Service</h4>
            </Link>
          </div>
          <Link
            className={clsx(styles.tabContainer, {
              [styles.tabContainerActive]: currentPath === pagePaths.login,
            })}
            href={pagePaths.login}
            onClick={() => handleClick(pagePaths.login)}
          >
            <Icon
              icon="ph:sign-out-light"
              style={{
                color: currentPath === pagePaths.login ? "#3E61AC" : "black",
              }}
              width={25}
              height={25}
            />
            <h4 className={styles.tabLabel}>Logout</h4>
          </Link>
        </div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
