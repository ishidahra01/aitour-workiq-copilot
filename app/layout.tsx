import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { User } from "lucide-react";

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
      <body className="antialiased bg-gray-100">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top bar */}
            <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
              <p className="text-sm text-gray-500">5G基地局設置計画管理システム</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <User className="w-4 h-4" />
                </span>
                <span className="text-xs font-medium">管理者</span>
              </div>
            </header>
            {/* Page content */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
