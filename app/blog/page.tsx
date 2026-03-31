import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "相続コラム｜相続税・手続き・遺産分割を徹底解説｜相続AI",
  description: "相続税の計算方法、相続放棄の期限、遺産分割協議書の書き方など、相続に関する疑問をわかりやすく解説。専門家に相談する前の基礎知識をまとめました。",
};

const ARTICLES = [
  {
    slug: "sozoku-zei-keisan",
    title: "相続税の計算方法をわかりやすく解説【2025年最新版】",
    desc: "基礎控除額の計算から税率表の読み方まで。「相続税がいくらかかるか」を自分で計算できるようになります。",
    category: "相続税",
    readTime: "5分",
  },
  {
    slug: "sozoku-hoki-tetsuzuki",
    title: "相続放棄の手続き完全ガイド｜期限・必要書類・費用",
    desc: "相続放棄は「相続開始を知った日から3ヶ月以内」に家庭裁判所へ申述が必要です。手続きの流れを詳しく解説。",
    category: "相続放棄",
    readTime: "6分",
  },
  {
    slug: "isan-bunkatsu-kyogisho",
    title: "遺産分割協議書の書き方・テンプレート【無料ダウンロード対応】",
    desc: "遺産分割協議書に法定の書式はありませんが、記載すべき項目があります。ひな形と書き方のポイントを解説。",
    category: "遺産分割",
    readTime: "7分",
  },
  {
    slug: "sozoku-timeline",
    title: "相続手続きのタイムライン｜期限一覧と優先順位",
    desc: "相続開始から10ヶ月の相続税申告まで。見落としがちな期限と手続きの優先順位を一覧で確認。",
    category: "手続き",
    readTime: "4分",
  },
  {
    slug: "sozoku-hihinin",
    title: "法定相続人とは？範囲・順位・相続分を図解で解説",
    desc: "配偶者・子・両親・兄弟姉妹の相続順位と法定相続分の計算方法。遺言がない場合のルールをわかりやすく説明。",
    category: "基礎知識",
    readTime: "5分",
  },
  {
    slug: "junkakunin-shinkoku",
    title: "準確定申告とは？期限・対象者・手続き方法",
    desc: "亡くなった方の確定申告（準確定申告）は相続開始から4ヶ月以内が期限。対象者と申告方法を解説。",
    category: "税務",
    readTime: "4分",
  },
  {
    slug: "sozoku-fumeikin",
    title: "相続した不動産の名義変更手続き｜費用・期限・必要書類",
    desc: "2024年4月から相続登記が義務化。3年以内に名義変更しないと10万円以下の過料が科される場合も。",
    category: "不動産",
    readTime: "6分",
  },
  {
    slug: "sozoku-shinkoku-hitsuyou",
    title: "相続税申告が不要なケースとは？10ヶ月期限に注意",
    desc: "遺産総額が基礎控除額以下なら相続税の申告は不要。ただし特例適用には申告が必要な場合も。",
    category: "相続税",
    readTime: "4分",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "相続税": "bg-indigo-100 text-indigo-700",
  "相続放棄": "bg-red-100 text-red-700",
  "遺産分割": "bg-amber-100 text-amber-700",
  "手続き": "bg-green-100 text-green-700",
  "基礎知識": "bg-blue-100 text-blue-700",
  "税務": "bg-purple-100 text-purple-700",
  "不動産": "bg-orange-100 text-orange-700",
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">相続AI</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/blog" className="text-amber-300 font-medium">コラム</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3">相続コラム</div>
          <h1 className="text-3xl font-black text-indigo-900 mb-3">相続の疑問を、わかりやすく解説</h1>
          <p className="text-slate-600">相続税の計算から手続きタイムラインまで。専門家に相談する前に読んでおきたい基礎知識をまとめました。</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100 hover:shadow-md hover:border-indigo-300 transition-all block group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || "bg-gray-100 text-gray-600"}`}>
                  {article.category}
                </span>
                <span className="text-xs text-slate-400">{article.readTime}で読める</span>
              </div>
              <h2 className="font-bold text-indigo-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">{article.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{article.desc}</p>
              <div className="mt-4 text-indigo-600 text-sm font-medium group-hover:underline">続きを読む →</div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-indigo-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-black mb-2">AIで相続をシミュレーションしてみませんか？</h2>
          <p className="text-indigo-200 text-sm mb-6">相続税の概算・手続きタイムライン・相続放棄判定まで。3分で完了、登録不要。</p>
          <Link href="/tool" className="inline-block bg-amber-400 text-indigo-900 font-black px-8 py-3 rounded-xl hover:bg-amber-300 transition-colors">
            無料で相続シミュレーションする →
          </Link>
        </div>
      </div>

      <footer className="bg-indigo-900 text-indigo-200 text-xs text-center py-6 mt-8">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/legal" className="hover:text-white">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-white">利用規約</Link>
        </div>
        <p>© 2025 相続AI. 本サービスは法律相談ではありません。重要な手続きは専門家にご相談ください。</p>
      </footer>
    </div>
  );
}
