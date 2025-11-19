// /types/term.ts

export interface Term {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface TermResponse {
  contents: Term[];
  totalCount?: number;
  offset?: number;
  limit?: number;
}
