"use client";
import { useState } from "react";

export type PlanType = "lite" | "standard" | "business";

interface Props {
  planId: string;
  planLabel: string;
  planType?: PlanType;
  className?: string;
  "aria-label"?: string;
}

export default function KomojuButton({ planId, planLabel, planType, className, "aria-label": ariaLabel }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/komoju/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("決済の準備中です。しばらくお待ちください。");
        setLoading(false);
      }
    } catch {
      setError("通信エラーが発生しました。再度お試しください。");
      setLoading(false);
    }
  };

  const defaultClass =
    planType === "business"
      ? "w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold py-3 rounded-xl hover:from-yellow-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
      : planType === "lite"
      ? "w-full bg-gray-600 text-white font-bold py-3 rounded-xl hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      : "w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        aria-label={ariaLabel ?? planLabel}
        className={className ?? defaultClass}
      >
        {loading ? "決済ページへ移動中..." : planLabel}
      </button>
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
}
