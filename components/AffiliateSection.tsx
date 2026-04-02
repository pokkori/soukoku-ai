'use client';

// ===================================================================
// AffiliateSectionコンポーネント — A8.netアフィリエイトCTA
// A8.netプログラムIDは取得後に下記の href を差し替えてください。
// 差し替え箇所: href="https://px.a8.net/svt/ejp?a8mat=【プログラムID】"
// ===================================================================

interface AffiliateItem {
  title: string;
  description: string;
  cta: string;
  /** A8.netアフィリリンク（プログラムID取得後に差し替え）*/
  href: string;
  badge: string;
}

const ITEMS: AffiliateItem[] = [
  {
    title: '弁護士・司法書士に無料相談する',
    description: '遺産分割・相続登記・遺言書など、相続問題の専門家が初回無料で対応。全国対応。',
    cta: '無料で法律相談する',
    // A8.net: ベンナビ相続（弁護士・司法書士）— プログラムID取得後に差し替え
    href: 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_弁護士相談_取得後に差し替え】',
    badge: '単価¥10,000〜30,000',
  },
  {
    title: 'FP（ファイナンシャルプランナー）に相続税相談',
    description: '相続税の節税・生命保険活用・資産承継プランをファイナンシャルプランナーが無料でサポート。',
    cta: '無料でFP相談する',
    // A8.net: FPカフェ 無料FP相談 — プログラムID取得後に差し替え
    href: 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_FP相談_取得後に差し替え】',
    badge: '単価¥10,000〜22,880',
  },
  {
    title: '相続税申告の税理士に無料相談する',
    description: '相続税の申告・節税対策・小規模宅地の特例など、税務に強い税理士が無料相談に対応。',
    cta: '無料で税理士相談する',
    // A8.net: 税理士ドットコム or 相続税専門税理士 — プログラムID取得後に差し替え
    href: 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_税理士相談_取得後に差し替え】',
    badge: '単価¥5,000〜20,000',
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
          <li key={item.title} className="bg-white rounded-xl border border-amber-100 shadow-sm">
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
                    <circle cx="12" cy="8" r="4" stroke="#D97706" strokeWidth="2"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p className="text-sm font-bold text-gray-800 truncate">{item.title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-snug">{item.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap">
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
        ※ 外部サービスへのリンクです（広告）。各社公式サイトに遷移します。
      </p>
    </section>
  );
}
