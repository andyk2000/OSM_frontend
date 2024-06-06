'use client';

import { SetStateAction, useState } from "react";
import clsx from "clsx"; // Import clsx
import styles from "./page.module.css";
import { Newsreader } from '@next/font/google';

const newsreader = Newsreader({
    weight: '700',
    subsets: ['latin'],
});

export default function SignUp() {

    const [names, setNames] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("customer");

    const handleNamesChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNames(e.target.value);
    }

    const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setConfirmPassword(e.target.value);
    }

    const handleRoleChange = (selectedRole: string) => {
        setRole(selectedRole);
    }

    return (
        <main className={styles.main}>
            <div className={styles.leftSection}>
                <h1 className={clsx(newsreader.className)} style={{ fontSize: '2.1rem', fontWeight: 'bolder', color: 'white'}}>Come, Join Us</h1>
                <div className={styles.textContainer}>
                    <p className={styles.text}>More than 10,000 stores, with hundreds of articles are waiting for you. Enjoy our 50% promo coupon upon subscription.</p>
                    <p className={styles.text}>
                        Are you a merchant and wish to expand your business?
                        <br />
                        Join us, and sell your product to hundreds of thousands of customers from all around the world.
                    </p>
                </div>
            </div>
            <div className={styles.rightSection}>
                <h1 className={clsx(newsreader.className)} style={{
                    fontSize: '2.1rem', 
                    fontWeight: 'bolder', 
                    color: '#3E61AC', 
                    paddingBottom: '2rem', 
                    borderBottomStyle: 'solid', 
                    borderBottomWidth: '1px',
                }}>Create Account</h1>
                <div className={styles.fieldsContainer}>
                    <div className={styles.fieldContainer}>
                        <input className={styles.input} placeholder="Names" name="names" value={names} onChange={handleNamesChange} />
                    </div>
                    <div className={styles.fieldContainer}>
                        <input className={styles.input} placeholder="Email" name="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div className={styles.fieldContainer}>
                        <input className={styles.input} type="password" placeholder="Password" name="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className={styles.fieldContainer}>
                        <input className={styles.input} type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </div>
                    <h4 className={styles.categoryTitle}>Choose a category</h4>
                    <div className={styles.category}>
                        <div className={clsx(styles.categoryContainer, { [styles.categoryContainerActive]: role === 'customer' })} onClick={() => handleRoleChange('customer')}>
                            Customer
                        </div>
                        <div className={clsx(styles.categoryContainer, { [styles.categoryContainerActive]: role === 'owner' })} onClick={() => handleRoleChange('owner')}>
                            Merchant
                        </div>
                    </div>
                    <h4 className={styles.categoryTitle}>You already have an account? Click <a href="#">here</a></h4>
                    <button className={styles.signUpButton}>Sign Up</button>
                </div>
            </div>
        </main>
    );
}
