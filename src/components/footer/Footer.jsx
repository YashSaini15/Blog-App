import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h1 className={styles.logoText}><Link href="/">Yashblog</Link></h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, vel!
          Ipsum totam doloribus ratione labore asperiores? Officia, deleniti
          consectetur. Ut iure dolor nemo?
        </p>
        <div className={styles.icons}>
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/facebook.png" alt="Facebook" width={18} height={18} />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={18}
              height={18}
            />
          </Link>
          <Link
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/tiktok.png" alt="Tiktok" width={18} height={18} />
          </Link>
          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/youtube.png" alt="Youtube" width={18} height={18} />
          </Link>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/blog?cat=style">Style</Link>
          <Link href="/blog?cat=fashion">Fashion</Link>
          <Link href="/blog?cat=coding">Coding</Link>
          <Link href="/blog?cat=travel">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </Link>
          <Link
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tiktok
          </Link>
          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
