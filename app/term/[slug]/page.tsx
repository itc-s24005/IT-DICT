import { client } from "@/lib/microcms";
import type { TermResponse } from "@/types/term";
import { linkify } from "@/lib/linkify";

export default async function TermDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const data = await client.get<TermResponse>({
    endpoint: "terms",
    queries: { filters: `slug[equals]${decodedSlug}` },
  });

  const term = data.contents[0];

  if (!term) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>この用語は存在しません</h1>
      </main>
    );
  }

  // すべての用語を取得してリンク化に使う
  const allTerms = await client.get<TermResponse>({
    endpoint: "terms",
    queries: { limit: 100 },
  });

  const linkedDescription = linkify(term.description, allTerms.contents);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{term.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: linkedDescription }} />
    </main>
  );
}
