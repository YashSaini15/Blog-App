"use client";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { ThemeContextProvider } from "../../context/ThemeContext";
import ThemeProvider from "../../providers/ThemeProvider";
import AuthProvider from "../../providers/AuthProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <div className="container">
            <div className="wrapper">
              <Navbar />
              {children}
              <ToastContainer position="top-right" autoClose={3000} />
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </ThemeContextProvider>
    </AuthProvider>
  );
}
