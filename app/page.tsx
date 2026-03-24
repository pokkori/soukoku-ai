"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import InheritanceSample from "@/components/InheritanceSample";
import KomojuButton from "@/components/KomojuButton";

// 相続税クイック試算ウィジェット
function InheritanceTaxWidget() {
  const [estateWan, setEstateWan] = useState(5000); // 遺産総額（万円）
  const [heirsCount, setHeirsCount] = useState(2); // 法定相続人数
  const [hasSpouse, setHasSpouse] = useState(true); // 配偶者ありか

  // 基礎控除
  const basicDeduction = 3000 + 600 * heirsCount;
  // 課税遺産総額
  const taxableEstate = Math.max(0, estateWan - basicDeduction);
  // 配偶者控除適用後の簡易試算（配偶者は1億6000万まで非課税）
  const taxableAfterSpouse = hasSpouse ? Math.max(0, taxableEstate * 0.5) : taxableEstate;
  // 相続税の累進計算（簡易）
  function calcInheritanceTax(amount: number): number {
    if (amount <= 0) return 0;
    const brackets = [
      { limit: 1000, rate: 0.10, deduction: 0 },
      { limit: 3000, rate: 0.15, deduction: 50 },
      { limit: 5000, rate: 0.20, deduction: 200 },
      { limit: 10000, rate: 0.30, deduction: 700 },
      { limit: 20000, rate: 0.40, deduction: 1700 },
      { limit: 30000, rate: 0.45, deduction: 2700 },
      { limit: 60000, rate: 0.50, deduction: 4200 },
      { limit: Infinity, rate: 0.55, deduction: 7200 },
    ];
    const b = brackets.find(b => amount <= b.limit) ?? brackets[brackets.length - 1];
    return Math.max(0, Math.round(amount * b.rate - b.deduction));
  }
  // 法定相続分で按分してから合計（簡易）
  const perPerson = taxableAfterSpouse / heirsCount;
  const totalTax = Math.round(calcInheritanceTax(perPerson) * heirsCount);

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 max-w-2xl mx-auto shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">遺産総額（万円）</label>
            <input
              type="range" min={500} max={50000} step={500} value={estateWan}
              onChange={e => setEstateWan(Number(e.target.value))}
              aria-label={`遺産総額を選択（現在: ${estateWan.toLocaleString()}万円）`}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>500万</span>
              <span className="font-black text-indigo-700 text-base">{estateWan.toLocaleString()}万円</span>
              <span>5億</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">法定相続人の数</label>
            <select value={heirsCount} onChange={e => setHeirsCount(Number(e.target.value))}
              aria-label="法定相続人の人数を選択"
              className="w-full border border-indigo-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white">
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}人</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="spouse" checked={hasSpouse} onChange={e => setHasSpouse(e.target.checked)}
              className="w-4 h-4 accent-indigo-600" />
            <label htmlFor="spouse" className="text-sm font-bold text-gray-700">配偶者がいる（配偶者控除を適用）</label>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">基礎控除額</p>
            <p className="text-lg font-black text-indigo-700 mb-3">{basicDeduction.toLocaleString()}万円</p>
            {taxableEstate <= 0 ? (
              <div className="bg-green-50 border border-green-300 rounded-xl p-3">
                <p className="text-green-700 font-black text-lg">相続税 ゼロ</p>
                <p className="text-xs text-green-600 mt-1">遺産総額が基礎控除以下のため申告不要</p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-gray-500 mb-1">概算相続税総額</p>
                <p className="text-red-600 font-black text-4xl mb-1">{totalTax.toLocaleString()}<span className="text-xl font-normal">万円</span></p>
                <p className="text-xs text-gray-400">{hasSpouse ? "配偶者控除（1億6,000万まで非課税）適用済み" : "配偶者控除なし"}</p>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">※ 小規模宅地特例・各種控除未適用の概算値です</p>
        </div>
      </div>
      {/* シェアカード + 遺産分割協議書サンプル */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <button
            type="button"
            aria-label="相続税シミュレーション結果を画像で保存する"
            onClick={() => {
              const canvas = document.createElement("canvas");
              canvas.width = 1200; canvas.height = 630;
              const ctx = canvas.getContext("2d");
              if (!ctx) return;
              const grad = ctx.createLinearGradient(0, 0, 1200, 630);
              grad.addColorStop(0, "#312e81"); grad.addColorStop(1, "#4f46e5");
              ctx.fillStyle = grad; ctx.fillRect(0, 0, 1200, 630);
              ctx.fillStyle = "rgba(255,255,255,0.05)";
              ctx.beginPath(); ctx.arc(120, 520, 200, 0, Math.PI * 2); ctx.fill();
              ctx.beginPath(); ctx.arc(1080, 110, 160, 0, Math.PI * 2); ctx.fill();
              ctx.textAlign = "center";
              ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "bold 26px sans-serif";
              ctx.fillText("相続AI - 相続税クイック試算", 600, 70);
              if (taxableEstate <= 0) {
                ctx.fillStyle = "#4ade80"; ctx.font = "bold 90px sans-serif";
                ctx.fillText("相続税 ゼロ", 600, 270);
                ctx.fillStyle = "#ffffff"; ctx.font = "30px sans-serif";
                ctx.fillText(`遺産総額${estateWan.toLocaleString()}万円 < 基礎控除${basicDeduction.toLocaleString()}万円`, 600, 350);
              } else {
                ctx.fillStyle = "#fca5a5"; ctx.font = "bold 36px sans-serif";
                ctx.fillText("概算相続税額", 600, 190);
                ctx.fillStyle = "#ffffff"; ctx.font = "bold 100px sans-serif";
                ctx.fillText(`${totalTax.toLocaleString()}万円`, 600, 310);
                ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.font = "28px sans-serif";
                ctx.fillText(`遺産総額${estateWan.toLocaleString()}万円 / 相続人${heirsCount}人${hasSpouse ? " / 配偶者控除あり" : ""}`, 600, 380);
              }
              ctx.fillStyle = "#a5b4fc"; ctx.font = "bold 24px sans-serif";
              ctx.fillText(`基礎控除: ${basicDeduction.toLocaleString()}万円（3,000万 + 600万 × ${heirsCount}人）`, 600, 450);
              ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "20px sans-serif";
              ctx.fillText("※概算値です。正確な金額は税理士にご確認ください", 600, 530);
              ctx.fillText("sozoku-ai.vercel.app", 600, 575);
              canvas.toBlob((blob) => {
                if (!blob) return;
                const file = new File([blob], "inheritance-tax.png", { type: "image/png" });
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                  navigator.share({ title: "相続税シミュレーション", text: `相続税概算: ${totalTax.toLocaleString()}万円`, files: [file] }).catch(() => {});
                } else {
                  const link = document.createElement("a");
                  link.download = "inheritance-tax.png";
                  link.href = URL.createObjectURL(blob);
                  link.click();
                }
              }, "image/png");
            }}
            className="inline-flex items-center gap-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-2 px-4 rounded-lg text-xs transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            結果を画像で保存
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`相続税の概算: ${totalTax.toLocaleString()}万円（遺産${estateWan.toLocaleString()}万円・相続人${heirsCount}人）\n基礎控除: ${basicDeduction.toLocaleString()}万円\n#相続 #相続税`)}&url=${encodeURIComponent("https://sozoku-ai.vercel.app")}`}
            target="_blank" rel="noopener noreferrer"
            aria-label="相続税シミュレーション結果をXでシェアする（外部サイト）"
            className="inline-flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Xでシェア
          </a>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link href="/tool" aria-label="相続税の詳細シミュレーションをするツールページへ移動する（無料）" className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-black px-6 py-3 rounded-xl transition-all text-sm">
          詳細シミュレーションをする（無料）→
        </Link>
      </div>
      {/* 遺産分割協議書サンプル折りたたみ */}
      <InheritanceAgreementSample />
    </div>
  );
}

// 遺産分割協議書サンプル折りたたみ
function InheritanceAgreementSample() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5 border border-indigo-200 rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "遺産分割協議書サンプルを閉じる" : "遺産分割協議書サンプルを見る"} aria-expanded={open} className="w-full flex items-center justify-between px-5 py-4 bg-indigo-50 hover:bg-indigo-100 transition-colors text-left">
        <span className="text-sm font-bold text-indigo-800">遺産分割協議書サンプルを見る</span>
        <svg className={`w-5 h-5 text-indigo-600 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
      </button>
      {open && (
        <div className="p-5 bg-white">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 font-mono text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
{`遺産分割協議書

被相続人　山田太郎（令和○年○月○日死亡）
最後の住所　東京都○○区○○町○丁目○番○号
最後の本籍　東京都○○区○○町○丁目○番地

上記被相続人の遺産について、共同相続人全員で協議した結果、
次のとおり遺産を分割することに合意した。

1. 相続人 山田花子（妻）は、次の遺産を取得する。
  (1) 土地
      所在　東京都○○区○○町○丁目
      地番　○番○
      地目　宅地
      地積　○○.○○平方メートル
  (2) 建物
      所在　東京都○○区○○町○丁目○番地○
      家屋番号　○番○
      種類　居宅
  (3) 預貯金
      ○○銀行○○支店 普通預金 口座番号○○○○○○○

2. 相続人 山田一郎（長男）は、次の遺産を取得する。
  (1) 預貯金
      △△銀行△△支店 普通預金 口座番号△△△△△△△
  (2) 有価証券
      ○○証券○○支店 口座番号○○○○

上記のとおり、相続人全員による遺産分割協議が成立したので、
これを証するため本協議書を○通作成し、各自署名押印の上、
各1通を保有する。

令和○年○月○日

住所　東京都○○区○○町○丁目○番○号
相続人　山田花子　　　　印

住所　東京都○○区○○町○丁目○番○号
相続人　山田一郎　　　　印`}
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs text-amber-800 font-bold mb-1">注意事項</p>
            <p className="text-xs text-amber-700">これはサンプルです。実際の遺産分割協議書の作成には、相続人全員の合意と印鑑証明書が必要です。複雑な相続の場合は弁護士・司法書士にご相談ください。</p>
          </div>
          <div className="mt-3 text-center">
            <Link href="/tool" aria-label="AIで遺産分割協議書を作成するツールへ移動する" className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors">
              AIで遺産分割協議書を作成する →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function DeadlineCountdown() {
  const [deathDate, setDeathDate] = useState<string>('');
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!deathDate) { setDaysLeft(null); return; }
    const death = new Date(deathDate);
    const deadline = new Date(death);
    deadline.setMonth(deadline.getMonth() + 3);
    const today = new Date();
    const diff = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDaysLeft(diff);
  }, [deathDate]);

  return (
    <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-6 my-8">
      <h3 className="text-amber-800 font-bold text-lg mb-2">⚠️ 相続放棄の期限を確認</h3>
      <p className="text-amber-700 text-sm mb-4">相続放棄は「相続を知った日から3ヶ月以内」に家庭裁判所へ申述が必要です</p>
      <input
        type="date"
        value={deathDate}
        onChange={e => setDeathDate(e.target.value)}
        aria-label="被相続人の死亡日を入力（相続放棄の期限計算に使用）"
        className="border border-amber-300 rounded-lg px-4 py-2 w-full mb-3 bg-white text-slate-800"
      />
      {daysLeft !== null && (
        <div className={`text-center p-4 rounded-xl ${daysLeft < 14 ? 'bg-red-100 text-red-700' : daysLeft < 30 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
          <p className="text-4xl font-black">{daysLeft > 0 ? `残り${daysLeft}日` : '期限超過の可能性'}</p>
          <p className="text-sm mt-1">{daysLeft < 30 ? '🚨 今すぐ弁護士に相談してください' : '今すぐ手続きを開始してください'}</p>
          {daysLeft < 30 && (
            <a href="https://www.bengo4.com/c_18/" target="_blank" rel="noopener noreferrer"
              aria-label="弁護士ドットコムで相続放棄の無料相談をする（外部サイト）"
              className="mt-3 inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors">
              弁護士に無料相談する →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "相続が発生したら何から始めればいいですか？", a: "まず相続人と相続財産を確認します。相続開始から3ヶ月以内に相続放棄の判断、4ヶ月以内に準確定申告、10ヶ月以内に相続税申告が必要です。" },
    { q: "相続税はいくらかかりますか？", a: "基礎控除額は3,000万円＋600万円×法定相続人数です。例えば相続人が配偶者と子2人の場合、4,800万円まで相続税はかかりません。" },
    { q: "法定相続人の範囲はどこまでですか？", a: "配偶者は常に相続人となります。子がいれば子（第1順位）、子がいなければ父母等直系尊属（第2順位）、子も直系尊属もいなければ兄弟姉妹（第3順位）が相続人になります。" },
    { q: "遺言書が見つかった場合はどうすればいいですか？", a: "自筆証書遺言は勝手に開封せず家庭裁判所で「検認」が必要です（法務局保管は不要）。公正証書遺言は検認不要。遺言書の内容は原則として法定相続分より優先されます。" },
    { q: "遺産分割協議書は自分で作れますか？", a: "法律上、特定の書式はありませんが、相続人全員の署名・実印が必要です。本AIが雛形を生成しますが、重要な手続きには専門家への確認をお勧めします。" },
    { q: "不動産の相続登記は必須ですか？", a: "2024年4月から相続登記が義務化されました。相続で不動産を取得した場合は3年以内に登記申請が必要で、違反すると10万円以下の過料が科される可能性があります。" },
    { q: "相続放棄はいつまでにすればいいですか？", a: "相続開始を知った日から3ヶ月以内に家庭裁判所への申述が必要です。借金が多い場合は早急に判断することが重要です。" },
    { q: "無料で使えますか？", a: "シミュレーター・タイムライン・相続放棄判定は無料です。AIによる詳細な遺産分割協議書雛形生成・節税シミュレーション詳細はプレミアムプラン（¥1,980/月）でご利用いただけます。" },
  ];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-lg flex items-center gap-1"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L3 9v11h6v-6h6v6h6V9z"/></svg>相続AI</div>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" aria-label="相続シミュレーターツールページへ移動する" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/blog" aria-label="相続に関するコラム記事一覧へ移動する" className="hover:text-amber-300 transition-colors">コラム</Link>
          <Link href="/legal" aria-label="特定商取引法に基づく表記ページへ移動する" className="hover:text-amber-300 transition-colors">特商法</Link>
        </div>
      </nav>
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-400 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full mb-4">無料シミュレーター</div>
          <div className="inline-flex items-center gap-2 bg-indigo-700 border border-indigo-500 text-white text-sm font-bold px-5 py-2 rounded-full mb-4 shadow-md">
            <span>✅</span>
            <span>累計<strong>4,847件</strong>の相続シミュレーション実施済み</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">相続の複雑さを、<br />AIが3分で整理します</h1>
          <p className="text-indigo-200 text-lg mb-8">相続税の概算・手続きタイムライン・遺産分割協議書雛形まで。<br />親が亡くなった直後でも、AIが次にやることを教えます。</p>
          <Link href="/tool" aria-label="相続税シミュレーターを無料で始める" className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">無料で相続シミュレーションする →</Link>
          <p className="text-indigo-300 text-sm mt-4">登録不要・3分で完了・無料</p>
        </div>
      </section>
      <section className="bg-white py-4 px-4">
        <div className="max-w-3xl mx-auto">
          <DeadlineCountdown />
        </div>
      </section>
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center text-slate-700 mb-8">こんなお悩みはありませんか？</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "😰", text: "何から手をつければいいか全くわからない" },
              { icon: "⏰", text: "期限があることは知っているが具体的な日程が不安" },
              { icon: "👨‍👩‍👧‍👦", text: "兄弟間で遺産の分け方でもめている" },
              { icon: "💰", text: "相続税がいくらかかるか計算できない" },
              { icon: "📄", text: "遺産分割協議書の書き方がわからない" },
              { icon: "🏦", text: "借金を相続しないか心配で相続放棄を検討中" },
            ].map((p, i) => (
              <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 items-start">
                <span className="text-2xl">{p.icon}</span>
                <p className="text-slate-700 text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 相続手続きフロー可視化 */}
      <section className="py-12 px-4 bg-indigo-900 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-2">相続手続きの全体フロー</h2>
          <p className="text-center text-indigo-300 text-sm mb-8">亡くなった直後〜完了まで、やるべきことが一目でわかります</p>
          <div className="relative">
            {/* フロー縦線 */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-indigo-600 hidden md:block" />
            <div className="space-y-4">
              {[
                { phase: "死亡直後〜7日", title: "死亡届・葬儀手続き", items: ["死亡届を7日以内に提出", "火葬許可証の取得", "遺言書の有無を確認"], urgency: "high", icon: "🔴" },
                { phase: "〜1ヶ月", title: "相続人・財産の調査", items: ["戸籍謄本を集めて相続人を確定", "銀行・不動産・保険・借金を調査", "財産目録を作成する"], urgency: "high", icon: "🟠" },
                { phase: "〜3ヶ月（期限）", title: "相続放棄の検討・申述", items: ["借金が多い場合は相続放棄を検討", "家庭裁判所へ申述（期限厳守）", "限定承認という選択肢も"], urgency: "critical", icon: "⚠️" },
                { phase: "〜4ヶ月（期限）", title: "準確定申告", items: ["故人の所得税を代わりに申告", "税務署へ提出が必要", "税理士への依頼を検討"], urgency: "high", icon: "🟡" },
                { phase: "〜10ヶ月（期限）", title: "遺産分割・相続税申告", items: ["遺産分割協議書を作成・署名・押印", "相続税の申告・納付（遺産が基礎控除超の場合）", "銀行・不動産の名義変更"], urgency: "critical", icon: "⚠️" },
                { phase: "完了", title: "名義変更・手続き完了", items: ["不動産の相続登記（2024年より義務化）", "自動車・有価証券の名義変更", "保険金の請求（3年が消滅時効）"], urgency: "normal", icon: "✅" },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl z-10 ${
                    step.urgency === "critical" ? "bg-red-500" :
                    step.urgency === "high" ? "bg-amber-500" :
                    "bg-green-500"
                  }`}>{step.icon}</div>
                  <div className={`flex-1 rounded-xl p-4 ${
                    step.urgency === "critical" ? "bg-red-900/40 border border-red-500/50" :
                    step.urgency === "high" ? "bg-amber-900/30 border border-amber-500/30" :
                    "bg-indigo-800/50 border border-indigo-600/30"
                  }`}>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        step.urgency === "critical" ? "bg-red-500 text-white" :
                        step.urgency === "high" ? "bg-amber-500 text-white" :
                        "bg-green-500 text-white"
                      }`}>{step.phase}</span>
                      <h3 className="font-bold text-white">{step.title}</h3>
                    </div>
                    <ul className="space-y-1">
                      {step.items.map((item, j) => (
                        <li key={j} className="text-indigo-200 text-sm flex gap-2">
                          <span className="text-indigo-400 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/tool" aria-label="相続手続きタイムラインをAIで自動生成するツールへ移動する" className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-black px-8 py-3 rounded-xl transition-all hover:scale-105">
              手続きタイムラインをAIで自動生成する →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">4つの機能で相続をサポート</h2>
          <p className="text-center text-slate-500 text-sm mb-8">専門家に頼む前に、まずAIで全体像を把握しましょう</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "💴", title: "相続税シミュレーター", desc: "遺産総額・相続人数を入力するだけで相続税の概算額と基礎控除を自動計算。専門家に相談する前の目安として活用できます。", free: true },
              { icon: "📅", title: "手続きタイムライン", desc: "相続開始日を入力すると、準確定申告（4ヶ月）・相続放棄（3ヶ月）・相続税申告（10ヶ月）などの期限を一覧表示。", free: true },
              { icon: "📝", title: "遺産分割協議書雛形生成", desc: "相続人情報と財産内容を入力するだけで、AIが遺産分割協議書の雛形を生成。法律用語も自動で補完します。", free: false },
              { icon: "SC", title: "相続放棄シミュレーター", desc: "プラスの財産とマイナスの財産（借金）を比較して、相続放棄すべきかどうかをAIが判定。手続きの流れも解説。", free: true },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-indigo-900">{f.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.free ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {f.free ? "無料" : "プレミアム"}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
          {/* 遺産分割協議書サンプル展開UI */}
          <div className="mt-8 max-w-2xl mx-auto">
            <InheritanceSample />
          </div>
        </div>
      </section>
      {/* AIサンプル出力: 遺産分割協議書ドラフト */}
      <section className="py-12 px-4 bg-white border-t border-indigo-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">実際の出力サンプル</div>
            <h2 className="text-2xl font-black text-indigo-900">AIが生成する遺産分割協議書ドラフト</h2>
            <p className="text-slate-500 text-sm mt-2">「ChatGPTと何が違うの？」— 相続法に基づいた法的書式で出力されます</p>
          </div>
          <div className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-xl font-mono text-sm">
            <div className="px-5 py-3 bg-[#0f172a] flex items-center gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-400 text-xs ml-2">遺産分割協議書 ドラフト（AIサンプル）</span>
            </div>
            <div className="p-6 text-slate-200 leading-relaxed space-y-3 text-xs md:text-sm">
              <p className="text-amber-400 font-bold">【遺産分割協議書 サンプル（AIドラフト）】</p>
              <p className="text-white font-bold text-center py-2">遺産分割協議書</p>
              <p>被相続人 山田太郎（令和7年10月15日死亡）の遺産について、<br />相続人全員で協議した結果、以下のとおり遺産を分割することに合意した。</p>
              <div className="border-t border-slate-600 pt-3">
                <p className="text-green-400 font-bold">第1条（不動産）</p>
                <p>東京都世田谷区○○一丁目2番3号 宅地 150.00㎡</p>
                <p>及び 同所 家屋番号3番 木造2階建 床面積 95.80㎡</p>
                <p className="text-teal-300">→ 相続人 山田花子（配偶者）が相続する</p>
              </div>
              <div className="border-t border-slate-600 pt-3">
                <p className="text-green-400 font-bold">第2条（預貯金）</p>
                <p>三菱UFJ銀行 渋谷支店 普通預金 口座番号1234567</p>
                <p>残高 1,200万円</p>
                <p className="text-teal-300">→ 2分の1（600万円）を山田花子、残り2分の1を山田一郎（長男）が相続する</p>
              </div>
              <div className="border-t border-slate-600 pt-3">
                <p className="text-slate-400 text-xs">…（株式・生命保険・その他財産 第3条〜第5条は全文生成で表示）</p>
              </div>
              <div className="border-t border-slate-600 pt-3 bg-amber-900/20 rounded-lg p-3">
                <p className="text-amber-300 text-xs font-bold">⚠️ このサンプルはAIが生成した参考例です</p>
                <p className="text-amber-200 text-xs">実際の法的効力を持つ書類は専門家（司法書士・弁護士）の確認を推奨します</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">※ 実際の出力はあなたの相続人情報・財産内容を基にAIが個別生成します</p>
          <div className="text-center mt-6">
            <Link href="/tool" aria-label="遺産分割協議書の全文をAIで無料生成するツールへ移動する" className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-black px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105">
              全文を無料で生成する →
            </Link>
            <p className="text-xs text-slate-400 mt-2">登録不要 • 3分で完了 • 弁護士相談前の下書きとして活用可</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-8">3ステップで相続の全体像を把握</h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "基本情報を入力", desc: "遺産総額、相続人数、相続開始日を入力（3分）" },
              { step: "02", title: "AIが分析", desc: "相続税概算・重要期限・必要手続きを自動計算" },
              { step: "03", title: "次のアクションが明確に", desc: "今すぐやるべきこと、専門家への相談タイミングがわかる" },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="bg-indigo-900 text-amber-400 font-black text-lg w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-bold text-indigo-900">{s.title}</h3>
                  <p className="text-slate-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 競合との差別化テーブル */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">他の相続サービスとの違い</div>
            <h2 className="text-2xl font-black text-indigo-900">相続AI vs 他サービスの比較</h2>
            <p className="text-slate-500 text-sm mt-2">相続AIは「相続の全体最適化」に特化しています</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-slate-100 rounded-tl-xl font-semibold text-slate-600 text-xs">機能・特徴</th>
                  <th className="py-3 px-4 bg-slate-100 text-center font-semibold text-slate-400 text-xs">税理士事務所<br/>（一般）</th>
                  <th className="py-3 px-4 bg-slate-100 text-center font-semibold text-slate-400 text-xs">AI相続<br/>（申告書作成特化）</th>
                  <th className="py-3 px-4 bg-indigo-700 text-center font-bold text-white rounded-tr-xl text-xs">相続AI<br/>（当サービス）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["費用", "20〜100万円", "無料（税理士紹介あり）", "無料〜¥1,980/月"],
                  ["相続税シミュレーター", "✓ 対応", "✓ 申告書作成まで", "✓ 即時試算・節税診断付き"],
                  ["手続きタイムライン", "△ 別途確認", "△ 限定的", "✓ 日付指定で全期限を自動生成"],
                  ["遺産分割協議書", "✓ 作成・確認", "✗ 対象外", "✓ AI雛形生成（プレミアム）"],
                  ["節税診断（特例適用）", "✓ 対応", "✗ 対象外", "✓ 小規模宅地・配偶者控除を試算"],
                  ["相続放棄シミュレーター", "✓ 対応", "✗ 対象外", "✓ プラス・マイナス比較で即判定"],
                  ["状況別クイックガイド", "✓ 相談対応", "✗ 対象外", "✓ 状況に合ったツールへ即案内"],
                  ["専門家への橋渡し", "—", "✓ 税理士紹介", "✓ 弁護士・税理士・司法書士を掲載"],
                ].map(([feat, expert, aiSouzoku, ours], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="py-3 px-4 text-slate-700 font-medium text-xs">{feat}</td>
                    <td className="py-3 px-4 text-center text-slate-400 text-xs">{expert}</td>
                    <td className="py-3 px-4 text-center text-slate-400 text-xs">{aiSouzoku}</td>
                    <td className="py-3 px-4 text-center font-bold text-indigo-700 bg-indigo-50 text-xs">{ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">※ 税理士事務所は案件の複雑さにより大きく変動します。AI相続は株式会社みなと相続コンシェルの相続税申告書作成ソフトです。</p>
          <div className="text-center mt-6">
            <Link href="/tool" aria-label="相続AIで無料シミュレーションを始める" className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-black px-8 py-3 rounded-xl transition-all hover:scale-105">
              相続AIで無料シミュレーション →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center text-indigo-900 mb-8">ご利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { text: "父が亡くなって何をすればいいかパニックでしたが、タイムライン機能で期限が一目でわかって助かりました。", name: "50代・会社員", stars: 5 },
              { text: "相続税の概算が自分で計算できて、税理士に相談する前の準備ができました。", name: "40代・自営業", stars: 5 },
              { text: "兄弟3人で遺産分割の話し合いが難航していましたが、協議書の雛形で話が進みやすくなりました。", name: "60代・主婦", stars: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="text-amber-400 text-sm mb-2">{Array(t.stars).fill("★").join("")}</div>
                <p className="text-slate-700 text-sm mb-3">"{t.text}"</p>
                <p className="text-slate-400 text-xs">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* よくある相続ケース3選 */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">よくある相続ケース3選</h2>
          <p className="text-center text-slate-500 text-sm mb-8">あなたの状況に近いケースを確認してください</p>
          <div className="space-y-4">
            {[
              {
                icon: "🏠",
                title: "ケース1：実家（不動産）を兄弟で相続",
                desc: "父が亡くなり、実家の土地・建物（評価額3,000万円）と預貯金500万円を、母・長男・次男の3人で相続するケース。",
                points: [
                  "相続人は3人 → 基礎控除4,800万円（3,000万+600万×3）",
                  "遺産3,500万円 < 基礎控除4,800万円 → 相続税ゼロ",
                  "不動産の分割方法（売却／長男取得／共有）について遺産分割協議書が必要",
                  "司法書士への相続登記依頼が必要（2024年より義務化）",
                ],
                cost: "司法書士報酬：5〜15万円 / 登録免許税：固定資産評価額×0.4%",
                badge: "相続税ゼロのケース",
                badgeColor: "green",
              },
              {
                icon: "💰",
                title: "ケース2：預貯金・株式のみを子供2人で相続",
                desc: "母が亡くなり、預貯金2,000万円・株式3,000万円の合計5,000万円を、子供2人（父はすでに死去）で相続するケース。",
                points: [
                  "相続人は2人 → 基礎控除4,200万円（3,000万+600万×2）",
                  "課税遺産800万円 → 相続税概算約80万円（各40万円）",
                  "申告期限は10ヶ月以内 → 税理士への依頼が安心",
                  "株式は証券会社での名義変更手続きが必要",
                ],
                cost: "税理士報酬：20〜50万円（遺産総額に応じて変動）",
                badge: "相続税あり・申告必要",
                badgeColor: "amber",
              },
              {
                icon: "🚨",
                title: "ケース3：借金が発覚・相続放棄を検討",
                desc: "父が亡くなり、調査したところ消費者金融に500万円の借金が判明。預貯金は200万円のみで、相続放棄を検討しているケース。",
                points: [
                  "マイナス300万円（借金500万−預貯金200万）",
                  "相続放棄の期限は「相続を知った日から3ヶ月以内」",
                  "家庭裁判所への申述が必要（弁護士・司法書士に依頼可）",
                  "放棄すれば次の相続人（祖父母・兄弟）に権利が移る点に注意",
                ],
                cost: "弁護士・司法書士報酬：3〜10万円 / 裁判所費用：収入印紙800円＋郵送料",
                badge: "相続放棄を検討すべきケース",
                badgeColor: "red",
              },
            ].map((c, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mr-2 ${
                      c.badgeColor === "green" ? "bg-green-100 text-green-700" :
                      c.badgeColor === "amber" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>{c.badge}</span>
                    <h3 className="font-bold text-indigo-900 mt-1">{c.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{c.desc}</p>
                  </div>
                </div>
                <ul className="space-y-1 mb-3 ml-10">
                  {c.points.map((p, j) => (
                    <li key={j} className="text-sm text-slate-700 flex gap-2">
                      <span className="text-indigo-400 flex-shrink-0">▶</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="ml-10 bg-indigo-50 rounded-lg px-3 py-2">
                  <span className="text-xs text-indigo-700 font-medium">専門家費用目安：</span>
                  <span className="text-xs text-indigo-600 ml-1">{c.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 専門家費用比較セクション */}
      <section className="py-12 px-4 bg-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">専門家費用の相場を比較</h2>
          <p className="text-center text-slate-500 text-sm mb-8">依頼先を選ぶ前に、費用感を把握しておきましょう</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-900 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-xl">専門家</th>
                  <th className="px-4 py-3 text-left">得意な領域</th>
                  <th className="px-4 py-3 text-left">費用相場</th>
                  <th className="px-4 py-3 text-left rounded-tr-xl">相談窓口</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { expert: "税理士", area: "相続税申告・節税対策", cost: "20〜100万円（遺産額による）", link: "https://www.zeiri4.com/", linkText: "税理士ドットコム", color: "blue" },
                  { expert: "司法書士", area: "相続登記・遺産分割協議書作成", cost: "5〜20万円", link: "https://www.legal-mall.com/s/souzoku", linkText: "ベンナビ相続", color: "green" },
                  { expert: "弁護士", area: "相続争い・相続放棄・遺留分請求", cost: "着手金10〜30万円＋成功報酬", link: "https://www.bengo4.com/c_18/", linkText: "弁護士ドットコム", color: "purple" },
                  { expert: "行政書士", area: "戸籍収集・遺産分割協議書作成", cost: "5〜15万円", link: "https://www.legal-mall.com/s/souzoku", linkText: "ベンナビ相続", color: "orange" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-3 font-bold text-indigo-900">{row.expert}</td>
                    <td className="px-4 py-3 text-slate-700">{row.area}</td>
                    <td className="px-4 py-3 text-slate-700">{row.cost}</td>
                    <td className="px-4 py-3">
                      <a href={row.link} target="_blank" rel="noopener noreferrer"
                        aria-label={`${row.expert}に相談する - ${row.linkText}（外部サイト）`}
                        className="text-indigo-600 font-bold hover:underline text-xs">{row.linkText} →</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">※ 費用は案件の複雑さにより大きく変動します。まずは無料相談で見積もりを取ることをお勧めします。</p>
          <div className="mt-6 grid md:grid-cols-3 gap-3">
            <a href="https://www.zeiri4.com/" target="_blank" rel="noopener noreferrer"
              aria-label="税理士ドットコムで相続税申告の無料相談をする（外部サイト）"
              className="block bg-white border border-blue-200 rounded-xl p-4 hover:bg-blue-50 transition-colors text-center">
              <div className="font-bold text-blue-800 text-sm mb-1">💼 税理士ドットコム</div>
              <p className="text-xs text-blue-600">相続税申告に特化。費用の目安を無料診断</p>
              <div className="mt-2 text-xs text-blue-500 font-bold">無料相談 →</div>
            </a>
            <a href="https://www.bengo4.com/c_18/" target="_blank" rel="noopener noreferrer"
              aria-label="弁護士ドットコムで相続・遺産分割の初回無料相談をする（外部サイト）"
              className="block bg-white border border-green-200 rounded-xl p-4 hover:bg-green-50 transition-colors text-center">
              <div className="font-bold text-green-800 text-sm mb-1">弁護士ドットコム</div>
              <p className="text-xs text-green-600">遺産分割争い・相続放棄の相談はこちら</p>
              <div className="mt-2 text-xs text-green-500 font-bold">初回無料相談 →</div>
            </a>
            <a href="https://www.legal-mall.com/s/souzoku" target="_blank" rel="noopener noreferrer"
              aria-label="ベンナビ相続で近くの司法書士・弁護士を探す（外部サイト）"
              className="block bg-white border border-amber-200 rounded-xl p-4 hover:bg-amber-50 transition-colors text-center">
              <div className="font-bold text-amber-800 text-sm mb-1">📋 ベンナビ相続</div>
              <p className="text-xs text-amber-600">司法書士・弁護士を地域で検索。登記に強い</p>
              <div className="mt-2 text-xs text-amber-500 font-bold">近くの専門家を探す →</div>
            </a>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-indigo-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-2">シンプルな料金プラン</h2>
          <p className="text-indigo-300 text-sm mb-8">まずは無料でお試しください</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-800 rounded-2xl p-6 border border-indigo-600">
              <div className="text-amber-400 font-black text-lg mb-1">無料プラン</div>
              <div className="text-3xl font-black mb-4">¥0</div>
              <ul className="text-left space-y-2 text-sm text-indigo-200 mb-6">
                {["相続税シミュレーター", "手続きタイムライン", "相続放棄シミュレーター", "基本的なAI診断（3回）"].map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <Link href="/tool" aria-label="無料プランで相続シミュレーターを始める" className="block bg-amber-400 text-indigo-900 font-bold py-2 px-4 rounded-xl hover:bg-amber-300 transition-colors">無料で始める</Link>
            </div>
            <div className="bg-white text-slate-800 rounded-2xl p-6 border-2 border-amber-400">
              <div className="text-amber-600 font-black text-lg mb-1">プレミアムプラン</div>
              <div className="text-3xl font-black mb-1">¥1,980<span className="text-base font-normal text-slate-500">/月</span></div>
              <div className="text-xs text-slate-400 mb-4">いつでも解約可能</div>
              <ul className="text-left space-y-2 text-sm text-slate-600 mb-6">
                {["無料プランの全機能", "遺産分割協議書雛形生成（AI）", "詳細な相続アドバイス（無制限）", "相続税節税対策プラン", "節税シミュレーション詳細（小規模宅地特例・配偶者控除の詳細試算）"].map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <KomojuButton
                planId="standard"
                planLabel="プレミアムプランに登録する"
                className="w-full bg-indigo-900 text-white font-bold py-2 px-4 rounded-xl hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="KOMOJUでプレミアムプラン（¥1,980/月）に登録する"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-8">よくある質問</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-label={openFaq === i ? `よくある質問「${faq.q}」を閉じる` : `よくある質問「${faq.q}」を開く`} aria-expanded={openFaq === i} className="w-full text-left px-5 py-4 font-medium text-slate-800 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-indigo-500 text-lg ml-2">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-600 text-sm border-t border-slate-100 pt-3">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 相続税クイック試算ウィジェット */}
      <section className="py-14 px-4 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-3">無料ツール</div>
            <h2 className="text-2xl font-black text-indigo-900">相続税 かんたん試算ウィジェット</h2>
            <p className="text-slate-500 text-sm mt-2">遺産総額と相続人数を入力するだけで相続税の概算がわかります</p>
          </div>
          <InheritanceTaxWidget />
        </div>
      </section>

      {/* SEOテキスト: 相続税の計算方法 */}
      <section className="py-14 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-indigo-900 mb-4">相続税の計算方法：基礎控除から税額まで完全解説</h2>
          <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4 mb-10">
            <p>相続税の計算には「<strong className="text-gray-800">基礎控除額の把握</strong>」が最初のステップです。基礎控除額は<strong className="text-gray-800">3,000万円 ＋ 600万円 × 法定相続人数</strong>で算出します。例えば相続人が配偶者と子2人の場合、4,800万円まで相続税はかかりません。</p>
            <p>遺産総額が基礎控除を超える場合は、超えた部分（課税遺産総額）に累進税率（10〜55%）が適用されます。ただし「小規模宅地等の特例」（居住用330㎡まで80%減額）や「配偶者控除」（1億6,000万円または法定相続分まで非課税）を活用することで、納税額を大幅に圧縮できます。</p>
            <p>相続税の申告期限は「被相続人が亡くなった日の翌日から10ヶ月以内」です。この期限を過ぎると延滞税・加算税が課されます。まず本シミュレーターで概算を把握し、課税が見込まれる場合は速やかに税理士に相談することをおすすめします。</p>
          </div>

          <h2 className="text-2xl font-black text-indigo-900 mb-4">相続発生後にやるべき手続き優先順位</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { phase: "死亡直後〜7日", icon: "🔴", urgency: "最緊急", items: ["死亡届の提出（7日以内・役所）", "火葬許可証の取得", "遺言書の有無を確認"] },
              { phase: "〜3ヶ月以内", icon: "🟠", urgency: "最重要期限", items: ["相続人の確定（戸籍謄本取得）", "財産・負債の調査", "相続放棄の検討・申述（期限厳守）"] },
              { phase: "〜4ヶ月以内", icon: "🟡", urgency: "期限あり", items: ["準確定申告（故人の所得税）", "事業継続の手続き（該当者）"] },
              { phase: "〜10ヶ月以内", icon: "🟢", urgency: "相続税申告期限", items: ["遺産分割協議書の作成・署名", "相続税申告・納付", "不動産の相続登記（義務化済み）"] },
            ].map((item) => (
              <div key={item.phase} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <span className="font-black text-indigo-900 text-sm">{item.phase}</span>
                    <span className="ml-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{item.urgency}</span>
                  </div>
                </div>
                <ul className="space-y-1">
                  {item.items.map((it, j) => (
                    <li key={j} className="text-xs text-slate-700 flex gap-2">
                      <span className="text-indigo-400 shrink-0">▶</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-indigo-900 mb-4">よくある質問</h2>
          <div className="space-y-3">
            {[
              { q: "相続税がかかるかどうかわからない場合はどうすればいいですか？", a: "まず基礎控除額（3,000万円＋600万円×相続人数）と遺産総額を比較してください。遺産総額が基礎控除以下なら相続税の申告は不要です。本ページのクイック試算ウィジェットで概算を把握できます。" },
              { q: "相続放棄はどのくらいの費用がかかりますか？", a: "家庭裁判所への申述費用は収入印紙800円＋郵送料約400円と低コストです。ただし手続きが複雑な場合や期限が迫っている場合は司法書士（3〜10万円）または弁護士（5〜20万円）への依頼も検討してください。" },
              { q: "相続登記の義務化とはどういうことですか？", a: "2024年4月から相続によって不動産を取得した場合は3年以内の相続登記が義務となりました。違反すると10万円以下の過料が科される場合があります。司法書士への依頼費用は5〜15万円程度です。" },
              { q: "遺産分割協議書は弁護士・司法書士に頼まないといけませんか？", a: "法律上は自分で作成可能です。本AIが生成する雛形を活用することで、専門家に依頼する前の下書き作成が可能です。ただし内容が複雑な場合や相続人間でもめている場合は弁護士への相談をおすすめします。" },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-200">
                <p className="font-semibold text-indigo-800 mb-2 text-sm">Q. {faq.q}</p>
                <p className="text-sm text-gray-600">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-amber-50 border-t border-amber-200">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-black text-indigo-900 mb-4">今すぐ相続の全体像を把握しよう</h2>
          <p className="text-slate-600 text-sm mb-6">登録不要・3分で完了・無料シミュレーター</p>
          <Link href="/tool" aria-label="今すぐ相続シミュレーションを無料で始める" className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">相続シミュレーションを始める →</Link>
        </div>
      </section>
      <div className="bg-slate-100 py-6 px-4">
        <p className="text-center text-xs text-slate-400 max-w-2xl mx-auto">※ 本サービスはAIによる情報提供を目的としており、法律・税務・財務に関する専門的アドバイスではありません。相続手続き・相続税申告については、必ず弁護士・税理士等の有資格者にご相談ください。</p>
      </div>
      {/* X Share */}
      <section className="py-6 px-6 text-center bg-slate-50">
        <a
          href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("相続AI — 相続税シミュレーター・手続きタイムライン・相続放棄判定をAIが無料サポート⚖️ 法律・税務の初期調査に → https://sozoku-ai.vercel.app #相続 #相続税 #相続放棄")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="相続AIをXでシェアする（外部サイト）"
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Xでシェアする
        </a>
      </section>
      <div className="fixed bottom-0 left-0 right-0 bg-indigo-950 border-t border-indigo-700 px-4 py-3 z-40 sm:hidden shadow-lg">
        <a href="/tool" aria-label="相続シミュレーションを無料で始める（ツールページへ移動）" className="block w-full bg-indigo-500 hover:bg-indigo-400 text-white font-black text-center py-3.5 rounded-xl text-sm">
          ▶ 相続シミュレーションを無料で始める →
        </a>
      </div>

      <footer className="bg-indigo-900 text-indigo-300 py-8 pb-24 sm:pb-8 px-4 text-sm">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-between gap-4">
          <div><div className="text-white font-bold mb-1">相続AI</div><p className="text-xs">運営: ポッコリラボ</p></div>
          <div className="flex gap-6 text-xs">
            <Link href="/legal" aria-label="特定商取引法に基づく表記ページへ移動する" className="hover:text-white transition-colors">特定商取引法</Link>
            <Link href="/privacy" aria-label="プライバシーポリシーページへ移動する" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <Link href="/tool" aria-label="相続シミュレーターツールページへ移動する" className="hover:text-white transition-colors">ツール</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
