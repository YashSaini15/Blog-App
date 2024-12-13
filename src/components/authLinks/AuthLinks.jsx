"use client";
import React, { useState } from "react";
import styles from "./authLinks.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className={styles.authContainer}>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <div className={styles.authLinks}>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span onClick={signOut} className={styles.link}>
            Logout
          </span>
        </div>
      )}
      
      <div 
        className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} 
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
        role="button"
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      
      {open && (
        <div 
          className={styles.responsiveMenu} 
          onClick={closeMenu}
        >
          <nav className={styles.mobileNav}>
            <Link href="/" className={styles.mobileLink}>
              Homepage
            </Link>
            <Link href="/about" className={styles.mobileLink}>
              About
            </Link>
            <Link href="/contact" className={styles.mobileLink}>
              Contact
            </Link>
            {status === "unauthenticated" ? (
              <Link href="/login" className={styles.mobileLink}>
                Login
              </Link>
            ) : (
              <>
                <Link href="/write" className={styles.mobileLink}>
                  Write
                </Link>
                <div 
                  onClick={signOut} 
                  className={styles.mobileLink}
                >
                  Logout
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default AuthLinks;