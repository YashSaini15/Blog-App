import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import TruncatedDraftJSRenderer from "../../utils/truncatedDraftjsRenderer";
const Card = ({ item, cardKey }) => {
  return (
    <div className={styles.container} key={cardKey}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="image" fill className={styles.image} />
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
        <div className={styles.desc}>
          {item?.desc && <TruncatedDraftJSRenderer content={item.desc} />}
        </div>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Card;
