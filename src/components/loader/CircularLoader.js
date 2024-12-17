import React from "react";
import styles from "../loader/circularLoader.module.css";

const CircularLoader = ({ loading, size = "50px", color = "#4CAF50" }) => {
  if (!loading) return null; // Return nothing if loading is false

  return (
    <div className={styles.overlay}>
      <div
        className={styles.loader}
        style={{ width: size, height: size, borderTopColor: color }}
      ></div>
    </div>
  );
};

export default CircularLoader;
