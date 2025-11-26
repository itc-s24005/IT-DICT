// app/page.tsx
import SearchBox from "./SearchBox";
import { getAllTerms } from "@/lib/microcms";
import Image from "next/image";
import "../globals.css";
import styles from "../page.module.css";

export default async function Home() {
  // 🔍 SearchBox 用の用語データを取得
  const terms = await getAllTerms();

  return (
    <main className={styles.main}>
      <Image src="/AOFHE8144.JPG" alt="IT用語辞典" width={300} height={109.8} className={styles.logo} />
      <p className={styles.description}>IT用語をまとめた簡易辞書サイトです</p>
      <div className="relative w-full max-w-md">
        <SearchBox terms={terms} />
      </div>
    </main>
  );
}
