import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        案件が見つかりません
      </h2>
      <p className="text-slate-500 mb-6">
        指定された案件は存在しないか、削除された可能性があります。
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        案件一覧に戻る
      </Link>
    </div>
  );
}
