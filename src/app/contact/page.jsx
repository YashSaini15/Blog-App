"use client";
import React, { useState } from "react";
import styles from "./contactPage.module.css";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        message,
        resolved: false, 
      }),
    });

    if (res.status === 200) {
      setName("");
      setEmail("");
      setMessage("");
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Get in Touch</h1>
      <p className={styles.description}>
        Have questions, feedback, or just want to say hello? We'd love to hear
        from you!
      </p>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            placeholder="Your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            placeholder="Your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            placeholder="Your message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button onClick={(e)=>handleSubmit(e)} type="submit" className={styles.button}>
          Send Message
        </button>
      </form>
      <section className={styles.infoSection}>
        <h2 className={styles.subtitle}>Contact Information</h2>
        <p>
          Email:{" "}
          <a href="mailto:yashblog@gmail.com" className={styles.link}>
            yashblog@gmail.com
          </a>
        </p>
        <p>Phone: +123 456 7890</p>
      </section>
    </div>
  );
};

export default ContactPage;
