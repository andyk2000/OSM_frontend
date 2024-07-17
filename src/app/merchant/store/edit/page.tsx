"use client";

import { useEffect, useState, Suspense, ChangeEvent } from "react";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import clsx from "clsx";
import { NewStore } from "@/app/types/store.type";
import {
  deleteStore,
  getStores,
  navigateStorePage,
  updateStore,
} from "./action";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { EditPhotoSkeleton } from "../../skeleton/editDashboard";

const UpdateForm = () => {
  const [store, setStore] = useState<NewStore>({
    name: "",
    address: "",
    description: "",
    email: "",
    phone: "",
    logo: "",
  });

  const [originalStore, setOriginalStore] = useState<NewStore>({
    name: "",
    address: "",
    description: "",
    email: "",
    phone: "",
    logo: "",
  });

  const [preview, setPreview] = useState<string>("");
  const [logoFile, setLogoFile] = useState<string>("");
  const [storeLink, setStoreLink] = useState<string>("");
  const [, setStoreName] = useState<string>("");
  const [imageChange, setImageChange] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("* name is required"),
    phone: Yup.string().required("* contact of your store is required"),
    address: Yup.string().required("* the address is required"),
    email: Yup.string()
      .email("* Invalid email address")
      .required("* email is required"),
    description: Yup.string().required(
      "* the description of the store is needed",
    ),
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoFile(result);
        setPreview(result);
        setImageChange(true);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
      setLogoFile("");
    }
  };

  const submitStore = async (values: NewStore) => {
    setLoading(true);
    const updatedStoreData = {
      ...values,
      logo: logoFile,
    };
    try {
      const id = parseInt(searchParams.get("id") || "");
      const updatedStore = await updateStore(id, updatedStoreData, imageChange);
      if (updatedStore.success) {
        successUpdate();
      } else {
        setLoading(false);
        failedUpdate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const id = parseInt(searchParams.get("id") || "");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(62, 97, 172)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const storeDeleted = await deleteStore(id);
          if (storeDeleted.success) {
            successDelete();
          } else {
            setLoading(false);
            failedDelete();
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
    setLoading(false);
  };

  const successDelete = () => {
    Swal.fire({
      title: "Delete Successful",
      text: "Store has been deleted successfully",
      icon: "success",
      confirmButtonColor: "#3e61ac",
      confirmButtonText: "Proceed!",
    }).then(() => {
      navigateStorePage();
    });
  };

  const failedDelete = () => {
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "Something went wrong with the system, the store couldn't be deleted",
    });
  };

  const successUpdate = () => {
    Swal.fire({
      title: "Good job!",
      text: "Store Updated Successfully",
      icon: "success",
      confirmButtonColor: "#3e61ac",
      confirmButtonText: "Proceed!",
    }).then(() => {
      navigateStorePage();
    });
  };

  const failedUpdate = () => {
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: "Try again and make sure all the fields are filled properly",
    });
  };

  const searchParams = useSearchParams();

  const handleRevert = () => {
    setStore(originalStore);
  };

  useEffect(() => {
    const initialData = async () => {
      const idString = searchParams.get("id");
      if (idString) {
        const id = parseInt(idString);
        const results = await getStores(id);
        if (results.data && results.success) {
          setStore({
            name: results.data.name,
            email: results.data.email,
            phone: results.data.phone,
            description: results.data.description,
            address: results.data.address,
            logo: "",
          });
          setOriginalStore({
            name: results.data.name,
            email: results.data.email,
            phone: results.data.phone,
            description: results.data.description,
            address: results.data.address,
            logo: "",
          });
          setStoreLink(results.data.storeUrl || "");
          setStoreName(results.data.name || "");
          setPreview(results.data.logo || "");
        }
      } else {
        console.error("There was a problem retrieving the data.");
      }
    };
    initialData();
  }, [searchParams]);

  return (
    <Formik
      initialValues={store}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={submitStore}
      onReset={handleRevert}
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
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleImageChange(event);
                event.target.dispatchEvent(
                  new Event("input", { bubbles: true }),
                );
              }}
              className={styles.imageInput}
            />
          </div>
          <div className={styles.linkSpace}>
            <p>Store Url:</p>
            <Icon
              icon="ph:link"
              style={{ color: "rgba(62, 97, 172)" }}
              height={40}
              width={20}
            />
            <Link href={storeLink} className={styles.storeURLText}>
              {storeLink}
            </Link>
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
                placeholder="Store Name"
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
            <button
              type="submit"
              className={styles.publishButton}
              disabled={loading}
            >
              <text
                className={clsx(styles.publishTextActive, {
                  [styles.publishText]: loading === true,
                })}
              >
                Publish
              </text>
              <Icon
                icon="ph:spinner-gap"
                height={25}
                width={25}
                className={clsx(styles.spinnerActive, {
                  [styles.spinner]: loading === false,
                })}
              />
            </button>
            <button type="reset" className={styles.saveButton}>
              Revert Changes
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
              disabled={loading}
            >
              <text
                className={clsx(styles.publishTextActive, {
                  [styles.publishText]: loading === true,
                })}
              >
                Delete
              </text>
              <Icon
                icon="ph:spinner-gap"
                height={25}
                width={25}
                className={clsx(styles.spinnerActive, {
                  [styles.spinner]: loading === false,
                })}
              />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Edit = () => {
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
        <h2 className={styles.pageTitle}></h2>
        <Icon
          icon="ph:dots-three-outline-vertical-fill"
          style={{ color: "rgba(62, 97, 172, 0.7)" }}
          height={25}
          width={25}
        />
      </div>
      <Suspense fallback={<EditPhotoSkeleton />}>
        <UpdateForm />
      </Suspense>
    </div>
  );
};

export default Edit;
