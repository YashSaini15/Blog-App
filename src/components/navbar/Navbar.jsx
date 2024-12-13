import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.social}>
          <Link href="https://www.facebook.com" target="_blank">
            <Image src="/facebook.png" alt="facebook" width={24} height={24} />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <Image
              src="/instagram.png"
              alt="instagram"
              width={24}
              height={24}
            />
          </Link>
          <Link href="https://www.tiktok.com" target="_blank">
            <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
          </Link>
          <Link href="https://www.youtube.com" target="_blank">
            <Image src="/youtube.png" alt="youtube" width={24} height={24} />
          </Link>
        </div>
        <div className={styles.logo}>
          <Link href="/">Yashblog</Link>
        </div>
        <div className={styles.links}>
          <ThemeToggle />
          <Link href="/" className={styles.link}>
            Homepage
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <AuthLinks />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
