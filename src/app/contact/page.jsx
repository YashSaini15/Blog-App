"use client";
import React, { useState } from "react";
import styles from "./contactPage.module.css";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (value, field) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        return;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "*Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }
    if (!email.trim()) {
      newErrors.email = "*Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message.trim()) {
      newErrors.message = "*Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the validation errors.");
      return;
    }
    try {
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
        setErrors({});
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message. Please try again!");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Get in Touch</h1>
      <p className={styles.description}>
        Have questions, feedback, or just want to say hello? We&#39;d love to
        hear from you!
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
            value={name}
            onChange={(e) => handleInputChange(e.target.value, "name")}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
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
            value={email}
            onChange={(e) => handleInputChange(e.target.value, "email")}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
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
            onChange={(e) => handleInputChange(e.target.value, "message")}
          />
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className={styles.button}
        >
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
