"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";

function renderMarkdown(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let inList = false;
  for (const line of lines) {
    if (/^## (.+)$/.test(line)) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(line.replace(/^## (.+)$/, '<h3 class="font-bold text-lg mt-5 mb-2 text-indigo-700 border-b border-indigo-200 pb-1">$1</h3>'));
    } else if (/^- (.+)$/.test(line)) {
      if (!inList) { result.push('<ul class="space-y-1 mb-2">'); inList = true; }
      const inner = line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
      result.push(`<li class="ml-4 list-disc text-slate-700">${inner}</li>`);
    } else if (line.trim() === "") {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push("<br/>");
    } else {
      if (inList) { result.push("</ul>"); inList = false; }
      const inner = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
      result.push(`<p class="mb-2 text-slate-700">${inner}</p>`);
    }
  }
  if (inList) result.push("</ul>");
  return result.join("\n");
}

type Tab = "simulator" | "timeline" | "document" | "renunciation";

export default function ToolPage() {
  const [activeTab, setActiveTab] = useState<Tab>("simulator");
  const [isPremium, setIsPremium] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [useCount, setUseCount] = useState(0);
  const [estateTotal, setEstateTotal] = useState("");
  const [heirCount, setHeirCount] = useState("2");
  const [hasSpouse, setHasSpouse] = useState(true);
  const [simResult, setSimResult] = useState<{basic:number;taxable:number;tax:number;total:number;heirs:number} | null>(null);
  const [inheritanceDate, setInheritanceDate] = useState("");
  const [timelines, setTimelines] = useState<{label:string;date:string;urgent:boolean}[]>([]);
  const [docForm, setDocForm] = useState({ deceasedName:"", heirNames:"", assets:"", distribution:"" });
  const [docResult, setDocResult] = useState("");
  const [docLoading, setDocLoading] = useState(false);
  const [posAssets, setPosAssets] = useState("");
  const [negAssets, setNegAssets] = useState("");
  const [renResult, setRenResult] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  function calcTax(perPerson: number): number {
    if (perPerson <= 1000) return perPerson * 0.1;
    if (perPerson <= 3000) return 100 + (perPerson - 1000) * 0.15;
    if (perPerson <= 5000) return 100 + 300 + (perPerson - 3000) * 0.2;
    if (perPerson <= 10000) return 400 + 400 + (perPerson - 5000) * 0.3;
    if (perPerson <= 20000) return 1900 + (perPerson - 10000) * 0.4;
    if (perPerson <= 30000) return 5900 + (perPerson - 20000) * 0.45;
    if (perPerson <= 60000) return 10400 + (perPerson - 30000) * 0.5;
    return 25400 + (perPerson - 60000) * 0.55;
  }

  function handleSimulate() {
    const total = parseFloat(estateTotal);
    const heirs = parseInt(heirCount);
    if (isNaN(total) || isNaN(heirs) || heirs < 1) return;
    const basic = 3000 + 600 * heirs;
    const taxable = Math.max(0, total - basic);
    const perPerson = taxable / heirs;
    let tax = taxable > 0 ? calcTax(perPerson) * heirs : 0;
    if (hasSpouse && taxable > 0) tax = tax * 0.5;
    setSimResult({ total, basic, taxable, tax: Math.round(tax), heirs });
  }

  function handleTimeline() {
    if (!inheritanceDate) return;
    const base = new Date(inheritanceDate);
    function addDays(d: Date, days: number) { const r = new Date(d); r.setDate(r.getDate() + days); return r.toLocaleDateString("ja-JP"); }
    function addMonths(d: Date, months: number) { const r = new Date(d); r.setMonth(r.getMonth() + months); return r.toLocaleDateString("ja-JP"); }
    setTimelines([
      { label: "遺言書の確認・相続人調査", date: addDays(base, 7), urgent: false },
      { label: "相続放棄・限定承認の検討開始", date: addDays(base, 14), urgent: true },
      { label: "相続放棄・限定承認の申述期限（3ヶ月）", date: addMonths(base, 3), urgent: true },
      { label: "被相続人の所得税の準確定申告（4ヶ月）", date: addMonths(base, 4), urgent: true },
      { label: "相続財産の調査・評価完了", date: addMonths(base, 6), urgent: false },
      { label: "遺産分割協議の完了", date: addMonths(base, 8), urgent: false },
      { label: "相続税申告・納付期限（10ヶ月）", date: addMonths(base, 10), urgent: true },
      { label: "不動産登記変更（相続登記）", date: addMonths(base, 12), urgent: false },
    ]);
  }

  async function handleDocGenerate() {
    if (!isPremium) { setShowModal(true); return; }
    if (!docForm.deceasedName || !docForm.heirNames) return;
    setDocLoading(true);
    setDocResult("");
    abortRef.current = new AbortController();
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "document", ...docForm }),
        signal: abortRef.current.signal,
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk.includes("DONE:")) {
          const pre = chunk.split("DONE:")[0];
          buf += pre;
          const meta = JSON.parse(chunk.split("DONE:")[1]);
          setUseCount(meta.count);
        } else { buf += chunk; }
        setDocResult(buf);
      }
    } catch (e) { console.error(e); }
    finally { setDocLoading(false); }
  }

  function handleRenunciation() {
    const pos = parseFloat(posAssets) || 0;
    const neg = parseFloat(negAssets) || 0;
    const diff = pos - neg;
    if (diff > 0) {
      const msg = "プラス資産（" + pos + "万円）がマイナス資産（" + neg + "万円）を上回っています。 相続放棄は不要と考えられます。差額 +" + diff + "万円 を相続できます。 ただし、隠れた債務がある場合があります。専門家への確認をお勧めします。";
      setRenResult(msg);
    } else if (diff < 0) {
      const msg = "マイナス資産（" + neg + "万円）がプラス資産（" + pos + "万円）を上回っています。 相続放棄を検討することをお勧めします。差額 " + diff + "万円の債務を相続する可能性があります。 相続放棄は相続開始を知った日かり3ヶ月以内に家庭裁判所に申述が必要です。 早めに弁護士・司法書士にご相談ください。";
      setRenResult(msg);
    } else {
      setRenResult("プラスとマイナスが同額です。詳細な調査と専門家への相談をお勧めします。");
    }
  }

  const tabs: { id: Tab; label: string; icon: string; free: boolean }[] = [
    { id: "simulator", label: "相続税試算", icon: "💴", free: true },
    { id: "timeline", label: "手続き期限", icon: "📅", free: true },
    { id: "document", label: "協議書雛形", icon: "📝", free: false },
    { id: "renunciation", label: "放棄判定", icon: "⚖️", free: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">⚖️ 相続AI</Link>
        <div className="flex gap-3 items-center text-sm">
          {isPremium ? (
            <span className="bg-amber-400 text-indigo-900 px-2 py-0.5 rounded-full text-xs font-bold">PREMIUM</span>
          ) : (
            <button onClick={() => setShowModal(true)} className="bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-3 py-1 rounded-lg text-xs transition-colors">プレミアム ¥980/月</button>
          )}
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-indigo-900 mb-2">相続AIツール</h1>
        <p className="text-slate-500 text-sm mb-6">相続税の試算から手続き期限管理まで、AIがサポートします</p>
        {!isPremium && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-amber-800 font-semibold text-sm">無料利用: {useCount}/3回</p>
              <p className="text-amber-600 text-xs">遺産分割協議書雛形生成はプレミアム機能です</p>
            </div>
            <button onClick={() => setShowModal(true)} className="bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">アップグレード</button>
          </div>
        )}
        <div className="flex gap-1 mb-6 bg-slate-200 rounded-xl p-1 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={"flex-1 min-w-[80px] py-2 px-2 rounded-lg text-xs font-bold transition-all " + (activeTab === tab.id ? "bg-white text-indigo-900 shadow-sm" : "text-slate-600 hover:text-slate-800")}>
              <span className="block text-base mb-0.5">{tab.icon}</span>
              {tab.label}
              {!tab.free && <span className="block text-amber-500 text-[10px]">PRO</span>}
            </button>
          ))}
        </div>
        {activeTab === "simulator" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-900 mb-4">相続税シミュレーター</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">遺産総額（万円）</label>
                <input type="number" value={estateTotal} onChange={e => setEstateTotal(e.target.value)} placeholder="例: 5000" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">法定相続人数（人）</label>
                <input type="number" value={heirCount} onChange={e => setHeirCount(e.target.value)} min="1" max="20" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="spouse" checked={hasSpouse} onChange={e => setHasSpouse(e.target.checked)} className="w-4 h-4 text-indigo-600" />
                <label htmlFor="spouse" className="text-sm text-slate-700">配偶者が相続人に含まれる（配偶者控除を適用）</label>
              </div>
              <button onClick={handleSimulate} disabled={!estateTotal} className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-colors">相続税を計算する</button>
            </div>
            {simResult && (
              <div className="mt-6 bg-indigo-50 rounded-xl p-5">
                <h3 className="font-bold text-indigo-900 mb-3">計算結果</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-600">遺産総額</span><span className="font-bold">{simResult.total.toLocaleString()}万円</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">基礎控除額（3,000万+600万×{simResult.heirs}人）</span><span className="font-bold">{simResult.basic.toLocaleString()}万円</span></div>
                  <div className="flex justify-between border-t border-indigo-200 pt-2"><span className="text-slate-600">課税対象額</span><span className={"font-bold " + (simResult.taxable > 0 ? "text-red-600" : "text-green-600")}>{simResult.taxable.toLocaleString()}万円</span></div>
                  {simResult.taxable > 0 ? (
                    <div className="flex justify-between text-lg border-t border-indigo-200 pt-2">
                      <span className="font-bold text-indigo-900">相続税概算額</span>
                      <span className="font-black text-red-600">{simResult.tax.toLocaleString()}万円</span>
                    </div>
                  ) : (
                    <div className="mt-2 p-3 bg-green-100 rounded-lg text-green-700 text-sm font-medium">相続税はかかりません（基礎控除内）</div>
                  )}
                  {hasSpouse && simResult.taxable > 0 && <p className="text-xs text-slate-500">※ 配偶者の税額軽減（1/2）を適用した概算です</p>}
                  <p className="text-xs text-slate-400 mt-2">この計算は概算です。実際の相続税は財産の種類・評価方法・各種控除により異なります。税理士にご相談ください。</p>
                </div>
                <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("相続税シミュレーター結果\n遺産総額: " + simResult.total.toLocaleString() + "万円\n相続税概算: " + (simResult.taxable > 0 ? simResult.tax.toLocaleString() + "万円" : "0円（非課税）") + "\n\nhttps://soukoku-ai.vercel.app\n#相続AI #相続税")} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors w-full">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  この結果をXでシェアする
                </a>
                {simResult.taxable > 0 && (
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-800 font-bold text-sm mb-1">💡 相続税がかかります — 税理士への相談をお勧めします</p>
                    <p className="text-amber-700 text-xs mb-3">相続税の節税・申告には専門家のサポートが不可欠です。税理士ドットコムで無料相談できます。</p>
                    <a href="https://www.zeiri4.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">税理士ドットコムで無料相談 →</a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {activeTab === "timeline" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-900 mb-4">手続きタイムライン</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">相続開始日（亡くなった日）</label>
                <input type="date" value={inheritanceDate} onChange={e => setInheritanceDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={handleTimeline} disabled={!inheritanceDate} className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-colors">期限を確認する</button>
            </div>
            {timelines.length > 0 && (
              <div className="space-y-3">
                {timelines.map((t, i) => (
                  <div key={i} className={"flex justify-between items-center p-3 rounded-lg " + (t.urgent ? "bg-red-50 border border-red-200" : "bg-slate-50 border border-slate-200")}>
                    <div>
                      <p className={"text-sm font-medium " + (t.urgent ? "text-red-700" : "text-slate-700")}>{t.label}</p>
                      {t.urgent && <span className="text-xs text-red-500 font-bold">要注意</span>}
                    </div>
                    <span className={"text-sm font-bold " + (t.urgent ? "text-red-600" : "text-slate-600")}>{t.date}</span>
                  </div>
                ))}
                <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("相続手続きタイムライン\n相続開始日: " + inheritanceDate + "\n最重要期限: 相続放棄は3ヶ月以内・相続税申告は10ヶ月以内\n\nhttps://soukoku-ai.vercel.app\n#相続AI #相続手続き")} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors w-full">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  タイムラインをXでシェアする
                </a>
              </div>
            )}
          </div>
        )}
        {activeTab === "document" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-900 mb-1">遺産分割協議書雛形生成</h2>
            <div className="inline-block bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full mb-4 font-medium">プレミアム機能</div>
            {!isPremium && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <p className="text-amber-800 text-sm font-medium mb-2">この機能はプレミアムプランでご利用いただけます</p>
                <button onClick={() => setShowModal(true)} className="bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">プレミアムにアップグレード（¥980/月）</button>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">被相続人（亡くなった方）の氏名</label>
                <input type="text" value={docForm.deceasedName} onChange={e => setDocForm({...docForm, deceasedName: e.target.value})} placeholder="例: 田中太郎" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">相続人の氏名（カンマ区切り）</label>
                <input type="text" value={docForm.heirNames} onChange={e => setDocForm({...docForm, heirNames: e.target.value})} placeholder="例: 田中花子, 田中一郎" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">相続財産の概要</label>
                <textarea value={docForm.assets} onChange={e => setDocForm({...docForm, assets: e.target.value})} placeholder="例: 預貯金2,000万円（○○銀行）、土地・建物（○○市）" rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">分割内容（希望）</label>
                <textarea value={docForm.distribution} onChange={e => setDocForm({...docForm, distribution: e.target.value})} placeholder="例: 田中花子が不動産全て、田中一郎が預貯金" rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={handleDocGenerate} disabled={docLoading || !isPremium} className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-colors">
                {docLoading ? "生成中..." : isPremium ? "協議書雛形を生成する" : "プレミアムプランで利用する"}
              </button>
              {docLoading && (
                <div className="text-center mt-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">⚖️ 遺産情報分析 → 📊 相続税計算 → 📋 手続き一覧生成</p>
                </div>
              )}
            </div>
            {docResult && (
              <div className="mt-6 bg-slate-50 rounded-xl p-5">
                <h3 className="font-bold text-indigo-900 mb-3">遺産分割協議書（雛形）</h3>
                <div className="text-sm text-slate-700 whitespace-pre-wrap font-mono bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">{docResult}</div>
                <p className="text-xs text-slate-400 mt-2">※ この雛形はAIが生成したものです。実際の遺産分割協議書の確認には弁護士・司法書士にご相談ください。</p>
              </div>
            )}
          </div>
        )}
        {activeTab === "renunciation" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-900 mb-4">相続放棄シミュレーター</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">プラスの財産合計（万円）</label>
                <input type="number" value={posAssets} onChange={e => setPosAssets(e.target.value)} placeholder="例: 1000（預貯金・不動産など）" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">マイナスの財産合計（万円）</label>
                <input type="number" value={negAssets} onChange={e => setNegAssets(e.target.value)} placeholder="例: 2000（借金・保証債務など）" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={handleRenunciation} disabled={!posAssets || !negAssets} className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-colors">相続放棄の判定を行う</button>
            </div>
            {renResult && (
              <div className={"mt-6 rounded-xl p-5 " + (renResult.includes("不要") ? "bg-green-50 border border-green-200" : renResult.includes("検討") ? "bg-red-50 border border-red-200" : "bg-amber-50 border border-amber-200")}>
                <h3 className={"font-bold mb-3 " + (renResult.includes("不要") ? "text-green-800" : renResult.includes("検討") ? "text-red-800" : "text-amber-800")}>判定結果</h3>
                <p className="text-sm whitespace-pre-line text-slate-700">{renResult}</p>
                <p className="text-xs text-slate-400 mt-3">※ この判定はシミュレーションです。実際の判断は必ず専門家にご相談ください。</p>
                <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("相続放棄シミュレーター結果\nプラス資産: " + (posAssets || "0") + "万円 / マイナス資産: " + (negAssets || "0") + "万円\n判定: " + (renResult.includes("不要") ? "相続放棄は不要" : renResult.includes("検討") ? "相続放棄を検討推奨" : "要専門家相談") + "\n\nhttps://soukoku-ai.vercel.app\n#相続AI #相続放棄")} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors w-full">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  判定結果をXでシェアする
                </a>
              </div>
            )}
          </div>
        )}
        {/* 次のアクション3選 */}
        <div className="mt-6 bg-white border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-bold text-amber-800 mb-3">📋 次にやるべきこと3選</p>
          <ol className="space-y-2">
            {[
              { icon: "📅", text: "相続発生日から3ヶ月以内に相続放棄の期限を確認・対応する" },
              { icon: "📄", text: "法務局・税務署に提出が必要な書類リストを作成して準備する" },
              { icon: "⚖️", text: "税理士ドットコムで相続専門の税理士に無料相談を申し込む" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-lg leading-none">{item.icon}</span>
                <span>{i + 1}. {item.text}</span>
              </li>
            ))}
          </ol>
        </div>
        {/* 専門家相談アフィリエイト（A8.net） */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm font-black text-amber-900 mb-1">⚖️ 相続の専門家に相談する</p>
          <p className="text-xs text-amber-700 mb-4">相続税・遺産分割・相続放棄は専門家のサポートで安心して進められます。初回相談無料の事務所多数。</p>
          <div className="grid grid-cols-1 gap-3">
            <a href="https://www.bengo4.com/c_18/" target="_blank" rel="noopener noreferrer sponsored"
              className="flex items-center justify-between bg-white border border-amber-300 rounded-xl px-4 py-3 hover:bg-amber-50 transition-colors">
              <div>
                <div className="text-sm font-bold text-slate-800">弁護士ドットコム — 相続専門</div>
                <div className="text-xs text-slate-500 mt-0.5">初回相談無料 • 全国対応 • 土日OK</div>
              </div>
              <span className="text-amber-600 font-bold text-xs bg-amber-100 px-2 py-1 rounded-full">無料相談 →</span>
            </a>
            <a href="https://zeirishi.mynavi.jp/column/inheritance/" target="_blank" rel="noopener noreferrer sponsored"
              className="flex items-center justify-between bg-white border border-amber-300 rounded-xl px-4 py-3 hover:bg-amber-50 transition-colors">
              <div>
                <div className="text-sm font-bold text-slate-800">税理士ドットコム — 相続税申告</div>
                <div className="text-xs text-slate-500 mt-0.5">相続税申告実績No.1 • 費用の目安を無料診断</div>
              </div>
              <span className="text-amber-600 font-bold text-xs bg-amber-100 px-2 py-1 rounded-full">費用診断 →</span>
            </a>
            <a href="https://www.legal-mall.com/s/souzoku" target="_blank" rel="noopener noreferrer sponsored"
              className="flex items-center justify-between bg-white border border-amber-300 rounded-xl px-4 py-3 hover:bg-amber-50 transition-colors">
              <div>
                <div className="text-sm font-bold text-slate-800">ベンナビ相続 — 司法書士・弁護士</div>
                <div className="text-xs text-slate-500 mt-0.5">遺産分割・相続登記に特化 • 近くの専門家を検索</div>
              </div>
              <span className="text-amber-600 font-bold text-xs bg-amber-100 px-2 py-1 rounded-full">専門家検索 →</span>
            </a>
            {/* A8.net: FPカフェ 無料FP相談 */}
            <a href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+2SMA0I+5ULO+5YZ75" target="_blank" rel="noopener noreferrer sponsored"
              className="flex items-center justify-between bg-white border border-amber-300 rounded-xl px-4 py-3 hover:bg-amber-50 transition-colors">
              <div>
                <div className="text-sm font-bold text-slate-800">FPカフェ — 無料FP相談</div>
                <div className="text-xs text-slate-500 mt-0.5">相続・資産承継の無料ファイナンシャルプランナー相談</div>
              </div>
              <span className="text-amber-600 font-bold text-xs bg-amber-100 px-2 py-1 rounded-full">無料でFP相談してみる →</span>
            </a>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">※ 広告・PR掲載（各社公式サイトに遷移します）</p>
        </div>

        <div className="mt-4 bg-slate-100 rounded-xl p-4">
          <p className="text-xs text-slate-500 text-center">※ 本ツールはAIによる情報提供を目的としており、法律・税務・財務に関する専門的アドバイスではありません。重要な判断は必ず弁護士・税理士等の有資格者にご相談ください。</p>
        </div>
      </div>
      <PayjpModal isOpen={showModal} onClose={() => setShowModal(false)} onSuccess={() => { setIsPremium(true); setShowModal(false); }} />
    </div>
  );
}
