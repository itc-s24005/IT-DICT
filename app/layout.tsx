"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // ← usePathnameを追加
import { useState } from "react";
import { Search } from "lucide-react";
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

            <form onSubmit={handleSubmit} className={styles.searchContainer}>
              <input
                type="text"
                placeholder="検索..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchBox}
              />
              <Search className={styles.searchIcon} />
            </form>
          </header>
        )}

        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
