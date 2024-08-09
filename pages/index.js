// src/pages/index.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/HomePage.module.css'; // Import CSS module

const HomePage = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/event-management">Event Management</Link>
      </nav>
      <div className={styles.content}>
        <h1 className={styles.heading}>Welcome to the Volunteer Management System</h1>
      </div>
    </div>
  );
};

export default HomePage;
