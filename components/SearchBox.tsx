"use client";

import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { Term } from "@/types/term";

// ひらがな → カタカナ、英数字 → 小文字などノーマライズ
const normalize = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[\u3041-\u3096]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) + 0x60)
    );
};

export default function SearchBox({ terms }: { terms: Term[] }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Term[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

  // 🔍 入力変更 → 予測候補生成
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const normQuery = normalize(value);

    const matched = terms.filter((term) =>
      normalize(term.title).includes(normQuery)
    );

    setSuggestions(matched.slice(0, 5));
    setSelectedIndex(-1);
  };

  // 🔽 キーボード操作（↑↓ Enter）
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        const term = suggestions[selectedIndex];
        router.push(`/term/${term.slug}`);
        setSuggestions([]);
        setQuery("");
      }
    }
  };

  // 🔎 Enter / ボタンで検索実行
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setSuggestions([]);
    }
  };

  const handleSelect = (term: Term) => {
    router.push(`/term/${term.slug}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* 🔎 Enter / ボタン検索 */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="検索"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          検索
        </button>
      </form>

      {/* 🔽 予測候補 */}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded w-full mt-1 shadow">
          {suggestions.map((term, i) => (
            <li
              key={term.id}
              className={`p-2 cursor-pointer ${
                i === selectedIndex ? "bg-blue-200" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(term)}
            >
              {term.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
