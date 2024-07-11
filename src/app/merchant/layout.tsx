"use client";

import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { getMerchantData } from "./action";

const pagePaths = {
  dashboard: "/merchant/dashboard",
  store: "/merchant/store",
  service: "/merchant/service",
  login: "/login",
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
      }
    };

    fetchMerchantData();
    setCurrentPath(pathname);
  }, [pathname]);

  const handleClick = (path: string) => {
    localStorage.removeItem("Authorization");
    setCurrentPath(path);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sideBar}>
        <div className={styles.upperDiv}>
          <Icon
            icon="ph:user-circle-thin"
            style={{ color: "#3E61AC" }}
            fontSize={90}
          />
          <p className={styles.userNames}>{names}</p>
          <p className={styles.email}>{email}</p>
          <Link
            className={clsx(styles.tabContainer, {
              [styles.tabContainerActive]: currentPath === pagePaths.dashboard,
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
                color: currentPath === pagePaths.service ? "#3E61AC" : "black",
              }}
              width={25}
              height={25}
            />
            <h4 className={styles.tabLabel}>Service</h4>
          </Link>
        </div>
        <Link
          className={clsx(styles.logoutTabContainer, {
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
      <div className={styles.children}>{children}</div>
    </div>
  );
}
