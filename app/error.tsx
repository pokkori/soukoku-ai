"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F1A] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-black text-indigo-400 mb-4">500</div>
        <h1 className="text-xl font-bold text-white mb-2">エラーが発生しました</h1>
        <p className="text-slate-400 mb-6 text-sm">
          申し訳ございません。一時的なエラーが発生しました。もう一度お試しください。
        </p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
        >
          再読み込み
        </button>
      </div>
    </div>
  );
}
