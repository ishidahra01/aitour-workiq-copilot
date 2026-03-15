import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5G基地局設置計画管理 | WorkIQ Site Manager",
  description: "5G基地局設置計画を管理するためのプロジェクト管理ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-4.724A1 1 0 013 14.382V5a2 2 0 012-2h14a2 2 0 012 2v9.382a1 1 0 01-.553.894L15 20M9 20v-6a2 2 0 012-2h2a2 2 0 012 2v6M9 20h6"
                />
              </svg>
            </div>
            <div>
              <span className="text-base font-semibold text-slate-900">
                WorkIQ Site Manager
              </span>
              <span className="ml-2 text-xs text-slate-400 hidden sm:inline">
                5G基地局設置計画管理
              </span>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
