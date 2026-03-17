"use client";
import { useState, useEffect, useRef } from "react";

declare global {
  interface Window { Payjp: (key: string) => { createToken: (el: HTMLElement) => Promise<{id?: string; error?: {message: string}}> }; }
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PayjpModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const payjpRef = useRef<ReturnType<Window["Payjp"]> | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const script = document.createElement("script");
    script.src = "https://js.pay.jp/v2/pay.js";
    script.onload = () => {
      const pk = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY || "";
      payjpRef.current = window.Payjp(pk);
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [isOpen]);

  async function handleSubmit() {
    if (!payjpRef.current || !cardRef.current) return;
    setLoading(true);
    setError("");
    try {
      const result = await payjpRef.current.createToken(cardRef.current);
      if (result.error) { setError(result.error.message); setLoading(false); return; }
      const res = await fetch("/api/payjp/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: result.id, email }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setLoading(false); return; }
      onSuccess();
    } catch (e) {
      setError("決済処理中にエラーが発生しました。もう一度お試しください。");
      console.error(e);
    } finally { setLoading(false); }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-indigo-900">プレミアムプラン</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <p className="text-amber-800 font-bold text-sm">¥980/月（税込み）</p>
          <ul className="text-xs text-amber-700 mt-2 space-y-1">
            <li>✓ 遺産分割協議書雛形生成（AI）</li>
            <li>✓ 詳細な相続アドバイス（無制限）</li>
            <li>✓ 相続税節税対策プラン</li>
            <li>✓ いつでも解約可能</li>
          </ul>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">メールアドレス（任意）</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">カード情報</label>
          <div ref={cardRef} className="border border-slate-300 rounded-lg p-3 min-h-[60px]" />
        </div>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <button onClick={handleSubmit} disabled={loading} className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-colors">
          {loading ? "処理中..." : "プレミアムに登録する"}
        </button>
        <p className="text-xs text-slate-400 mt-3 text-center">PAY.JPによるセキュアな决済・カード情報は当社に保存されません</p>
      </div>
    </div>
  );
}
