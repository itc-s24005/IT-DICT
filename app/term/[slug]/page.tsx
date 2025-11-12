import { client } from "@/lib/microcms";

interface Term {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export default async function TermDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await client.get<{ contents: Term[] }>({
    endpoint: "terms",
    queries: { filters: `slug[equals]${slug}` },
  });

  const term = data.contents?.[0];

  if (!term) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>この用語は存在しません</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{term.title}</h1>
      <p>{term.description}</p>
    </main>
  );
}
