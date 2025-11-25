"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Term } from "@/types/term";

function normalize(str: string) {
  return str
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[ぁ-ん]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) + 0x60)
    );
}

// description を短く抜粋する（HTMLを保持したまま）
// microCMS の description は <p>〜</p> が基本なので OK
function excerpt(html: string, maxLength = 80) {
  // HTMLタグを除去してテキストだけ取り出す
  const text = html.replace(/<[^>]+>/g, "");

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [results, setResults] = useState<Term[]>([]);

  useEffect(() => {
    async function run() {
      const res = await fetch("/api/terms");
      const all: Term[] = await res.json();

      const normQuery = normalize(query);

      setResults(
        all.filter((item) =>
          normalize(item.title).includes(normQuery)
        )
      );
    }

    run();
  }, [query]);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>「{query}」の検索結果</h1>

      {results.length === 0 ? (
        <p>該当する用語は見つかりませんでした。</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {results.map((term) => (
            <li key={term.id} style={{ marginBottom: "1.5rem" }}>
              <Link href={`/term/${term.slug}`}>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {term.title}
                </h2>
              </Link>

              {/* 説明文の抜粋を表示 */}
              <p>{excerpt(term.description, 85)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
