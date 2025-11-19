import SearchBox from "@/components/SearchBox";
import { getAllTerms } from "@/lib/microcms";
import "./globals.css";


interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  const terms = await getAllTerms();

  return (
    <html lang="ja">
      <body>
        <header>
          <SearchBox terms={terms} />
        </header>
        {children}
      </body>
    </html>
  );
}
