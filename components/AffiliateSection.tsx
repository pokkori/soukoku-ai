'use client';

// ===================================================================
// AffiliateSectionコンポーネント — A8.netアフィリエイトCTA（相続特化）
// 環境変数:
//   NEXT_PUBLIC_A8_BENGOSHI_URL   — ベンナビ相続（弁護士・司法書士）
//   NEXT_PUBLIC_A8_FP_URL         — FPカフェ（FP無料相談）
//   NEXT_PUBLIC_A8_ZEIRISHI_URL   — 税理士ドットコム
//   NEXT_PUBLIC_A8_HOKEN_URL      — 弁護士費用保険（メットライフ等）
// A8.netプログラムID取得後に .env.local / Vercel環境変数に設定してください。
// ===================================================================

interface AffiliateItem {
  title: string;
  description: string;
  cta: string;
  href: string;
  badge: string;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
}

const ITEMS: AffiliateItem[] = [
  {
    title: '弁護士・司法書士に無料相談する',
    description: '遺産分割・相続登記・遺言書など、相続問題の専門家が初回無料で対応。全国対応。',
    cta: '無料で法律相談する',
    href: process.env.NEXT_PUBLIC_A8_BENGOSHI_URL ?? 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_弁護士相談_取得後に差し替え】',
    badge: '単価¥10,000〜30,000',
    accentColor: '#D97706',
    badgeBg: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    title: 'FP（ファイナンシャルプランナー）に相続税相談',
    description: '相続税の節税・生命保険活用・資産承継プランをファイナンシャルプランナーが無料でサポート。',
    cta: '無料でFP相談する',
    href: process.env.NEXT_PUBLIC_A8_FP_URL ?? 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_FP相談_取得後に差し替え】',
    badge: '単価¥10,000〜22,880',
    accentColor: '#D97706',
    badgeBg: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    title: '相続税申告の税理士に無料相談する',
    description: '相続税の申告・節税対策・小規模宅地の特例など、税務に強い税理士が無料相談に対応。',
    cta: '無料で税理士相談する',
    href: process.env.NEXT_PUBLIC_A8_ZEIRISHI_URL ?? 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_税理士相談_取得後に差し替え】',
    badge: '単価¥5,000〜20,000',
    accentColor: '#D97706',
    badgeBg: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    title: '相続トラブルに備えて — 弁護士費用保険',
    description: '相続トラブルに備えて弁護士費用保険で万が一に備える。月額1,000円台から加入可能。訴訟・調停の費用を補償。',
    cta: '保険内容を無料確認する',
    // A8.net: 弁護士費用保険（単価¥5,000〜15,000）— 取得後に差し替え
    href: process.env.NEXT_PUBLIC_A8_HOKEN_URL ?? 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_弁護士費用保険_取得後に差し替え】',
    badge: '単価¥5,000〜15,000',
    accentColor: '#B45309',
    badgeBg: 'bg-yellow-50',
    borderColor: 'border-yellow-100',
  },
];

export function AffiliateSection() {
  return (
    <section
      className="mt-8 rounded-2xl border border-amber-100 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(255,251,235,0.97) 0%, rgba(255,247,237,0.97) 100%)' }}
      aria-labelledby="affiliate-heading-soukoku"
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <h2 id="affiliate-heading-soukoku" className="text-sm font-bold text-gray-700">
          さらに専門家に相談する
        </h2>
        {/* 景表法対応: PR表記 */}
        <span className="text-xs font-bold text-gray-400 border border-gray-300 rounded px-1.5 py-0.5">PR</span>
      </div>

      {/* カードリスト */}
      <ul className="px-4 pb-4 space-y-3" role="list">
        {ITEMS.map((item) => (
          <li key={item.title} className={`bg-white rounded-xl border ${item.borderColor} shadow-sm`}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between gap-3 px-4 py-3 group"
              aria-label={`${item.title} — 外部サービスへのリンク（PR）`}
              style={{ minHeight: '44px' }}
            >
              <div className="flex-1 min-w-0">
                {/* SVGアイコン: 専門家相談 */}
                <div className="flex items-center gap-2 mb-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" stroke={item.accentColor} strokeWidth="2"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={item.accentColor} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p className="text-sm font-bold text-gray-800 truncate">{item.title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-snug">{item.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${item.badgeBg}`} style={{ color: item.accentColor }}>
                  {item.cta}
                </span>
                {/* 矢印アイコン */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* 景表法対応: 広告表記フッター */}
      <p className="text-xs text-gray-400 text-center pb-3">
        ※ 外部サービスへのリンクです（アフィリエイト広告）。各社公式サイトに遷移します。
      </p>
    </section>
  );
}
