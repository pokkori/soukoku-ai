"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import KomojuButton from "@/components/KomojuButton";
import { updateStreak, loadStreak, getStreakMilestoneMessage, type StreakData } from "@/lib/streak";

const HISTORY_KEY = "souzoku_history";
const MAX_HISTORY = 5;

interface DiagnosisHistory {
  id: string;
  date: string;
  concern: string;
  summary: string;
}

function saveHistory(concern: string, raw: string) {
  try {
    const existing: DiagnosisHistory[] = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    const item: DiagnosisHistory = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("ja-JP"),
      concern: concern.slice(0, 30),
      summary: raw.slice(0, 80).replace(/\n/g, " "),
    };
    localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...existing].slice(0, MAX_HISTORY)));
  } catch { /* noop */ }
}

function DiagnosisHistoryPanel() {
  const [history, setHistory] = useState<DiagnosisHistory[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]")); } catch { /* noop */ }
  }, []);
  if (history.length === 0) return null;
  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg rounded-2xl mb-4 overflow-hidden">
      <button type="button" onClick={() => setOpen(o => !o)}
        aria-expanded={open} aria-label="過去の診断履歴を表示"
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-50/60 transition-colors text-left">
        <span className="text-sm font-bold text-purple-800">過去の診断履歴（直近{history.length}件）</span>
        <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className="border-t border-purple-100 divide-y divide-purple-50">
          {history.map(h => (
            <li key={h.id} className="px-4 py-2">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs text-gray-500">{h.date}</span>
              </div>
              <p className="text-xs font-medium text-gray-700 truncate">{h.concern || "（相談内容）"}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{h.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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

type Tab = "simulator" | "timeline" | "document" | "renunciation" | "checklist" | "quickcalc" | "setsuzei" | "flowchart" | "kiso";

const CHECKLIST_ITEMS = [
  {
    phase: "【緊急】死亡直後（7日以内）",
    color: "red",
    items: [
      { id: "c1", text: "死亡診断書の受け取り（医師から）" },
      { id: "c2", text: "死亡届の提出（7日以内・市区町村役場）" },
      { id: "c3", text: "火葬許可証の取得" },
      { id: "c4", text: "遺言書の有無を確認（自筆・公正証書・法務局保管）" },
      { id: "c5", text: "葬儀社・お寺との連絡・手続き" },
    ],
  },
  {
    phase: "【重要】3ヶ月以内（最重要期限）",
    color: "orange",
    items: [
      { id: "c6", text: "相続人の確定（戸籍謄本の取得・調査）" },
      { id: "c7", text: "相続財産・負債の調査（銀行・不動産・保険・借金）" },
      { id: "c8", text: "相続放棄・限定承認の検討（3ヶ月が期限）" },
      { id: "c9", text: "必要なら家庭裁判所に相続放棄申述" },
      { id: "c10", text: "故人の健康保険・年金の資格喪失手続き" },
    ],
  },
  {
    phase: "4ヶ月以内",
    color: "amber",
    items: [
      { id: "c11", text: "準確定申告（故人の所得税申告）— 税務署へ提出" },
      { id: "c12", text: "故人の事業継続がある場合は廃業届または承継手続き" },
    ],
  },
  {
    phase: "10ヶ月以内（相続税申告期限）",
    color: "indigo",
    items: [
      { id: "c13", text: "遺産分割協議の実施（相続人全員の合意）" },
      { id: "c14", text: "遺産分割協議書の作成・署名・捺印" },
      { id: "c15", text: "相続税申告書の作成・提出（税務署）" },
      { id: "c16", text: "相続税の納付（10ヶ月が期限）" },
      { id: "c17", text: "不動産の相続登記（法務局）" },
      { id: "c18", text: "銀行口座の名義変更・解約" },
      { id: "c19", text: "自動車・有価証券の名義変更" },
      { id: "c20", text: "生命保険の保険金請求（3年が消滅時効）" },
    ],
  },
  {
    phase: "その他の手続き",
    color: "green",
    items: [
      { id: "c21", text: "クレジットカードの解約・未払い確認" },
      { id: "c22", text: "携帯電話・定期購読サービスの解約" },
      { id: "c23", text: "デジタル資産（SNS・ネット銀行）の整理" },
      { id: "c24", text: "相続完了報告（税理士・弁護士への最終確認）" },
    ],
  },
];

// ===== 状況診断フローチャート =====
function SituationFlowchart({ onSelectTab }: { onSelectTab: (tab: string) => void }) {
  const [step, setStep] = useState<number | null>(null);
  const [answer, setAnswer] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 0,
      text: "相続が発生してから、今どのくらい経ちましたか？",
      options: [
        { label: "亡くなったばかり（1週間以内）", value: "just", next: 1 },
        { label: "1ヶ月以内", value: "1m", next: 2 },
        { label: "3ヶ月以内（相続放棄の期限が迫っている）", value: "3m", next: 3 },
        { label: "3ヶ月〜10ヶ月", value: "10m", next: 4 },
        { label: "10ヶ月以上経過している", value: "over", next: 5 },
      ],
    },
  ];

  type Result = { title: string; message: string; urgent: boolean; tab: string; tabLabel: string };
  const results: Record<number, Result> = {
    1: {
      title: "今すぐやること：死亡届・遺言書確認",
      message: "死亡届は7日以内に提出が必要です。まず遺言書の有無を確認し、火葬許可証を取得してください。相続放棄の検討は3ヶ月以内ですが、今から財産・負債の調査を始めましょう。",
      urgent: true,
      tab: "checklist",
      tabLabel: "手続きチェックリストを確認する",
    },
    2: {
      title: "相続人・財産の確定が最優先",
      message: "まず戸籍謄本を集めて相続人を確定しましょう。銀行・不動産・保険・借金の調査も進めてください。相続放棄（3ヶ月）の期限が近づいています。借金が多い場合は早めに専門家に相談を。",
      urgent: true,
      tab: "timeline",
      tabLabel: "手続き期限を確認する",
    },
    3: {
      title: "⚠️ 相続放棄の期限が迫っています",
      message: "相続放棄の申述期限（3ヶ月）が近いです。借金がプラス財産を上回る場合は、今すぐ家庭裁判所に申述が必要です。放棄シミュレーターで判定してください。",
      urgent: true,
      tab: "renunciation",
      tabLabel: "相続放棄シミュレーターを使う",
    },
    4: {
      title: "遺産分割協議と相続税申告の準備へ",
      message: "10ヶ月以内の相続税申告期限に向けて、遺産分割協議書の作成と相続税の計算が必要です。税理士への相談を検討してください。相続税がかかるか先に試算しましょう。",
      urgent: false,
      tab: "simulator",
      tabLabel: "相続税を試算する",
    },
    5: {
      title: "期限を過ぎた手続きの確認が必要",
      message: "10ヶ月の申告期限が過ぎている場合、延滞税・加算税が発生している可能性があります。早急に税理士に相談してください。不動産登記（相続登記）も2024年より義務化されています。",
      urgent: true,
      tab: "checklist",
      tabLabel: "残りの手続きを確認する",
    },
  };

  if (step === null) {
    return (
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
        <h2 className="text-lg font-bold text-indigo-900 mb-1">相続状況クイック診断</h2>
        <p className="text-xs text-slate-500 mb-5">あなたの状況に合ったツールへ案内します（30秒）</p>
        <p className="text-sm font-medium text-slate-700 mb-3">{questions[0].text}</p>
        <div className="space-y-2">
          {questions[0].options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setAnswer({ 0: opt.value }); setStep(opt.next); }}
              aria-label={`相続発生からの期間「${opt.label}」を選択`}
              className="w-full text-left px-4 py-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-sm text-indigo-900 font-medium transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const result = results[step];
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
      <div className={`rounded-xl p-5 mb-5 ${result.urgent ? "bg-red-50 border-2 border-red-300" : "bg-indigo-50 border-2 border-indigo-300"}`}>
        <div className={`font-bold text-base mb-2 ${result.urgent ? "text-red-800" : "text-indigo-900"}`}>
          {result.urgent && "⚠️ "}{result.title}
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{result.message}</p>
      </div>
      <button
        type="button"
        onClick={() => onSelectTab(result.tab)}
        aria-label={`${result.tabLabel}へ移動する`}
        className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl mb-3 transition-colors"
      >
        {result.tabLabel} →
      </button>
      <button
        type="button"
        onClick={() => { setStep(null); setAnswer({}); }}
        aria-label="相続状況クイック診断を最初からやり直す"
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-xl text-sm transition-colors"
      >
        最初からやり直す
      </button>
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
        ⚠️ このガイドはAIによる一般的な情報です。具体的な期限・手続きは必ず専門家にご確認ください。
      </div>
    </div>
  );
}

// ===== 相続関係説明図 =====
interface FamilyMember {
  hasSpouse: boolean;
  childrenCount: number;
  hasParent: boolean;
  hasSiblings: boolean;
}

function FamilyTreeSVG({ family }: { family: FamilyMember }) {
  const centerX = 200;
  const centerY = 80;

  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
      <p className="text-xs font-bold text-gray-600 mb-2" id="family-tree-label">相続関係図（自動生成）</p>
      <svg
        width="400"
        height="180"
        viewBox="0 0 400 180"
        role="img"
        aria-labelledby="family-tree-label"
        className="w-full max-w-[400px] mx-auto block"
      >
        {/* 被相続人（本人） */}
        <rect x={centerX - 40} y={centerY - 18} width="80" height="36" rx="8" fill="#1e40af" />
        <text x={centerX} y={centerY + 6} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">被相続人</text>

        {/* 配偶者 */}
        {family.hasSpouse && (
          <>
            <line x1={centerX + 40} y1={centerY} x2={centerX + 100} y2={centerY} stroke="#374151" strokeWidth="2" />
            <rect x={centerX + 100} y={centerY - 18} width="80" height="36" rx="8" fill="#be185d" />
            <text x={centerX + 140} y={centerY + 6} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">配偶者</text>
          </>
        )}

        {/* 子供 */}
        {family.childrenCount > 0 && (
          <>
            <line x1={centerX} y1={centerY + 18} x2={centerX} y2={centerY + 50} stroke="#374151" strokeWidth="2" />
            <line x1={centerX - 40 * Math.min(family.childrenCount, 4)} y1={centerY + 50} x2={centerX + 40 * Math.min(family.childrenCount, 4)} y2={centerY + 50} stroke="#374151" strokeWidth="2" />
            {Array.from({ length: Math.min(family.childrenCount, 4) }, (_, i) => {
              const totalW = Math.min(family.childrenCount, 4);
              const xPos = centerX - 40 * (totalW - 1) + i * 80;
              return (
                <g key={i}>
                  <line x1={xPos} y1={centerY + 50} x2={xPos} y2={centerY + 80} stroke="#374151" strokeWidth="2" />
                  <rect x={xPos - 28} y={centerY + 80} width="56" height="30" rx="6" fill="#15803d" />
                  <text x={xPos} y={centerY + 100} textAnchor="middle" fill="white" fontSize="11">{family.childrenCount > 4 && i === 3 ? `他${family.childrenCount - 3}名` : `子 ${i + 1}`}</text>
                </g>
              );
            })}
          </>
        )}

        {/* 親 */}
        {family.hasParent && !family.childrenCount && (
          <>
            <line x1={centerX} y1={centerY - 18} x2={centerX} y2={centerY - 50} stroke="#374151" strokeWidth="2" />
            <rect x={centerX - 28} y={centerY - 80} width="56" height="30" rx="6" fill="#7c3aed" />
            <text x={centerX} y={centerY - 60} textAnchor="middle" fill="white" fontSize="11">親</text>
          </>
        )}

        {/* 兄弟 */}
        {family.hasSiblings && !family.childrenCount && !family.hasParent && (
          <>
            <line x1={centerX - 40} y1={centerY} x2={centerX - 100} y2={centerY} stroke="#374151" strokeWidth="2" />
            <rect x={centerX - 180} y={centerY - 18} width="80" height="36" rx="6" fill="#b45309" />
            <text x={centerX - 140} y={centerY + 6} textAnchor="middle" fill="white" fontSize="12">兄弟姉妹</text>
          </>
        )}

        {/* 相続人なしの場合 */}
        {!family.hasSpouse && !family.childrenCount && !family.hasParent && !family.hasSiblings && (
          <text x={centerX} y={centerY + 50} textAnchor="middle" fill="#6b7280" fontSize="12">法定相続人なし</text>
        )}
      </svg>

      {/* 凡例 */}
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <span className="w-3 h-3 rounded-sm bg-blue-800 inline-block" aria-hidden="true" />被相続人
        </span>
        {family.hasSpouse && <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-3 rounded-sm bg-pink-700 inline-block" aria-hidden="true" />配偶者</span>}
        {family.childrenCount > 0 && <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-3 rounded-sm bg-green-700 inline-block" aria-hidden="true" />子（法定相続分 {family.hasSpouse ? "1/2を人数等分" : "全額"}）</span>}
        {family.hasParent && !family.childrenCount && <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-3 rounded-sm bg-purple-700 inline-block" aria-hidden="true" />親（法定相続分 {family.hasSpouse ? "1/3" : "全額"}）</span>}
        {family.hasSiblings && !family.childrenCount && !family.hasParent && <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-3 rounded-sm bg-amber-700 inline-block" aria-hidden="true" />兄弟姉妹（法定相続分 {family.hasSpouse ? "1/4" : "全額"}）</span>}
      </div>
    </div>
  );
}

// ===== 相続税節税診断 =====
function SetsuzeiDiagnosis() {
  const [estate, setEstate] = useState(5000);
  const [heirs, setHeirs] = useState(2);
  const [hasSpouse, setHasSpouse] = useState(true);
  const [hasRealEstate, setHasRealEstate] = useState(false);
  const [realEstateValue, setRealEstateValue] = useState(2000);
  const [showResult, setShowResult] = useState(false);

  const basicDeduction = 3000 + 600 * heirs;
  // 小規模宅地等の特例（居住用宅地330㎡まで80%評価減）
  const koshikochiReduction = hasRealEstate ? Math.min(realEstateValue * 0.8, 1320) : 0;
  const estateAfterKoshikochi = Math.max(0, estate - koshikochiReduction);
  const taxableBaseNoSpec = Math.max(0, estate - basicDeduction);

  function calcTaxSimple(base: number, h: number, sp: boolean): number {
    if (base <= 0) return 0;
    const per = base / h;
    let t = 0;
    if (per <= 1000) t = per * 0.1;
    else if (per <= 3000) t = 100 + (per - 1000) * 0.15;
    else if (per <= 5000) t = 400 + (per - 3000) * 0.2;
    else if (per <= 10000) t = 800 + (per - 5000) * 0.3;
    else if (per <= 20000) t = 2300 + (per - 10000) * 0.4;
    else if (per <= 30000) t = 6300 + (per - 20000) * 0.45;
    else if (per <= 60000) t = 10800 + (per - 30000) * 0.5;
    else t = 25800 + (per - 60000) * 0.55;
    let total = t * h;
    if (sp) total *= 0.5;
    return Math.round(total);
  }

  const estateAfterRed = estateAfterKoshikochi;
  const taxableBase = Math.max(0, estateAfterRed - basicDeduction);
  const taxWithSpec = calcTaxSimple(taxableBase, heirs, hasSpouse);
  const taxWithoutSpec = calcTaxSimple(taxableBaseNoSpec, heirs, hasSpouse);
  const saving = taxWithoutSpec - taxWithSpec;

  const measures = [
    { applicable: hasSpouse, name: "配偶者の税額軽減", effect: "配偶者は1億6,000万円まで、または法定相続分まで相続税ゼロ", impact: "大" },
    { applicable: hasRealEstate, name: "小規模宅地等の特例（居住用）", effect: `居住用宅地${realEstateValue}万円 → 評価額${Math.round(realEstateValue * 0.2).toLocaleString()}万円に圧縮（80%削減）`, impact: "大" },
    { applicable: estate > 10000, name: "生命保険の非課税枠", effect: `相続人数×500万円（${heirs * 500}万円）まで非課税。生命保険に組み替えで節税`, impact: "中" },
    { applicable: estate > 5000, name: "暦年贈与・相続時精算課税", effect: "毎年110万円までの非課税贈与。10年以上前から始めると大きな効果", impact: "中" },
    { applicable: true, name: "葬式費用の控除", effect: "葬儀費用は遺産総額から控除可能。領収書を必ず保管してください", impact: "小" },
  ].filter(m => m.applicable);

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
      <h2 className="text-lg font-bold text-indigo-900 mb-1">相続税節税診断</h2>
      <p className="text-xs text-slate-500 mb-5">主要な節税特例を適用した場合の相続税削減額を試算します</p>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">遺産総額</label>
            <span className="text-xl font-black text-indigo-900">{estate.toLocaleString()}万円</span>
          </div>
          <input type="range" min={500} max={50000} step={500} value={estate}
            onChange={e => setEstate(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>500万円</span><span>5億円</span></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">法定相続人数</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setHeirs(n)}
                className={"flex-1 py-2 rounded-lg font-bold text-sm transition-all border " + (heirs === n ? "bg-indigo-900 text-white border-indigo-900" : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400")}>
                {n}人
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
            <input type="checkbox" id="sp2" checked={hasSpouse} onChange={e => setHasSpouse(e.target.checked)} className="w-4 h-4 text-indigo-600" />
            <label htmlFor="sp2" className="text-sm text-slate-700 cursor-pointer">配偶者あり（配偶者控除を適用）</label>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
            <input type="checkbox" id="re2" checked={hasRealEstate} onChange={e => setHasRealEstate(e.target.checked)} className="w-4 h-4 text-indigo-600" />
            <label htmlFor="re2" className="text-sm text-slate-700 cursor-pointer">居住用不動産あり（小規模宅地特例を適用）</label>
          </div>
          {hasRealEstate && (
            <div className="pl-8 space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs text-slate-600">不動産評価額</label>
                <span className="text-sm font-bold text-indigo-700">{realEstateValue.toLocaleString()}万円</span>
              </div>
              <input type="range" min={500} max={10000} step={500} value={realEstateValue}
                onChange={e => setRealEstateValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600" />
            </div>
          )}
        </div>
        <button onClick={() => setShowResult(true)}
          className="w-full bg-indigo-900/90 hover:bg-white/20 hover:backdrop-blur-sm hover:border hover:border-white/30 text-white font-bold py-3 rounded-xl transition-all shadow-lg">
          節税効果を診断する
        </button>
      </div>
      {showResult && (
        <div className="mt-6 space-y-4">
          <div className="bg-indigo-50 rounded-xl p-5">
            <h3 className="font-bold text-indigo-900 mb-3 text-base">節税診断結果</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500 mb-1">特例なしの場合</p>
                <p className="text-xl font-black text-red-600">{taxWithoutSpec.toLocaleString()}万円</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500 mb-1">特例適用後</p>
                <p className="text-xl font-black text-green-600">{taxWithSpec.toLocaleString()}万円</p>
              </div>
            </div>
            {saving > 0 && (
              <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 text-center mb-3">
                <p className="text-xs text-amber-700 mb-1">節税効果（概算）</p>
                <p className="text-3xl font-black text-amber-600">▼ {saving.toLocaleString()}万円</p>
                <p className="text-xs text-amber-600 mt-1">の相続税削減が見込まれます</p>
              </div>
            )}
            {saving === 0 && taxWithSpec === 0 && (
              <div className="bg-green-100 border border-green-300 rounded-xl p-3 text-center mb-3">
                <p className="text-green-700 font-bold text-sm">相続税はかかりません（基礎控除・特例適用後）</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-indigo-900 text-sm">適用可能な節税対策</h3>
            {measures.map((m, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 items-start">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${m.impact === "大" ? "bg-red-100 text-red-700" : m.impact === "中" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                  効果{m.impact}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">{m.name}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{m.effect}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-amber-800 font-bold text-sm mb-1">💡 節税には専門家の確認が不可欠です</p>
            <p className="text-amber-700 text-xs mb-3">小規模宅地特例・配偶者控除の適用には要件があります。相続税の申告前に必ず税理士にご相談ください。</p>
            <a href="https://www.zeiri4.com/" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">
              税理士ドットコムで無料相談 →
            </a>
          </div>
          <p className="text-xs text-slate-400 text-center">※ この試算はあくまで概算です。実際の相続税は財産の評価方法・各種特例の適用要件によって大きく異なります。</p>
        </div>
      )}
    </div>
  );
}

export default function ToolPage() {
  const [activeTab, setActiveTab] = useState<Tab>("quickcalc");
  const [isPremium, setIsPremium] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [useCount, setUseCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [streakMsg, setStreakMsg] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("soukoku_checklist");
    if (saved) setCheckedItems(JSON.parse(saved));
    setStreak(loadStreak("souzoku"));
  }, []);

  function toggleCheck(id: string) {
    const next = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(next);
    localStorage.setItem("soukoku_checklist", JSON.stringify(next));
  }

  const totalItems = CHECKLIST_ITEMS.reduce((sum, p) => sum + p.items.length, 0);
  const doneItems = Object.values(checkedItems).filter(Boolean).length;
  // かんたん試算
  const [quickEstate, setQuickEstate] = useState(3000);
  const [quickHeirs, setQuickHeirs] = useState(2);
  const quickBasic = 3000 + 600 * quickHeirs;
  const quickTaxable = Math.max(0, quickEstate - quickBasic);

  const [estateTotal, setEstateTotal] = useState("");
  const [heirCount, setHeirCount] = useState("2");
  const [hasSpouse, setHasSpouse] = useState(true);
  const [simResult, setSimResult] = useState<{basic:number;taxable:number;tax:number;total:number;heirs:number} | null>(null);
  const [inheritanceDate, setInheritanceDate] = useState("");
  const [timelines, setTimelines] = useState<{label:string;date:string;urgent:boolean}[]>([]);
  const [docForm, setDocForm] = useState({ deceasedName:"", heirNames:"", assets:"", distribution:"" });
  const [docResult, setDocResult] = useState("");
  const SITUATION_PRESETS = [
    { icon: "親", label: "親が亡くなった", assets: "父が先月亡くなりました。相続人は母と子供2人（私と弟）です。遺言書はありません。", distribution: "" },
    { icon: "土", label: "不動産あり", assets: "実家の土地・建物（評価額3000万円）の相続について知りたいです。", distribution: "不動産の分割方法を検討中です。" },
    { icon: "預", label: "預貯金のみ", assets: "預貯金が2000万円あります。相続人は子供3人で、分け方でもめています。", distribution: "均等分割を希望しますが協議中です。" },
    { icon: "遺", label: "遺言書あり", assets: "遺言書が見つかりました。内容に納得できない相続人がいます。", distribution: "遺言書の内容と異なる分割を希望する相続人がいます。" },
    { icon: "債", label: "借金あり", assets: "亡くなった親に借金（負債）があることがわかりました。相続放棄を考えています。", distribution: "相続放棄の方向で検討中です。" },
  ];
  // 基礎控除計算機
  const [kisoHeirs, setKisoHeirs] = useState(2);
  const kisoDeduction = 3000 + 600 * kisoHeirs;

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
      saveHistory(docForm.assets, buf);
      const s = updateStreak("souzoku"); setStreak(s); const msg = getStreakMilestoneMessage(s.count); if (msg) setStreakMsg(msg);
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
    { id: "quickcalc", label: "かんたん試算", icon: "計", free: true },
    { id: "kiso", label: "基礎控除計算", icon: "控", free: true },
    { id: "flowchart", label: "状況診断", icon: "診", free: true },
    { id: "simulator", label: "相続税試算", icon: "税", free: true },
    { id: "setsuzei", label: "節税診断", icon: "節", free: true },
    { id: "timeline", label: "手続き期限", icon: "期", free: true },
    { id: "checklist", label: "チェックリスト", icon: "確", free: true },
    { id: "document", label: "協議書雛形", icon: "書", free: false },
    { id: "renunciation", label: "放棄判定", icon: "放", free: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">相続AI</Link>
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
        {streak && streak.count > 0 && <div className="mt-2 inline-flex items-center gap-2 backdrop-blur-sm bg-orange-50/70 border border-orange-200/60 shadow-md rounded-full px-3 py-1 text-sm"><span>{streak.count}日連続利用中</span></div>}
        {streakMsg && <div className="mt-2 ml-2 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-300 rounded-full px-3 py-1 text-sm text-yellow-700">{streakMsg}</div>}
        <p className="text-slate-500 text-sm mb-6">相続税の試算から手続き期限管理まで、AIがサポートします</p>
        {!isPremium && (
          <div className="backdrop-blur-sm bg-amber-50/80 border border-amber-200/60 shadow-lg rounded-xl p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-amber-800 font-semibold text-sm">無料利用: {useCount}/3回</p>
              <p className="text-amber-600 text-xs">遺産分割協議書雛形生成はプレミアム機能です</p>
            </div>
            <button onClick={() => setShowModal(true)} className="bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">アップグレード</button>
          </div>
        )}
        <div className="flex gap-1 mb-6 backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-1 overflow-x-auto shadow-md">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={"flex-1 min-w-[80px] py-2 px-2 rounded-lg text-xs font-bold transition-all " + (activeTab === tab.id ? "bg-white text-indigo-900 shadow-sm" : "text-slate-600 hover:text-slate-800")}>
              <span className="block text-base mb-0.5">{tab.icon}</span>
              {tab.label}
              {!tab.free && <span className="block text-amber-500 text-[10px]">PRO</span>}
            </button>
          ))}
        </div>
        {activeTab === "quickcalc" && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
            <h2 className="text-lg font-bold text-indigo-900 mb-1">相続税かんたん試算</h2>
            <p className="text-xs text-slate-500 mb-5">スライダーを動かすだけでリアルタイム計算！</p>
            <div className="space-y-6">
              {/* 遺産総額スライダー */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">遺産総額</label>
                  <span className="text-xl font-black text-indigo-900">{quickEstate.toLocaleString()}万円</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={30000}
                  step={100}
                  value={quickEstate}
                  onChange={e => setQuickEstate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>500万円</span>
                  <span>3億円</span>
                </div>
              </div>
              {/* 法定相続人数ボタン */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">法定相続人数</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setQuickHeirs(n)}
                      className={"flex-1 py-2 rounded-lg font-bold text-sm transition-all border " +
                        (quickHeirs === n
                          ? "bg-indigo-900 text-white border-indigo-900"
                          : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400")}
                    >
                      {n}人
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* リアルタイム結果 */}
            <div className="mt-6 bg-indigo-50 rounded-xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">基礎控除額</span>
                <span className="font-bold text-slate-800">
                  3,000万 + 600万 × {quickHeirs}人 = <span className="text-indigo-700">{quickBasic.toLocaleString()}万円</span>
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-indigo-200 pt-3">
                <span className="text-slate-600">課税遺産（概算）</span>
                <span className={"text-lg font-black " + (quickTaxable > 0 ? "text-red-600" : "text-green-600")}>
                  {quickTaxable > 0 ? `+${quickTaxable.toLocaleString()}万円` : "0円（非課税）"}
                </span>
              </div>
              {quickTaxable === 0 ? (
                <div className="mt-2 p-3 bg-green-100 rounded-lg text-green-700 text-sm font-bold text-center">
                  相続税はかかりません
                </div>
              ) : (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                  <p className="text-red-700 font-bold text-sm">課税遺産が発生しています</p>
                  <p className="text-red-600 text-xs mt-1">詳細な税額は財産の種類・評価額・各種控除により異なります</p>
                  <a
                    href="https://www.zeiri4.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    税理士に無料相談する →
                  </a>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠️</span>
              <p className="text-xs text-amber-700">
                この試算はあくまで目安です。実際の相続税は財産の種類・評価額・各種控除（配偶者控除・小規模宅地等の特例など）により異なります。正確な金額は税理士にご確認ください。
              </p>
            </div>
          </div>
        )}
        {activeTab === "simulator" && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
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
              <button onClick={handleSimulate} disabled={!estateTotal} aria-label="入力した遺産情報をもとに相続税を計算する" className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-colors">相続税を計算する</button>
            </div>
            {simResult && (
              <div className="mt-6">
                <FamilyTreeSVG family={{
                  hasSpouse: hasSpouse,
                  childrenCount: Math.max(0, parseInt(heirCount) - (hasSpouse ? 1 : 0)),
                  hasParent: false,
                  hasSiblings: false,
                }} />
              <div className="bg-indigo-50 rounded-xl p-5">
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
                <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-800 font-bold text-sm mb-1">⚖️ 遺産分割・相続放棄は弁護士に相談を</p>
                  <p className="text-green-700 text-xs mb-3">相続税だけでなく、遺産分割の協議や相続放棄の手続きには弁護士・司法書士のサポートが安心です。初回無料相談から始められます。</p>
                  <a href="https://www.bengo4.com/c_18/" target="_blank" rel="noopener noreferrer sponsored" className="block w-full text-center bg-white border border-green-300 hover:bg-green-50 text-green-800 font-bold px-4 py-2 rounded-lg text-sm transition-colors">弁護士ドットコムで無料相談する（相続専門）→</a>
                </div>
              </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "timeline" && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
            <h2 className="text-lg font-bold text-indigo-900 mb-4">手続きタイムライン</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">相続開始日（亡くなった日）</label>
                <input type="date" value={inheritanceDate} onChange={e => setInheritanceDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={handleTimeline} disabled={!inheritanceDate} aria-label="相続発生日から各手続きの期限を確認する" className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-colors">期限を確認する</button>
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
          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
            <h2 className="text-lg font-bold text-indigo-900 mb-1">遺産分割協議書雛形生成</h2>
            <div className="inline-block bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full mb-4 font-medium">プレミアム機能</div>
            {!isPremium && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <p className="text-amber-800 text-sm font-medium mb-2">この機能はプレミアムプランでご利用いただけます</p>
                <button onClick={() => setShowModal(true)} className="bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">プレミアムにアップグレード（¥980/月）</button>
              </div>
            )}
            {/* 相続状況プリセット */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">💡 相続状況プリセット（クリックで入力）</p>
              <div className="flex flex-wrap gap-2">
                {SITUATION_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setDocForm(prev => ({ ...prev, assets: preset.assets, distribution: preset.distribution }))}
                    className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <DiagnosisHistoryPanel />
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
                  <p className="text-xs text-gray-400">遺産情報分析 → 相続税計算 → 手続き一覧生成</p>
                </div>
              )}
            </div>
            {docResult && (
              <div className="mt-6 space-y-4">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-bold text-indigo-900 mb-3">遺産分割協議書（雛形）</h3>
                  <div className="text-sm text-slate-700 whitespace-pre-wrap font-mono bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">{docResult}</div>
                  <p className="text-xs text-slate-400 mt-2">※ この雛形はAIが生成したものです。実際の遺産分割協議書の確認には弁護士・司法書士にご相談ください。</p>
                </div>
                {/* 相続専門家CTA強化バナー */}
                <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-2xl p-6 text-white">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">⚖️</span>
                    <div>
                      <p className="font-black text-base mb-1">相続手続きを専門家に依頼する</p>
                      <p className="text-indigo-200 text-sm">AIが生成した雛形を確認・完成させるために、弁護士・司法書士への相談をお勧めします。初回相談無料の専門家が多数います。</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <a href="https://www.bengo4.com/c_18/" target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 transition-colors">
                      <div>
                        <div className="text-sm font-bold text-white">弁護士ドットコム</div>
                        <div className="text-xs text-indigo-300">遺産争い・相続放棄の相談</div>
                      </div>
                      <span className="text-amber-300 font-bold text-xs bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full whitespace-nowrap ml-2">無料相談 →</span>
                    </a>
                    <a href="https://www.legal-mall.com/s/souzoku" target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 transition-colors">
                      <div>
                        <div className="text-sm font-bold text-white">ベンナビ相続</div>
                        <div className="text-xs text-indigo-300">司法書士・相続登記に強い</div>
                      </div>
                      <span className="text-amber-300 font-bold text-xs bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full whitespace-nowrap ml-2">専門家を探す →</span>
                    </a>
                  </div>
                  <p className="text-xs text-indigo-400 text-center mt-3">※ 広告・PR（各社公式サイトに遷移します）</p>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "renunciation" && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
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
              <button onClick={handleRenunciation} disabled={!posAssets || !negAssets} aria-label="プラス財産とマイナス財産を比較して相続放棄の判定を行う" className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-colors">相続放棄の判定を行う</button>
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
        {activeTab === "checklist" && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-indigo-900">相続手続きチェックリスト</h2>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => window.print()}
                  className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg font-bold transition-colors"
                >
                  🖨️ 印刷
                </button>
                <button
                  onClick={() => { setCheckedItems({}); localStorage.removeItem("soukoku_checklist"); }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >リセット</button>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-600">進捗: {doneItems}/{totalItems}項目</span>
                <span className="text-sm font-bold text-indigo-700">{Math.round((doneItems / totalItems) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(doneItems / totalItems) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-5">
              {CHECKLIST_ITEMS.map((phase) => (
                <div key={phase.phase}>
                  <h3 className="text-sm font-bold text-slate-700 mb-2 border-b border-slate-200 pb-1">{phase.phase}</h3>
                  <div className="space-y-2">
                    {phase.items.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                          checkedItems[item.id] ? "bg-green-50 border border-green-200" : "bg-slate-50 hover:bg-slate-100 border border-transparent"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedItems[item.id]}
                          onChange={() => toggleCheck(item.id)}
                          className="mt-0.5 w-4 h-4 text-indigo-600 rounded flex-shrink-0"
                        />
                        <span className={`text-sm ${checkedItems[item.id] ? "line-through text-slate-400" : "text-slate-700"}`}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {doneItems === totalItems && (
              <div className="mt-5 bg-gradient-to-br from-indigo-900 to-indigo-800 border border-indigo-500 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-white font-black text-lg mb-1">全手続き完了！</p>
                <p className="text-indigo-200 text-xs mb-4">お疲れ様でした。相続手続きが全て完了しました。</p>
                <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-4">
                  <div className="text-amber-300 text-sm font-bold mb-1">⚖️ 相続手続き完了証明書</div>
                  <div className="text-white text-xs leading-relaxed">
                    <p className="font-bold text-base text-amber-300">{totalItems}項目 全完了</p>
                    <p className="text-indigo-300 text-xs mt-1">完了日: {new Date().toLocaleDateString("ja-JP")}</p>
                  </div>
                </div>
                <a
                  href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("相続AIで相続手続き全" + totalItems + "項目が完了しました！✅ 死亡直後から相続税申告・不動産登記まで、AIがサポートしてくれて助かりました。⚖️ https://soukoku-ai.vercel.app #相続AI #相続手続き完了")}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-5 rounded-lg text-sm transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  完了をXでシェアする
                </a>
                <p className="text-indigo-300 text-xs mt-3">最終確認として弁護士・税理士への相談をおすすめします。</p>
              </div>
            )}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 font-bold text-sm mb-1">💡 手続きに不安を感じたら</p>
              <p className="text-amber-700 text-xs mb-2">相続専門の弁護士・税理士に相談することで、ミスなく安心して手続きが完了できます。</p>
              <a href="https://www.bengo4.com/c_18/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-xs font-bold hover:underline">弁護士ドットコムで無料相談する →</a>
            </div>
          </div>
        )}
        {activeTab === "kiso" && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
            <h2 className="text-lg font-bold text-indigo-900 mb-1">基礎控除計算機</h2>
            <p className="text-xs text-slate-500 mb-5">法定相続人数を入力するだけで基礎控除額をリアルタイム計算。申告が必要かどうかすぐわかります。</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">法定相続人数（配偶者・子・親・兄弟姉妹の合計）</label>
                <div className="flex flex-wrap gap-2">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <button key={n} onClick={() => setKisoHeirs(n)}
                      className={"px-4 py-2 rounded-lg font-bold text-sm transition-all border " + (kisoHeirs === n ? "bg-indigo-900 text-white border-indigo-900" : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400")}>
                      {n}人
                    </button>
                  ))}
                </div>
              </div>
              {/* リアルタイム計算結果 */}
              <div className="bg-indigo-50 rounded-2xl p-6 space-y-4">
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1">計算式: 3,000万円 + 600万円 × {kisoHeirs}人</p>
                  <p className="text-4xl font-black text-indigo-900">{kisoDeduction.toLocaleString()}<span className="text-xl ml-1">万円</span></p>
                  <p className="text-sm text-indigo-600 mt-1">が基礎控除額です</p>
                </div>
                <div className="border-t border-indigo-200 pt-4 space-y-3">
                  <div className="bg-green-100 border border-green-300 rounded-xl p-4">
                    <p className="text-green-800 font-bold text-sm mb-1">遺産総額が {kisoDeduction.toLocaleString()}万円 以下の場合</p>
                    <p className="text-green-700 text-sm font-black">あなたの相続は申告不要かも？</p>
                    <p className="text-green-600 text-xs mt-1">相続税の申告・納付が不要です（原則として）。ただし小規模宅地特例・生命保険・生前贈与加算などにより課税される場合があります。</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-800 font-bold text-sm mb-1">遺産総額が {kisoDeduction.toLocaleString()}万円 超の場合</p>
                    <p className="text-red-700 text-sm font-black">要申告 — 10ヶ月以内に税務署へ申告が必要</p>
                    <p className="text-red-600 text-xs mt-1 mb-3">申告しない場合のペナルティ: 無申告加算税（15〜20%）・延滞税（年約8.7%）が課せられます。申告期限（相続開始から10ヶ月）を必ず守ってください。</p>
                    <a href="https://www.zeiri4.com/" target="_blank" rel="noopener noreferrer"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors">
                      税理士ドットコムで無料相談する →
                    </a>
                  </div>
                </div>
              </div>
              {/* Xシェアボタン */}
              <a
                href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("相続AIで基礎控除額を計算しました！\n法定相続人" + kisoHeirs + "人 → 基礎控除 " + kisoDeduction.toLocaleString() + "万円\n遺産総額がこれ以下なら相続税申告は不要かも。\n\nhttps://soukoku-ai.vercel.app/tool\n#相続AI #相続税")}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors w-full"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                計算結果をXでシェアする
              </a>
              <p className="text-xs text-slate-400 text-center">
                ※ 基礎控除額は概算です。実際には各種特例・生前贈与・生命保険の非課税枠等により課税額が変わります。正確な判定は税理士にご確認ください。
              </p>
            </div>
          </div>
        )}
        {activeTab === "flowchart" && (
          <SituationFlowchart onSelectTab={(tab) => setActiveTab(tab as Tab)} />
        )}
        {activeTab === "setsuzei" && (
          <SetsuzeiDiagnosis />
        )}
        {/* 次のアクション3選 */}
        <div className="mt-6 backdrop-blur-sm bg-white/30 border border-amber-200/60 shadow-lg rounded-xl p-4">
          <p className="text-sm font-bold text-amber-800 mb-3">次にやるべきこと3選</p>
          <ol className="space-y-2">
            {[
              { step: "1", text: "相続発生日から3ヶ月以内に相続放棄の期限を確認・対応する" },
              { step: "2", text: "法務局・税務署に提出が必要な書類リストを作成して準備する" },
              { step: "3", text: "税理士ドットコムで相続専門の税理士に無料相談を申し込む" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold shrink-0">{item.step}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
        {/* 専門家相談アフィリエイト（A8.net） */}
        <div className="mt-6 backdrop-blur-sm bg-amber-50/80 border border-amber-200/60 shadow-lg rounded-xl p-5">
          <p className="text-sm font-black text-amber-900 mb-1">相続の専門家に相談する</p>
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

        <div className="mt-4 backdrop-blur-sm bg-white/20 border border-white/20 rounded-xl p-4">
          <p className="text-xs text-slate-500 text-center">※ 本ツールはAIによる情報提供を目的としており、法律・税務・財務に関する専門的アドバイスではありません。重要な判断は必ず弁護士・税理士等の有資格者にご相談ください。</p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="backdrop-blur-md bg-white/80 border border-white/30 rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 text-xl">✕</button>
            <div className="text-3xl mb-3 text-center">⚖️</div>
            <h2 className="text-lg font-bold mb-2 text-center">プレミアムプラン</h2>
            <p className="text-sm text-gray-500 mb-4 text-center">相続AI 無制限利用</p>
            <KomojuButton planId="standard" planLabel="プレミアムプラン ¥980/月" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50" />
          </div>
        </div>
      )}
    </div>
  );
}
