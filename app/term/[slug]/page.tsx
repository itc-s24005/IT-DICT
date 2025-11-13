import { client } from "@/lib/microcms";
import type { TermResponse } from "@/types/term";

export default async function TermDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ URLエンコードされたスラッグを復号化
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

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{term.title}</h1>
      {/* リッチエディタ対応 */}
      <div dangerouslySetInnerHTML={{ __html: term.description }} />
    </main>
  );
}
