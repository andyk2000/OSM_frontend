"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getMerchantData, redirectToMerchantDashboard } from "./action";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [accountType, setAccountType] = useState("customer");

  useEffect(() => {
    const fetchMerchantData = async () => {
      const result = await getMerchantData();
      setAccountType(result.data.role);
    };
    fetchMerchantData();
  }, []);

  const handleClick = () => {
    redirectToMerchantDashboard();
  };
  return (
    <main className={styles.main}>
      <div className={styles.imageFrame}>
        <Image
          src="/image/shopping-bag.png"
          alt="Preview"
          className={styles.storeLogo}
          width={80}
          height={80}
        />
      </div>
      <p className={styles.SignIn}>
        You Do not Have an account Register{" "}
        <Link href="/sign-up" className={styles.Link}>
          Here
        </Link>
      </p>
      <div className={styles.buttonSection}>
        {accountType === "owner" && (
          <button onClick={handleClick} className={styles.dashboardBttn}>
            Go to dashboard
          </button>
        )}
      </div>
      <div className={styles.buttonSection}>
        {accountType === "customer" && <p>No stores are available yet</p>}
      </div>
    </main>
  );
}
