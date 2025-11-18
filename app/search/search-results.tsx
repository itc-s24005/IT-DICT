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
    <main>
      <h1>「{query}」の検索結果</h1>
      {results.length === 0 ? (
        <p>該当する用語は見つかりませんでした。</p>
      ) : (
        <ul>
          {results.map((term) => (
            <li key={term.id}>
              <Link href={`/term/${term.slug}`}>{term.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
