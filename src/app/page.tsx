"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMerchantData } from "./action";
import clsx from "clsx";
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
    console.log(accountType);
  };
  return (
    <main className={styles.main}>
      <Link href="/sign-up">Register Here</Link>
      <div className={styles.pagecontainer}>
        {accountType === "owner" && (
          <button onClick={handleClick}>Go to dashboard</button>
        )}
      </div>
    </main>
  );
}
