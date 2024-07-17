import { Field } from "formik";
import styles from "./editDashboard.module.css";
import { Icon } from "@iconify/react";

export function EditPhotoSkeleton() {
  return (
    <div>
      <div>
        <div className={styles.photoInput}>
          <div className={styles.photoFrameActive}>
            <Icon
              icon="ph:camera"
              style={{ color: "rgb(62, 97, 172)" }}
              height={50}
              width={50}
            />
          </div>
        </div>
        <div className={styles.linkSpace}>
          <p>Store Url:</p>
          <Icon
            icon="ph:link"
            style={{ color: "rgba(62, 97, 172)" }}
            height={40}
            width={20}
          />
          <p>N/A</p>
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
        </div>
        <div className={styles.buttonsField}>
          <button type="submit" className={styles.publishButton}>
            Publish
          </button>
          <button type="button" className={styles.saveButton}>
            Revert Changes
          </button>
          <button type="button" className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
