import styles from "./page.module.css";
import Link from "next/link";

const terms = [
  { word: "API", slug: "api" },
  { word: "DNS", slug: "dns" },
  { word: "DevOps", slug: "devops" },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>IT用語辞典</h1>
      <ul>
        {terms.map((term) => (
          <li key={term.slug}>
            <Link href={`/term/${term.slug}`}>{term.word}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
