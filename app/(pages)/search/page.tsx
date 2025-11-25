"use client";

import { Suspense } from "react";
import SearchResults from "./search-results";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <SearchResults />
    </Suspense>
  );
}
