import React from "react";
import styles from "./aboutPage.module.css"
const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.description}>
        Welcome to <strong>YashBlog</strong>, a platform where ideas come
        to life and stories are shared with the world.
      </p>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Our Mission</h2>
        <p>
          At <strong>YashBlog</strong>, our mission is to create a space
          for meaningful conversations, inspire creativity, and connect people
          through the power of words and ideas.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>What We Do</h2>
        <p>
          Our blog covers a diverse range of topics, including style,
          coding, travel, fashion, and more. We aim to provide insightful,
          entertaining, and educational content for readers across the globe.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Meet the Team</h2>
        <p>
          We are a passionate group of writers, thinkers, and creators who
          believe in the power of storytelling. Together, we strive to bring you
          the best content, crafted with care and authenticity.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Join the Conversation</h2>
        <p>
          Have a story to share? We’d love to hear from you! Feel free to reach
          out to us through our{" "}
          <a href="/contact" className={styles.link}>
            Contact Page
          </a>{" "}
          or connect with us on our social media platforms.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
