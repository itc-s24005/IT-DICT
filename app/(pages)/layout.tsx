import SearchBox from "@/components/SearchBox";
import { getAllTerms } from "@/lib/microcms";
import Link from "next/link";
import "../globals.css";
import styles from "../layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  const terms = await getAllTerms();
  
  return (
    <html lang="ja">
      <body>
        <header className={styles.header}>
          <div className={styles.container}>
            {/* 左側：サイトタイトル */}
            <Link href="/" className={styles.logo}>
              <img src="/ChatGPT Image Nov 26, 2025, 12_39_58 PM.png" alt="logo" className={styles.logo} />
            </Link>

            {/* 右側：検索ボックス */}
            <div className={styles.search}>
              <SearchBox terms={terms} />
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
