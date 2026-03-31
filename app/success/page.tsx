"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    // Komoju session verify
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      fetch(`/api/komoju/verify?session_id=${sessionId}`).catch(() => {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={"bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl transition-all duration-700 " + (show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
      <div className="mb-4 flex justify-center">
        <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
      </div>
      <h1 className="text-2xl font-black text-indigo-900 mb-2">プレミアム登録完了！</h1>
      <p className="text-slate-600 text-sm mb-6">遺産分割協議書雛形生成および全機能がご利用いただけます。</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
        <p className="text-amber-800 font-bold text-sm mb-2">プレミアム特典</p>
        <ul className="text-xs text-amber-700 space-y-1">
          <li>&#10003;遺産分割協議書雛形生成（AI）</li>
          <li>&#10003;詳細な相継アドバイス（無制限）</li>
          <li>&#10003;相継税節税対策プラン</li>
        </ul>
      </div>
      <Link href="/tool" className="block bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-xl transition-colors">ツールを使う</Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-white">読み込み中...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
