import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://soukoku-ai.vercel.app";
const TITLE = "相続AI｜相続手続きをAIが3分で整理・相続税シミュレーション無料・遺産分割協議書テンプレート";
const DESC = "相続の複雑さをAIが3分で整理。資産総額・相続人数を入力するだけで相続税額・各相続人の取り分・手続きステップを即計算。10ヶ月の申告期限や相続放棄の判断もサポート。遺産分割協議書の雛形も生成。税理士・弁護士への相談前に使える無料相続シミュレーター。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚖️</text></svg>",
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "相続AI",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "相続AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
  metadataBase: new URL(SITE_URL),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "相続AI",
      "url": SITE_URL,
      "applicationCategory": "LegalApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY", "description": "基本無料・プレミアムプラン ¥980/月" },
      "description": DESC,
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "相続税の申告期限はいつですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "相続税の申告・納付期限は、被相続人が亡くなったことを知った日の翌日から10ヶ月以内です。この期限を過ぎると延滞税・加算税が発生するため、早急に手続きを始めることが重要です。"
          }
        },
        {
          "@type": "Question",
          "name": "相続税の基礎控除額はいくらですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "相続税の基礎控除額は「3,000万円 + 600万円 × 法定相続人の数」です。この金額を超える場合のみ相続税の申告・納税が必要になります。"
          }
        },
        {
          "@type": "Question",
          "name": "相続放棄はいつまでにできますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "相続放棄は、相続の開始を知ってから3ヶ月以内（熟慮期間）に家庭裁判所に申述する必要があります。負債が多い場合は早急に判断する必要があります。"
          }
        },
        {
          "@type": "Question",
          "name": "法定相続人の範囲はどこまでですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "法定相続人は民法で定められており、配偶者は常に相続人となります。子がいれば子（第1順位）、子がいなければ父母等直系尊属（第2順位）、子も直系尊属もいなければ兄弟姉妹（第3順位）が相続人になります。"
          }
        },
        {
          "@type": "Question",
          "name": "遺言書が見つかった場合はどうすればいいですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "自筆証書遺言が見つかった場合は、勝手に開封せず家庭裁判所で「検認」の手続きが必要です（法務局保管のものは不要）。公正証書遺言は検認不要です。遺言書の内容が法定相続分と異なる場合でも基本的に遺言書が優先されます。"
          }
        },
        {
          "@type": "Question",
          "name": "不動産の相続登記は必須ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "2024年4月から相続登記が義務化されました。相続により不動産を取得したことを知った日から3年以内に登記申請が必要で、違反した場合は10万円以下の過料が科される可能性があります。司法書士に依頼するのが一般的です。"
          }
        },
        {
          "@type": "Question",
          "name": "遺産分割協議書は自分で作れますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "法律上、特定の書式はないため自分でも作成できますが、相続人全員の署名・実印・印鑑証明書が必要です。不動産登記・銀行手続きに使用するため、記載内容に不備があると手続きができなくなります。本AIが雛形を生成しますが、重要な手続きには専門家のご確認をお勧めします。"
          }
        },
        {
          "@type": "Question",
          "name": "相続税の準確定申告とは何ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "被相続人（亡くなった方）がその年に得た所得について、相続人が代わりに行う確定申告です。死亡日の翌日から4ヶ月以内に税務署へ提出する必要があります。事業所得・不動産所得・給与所得などがあった場合に必要です。"
          }
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "CLARITY_PROJECT_ID_HERE");
          `}
        </Script>
      </body>
    </html>
  );
}
