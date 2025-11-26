import { client } from "@/lib/microcms";
import type { TermResponse } from "@/types/term";
import { linkify } from "@/lib/linkify";
import "@/app/(pages)/term/style.css";

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
    <main className="p-6 max-w-7xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-8 border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">{term.title}</h1>
      <div className="prose prose-neutral max-w-none leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: linkedDescription }} />
      </div>
    </main>
  );
}
