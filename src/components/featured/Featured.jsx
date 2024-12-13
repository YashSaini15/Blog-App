"use client";
import React, { useState } from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  const [show, setShow] = useState(false);
  const fullText =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro rem deserunt ullam et consectetur, laboriosam nemo libero, esse quam amet distinctio fugiat fugit iusto suscipit culpa nobis necessitatibus, doloribus accusantium blanditiis ipsum recusandae est nam.";
  const shortText =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro rem deserunt ullam et consectetur, laboriosam nemo libero";
  const showMore = () => {
    setShow(!show);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, yash here! </b>Discover my stories and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className={styles.postDesc}>{show ? fullText : shortText}</p>
          <button onClick={showMore} className={styles.button}>
            {show ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
