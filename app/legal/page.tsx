import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表示 | 相続AI",
  description: "相続AIの特定商取引法に基づく表示ページです。販売業者・料金・返品ポリシー等を掲載しています。",
};

const ITEMS = [
  {
    label: "販売業者（法人名）",
    value: "合同会社ポッコリ",
  },
  {
    label: "運営責任者",
    value: "代表社員 新美諭",
  },
  {
    label: "所在地",
    value: "非公開（消費者庁ガイドラインに基づき、請求があれば遅滞なく開示します）",
  },
  {
    label: "電話番号",
    value: "非公開（消費者庁ガイドラインに基づき、請求があれば遅滞なく開示します）",
  },
  {
    label: "お問い合わせ",
    value: "levonadesign@gmail.com（X: @levona_design）",
  },
  {
    label: "販売価格",
    value: "無料プラン：無料 / プレミアムプラン：¥1,980/月（税込）",
  },
  {
    label: "商品代金以外の必要料金",
    value: "インターネット接続に必要な通信費はお客様のご負担となります。それ以外の手数料は発生しません。",
  },
  {
    label: "支払方法",
    value: "クレジットカード（Visa・Mastercard・American Express・JCB）によるオンライン決済",
  },
  {
    label: "支払時期",
    value: "お申込み時に即時決済。以降、毎月同日に自動更新",
  },
  {
    label: "サービス提供時期",
    value: "決済完了後、即時ご利用いただけます",
  },
  {
    label: "返品・キャンセルポリシー",
    value: "デジタルコンテンツの性質上、決済完了後の返金は原則承っておりません。サブスクリプションはマイページよりいつでも解約可能で、解約後は次回更新日まで引き続きご利用いただけます。",
  },
  {
    label: "動作環境",
    value: "インターネット接続環境および最新版ブラウザ（Chrome・Firefox・Safari・Edge）が必要です",
  },
  {
    label: "特記事項",
    value:
      "本サービスはAIを活用した情報提供サービスであり、弁護士・税理士・司法書士等による法律・税務・財務上の専門的アドバイスではありません。相続手続きの最終判断は専門家にご相談ください。",
  },
];

export default function LegalPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(135deg, #0f0b15 0%, #1a1333 25%, #0d1f2d 50%, #1a1333 75%, #0f0b15 100%)",
      }}
    >
      {/* 背景グロー */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          }}
        />
      </div>

      {/* ナビ */}
      <nav className="relative z-10 border-b border-white/5 px-6 py-4">
        <Link
          href="/"
          className="font-bold text-white/80 hover:text-white transition-colors flex items-center gap-2 w-fit"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              stroke="#a78bfa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          相続AI トップへ戻る
        </Link>
      </nav>

      {/* 本文 */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          特定商取引法に基づく表示
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          Act on Specified Commercial Transactions
        </p>

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <dl className="space-y-4">
            {ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={
                  i < ITEMS.length - 1
                    ? "border-b border-white/5 pb-4"
                    : "pb-0"
                }
              >
                <dt className="text-sm font-semibold text-slate-400 mb-1">
                  {item.label}
                </dt>
                <dd className="text-slate-200 text-sm leading-relaxed">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 住所・電話番号の非公開根拠の注釈 */}
        <div
          className="mt-6 rounded-xl p-4 text-xs text-slate-400 leading-relaxed"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p className="font-semibold text-slate-300 mb-1">
            住所・電話番号の非公開について
          </p>
          <p>
            消費者庁「通信販売広告Q&A」に基づき、請求があれば遅滞なく開示できる体制を整えたうえで、
            住所および電話番号の広告への表示を省略しています（特定商取引法第11条ただし書き）。
            開示請求は上記メールアドレスまでご連絡ください。
          </p>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          最終更新日：2025年4月1日 ／ 合同会社ポッコリ
        </p>
      </div>
    </div>
  );
}
