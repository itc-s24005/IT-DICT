"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>IT用語辞典</h1>
      <p className={styles.description}>IT・開発に関する用語をわかりやすく解説</p>

      {/* 🔍 検索フォーム */}
      <form onSubmit={handleSubmit} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="用語を検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchBox}
        />
        <button type="submit" className={styles.searchButton}>
          検索
        </button>
      </form>
    </main>
  );
}
