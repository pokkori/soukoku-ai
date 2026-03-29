import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F1A] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-black text-indigo-400 mb-4">404</div>
        <h1 className="text-xl font-bold text-white mb-2">ページが見つかりません</h1>
        <p className="text-slate-400 mb-6 text-sm">
          お探しのページは存在しないか、移動された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
        >
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
