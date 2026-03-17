"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 flex items-center justify-center p-4">
      <div className={"bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl transition-all duration-700 " + (show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
        <div className="text-6xl mb-4">⚖️</div>
        <h1 className="text-2xl font-black text-indigo-900 mb-2">プレミアム登録完了！</h1>
        <p className="text-slate-600 text-sm mb-6">遺産分割協議書雛形生成および全機能がご利用いただけます。</p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
          <p className="text-amber-800 font-bold text-sm mb-2">プレミアム特典</p>
          <ul className="text-xs text-amber-700 space-y-1">
            <li>✓ 遺産分割協議書雛形生成（AI）</li>
            <li>✓ 詳細な相継アドバイス（無制限）</li>
            <li>✓ 相継税節税対策プラン</li>
          </ul>
        </div>
        <Link href="/tool" className="block bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-xl transition-colors">ツールを使う</Link>
      </div>
    </div>
  );
}
