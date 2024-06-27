"use client";

import { useState } from "react";
import clsx from "clsx";
import styles from "./page.module.css";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import { handleSubmit, redirectLogin } from "./action";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const newsreader = Newsreader({
  weight: "700",
  subsets: ["latin"],
});

interface User {
  names: string;
  email: string;
  password: string;
  role: string;
}

export default function SignUp() {
  const [user, setUser] = useState<User>({
    names: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleRoleChange = (selectedRole: string) => {
    setUser({ ...user, role: selectedRole });
  };

  const submitAnswer = async () => {
    setLoading(true);
    const answer = await handleSubmit(confirmPassword, user);
    if (typeof answer?.answer === "string") {
      if (answer.created) {
        redirectUser();
      } else {
        createMessage(answer.answer);
      }
    }
    setLoading(false);
  };

  const redirectUser = () => {
    Swal.fire({
      title: "Good job!",
      text: "Signup successful, you are going to be redirected to the login page",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Proceed!",
    }).then(() => {
      redirectLogin();
    });
  };

  const createMessage = (textMessage: string) => {
    Swal.fire({
      icon: "error",
      title: "Signup failed",
      text: textMessage,
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <div>
          <h1 className={clsx(newsreader.className, styles.heading)}>
            Join Us!
          </h1>
          <div className={styles.textContainer}>
            <p className={styles.text}>
              More than 10,000 stores, with hundreds of articles are waiting for
              you. Enjoy our 50% promo coupon upon subscription.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rightSectionContainer}>
          <h1
            className={clsx(
              newsreader.className,
              styles.heading,
              styles.rightHeading,
            )}
          >
            Create Account
          </h1>
          <div className={styles.fieldsContainer}>
            <div className={styles.fieldContainer}>
              <input
                className={styles.input}
                placeholder="Names"
                name="names"
                value={user.names}
                onChange={handleChange}
              />
            </div>
            <div className={styles.fieldContainer}>
              <input
                className={styles.input}
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.fieldContainer}>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.fieldContainer}>
              <input
                className={styles.input}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <h4 className={styles.categoryTitle}>Choose a category</h4>
            <div className={styles.category}>
              <div
                className={clsx(styles.categoryContainer, {
                  [styles.categoryContainerActive]: user.role === "customer",
                })}
                onClick={() => handleRoleChange("customer")}
              >
                Customer
              </div>
              <div
                className={clsx(styles.categoryContainer, {
                  [styles.categoryContainerActive]: user.role === "owner",
                })}
                onClick={() => handleRoleChange("owner")}
              >
                Merchant
              </div>
            </div>
            <h4 className={styles.categoryTitle}>
              Already have an account? Click <Link href="/login">here</Link>
            </h4>
            <button
              className={clsx(styles.signUpButton, {
                [styles.signUpButtonActive]: loading === false,
              })}
              onClick={submitAnswer}
            >
              Sign Up
            </button>
            <button
              className={clsx(styles.signUpButton, {
                [styles.signUpButtonActive]: loading === true,
              })}
            >
              <Icon
                icon="ph:spinner-gap"
                style={{ color: "white" }}
                height={25}
                width={25}
                className={styles.spinner}
              />
            </button>
          </div>
          <div id="modal"></div>
        </div>
      </div>
    </main>
  );
}
