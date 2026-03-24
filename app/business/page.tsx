import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "士業・専門家向け｜相続AI法人プラン — 税理士・司法書士・弁護士の業務効率化",
  description: "相続AIの士業・専門家向けプラン。顧問先の相続相談に迅速対応。初期ヒアリング・相続税シミュレーション・遺産分割協議書の雛形作成を自動化。月額¥9,800〜。税理士・司法書士・弁護士・ファイナンシャルプランナーに最適。",
};

const PLANS = [
  {
    name: "スタンダード",
    price: "¥1,980",
    unit: "/月",
    desc: "個人士業・副業FP向け",
    features: [
      "月20件まで相続シミュレーション",
      "遺産分割協議書の雛形生成",
      "相続放棄判定レポート",
      "専門家向けPDFエクスポート",
      "メールサポート",
    ],
    cta: "スタンダードを始める",
    highlight: false,
  },
  {
    name: "プロフェッショナル",
    price: "¥9,800",
    unit: "/月",
    desc: "事務所・チーム利用向け（推奨）",
    features: [
      "月100件まで相続シミュレーション",
      "遺産分割協議書の雛形生成（複数バージョン）",
      "相続税申告チェックリスト（顧問先配布可）",
      "専門家向け詳細レポートPDF",
      "複数アカウント（最大5ユーザー）",
      "優先メール・チャットサポート",
      "請求書払い対応",
    ],
    cta: "プロフェッショナルを始める",
    highlight: true,
  },
  {
    name: "エンタープライズ",
    price: "要相談",
    unit: "",
    desc: "大手税理士法人・弁護士法人向け",
    features: [
      "無制限シミュレーション",
      "API連携（自社システムへの組み込み）",
      "カスタムレポートテンプレート",
      "専任担当者サポート",
      "SLA保証・セキュリティ審査対応",
      "法人請求書・会計システム連携",
    ],
    cta: "詳細を問い合わせる",
    highlight: false,
  },
];

const USE_CASES = [
  {
    role: "税理士",
    desc: "相続税申告の初期ヒアリングに活用。遺産総額・相続人構成を入力するだけで相続税概算・節税余地・必要手続きの一覧が即出力。顧問先への説明資料として活用できます。",
  },
  {
    role: "司法書士",
    desc: "相続登記・遺産分割協議書の作成補助に。AIが生成した雛形を元に、相続人との合意事項を反映するだけで書類作成時間を大幅短縮。",
  },
  {
    role: "弁護士",
    desc: "相続紛争・遺留分侵害額請求の事前調査に。相続人全員の取り分シミュレーションを即算出し、交渉材料として活用できます。",
  },
  {
    role: "ファイナンシャルプランナー",
    desc: "顧客への相続プランニングアドバイスに。相続税負担の試算・生前贈与との比較シミュレーションで、資産承継の最適プランを提案できます。",
  },
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-lg flex items-center gap-1">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L3 9v11h6v-6h6v6h6V9z"/></svg>
          相続AI
        </div>
        <div className="flex gap-4 text-sm">
          <Link href="/" aria-label="相続AIトップページへ戻る" className="hover:text-amber-300 transition-colors">トップ</Link>
          <Link href="/tool" aria-label="相続シミュレーターツールページへ移動する" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/legal" aria-label="特定商取引法に基づく表記ページへ移動する" className="hover:text-amber-300 transition-colors">特商法</Link>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-400 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full mb-4">士業・専門家向けプラン</div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            相続業務の初期対応を、<br />AIで効率化する
          </h1>
          <p className="text-indigo-200 text-lg mb-8">
            税理士・司法書士・弁護士・FPの方向けに、相続シミュレーション・
            遺産分割協議書の雛形生成・申告チェックリストを自動化。<br />
            顧問先への説明資料をAIが即生成します。
          </p>
          <a
            href="mailto:support@pokkorilab.com?subject=相続AI士業プランのお問い合わせ"
            aria-label="相続AI士業向けプランの無料デモをメールで申し込む"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105"
          >
            無料デモを申し込む →
          </a>
          <p className="text-indigo-300 text-sm mt-4">初期費用0円 / 最短翌日から利用開始</p>
        </div>
      </section>

      {/* ユースケース */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">士業別の活用シーン</h2>
          <p className="text-center text-slate-500 text-sm mb-10">相続AIは各士業の業務フローに合わせて活用できます</p>
          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES.map((uc) => (
              <div key={uc.role} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                <div className="inline-block bg-indigo-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{uc.role}</div>
                <p className="text-slate-700 text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">料金プラン</h2>
          <p className="text-center text-slate-500 text-sm mb-10">すべてのプランに14日間の無料トライアル付き</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border-2 ${plan.highlight ? "border-indigo-500 bg-white shadow-lg" : "border-slate-200 bg-white"}`}
              >
                {plan.highlight && (
                  <div className="text-center mb-3">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">最もご利用いただいています</span>
                  </div>
                )}
                <h3 className="text-lg font-black text-indigo-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{plan.desc}</p>
                <div className="mb-4">
                  <span className="text-3xl font-black text-indigo-700">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{plan.unit}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:support@pokkorilab.com?subject=相続AI ${plan.name}プランのお申し込み`}
                  aria-label={`相続AI ${plan.name}プランをメールで申し込む`}
                  className={`block w-full text-center font-bold py-3 rounded-xl transition-colors ${plan.highlight ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">※ 本サービスは士業業務の支援ツールです。法的アドバイス・税務申告の代行は行いません。専門家としての最終判断はご自身でお願いします。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-indigo-900 text-center text-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-black mb-4">まずは無料デモをお試しください</h2>
          <p className="text-indigo-300 text-sm mb-6">導入前に実際の機能をデモ環境でご確認いただけます。<br />お気軽にお問い合わせください。</p>
          <a
            href="mailto:support@pokkorilab.com?subject=相続AI士業プランのお問い合わせ"
            aria-label="相続AI士業プランの詳細をメールで問い合わせる"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-black px-8 py-4 rounded-2xl transition-all hover:scale-105"
          >
            無料デモを申し込む →
          </a>
        </div>
      </section>

      <footer className="bg-indigo-900 text-indigo-300 py-8 px-4 text-sm border-t border-indigo-800">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-between gap-4">
          <div><div className="text-white font-bold mb-1">相続AI</div><p className="text-xs">運営: ポッコリラボ</p></div>
          <div className="flex gap-6 text-xs">
            <Link href="/" aria-label="相続AIトップページへ戻る" className="hover:text-white transition-colors">トップ</Link>
            <Link href="/legal" aria-label="特定商取引法に基づく表記ページへ移動する" className="hover:text-white transition-colors">特定商取引法</Link>
            <Link href="/privacy" aria-label="プライバシーポリシーページへ移動する" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <Link href="/tool" aria-label="相続シミュレーターツールページへ移動する" className="hover:text-white transition-colors">ツール</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
