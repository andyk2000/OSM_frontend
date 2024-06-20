"use client";

import clsx from "clsx";
import styles from "./page.module.css";
import { Newsreader } from "@next/font/google";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { handleSubmit, pageRedirect } from "./action";

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
  const [message, setMessage] = useState("");

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

  const submitAnswer = async () => {
    const answer = await handleSubmit(user);
    if (typeof answer?.message === "string") {
      setMessage(answer.message);
      if (typeof answer.token === "string") {
        localStorage.setItem("token", answer.token);
        pageRedirect();
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <div className={styles.leftContainer}>
          <h1
            className={clsx(newsreader.className)}
            style={{
              fontSize: "2.1rem",
              fontWeight: "bolder",
              color: "#3E61AC",
              borderBottomStyle: "solid",
              borderBottomColor: "#3E61AC",
              borderBottomWidth: "1px",
              paddingBottom: "1.5rem",
              textAlign: "center",
            }}
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
          <button className={styles.loginButton} onClick={submitAnswer}>
            Login
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rightContainer}>
          <h1
            className={clsx(newsreader.className)}
            style={{
              fontSize: "2.1rem",
              fontWeight: "bolder",
              color: "#FFFFFF",
              borderBottomStyle: "solid",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: "1px",
              paddingBottom: "1.5rem",
            }}
          >
            Welcome Back
          </h1>
          <p>
            More than 10, 000 stores, with hundreds
            <br />
            of articles are waiting for you.
            <br /> New:
            <br />
            50% coupon on every store, for user with more
            <br /> than a year of using our services.
          </p>
          <p>
            For the merchant,
            <br /> There a new feature that allows you to reach your
            <br />
            customer even faster,
            <br />
            with our new adds feature.
          </p>
        </div>
      </div>
    </main>
  );
}
