// app/term/[slug]/page.tsx
import { client, getAllTerms } from "@/lib/microcms";
import type { TermResponse } from "@/types/term";
import { linkify } from "@/lib/linkify";
import type { Term } from "@/types/term";
import styles from "./page.module.css";

export default async function TermDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // microCMS で当該用語を取得（サーバー側 fetch）
  const res = await client.get<TermResponse>({
    endpoint: "terms",
    queries: { filters: `slug[equals]${decodedSlug}`, limit: 1 },
  });

  const term = res.contents?.[0];

  if (!term) {
    return (
      <main className={styles.main}>
        <h1>この用語は存在しません</h1>
      </main>
    );
  }

  // 全用語を取得（リンク先の候補作成のため）
  // getAllTerms は server-only で大きな数なら pagination を考慮してください
  const allTerms = await getAllTerms(); // Term[]

  // linkify に description を渡して置換（HTML を返す）
  // term.description が HTML (rich text) の想定
  const linkedDescription = linkify(term.description || "", allTerms as Term[]);

  return (
    <main className={styles.main}>
      <h1>{term.title}</h1>
      <div
        // ここで安全に描画。microCMSの自分のコンテンツだけ使う想定
        dangerouslySetInnerHTML={{ __html: linkedDescription }}
      />
    </main>
  );
}
