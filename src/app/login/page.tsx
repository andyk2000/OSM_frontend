"use client";

import clsx from "clsx";
import styles from "./page.module.css";
import { Newsreader } from "next/font/google";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { pageRedirect } from "./action";

const newsreader = Newsreader({
  weight: "700",
  subsets: ["latin"],
});

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const user = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("* Invalid email address")
      .required("* Email is required"),
    password: Yup.string().required("* Password is required"),
  });

  const [icon, setIcon] = useState("ph:eye-slash");
  const [passwordType, setPasswordType] = useState("password");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const submitAnswer = async (values: User) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: values.email,
      password: values.password,
      // callbackUrl: "/merchant/dashboard",
    });
    if (!result?.ok) {
      Swal.fire({
        title: "Login failed",
        text: "check your email and password again.",
        icon: "error",
      });
    } else {
      pageRedirect();
    }
    setLoading(false);
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
          <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={submitAnswer}
          >
            <Form method="post" className={styles.formContainer}>
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
                <div className={styles.passwordField}>
                  <Field
                    type={passwordType}
                    id="password"
                    name="password"
                    placeholder="password"
                    className={styles.passwordInput}
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.signUpredirect}>
                You don’t have an account? Click{" "}
                <Link href="/sign-up" className={styles.signUpLink}>
                  Here
                </Link>
              </div>
              <button
                className={styles.loginButtonActive}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Icon
                    icon="ph:spinner-gap"
                    style={{ color: "white" }}
                    height={25}
                    width={25}
                    className={styles.spinner}
                  />
                ) : (
                  "Login"
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rightContainer}>
          <h1
            className={clsx(newsreader.className)}
            style={{
              fontSize: "2.4rem",
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
            More than 10,000 stores, with hundreds of articles are waiting for
            you.
            <br /> New:
            <br />
            50% coupon on every store, for user with more than a year of using
            our services.
          </p>
        </div>
      </div>
    </main>
  );
}
