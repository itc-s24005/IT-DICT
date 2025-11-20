import { Term } from "@/types/term";

// HTML のテキスト部分だけを置換するためのヘルパー
function replaceTextNodes(html: string, callback: (text: string) => string): string {
  return html.replace(/>([^<]+)</g, (match, text) => {
    const replaced = callback(text);
    return `>${replaced}<`;
  });
}

export function linkify(html: string, terms: Term[]): string {
  if (!html || terms.length === 0) return html;

  // タイトルの長い順にソート（HTTPS → HTTP の順に処理させる）
  const sorted = [...terms].sort((a, b) => b.title.length - a.title.length);

  // テキスト部分のみを置換
  return replaceTextNodes(html, (text) => {
    let replaced = text;

    for (const term of sorted) {
      const word = term.title;
      if (!word) continue;

      // 正規表現を安全にエスケープ
      const escaped = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

      // ★★★★★ 核心部分 ★★★★★
      //
      // 英語 → 単語境界
      // 日本語 → 境界なしでOK（漢字・仮名は元々境界が曖昧）
      //
      // これにより：
      //   apiAPIamazon → API, amazon にマッチ
      //   HTTPS → HTTPS のみ、HTTP には置換されない
      //
      const isEnglish = /^[A-Za-z0-9]+$/.test(word);

      const regex = isEnglish
        ? new RegExp(`\\b${escaped}\\b`, "g") // 英単語は単語境界
        : new RegExp(`${escaped}`, "g"); // 日本語はそのまま

      replaced = replaced.replace(
        regex,
        `<a href="/term/${term.slug}" class="term-link">${word}</a>`
      );
    }

    return replaced;
  });
}
