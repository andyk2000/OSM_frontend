"use client";
import clsx from "clsx";
import styles from "./page.module.css";
import { Newsreader } from "@next/font/google";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const newsreader = Newsreader({
  weight: "700",
  subsets: ["latin"],
});

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [icon, setIcon] = useState("ph:eye-slash");
  const [passwordType, setPasswordType] = useState("password");
  const [visible, setVisible] = useState(false);

  const changeVisibility = () => {
    setVisible(!visible);
    if (visible) {
      setIcon("ph:eye-slash");
      setPasswordType("password");
    } else {
      setIcon("ph:eye");
      setPasswordType("text");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <h1
          className={clsx(newsreader.className)}
          style={{ fontSize: "2.1rem", fontWeight: "bolder", color: "#3E61AC" }}
        >
          Login!
        </h1>
        <div className={styles.emailField}>
          <input
            className={styles.emailInput}
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className={styles.passwordField}>
          <input
            className={styles.passwordInput}
            type={passwordType}
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <Icon
            icon={icon}
            width={30}
            height={30}
            color="grey"
            className={styles.eyeIcon}
            onClick={changeVisibility}
          />
        </div>
        <div className={styles.signUpredirect}>
          You don’t have an account? Click{" "}
          <Link href="/sign-up" className={styles.signUpLink}>
            Here
          </Link>
        </div>
        <button className={styles.loginButton}>Sign Up</button>
      </div>
      <div className={styles.rightSection}>
        <p> New Section</p>
      </div>
    </main>
  );
}
