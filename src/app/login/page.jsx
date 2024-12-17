"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import CircularLoader from "../../components/loader/CircularLoader";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      router.push("/");
      toast.success("Logged in successfully!");
    } else if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, router]);

  return (
    <>
      <CircularLoader size="60px" color="#007BFF" loading={loading} />
      {!loading && (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div
              className={styles.socialButton}
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </div>
            <div className={styles.socialButton}>Sign in with Github</div>
            <div className={styles.socialButton}>Sign in with Facebook</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
