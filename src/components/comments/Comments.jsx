"use client";
import Image from "next/image";
import styles from "./comments.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import CircularLoader from "../loader/CircularLoader";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const commentValidation = () => {
    const newErrors = {};

    if (!desc.trim()) {
      newErrors.desc = "Please write a comment";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!commentValidation()) {
      toast.error("Please write a comment before submitting");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, postSlug }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      setDesc("");
      mutate();
      toast.success("Comment posted successfully!");
    } catch (error) {
      toast.error("Failed to post comment. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div>
          <div className={styles.write}>
            <textarea
              placeholder="write a comment..."
              className={styles.input}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className={styles.button} onClick={handleSubmit}>
              Send
            </button>
          </div>
          <div>
            {errors.desc && <p className={styles.error}>{errors.desc}</p>}
          </div>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : Array.isArray(data) &&
            data?.map((item) => (
              <div key={item.id} className={styles.comment}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt=""
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>
                      {item.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            ))}
      </div>
      <CircularLoader loading={loading} size="60px" color="#007BFF" />
    </div>
  );
};

export default Comments;
