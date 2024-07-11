"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import clsx from "clsx";
import { NewStore } from "@/app/types/store.type";
import { createStore, navigateStorePage } from "./action";
import Swal from "sweetalert2";

export default function New() {
  const store = {
    name: "",
    address: "",
    description: "",
    email: "",
    phone: "",
    logo: "",
  };

  const [preview, setPreview] = useState<string>("");
  const [logoFile, setLogoFile] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("* name is required"),
    phone: Yup.string().required("* contact of your store are required"),
    address: Yup.string().required("* the address is required"),
    email: Yup.string()
      .email("* Invalid email address")
      .required("* email is required"),
    description: Yup.string().required(
      "* the description of the store is needed",
    ),
  });

  const handleImageChange = (event: {
    target?: { dispatchEvent: (arg0: Event) => void };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentTarget?: any;
  }) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFile(reader.result as string);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
      setLogoFile("");
    }
  };

  const submitStore = async (values: NewStore) => {
    const updatedStore = {
      ...values,
      logo: logoFile,
    };
    try {
      const createdStore = await createStore(updatedStore);
      console.log(createdStore.success);
      if (createdStore.success === true) {
        successCreation();
      } else {
        failedCreation();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const successCreation = () => {
    Swal.fire({
      title: "Good job!",
      text: "Store Created successfuly",
      icon: "success",
      confirmButtonColor: "#3e61ac",
      confirmButtonText: "Proceed!",
    }).then(() => {
      navigateStorePage();
    });
  };

  const failedCreation = () => {
    Swal.fire({
      icon: "error",
      title: "Signup failed",
      text: "try again and make sure all the fields are field properly",
    });
  };

  const goBack = () => {
    navigateStorePage();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <button onClick={goBack} className={styles.backButton}>
          <Icon
            icon="ph:arrow-left"
            style={{ color: "rgba(62, 97, 172, 0.7)" }}
            height={30}
            width={30}
          />
        </button>
        <h2 className={styles.pageTitle}>Create New Store</h2>
        <Icon
          icon="ph:dots-three-outline-vertical-fill"
          style={{ color: "rgba(62, 97, 172, 0.7)" }}
          height={25}
          width={25}
        />
      </div>
      <Formik
        initialValues={store}
        validationSchema={validationSchema}
        onSubmit={submitStore}
      >
        {() => (
          <Form className={styles.storeForm}>
            <div className={styles.photoInput}>
              <div
                className={clsx(styles.photoFrameActive, {
                  [styles.photoFrame]: preview.length > 0,
                })}
              >
                <Icon
                  icon="ph:camera"
                  style={{ color: "rgb(62, 97, 172)" }}
                  height={50}
                  width={50}
                />
              </div>
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  className={clsx(styles.storeLogo, {
                    [styles.storeLogoActive]: preview.length > 0,
                  })}
                  width={100}
                  height={100}
                />
              ) : (
                <div className={styles.storeLogoPlaceholder}>No Image</div>
              )}
              <Field
                dot={false}
                id="logo"
                name="logo"
                type="file"
                onChange={(event: {
                  target: { dispatchEvent: (arg0: Event) => void };
                }) => {
                  handleImageChange(event);
                  event.target.dispatchEvent(
                    new Event("input", { bubbles: true }),
                  );
                }}
                className={styles.imageInput}
              />
            </div>
            <div className={styles.dualFieldSpace}>
              <div>
                <div className={styles.fieldLabel}>
                  <Icon
                    icon="ph:storefront-light"
                    style={{ color: "rgb(62, 97, 172)" }}
                    height={25}
                    width={25}
                  />
                  <p>
                    Store Name<span>*</span>
                  </p>
                </div>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  className={styles.fieldInput}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div>
                <div className={styles.fieldLabel}>
                  <Icon
                    icon="ph:envelope-open-light"
                    style={{ color: "rgb(62, 97, 172)" }}
                    height={25}
                    width={25}
                  />
                  <p>
                    Email<span>*</span>
                  </p>
                </div>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  className={styles.fieldInput}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.dualFieldSpace}>
              <div>
                <div className={styles.fieldLabel}>
                  <Icon
                    icon="ph:map-pin-simple-fill"
                    style={{ color: "rgb(62, 97, 172)" }}
                    height={25}
                    width={25}
                  />
                  <p>
                    Address<span>*</span>
                  </p>
                </div>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="address"
                  className={styles.fieldInput}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div>
                <div className={styles.fieldLabel}>
                  <Icon
                    icon="ph:phone-light"
                    style={{ color: "rgb(62, 97, 172)" }}
                    height={25}
                    width={25}
                  />
                  <p>
                    Phone Number<span>*</span>
                  </p>
                </div>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="0780000000"
                  className={styles.fieldInput}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Store Description</p>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="5"
                className={styles.textarea}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.buttonsField}>
              <button type="submit" className={styles.publishButton}>
                Publish
              </button>
              <button type="button" className={styles.saveButton}>
                Save
              </button>
              <button type="button" className={styles.saveButton}>
                Save as Draft
              </button>
              <button type="button" className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
