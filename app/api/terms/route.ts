import { NextResponse } from "next/server";
import { client } from "@/lib/microcms";
import { TermResponse } from "@/types/term";

export async function GET() {
  const data = await client.get<TermResponse>({
    endpoint: "terms",
    queries: { limit: 100 },
  });

  return NextResponse.json(data.contents);
}
