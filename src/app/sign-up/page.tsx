"use client";

import { useState } from "react";
import clsx from "clsx";
import styles from "./page.module.css";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import { handleSubmit, redirectLogin } from "./action";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

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

  const validationSchema = Yup.object({
    names: Yup.string().required("* names are required"),
    email: Yup.string()
      .email("* Invalid email address")
      .required("* email is required"),
    password: Yup.string().required("* password is required"),
    confirmPassword: Yup.string()
      .required("* You have to confirm your password")
      .oneOf([Yup.ref("password")], "* Passwords must match"),
  });
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (selectedRole: string) => {
    setUser({ ...user, role: selectedRole });
  };

  const submitAnswer = async (values: User) => {
    user.names = values.names;
    user.email = values.email;
    user.password = values.password;
    setLoading(true);
    const answer = await handleSubmit(user);
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
      confirmButtonColor: "#3e61ac",
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
          <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={submitAnswer}
          >
            <Form method="post" className={styles.formContainer}>
              <div>
                <Field
                  type="text"
                  id="names"
                  name="names"
                  placeholder="names"
                  className={styles.fieldInput}
                />
                <ErrorMessage
                  name="names"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@youremail.com"
                  className={styles.fieldInput}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className={styles.fieldInput}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="password"
                  className={styles.fieldInput}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.errorMessage}
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
              <h4 className={styles.signInText}>
                Already have an account? Click <Link href="/login">here</Link>
              </h4>
              <button
                className={clsx(styles.signUpButton, {
                  [styles.signUpButtonActive]: loading === false,
                })}
                disabled={loading}
                type="submit"
              >
                Sign Up
              </button>
              <button
                className={clsx(styles.signUpButton, {
                  [styles.signUpButtonActive]: loading === true,
                })}
                disabled={loading}
              >
                <Icon
                  icon="ph:spinner-gap"
                  style={{ color: "white" }}
                  height={25}
                  width={25}
                  className={styles.spinner}
                />
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}
