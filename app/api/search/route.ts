// app/api/search/route.ts
import { NextResponse } from "next/server";
import { client } from "@/lib/microcms";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const data = await client.get({
    endpoint: "terms",
    queries: {
      q: query, // microCMS の全文検索
      limit: 50,
    },
  });

  return NextResponse.json(data.contents);
}
