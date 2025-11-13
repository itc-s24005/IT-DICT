"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // ← usePathnameを追加
import { useState } from "react";
import "./globals.css";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // 👈 現在のパスを取得
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  // 👇 トップページ("/")ではヘッダーを非表示
  const showHeader = pathname !== "/";

  return (
    <html lang="ja">
      <body>
        {showHeader && (
          <header className={styles.header}>
            <Link href="/" className={styles.logo}>
              IT用語辞典
            </Link>

            <form action="/search" method="get" style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                name="q"
                placeholder="用語を検索"
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "200px",
                }}
              />
              <button type="submit">検索</button>
            </form>

          </header>
        )}

        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
