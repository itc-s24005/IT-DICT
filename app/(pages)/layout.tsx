import SearchBox from "@/components/SearchBox";
import { getAllTerms } from "@/lib/microcms";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import styles from "./layout.module.css";

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
            {/* 左側：ロゴ */}
            <Link href="/" className={styles.logo}>
              <Image src="/IMG_E7624.JPG" alt="IT用語辞典" width={150}height={58.9} />
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
