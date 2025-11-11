"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./search.module.css";

const termData: Record<string, { title: string; description: string }> = {
  api: {
    title: "API",
    description: "アプリケーション同士が連携するための仕組み。",
  },
  dns: {
    title: "DNS",
    description: "ドメイン名とIPアドレスを紐付ける仕組み。",
  },
  devops: {
    title: "DevOps",
    description: "開発(Dev)と運用(Ops)の連携を強化するプラクティス。",
  },
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredTerms = Object.entries(termData).filter(([_, value]) =>
    value.title.toLowerCase().includes(query)
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>「{query}」の検索結果</h1>

      {filteredTerms.length > 0 ? (
        <ul className={styles.list}>
          {filteredTerms.map(([slug, value]) => (
            <li key={slug} className={styles.item}>
              <Link href={`/term/${slug}`} className={styles.link}>
                <h2>{value.title}</h2>
                <p>{value.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>該当する用語が見つかりませんでした。</p>
      )}
    </main>
  );
}
