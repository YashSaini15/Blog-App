import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        className={`${styles.categoryItem} ${styles.style}`}
        href="/blog?cat=style"
      >
        Style
      </Link>
      <Link className={`${styles.categoryItem} ${styles.fashion}`} href="/blog">
        Fashion
      </Link>
      <Link className={`${styles.categoryItem} ${styles.food}`} href="/blog">
        Food
      </Link>
      <Link className={`${styles.categoryItem} ${styles.travel}`} href="/blog">
        Travel
      </Link>
      <Link
        className={`${styles.categoryItem} ${styles.culture}`}
        href="/blog?cat=style"
      >
        Culture
      </Link>
      <Link
        className={`${styles.categoryItem} ${styles.coding}`}
        href="/blog?cat=style"
      >
        Coding
      </Link>
    </div>
  );
};

export default MenuCategories;
