"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

interface Term {
  id: string;
  title: string;
  slug: string;
  description: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, error } = useSWR<Term[]>(
    query ? `/api/search?q=${query}` : null,
    fetcher
  );

  // ✅ ローディング判定を isLoading の代わりに行う
  if (error) return <p>検索中にエラーが発生しました。</p>;
  if (!data || data.length === 0) return(
    <main>
      <h1>「{query}」の検索結果</h1>
      <p>該当する用語は見つかりませんでした。</p>
    </main>
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1>「{query}」の検索結果</h1>
      <ul>
        {data.map((term) => (
          <li key={term.id}>
            <Link href={`/term/${term.slug}`}>{term.title}</Link>
            <div
              dangerouslySetInnerHTML={{ __html: term.description }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
