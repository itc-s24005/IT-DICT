import styles from "./page.module.css";

export default async function TermDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const termData: Record<string, { title: string; description: string }> = {
    api: {
      title: "API",
      description: "アプリケーション同士が連携するための仕組み。",
    },
    dns: {
      title: "DNS",
      description: "ドメイン名とIPアドレスを紐付ける仕組み。",
    },
    devops: {
      title: "DevOps",
      description: "開発(Dev)と運用(Ops)の連携を強化するプラクティス。",
    },
  };

  const term = termData[slug];

  if (!term) return <p>この用語は存在しません</p>;

  return (
    <main className={styles.main}>
      <h1>{term.title}</h1>
      <p>{term.description}</p>
    </main>
  );
}
