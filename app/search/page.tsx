"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./search.module.css";

const terms = [
  { word: "API", slug: "api", description: "アプリケーション間の通信手段" },
  { word: "DNS", slug: "dns", description: "ドメイン名とIPアドレスの対応表" },
  { word: "DevOps", slug: "devops", description: "開発と運用の協調を促進する文化" },
  { word: "HTTP", slug: "http", description: "Web通信のためのプロトコル" },
  { word: "IP Address", slug: "ip-address", description: "ネットワーク上の識別番号" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() ?? "";

  const results = terms.filter((term) =>
    term.word.toLowerCase().includes(query)
  );

  return (
    <main className={styles.main}>
      <h1>検索結果</h1>
      {query ? (
        <p>
          「<strong>{query}</strong>」の検索結果 ({results.length} 件)
        </p>
      ) : (
        <p>検索ワードを入力してください。</p>
      )}

      <ul className={styles.resultList}>
        {results.length > 0 ? (
          results.map((term) => (
            <li key={term.slug} className={styles.resultItem}>
              <Link href={`/term/${term.slug}`}>
                <h2>{term.word}</h2>
                <p>{term.description}</p>
              </Link>
            </li>
          ))
        ) : (
          query && <p>該当する用語は見つかりませんでした。</p>
        )}
      </ul>
    </main>
  );
}
