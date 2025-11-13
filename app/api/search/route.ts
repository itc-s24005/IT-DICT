import { client } from "@/lib/microcms";
import { NextResponse } from "next/server";
import type { Term, TermResponse } from "@/types/term";

// ひらがな ⇄ カタカナ相互変換用関数
function toHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

function toKatakana(str: string): string {
  return str.replace(/[\u3041-\u3096]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}

// 正規化関数（日本語＋英語対応）
function normalize(text: string): string {
  const normalized = text
    .normalize("NFKC") // 全角・半角統一
    .toLowerCase() // 英語の大文字小文字無視
    .trim();

  return normalized;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const queryRaw = searchParams.get("q");
  if (!queryRaw) return NextResponse.json([]);

  const query = normalize(queryRaw);

  // ひらがな・カタカナ両方に変換
  const queryHiragana = toHiragana(query);
  const queryKatakana = toKatakana(query);

  const data = await client.get<TermResponse>({
    endpoint: "terms",
  });

  // ✅ ひらがな・カタカナ両対応の検索ロジック
  const filtered = data.contents.filter((item: Term) => {
    const title = normalize(item.title);
    return (
      title.includes(query) ||
      title.includes(queryHiragana) ||
      title.includes(queryKatakana)
    );
  });

  return NextResponse.json(filtered);
}
