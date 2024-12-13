import React from "react";
import styles from "./blogPage.module.css";
import CardList from "../../components/CardList/CardList";
import Menu from "../../components/Menu/Menu";

const BlogPage = async ({ searchParams }) => {
  const { page } = await searchParams
  const { cat } = await searchParams;
  const parsePage = parseInt(page) || 1;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} Blog</h1>
      <div className={styles.content}>
        <CardList page={parsePage} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
