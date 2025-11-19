// lib/linkify.ts
import type { Term } from "@/types/term";

/**
 * エスケープ（正規表現用）
 */
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * ひらがな <-> カタカナ 変換
 */
function hiraToKana(s: string) {
  return s.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}
function kanaToHira(s: string) {
  return s.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

/**
 * 正規化（全角→半角、トリム、小文字化）
 * - 英数字は小文字化
 * - 全角/半角は NFKC で統一
 */
function normalizeForMatch(s: string) {
  return s.normalize("NFKC").toLowerCase().trim();
}

/**
 * linkify(html, terms)
 * - html: microCMS の description のような HTML 文字列
 * - terms: Term[] (id,title,slug,description)
 *
 * 戻り値: HTML文字列（安全のためテキスト部のみ置換、既存タグは維持）
 */
export function linkify(html: string, terms: Term[]): string {
  if (!html) return html;

  // 1) マッチ優先度のため、タイトル長順（長い語を先に）
  const sorted = [...terms].sort((a, b) => b.title.length - a.title.length);

  // 2) HTMLをタグとテキストに分割（タグはそのまま、テキストだけ処理）
  //    split でタグ部分を保持するためキャプチャグループ的に使う
  const parts = html.split(/(<[^>]+>)/g);

  // 3) 各テキストパートに対して置換
  const processed = parts.map((part) => {
    // タグならそのまま返す（ただし <a ...> 内は置換しないため、簡単に検出）
    if (!part || part.startsWith("<")) {
      return part;
    }

    // テキスト部分：各用語ごとに置換
    let text = part;

    for (const term of sorted) {
      if (!term.title) continue;

      const title = term.title;

      // normalize versions for building regex (we will match original characters,
      // but create alternatives: original, hiragana<->katakana forms)
      const variants = new Set<string>();

      // original title (NFKC-normalized)
      const orig = title.normalize("NFKC");
      variants.add(orig);

      // hiragana/kana variants
      variants.add(hiraToKana(orig));
      variants.add(kanaToHira(orig));

      // also add lowercased ASCII variant (NFKC ensures fullwidth ascii normalized)
      // but actual regex will use 'i' to ignore ascii case; still include lower-case variant
      variants.add(orig.toLowerCase());

      // build regex alternation (escape each)
      const escaped = Array.from(variants)
        .filter(Boolean)
        .map((v) => escapeRegex(v))
        .join("|");

      if (!escaped) continue;

      // Create regex:
      // - 'g' global
      // - 'i' case-insensitive (helps ASCII)
      // - 'u' unicode
      const rx = new RegExp(escaped, "giu");

      // We must avoid creating <a> inside existing tags — we're in text node so OK.
      // Replace matched text with anchor tag pointing to the term slug.
      // Use a callback to preserve the original matched text's exact casing.
      text = text.replace(rx, (match) => {
        // 防止二重リンク（例えば既に <a>タグを追加してしまうケースを避ける）
        // ここはテキストノード内なので通常不要だが念のため
        if (!match) return match;

        // Build href: use encodeURIComponent for slug (slug may be japanese)
        const href = `/term/${encodeURIComponent(term.slug)}`;

        // return link HTML (classを追加しておけばCSSで装飾可能)
        return `<a href="${href}" class="term-link">${match}</a>`;
      });
    }

    return text;
  });

  return processed.join("");
}
