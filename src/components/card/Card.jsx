import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = ({ item, keyValue }) => {
  return (
    <div className={styles.container} key={keyValue}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>{item.desc.substring(0, 60)}</p>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Card;