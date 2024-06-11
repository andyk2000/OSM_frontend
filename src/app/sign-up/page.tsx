"use client";

import { useState } from "react";
import clsx from "clsx";
import styles from "./page.module.css";
// import { Newsreader } from "@next/font/google";
import axios from "axios";

// const newsreader = Newsreader({
//   weight: "700",
//   subsets: ["latin"],
// });

interface User {
  names: string;
  email: string;
  password: string;
  role: string;
}

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "localhost",
};

const createPost = async (postData: User) => {
  console.log(postData);
  try {
    const response = await axios.post(config.backend, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating post:", error);
    // throw error;
    return { success: false, message: "something went wrong" };
  }
};

export default function SignUp() {
  const [user, setUser] = useState<User>({
    names: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = async () => {
    if (user.password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await createPost(user);
      // setMessage(data);
      if (res.success && res.data) {
        setMessage("saved successful");
        return;
      }

      if (!res.success && res.message) {
        setMessage(res.message);
      }
    } catch (error) {
      setMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <h1
          // className={clsx(newsreader.className)}
          style={{ fontSize: "2.1rem", fontWeight: "bolder", color: "white" }}
        >
          Come, Join Us
        </h1>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            More than 10,000 stores, with hundreds of articles are waiting for
            you. Enjoy our 50% promo coupon upon subscription.
          </p>
          <p className={styles.text}>
            Are you a merchant and wish to expand your business?
            <br />
            Join us, and sell your product to hundreds of thousands of customers
            from all around the world.
          </p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <h1
          // className={clsx(newsreader.className)}
          style={{
            fontSize: "2.1rem",
            fontWeight: "bolder",
            color: "#3E61AC",
            paddingBottom: "2rem",
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
          }}
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
            You already have an account? Click <a href="#">here</a>
          </h4>
          <button className={styles.signUpButton} onClick={handleSubmit}>
            Sign Up
          </button>
          {message && <p className={styles.message}>{message}</p>}{" "}
          {/* Display feedback message */}
        </div>
      </div>
    </main>
  );
}
