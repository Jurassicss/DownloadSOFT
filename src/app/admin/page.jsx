"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import ManifestEditor from "@/components/ManifestEditor";
import UploadFiles from "@/components/UploadFiles";

const ADMIN_PASSWORD = "SCREENFL"; // сюда можно поставить любой пароль

export default function AdminPage() {
  const router = useRouter();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Проверяем localStorage и sessionStorage
    const savedLocal = localStorage.getItem("adminPassword");
    const savedSession = sessionStorage.getItem("adminPassword");
    if (savedLocal === ADMIN_PASSWORD || savedSession === ADMIN_PASSWORD) {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === ADMIN_PASSWORD) {
      setAuthorized(true);
      if (remember) {
        localStorage.setItem("adminPassword", enteredPassword);
      } else {
        sessionStorage.setItem("adminPassword", enteredPassword);
      }
    } else {
      alert("Неверный пароль");
      setEnteredPassword("");
    }
  };

  if (!authorized) {
    return (
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2>Admin</h2>
          <input
            type="password"
            placeholder="Введите пароль"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <label className={styles.rememberLabel}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Запомнить меня
          </label>
          <button type="submit">Войти</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Admin Panel</h1>
      <div>
      <ManifestEditor />
      <UploadFiles />
      </div>
      
    </div>
  );
}
