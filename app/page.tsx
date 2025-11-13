// app/page.tsx
import { client } from "@/lib/microcms";
import type { TermResponse } from "@/types/term";

export default async function Home() {
  // ✅ 型を指定してデータを取得
  const data = await client.get<TermResponse>({
    endpoint: "terms",
  });

  return (
    <main>
      <h1>IT用語辞典</h1>
      <ul>
        {data.contents.map((term) => (
          <li key={term.id}>
            <a href={`/term/${term.slug}`}>{term.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}

