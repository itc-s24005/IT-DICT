import { createClient } from "microcms-js-sdk";
import { TermResponse } from "@/types/term";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_ID ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

// すべての用語を取得
export async function getAllTerms() {
  const data = await client.get<TermResponse>({
    endpoint: "terms",
    queries: { limit: 100 }, // ←★ これが必須！
  });

  return data.contents;
}
