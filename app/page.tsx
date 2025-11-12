// app/page.tsx
import { client } from "@/lib/microcms";

interface Term {
  id: string;
  title: string;
  slug: string;
  description: string;
}

interface TermResponse {
  contents: Term[];
  totalCount: number;
  offset: number;
  limit: number;
}

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

