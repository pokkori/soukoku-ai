import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrossSell } from "@/components/CrossSell";

/* ================================================================
   プログラマティックSEO — キーワードランディングページ
   ================================================================ */

const SITE_URL = "https://sozoku-ai.vercel.app";
const CTA_PATH = "/tool";

/* ---------- キーワードデータ ---------- */
interface KwData {
  keyword: string;
  description: string;
  features: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

const KEYWORDS: Record<string, KwData> = {
  "souzoku-zei-keisan": {
    keyword: "相続税 計算",
    description:
      "AIが遺産額・相続人数から相続税を自動計算。基礎控除も自動判定します。",
    features: [
      {
        title: "遺産額を入力するだけ",
        text: "預貯金・不動産・有価証券などの金額を入力すると、AIが相続税額を即座にシミュレーションします。",
      },
      {
        title: "基礎控除を自動判定",
        text: "法定相続人の人数から基礎控除額（3,000万円＋600万円×人数）を自動算出。課税対象額が一目でわかります。",
      },
      {
        title: "累進税率も正確に反映",
        text: "10%〜55%の累進税率を適用し、各相続人ごとの納税見込額を算出します。",
      },
    ],
    faqs: [
      {
        q: "相続税の計算は自分でもできますか？",
        a: "基本的な計算は可能ですが、各種控除や特例の適用判断は複雑です。相続AIなら遺産額と相続人数を入力するだけで、基礎控除・配偶者控除を反映した概算税額を即座に算出できます。",
      },
      {
        q: "相続税がかからないケースはありますか？",
        a: "遺産総額が基礎控除額（3,000万円＋600万円×法定相続人数）以下であれば相続税は発生しません。例えば法定相続人が3人の場合、4,800万円までは非課税です。",
      },
      {
        q: "AIの計算結果はそのまま申告に使えますか？",
        a: "本ツールは概算シミュレーション用です。正式な申告には税理士への相談をお勧めします。事前に概算を把握することで、専門家への相談がスムーズになります。",
      },
    ],
  },
  "souzoku-tetuzuki-nagare": {
    keyword: "相続手続き 流れ",
    description:
      "相続開始〜完了までの全ステップをAIが解説。期限管理もサポートします。",
    features: [
      {
        title: "全体フローを可視化",
        text: "死亡届提出から遺産分割・相続税申告・名義変更まで、全ステップをタイムラインで表示します。",
      },
      {
        title: "期限アラート機能",
        text: "相続放棄（3ヶ月）・準確定申告（4ヶ月）・相続税申告（10ヶ月）の各期限をAIが管理します。",
      },
      {
        title: "やること一覧を自動生成",
        text: "相続状況に応じたToDoリストをAIが作成。何から始めればよいか迷いません。",
      },
    ],
    faqs: [
      {
        q: "相続手続きは何から始めればいいですか？",
        a: "まず死亡届の提出（7日以内）と戸籍謄本の取得を行います。その後、相続人の確定→財産調査→遺産分割協議→各種名義変更の流れで進めます。相続AIが状況に合わせた手順をご案内します。",
      },
      {
        q: "相続手続きにはどれくらいの期間がかかりますか？",
        a: "一般的に6ヶ月〜1年程度です。相続税の申告期限は10ヶ月以内ですが、遺産分割協議が長引くとさらに時間がかかります。早めの着手が重要です。",
      },
      {
        q: "相続手続きを自分でやることは可能ですか？",
        a: "比較的シンプルな案件であれば可能です。ただし不動産がある場合の登記や、相続税申告が必要な場合は司法書士・税理士への依頼が一般的です。相続AIで事前に全体像を把握してから専門家に相談すると効率的です。",
      },
    ],
  },
  "souzoku-houji-bukken": {
    keyword: "相続放棄",
    description:
      "相続放棄の条件・期限・手続きをAIが判定。3ヶ月の期限に注意が必要です。",
    features: [
      {
        title: "放棄すべきか判定",
        text: "借金・負債を含む財産状況をAIが分析し、相続放棄が有利かどうかを判断材料として提示します。",
      },
      {
        title: "3ヶ月の期限管理",
        text: "相続開始を知った日から3ヶ月以内の期限を明確にし、手続きの段取りをサポートします。",
      },
      {
        title: "必要書類チェック",
        text: "家庭裁判所への申述に必要な書類一覧をAIが生成。漏れのない準備をお手伝いします。",
      },
    ],
    faqs: [
      {
        q: "相続放棄の期限を過ぎてしまったらどうなりますか？",
        a: "原則として3ヶ月（熟慮期間）を過ぎると相続放棄はできません。ただし、相続財産が全くないと信じていた場合など特別な事情があれば、期限後でも認められるケースがあります。早めに弁護士へ相談してください。",
      },
      {
        q: "相続放棄すると何が起きますか？",
        a: "相続放棄をすると、最初から相続人ではなかったものとみなされます。プラスの財産もマイナスの財産（借金）も一切引き継ぎません。次順位の相続人に相続権が移る点にも注意が必要です。",
      },
      {
        q: "限定承認との違いは何ですか？",
        a: "相続放棄はすべての財産・負債を放棄します。限定承認はプラスの財産の範囲内でマイナスの財産を引き継ぐ方法です。限定承認は相続人全員で行う必要があるため、手続きはより複雑になります。",
      },
    ],
  },
  "isan-bunkatsu-kyougi": {
    keyword: "遺産分割協議",
    description:
      "遺産分割協議書の作り方をAIがサポート。法定相続分も自動計算します。",
    features: [
      {
        title: "協議書テンプレート生成",
        text: "財産内容・相続人情報を入力すると、遺産分割協議書の雛形をAIが自動生成します。",
      },
      {
        title: "法定相続分を自動計算",
        text: "配偶者・子・親・兄弟姉妹の組み合わせに応じた法定相続分をAIが算出します。",
      },
      {
        title: "分割方法を提案",
        text: "現物分割・換価分割・代償分割の中から、状況に適した方法をAIが提案します。",
      },
    ],
    faqs: [
      {
        q: "遺産分割協議書は必ず必要ですか？",
        a: "法的に作成義務はありませんが、不動産の名義変更・銀行口座の解約・相続税申告の際に必要となります。相続人が複数いる場合は作成することを強くお勧めします。",
      },
      {
        q: "相続人全員が集まらないと協議できませんか？",
        a: "全員が一堂に会する必要はありません。電話・郵送・オンラインで合意形成し、最終的に全員が署名・実印を押印した協議書を作成すれば有効です。ただし一人でも同意しない場合は家庭裁判所での調停が必要になります。",
      },
      {
        q: "法定相続分と異なる分割は可能ですか？",
        a: "はい、相続人全員が合意すれば法定相続分と異なる割合での分割が可能です。例えば自宅に住み続ける相続人に不動産を、他の相続人に預貯金を多く配分するなど、実情に合った分割ができます。",
      },
    ],
  },
  "souzoku-zei-kiso-koujo": {
    keyword: "相続税 基礎控除",
    description:
      "3000万円＋600万円×法定相続人数。AIが控除額を自動算出します。",
    features: [
      {
        title: "控除額を即計算",
        text: "法定相続人数を入力するだけで基礎控除額を即座に算出。課税対象かどうかを瞬時に判定します。",
      },
      {
        title: "法定相続人の数え方を解説",
        text: "養子の人数制限や代襲相続など、複雑な法定相続人のカウント方法をAIが解説します。",
      },
      {
        title: "他の控除も一括チェック",
        text: "配偶者控除・未成年者控除・障害者控除・小規模宅地等の特例など、適用できる控除をAIが一覧提示します。",
      },
    ],
    faqs: [
      {
        q: "相続税の基礎控除はいくらですか？",
        a: "基礎控除額は「3,000万円＋600万円×法定相続人の数」です。例えば配偶者と子2人の場合は4,800万円。遺産総額がこの金額以下なら相続税は発生しません。",
      },
      {
        q: "養子は法定相続人に含まれますか？",
        a: "含まれます。ただし基礎控除の計算上、養子の数には制限があります。実子がいる場合は1人まで、実子がいない場合は2人までが法定相続人の数に算入されます。",
      },
      {
        q: "基礎控除以外にどんな控除がありますか？",
        a: "配偶者の税額軽減（1億6,000万円または法定相続分まで非課税）、未成年者控除、障害者控除、相次相続控除などがあります。相続AIで該当する控除を自動チェックできます。",
      },
    ],
  },
  "igon-tsukurikata": {
    keyword: "遺言書 作り方",
    description:
      "自筆証書遺言・公正証書遺言の作り方をAIがガイドします。",
    features: [
      {
        title: "遺言書の種類を比較",
        text: "自筆証書遺言・公正証書遺言・秘密証書遺言の違いをAIがわかりやすく解説します。",
      },
      {
        title: "作成手順をステップガイド",
        text: "法的に有効な遺言書の書き方を、チェックリスト形式でAIがナビゲートします。",
      },
      {
        title: "無効になるパターンを警告",
        text: "日付の記載漏れ・パソコン作成・証人不備など、遺言書が無効になる典型的なミスをAIが事前に指摘します。",
      },
    ],
    faqs: [
      {
        q: "遺言書は自分で書いても有効ですか？",
        a: "はい、自筆証書遺言は自分で作成できます。ただし全文・日付・氏名を自筆で書き、押印することが法律上の要件です。財産目録のみパソコン作成が認められています。",
      },
      {
        q: "公正証書遺言のメリットは何ですか？",
        a: "公証人が作成するため法的に無効になるリスクが低く、原本が公証役場に保管されるため紛失・改ざんの心配がありません。検認手続きも不要で、相続発生後の手続きがスムーズです。",
      },
      {
        q: "遺言書は何歳から作れますか？",
        a: "民法上、15歳以上であれば遺言をすることができます。遺言能力（判断能力）があることが要件です。認知症の進行が心配な場合は早めの作成をお勧めします。",
      },
    ],
  },
  "souzoku-zei-sesuzei": {
    keyword: "相続税 節税",
    description:
      "生前贈与・小規模宅地等の特例。AIが節税対策を提案します。",
    features: [
      {
        title: "節税シミュレーション",
        text: "各種節税策を適用した場合の税額を比較。最も効果的な方法をAIが提案します。",
      },
      {
        title: "生前贈与プランニング",
        text: "暦年贈与の110万円非課税枠を活用した計画的な財産移転をAIがシミュレーションします。",
      },
      {
        title: "特例の適用判定",
        text: "小規模宅地等の特例（最大80%減額）や生命保険の非課税枠など、利用可能な特例をAIが判定します。",
      },
    ],
    faqs: [
      {
        q: "相続税の節税で最も効果的な方法は何ですか？",
        a: "状況によりますが、代表的な方法は(1)生前贈与（暦年贈与で年110万円非課税）(2)小規模宅地等の特例（自宅の土地を最大80%減額）(3)生命保険の非課税枠（500万円×法定相続人数）です。相続AIで最適な組み合わせをシミュレーションできます。",
      },
      {
        q: "生前贈与は何年前まで相続税に加算されますか？",
        a: "2024年以降の贈与については、相続開始前7年以内の暦年贈与が相続税の課税対象に加算されます（従来は3年）。計画的な早期の贈与が重要です。",
      },
      {
        q: "節税対策はいつから始めるべきですか？",
        a: "早ければ早いほど効果的です。生前贈与は年数をかけるほど移転額が増え、暦年贈与の加算期間（7年）を考慮すると、できるだけ早く始めることが節税効果を最大化します。",
      },
    ],
  },
  "fudousan-souzoku": {
    keyword: "不動産 相続",
    description:
      "土地・建物の相続税評価額をAIが計算。路線価方式も対応します。",
    features: [
      {
        title: "評価額を自動算出",
        text: "路線価方式・倍率方式を判定し、土地の相続税評価額をAIが概算します。",
      },
      {
        title: "相続登記の手順案内",
        text: "2024年4月から義務化された相続登記の手続き・必要書類をAIが一覧で提示します。",
      },
      {
        title: "分割方法の提案",
        text: "共有名義のリスクや、代償分割・換価分割のメリット・デメリットをAIが解説します。",
      },
    ],
    faqs: [
      {
        q: "不動産の相続税評価額はどう計算しますか？",
        a: "土地は「路線価方式」（路線価×面積×補正率）または「倍率方式」（固定資産税評価額×倍率）で計算します。建物は固定資産税評価額がそのまま相続税評価額になります。時価より低い評価になるため節税効果があります。",
      },
      {
        q: "相続登記は必ずしなければなりませんか？",
        a: "はい、2024年4月から相続登記が義務化されました。相続で不動産を取得したことを知った日から3年以内に登記が必要で、違反すると10万円以下の過料が科される可能性があります。",
      },
      {
        q: "不動産を相続人で共有にするのはよくないですか？",
        a: "共有名義はトラブルの原因になりやすいです。売却・建替え時に全員の同意が必要で、さらに相続が発生すると権利関係がさらに複雑化します。可能であれば単独名義にするか、代償分割を検討してください。",
      },
    ],
  },
  "souzoku-soudan-muryou": {
    keyword: "相続相談 無料",
    description:
      "相続の悩みをAIに無料相談。専門家への相談前の事前整理に最適です。",
    features: [
      {
        title: "24時間いつでも相談可能",
        text: "AIが24時間対応。深夜や休日でも相続の疑問にすぐ回答します。",
      },
      {
        title: "専門家相談前の事前整理",
        text: "財産状況・相続人関係・論点をAIで整理してから専門家に相談すると、時間もコストも節約できます。",
      },
      {
        title: "基本利用は完全無料",
        text: "相続税の概算・手続きフローの確認・基本的なQ&Aは無料でご利用いただけます。",
      },
    ],
    faqs: [
      {
        q: "無料で本当に使えますか？",
        a: "はい、基本的な相続税シミュレーション・手続きフロー確認・Q&A回答は無料です。より詳細な分析やレポート出力が必要な場合はプレミアムプランをご用意しています。",
      },
      {
        q: "AIの回答は信頼できますか？",
        a: "相続AIは最新の税法・民法に基づいた情報を提供しますが、あくまでシミュレーション・参考情報です。正式な法的判断や申告には税理士・弁護士・司法書士などの専門家にご確認ください。",
      },
      {
        q: "個人情報は安全に管理されていますか？",
        a: "入力いただいた情報はシミュレーション目的のみに使用し、第三者への提供は行いません。詳細はプライバシーポリシーをご覧ください。",
      },
    ],
  },
  "seizen-zouyo-ai": {
    keyword: "生前贈与 AI",
    description:
      "暦年贈与・相続時精算課税制度をAIがシミュレーションします。",
    features: [
      {
        title: "暦年贈与シミュレーション",
        text: "年110万円の非課税枠を使った贈与計画を、年数・人数別にAIがシミュレーションします。",
      },
      {
        title: "精算課税制度との比較",
        text: "暦年贈与と相続時精算課税制度のどちらが有利か、AIが条件別に比較・提案します。",
      },
      {
        title: "7年加算ルール対応",
        text: "2024年改正の7年加算ルールを反映。最適な贈与開始時期をAIが算出します。",
      },
    ],
    faqs: [
      {
        q: "生前贈与は年間いくらまで非課税ですか？",
        a: "暦年贈与では受贈者1人あたり年間110万円まで非課税です。例えば子2人に毎年110万円ずつ贈与すれば、10年間で合計2,200万円を非課税で移転できます。",
      },
      {
        q: "相続時精算課税制度とは何ですか？",
        a: "60歳以上の父母・祖父母から18歳以上の子・孫への贈与に適用でき、累計2,500万円まで贈与税が非課税になる制度です。ただし相続時に贈与財産が相続財産に加算されます。2024年からは年110万円の基礎控除が新設されました。",
      },
      {
        q: "AIで贈与計画のシミュレーションはできますか？",
        a: "はい、贈与額・贈与年数・相続人構成を入力すると、暦年贈与と相続時精算課税制度それぞれの税額を比較し、最適な贈与プランをAIが提案します。",
      },
    ],
  },
};

const ALL_SLUGS = Object.keys(KEYWORDS);

/* ---------- Static Params ---------- */
export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

/* ---------- Metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = KEYWORDS[slug];
  if (!data) return {};
  const title = `${data.keyword}｜相続AI - AIで無料シミュレーション`;
  const desc = data.description;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `${SITE_URL}/keywords/${slug}`,
      siteName: "相続AI",
      locale: "ja_JP",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "相続AI" }],
    },
    twitter: { card: "summary_large_image", title, description: desc, images: ["/og.png"] },
    alternates: { canonical: `${SITE_URL}/keywords/${slug}` },
  };
}

/* ---------- Page Component ---------- */
export default async function KeywordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = KEYWORDS[slug];
  if (!data) notFound();

  /* FAQPage JSON-LD */
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  /* BreadcrumbList JSON-LD */
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: data.keyword,
        item: `${SITE_URL}/keywords/${slug}`,
      },
    ],
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      </head>

      <main className="min-h-screen">
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Gradient background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,70,229,0.25) 0%, transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wider text-indigo-400 uppercase">
              相続AI
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {data.keyword}
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              {data.description}
            </p>
            <Link
              href={CTA_PATH}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)",
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              無料でAIに相談する
            </Link>
          </div>
        </section>

        {/* ===== Features ===== */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
              相続AIの特長
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {data.features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-indigo-500/30"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
              よくある質問
            </h2>
            <div className="space-y-4">
              {data.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium">
                    <span>{faq.q}</span>
                    <svg
                      className="w-5 h-5 shrink-0 text-white/40 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-white/60">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA Repeat ===== */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              今すぐ無料で試してみませんか？
            </h2>
            <p className="mb-8 text-white/60">
              相続の不安をAIが整理します。まずは3分で概算チェック。
            </p>
            <Link
              href={CTA_PATH}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)",
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              無料でAIに相談する
            </Link>
          </div>
        </section>

        {/* ===== CrossSell ===== */}
        <section className="py-8 px-4">
          <CrossSell currentService="相続AI" />
        </section>

        {/* ===== 他のキーワードページへの内部リンク ===== */}
        <section className="py-12 px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-xl font-bold text-white/80">
              関連する相続のお悩み
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {ALL_SLUGS.filter((s) => s !== slug).map((s) => (
                <Link
                  key={s}
                  href={`/keywords/${s}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-indigo-500/40 hover:text-white"
                >
                  {KEYWORDS[s].keyword}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
