import { createClient } from "microcms-js-sdk";
import { Term, TermResponse } from "@/types/term";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_ID ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

// すべての用語を取得 (キャッシュしない)
export async function getAllTerms(): Promise<Term[]> {
  const data = await client.get<TermResponse>({
    endpoint: "terms",
    queries: {
      limit: 100,
    },
    customRequestInit: {
      cache: "no-store", // ←★ これを追加！
    }
  });

  return data.contents;
}
