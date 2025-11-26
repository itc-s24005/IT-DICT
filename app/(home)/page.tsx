// app/page.tsx
import SearchBox from "./SearchBox";
import { getAllTerms } from "@/lib/microcms";
import "../globals.css";
import styles from "../page.module.css";

export default async function Home() {
  // 🔍 SearchBox 用の用語データを取得
  const terms = await getAllTerms();

  return (
    <main className={styles.main}>
      
      <img src="/ChatGPT Image Nov 26, 2025, 12_39_58 PM.png" alt="logo" className={styles.logo} />
      <p className={styles.description}>検索バーから用語を検索できます。</p>
      <div className="relative w-full max-w-md">
        <SearchBox terms={terms} />
      </div>
    </main>
  );
}
