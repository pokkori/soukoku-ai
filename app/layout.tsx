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
