import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "家計簿アプリ",
  description: "家計簿アプリです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
