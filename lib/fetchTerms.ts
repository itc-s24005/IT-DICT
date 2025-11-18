// /lib/fetchTerms.ts
import { client } from "@/lib/microcms";
import type { TermResponse } from "@/types/term";

export const fetchAllTerms = async () => {
  const data = await client.get<TermResponse>({
    endpoint: "terms",
    queries: { fields: "title,slug", limit: 100 },
  });
  return data.contents;
};
