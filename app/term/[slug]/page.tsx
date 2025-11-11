import Link from "next/link";
import styles from "./term.module.css";

const termData: Record<string, { title: string; description: string }> = {
  api: {
    title: "API",
    description:
      "アプリケーション同士が連携するための仕組みです。たとえば、天気アプリが別の気象サービスから情報を取得する際にAPIを利用します。",
  },
  dns: {
    title: "DNS",
    description:
      "ドメイン名とIPアドレスを対応付ける仕組みです。人が覚えやすい名前（example.com）をコンピュータが理解できるIPアドレスに変換します。",
  },
  devops: {
    title: "DevOps",
    description:
      "開発(Dev)と運用(Ops)を連携させる考え方や文化を指します。自動化や継続的インテグレーションにより開発効率を高めます。",
  },
};

// ✅ Next.js 15対応：paramsはPromiseなのでawaitで展開
export default async function TermDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = termData[slug];

  if (!term) {
    return (
      <main className={styles.main}>
        <h1>この用語は存在しません</h1>
        <Link href="/" className={styles.backLink}>
          ← 一覧に戻る
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{term.title}</h1>
      <p className={styles.description}>{term.description}</p>
      <Link href="/" className={styles.backLink}>
        ← 一覧に戻る
      </Link>
    </main>
  );
}

