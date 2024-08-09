// src/components/RequiredLabel.js
import React from 'react';
import styles from '../styles/RequiredLabel.module.css'; // Import CSS module

const RequiredLabel = ({ label }) => (
  <label className={styles.label}>
    {label} <span className={styles.asterisk}>*</span>
  </label>
);

export default RequiredLabel;
