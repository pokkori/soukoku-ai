import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "相続手続きチェックリスト完全版【2026年最新・税理士監修レベル】｜相続AI",
  description:
    "相続発生後の10日以内・3ヶ月以内・10ヶ月以内の時系列チェックリスト。相続放棄・限定承認の判断基準フロー、よくある手続きミスと対策を解説。2026年最新版。",
  keywords:
    "相続 手続き チェックリスト,相続 何から始める,相続放棄 期限,相続税申告 期限 10ヶ月,相続手続き 一覧 2026",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "相続手続きはいつまでに始めればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "最も重要な期限は「相続放棄・限定承認の申述（3ヶ月以内）」と「相続税申告・納付（10ヶ月以内）」です。死亡直後の7日以内には死亡届の提出が必要です。期限を過ぎると相続放棄ができなくなったり、加算税が課せられるリスクがあります。",
      },
    },
    {
      "@type": "Question",
      name: "相続放棄はいつまでに手続きが必要ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "相続放棄は「相続開始を知った日から3ヶ月以内」に家庭裁判所に申述する必要があります。この期限を過ぎると単純承認（相続を承認したものとみなされる）となり、被相続人の借金も引き継がれます。借金が多い場合は速やかに弁護士・司法書士に相談してください。",
      },
    },
    {
      "@type": "Question",
      name: "相続税の申告が必要かどうかわかりません",
      acceptedAnswer: {
        "@type": "Answer",
        text: "相続税の基礎控除額は「3,000万円 + 600万円 × 法定相続人数」です。遺産総額がこの金額以下であれば、原則として相続税の申告は不要です。例えば法定相続人が2人なら基礎控除は4,200万円。ただし生命保険・生前贈与・小規模宅地特例などにより変わる場合があるため、税理士への確認を推奨します。",
      },
    },
    {
      "@type": "Question",
      name: "相続登記（不動産の名義変更）はいつまでに必要ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2024年4月から相続登記が義務化されました。相続開始を知った日から3年以内に法務局への登記申請が必要です。正当な理由なく怠ると10万円以下の過料が科せられます。相続税申告の10ヶ月期限とあわせて進めることをお勧めします。",
      },
    },
    {
      "@type": "Question",
      name: "相続手続きはすべて自分でできますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "預貯金の名義変更・相続登記・相続税申告などは自分で行うことも可能ですが、財産が複雑な場合や相続人間でもめている場合は専門家への依頼を強くお勧めします。弁護士ドットコムや税理士ドットコムで初回無料相談を受け付けています。",
      },
    },
  ],
};

const CHECKLIST = [
  {
    period: "7日以内",
    color: "red",
    badge: "緊急",
    items: [
      { text: "死亡診断書の受け取り（医師から）", critical: true },
      { text: "死亡届の提出（市区町村役場・7日以内が法定期限）", critical: true },
      { text: "火葬許可証の取得", critical: true },
      { text: "遺言書の有無を確認（自筆・公正証書・法務局保管）", critical: true },
    ],
    note: "死亡届は死亡診断書と一緒に提出。火葬は死亡届提出後に可能。",
  },
  {
    period: "14日以内",
    color: "orange",
    badge: "早急",
    items: [
      { text: "年金受給停止の手続き（年金事務所・14日以内）", critical: false },
      { text: "健康保険証の返却（会社・市区町村）", critical: false },
      { text: "世帯主変更届（市区町村・必要な場合）", critical: false },
      { text: "銀行口座の凍結前に必要な資金を確保", critical: true },
    ],
    note: "年金の不正受給は返還請求の対象になります。早めに手続きを。",
  },
  {
    period: "3ヶ月以内",
    color: "red",
    badge: "最重要期限",
    items: [
      { text: "相続人の確定（戸籍謄本・除籍謄本の収集）", critical: true },
      { text: "相続財産・負債の全調査（銀行・不動産・保険・借金）", critical: true },
      { text: "相続放棄・限定承認の要否を判断", critical: true },
      { text: "相続放棄する場合は家庭裁判所へ申述（期限厳守）", critical: true },
      { text: "遺言書の確認・公正証書遺言は公証役場で検索", critical: false },
      { text: "自筆証書遺言は家庭裁判所で検認手続き", critical: false },
    ],
    note: "3ヶ月を過ぎると相続放棄不可。借金が多い場合は即専門家へ相談。",
  },
  {
    period: "4ヶ月以内",
    color: "amber",
    badge: "要対応",
    items: [
      { text: "準確定申告（被相続人の1月1日〜死亡日の所得税申告）", critical: true },
      { text: "消費税の準確定申告（課税事業者の場合）", critical: false },
    ],
    note: "給与収入のみで源泉徴収済みの場合は不要なケースあり。税理士に確認を。",
  },
  {
    period: "10ヶ月以内",
    color: "indigo",
    badge: "最終期限",
    items: [
      { text: "相続財産の評価（不動産・株式・保険金など）", critical: true },
      { text: "遺産分割協議の実施（相続人全員の合意形成）", critical: true },
      { text: "遺産分割協議書の作成・全相続人の署名・捺印", critical: true },
      { text: "相続税の申告書作成・税務署へ提出", critical: true },
      { text: "相続税の納付（現金一括が原則）", critical: true },
      { text: "不動産の相続登記（法務局）", critical: false },
      { text: "銀行口座の名義変更・解約（遺産分割協議書が必要）", critical: false },
      { text: "証券口座の名義変更", critical: false },
    ],
    note: "相続税申告は10ヶ月が期限。延長制度はないため、早めに税理士へ。",
  },
  {
    period: "随時",
    color: "slate",
    badge: "その他",
    items: [
      { text: "自動車の名義変更（陸運局）", critical: false },
      { text: "生命保険の保険金請求（3年が消滅時効）", critical: false },
      { text: "クレジットカードの解約・未払い確認", critical: false },
      { text: "携帯電話・定期購読サービスの解約", critical: false },
      { text: "デジタル資産（SNS・ネット銀行）の整理", critical: false },
    ],
    note: "特定の期限はないが、なるべく早めに対応することを推奨。",
  },
];

export default function SouzokuChecklistPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          ⚖️ 相続AI
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" className="hover:text-amber-300 transition-colors">
            ツールを使う
          </Link>
          <Link href="/blog" className="hover:text-amber-300 transition-colors">
            コラム
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/blog" className="hover:text-indigo-600">
            コラム
          </Link>
          <span>›</span>
          <span>相続手続きチェックリスト完全版</span>
        </div>

        <div className="mb-6 flex gap-3 items-center">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
            手続き
          </span>
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
            2026年最新
          </span>
          <span className="text-slate-400 text-xs">📖 約6分で読めます</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-indigo-900 mb-4 leading-tight">
          相続手続きチェックリスト完全版
          <br />
          【2026年最新・税理士監修レベル】
        </h1>

        <p className="text-slate-600 mb-6 leading-relaxed">
          相続手続きには数多くの期限があり、見落とすと相続放棄ができなくなったり、
          加算税が課せられるリスクがあります。
          死亡直後から10ヶ月後の相続税申告まで、時系列でやるべきことを完全網羅しました。
        </p>

        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-8 text-sm">
          <p className="font-bold text-amber-800 mb-2">重要な3つの期限</p>
          <ul className="space-y-1 text-amber-700">
            <li>
              ⚠️ <strong>3ヶ月以内</strong>: 相続放棄・限定承認の申述（家庭裁判所）
            </li>
            <li>
              ⚠️ <strong>4ヶ月以内</strong>: 準確定申告（税務署）
            </li>
            <li>
              ⚠️ <strong>10ヶ月以内</strong>: 相続税申告・納付（税務署）
            </li>
          </ul>
        </div>

        {/* 時系列チェックリスト */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-indigo-900 mb-6 border-l-4 border-amber-400 pl-4">
            時系列 相続手続きチェックリスト
          </h2>
          <div className="space-y-5">
            {CHECKLIST.map((phase) => (
              <div
                key={phase.period}
                className={`bg-white rounded-xl border-2 p-5 shadow-sm ${
                  phase.color === "red"
                    ? "border-red-400"
                    : phase.color === "orange"
                    ? "border-orange-300"
                    : phase.color === "amber"
                    ? "border-amber-300"
                    : phase.color === "indigo"
                    ? "border-indigo-300"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`text-sm font-black px-3 py-1 rounded-full ${
                      phase.color === "red"
                        ? "bg-red-100 text-red-700"
                        : phase.color === "orange"
                        ? "bg-orange-100 text-orange-700"
                        : phase.color === "amber"
                        ? "bg-amber-100 text-amber-700"
                        : phase.color === "indigo"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {phase.period}
                  </div>
                  {(phase.color === "red" || phase.badge === "最重要期限") && (
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                      ⚠️ {phase.badge}
                    </span>
                  )}
                  {phase.color === "orange" && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-bold">
                      {phase.badge}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 mb-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span
                        className={`flex-shrink-0 mt-0.5 ${
                          item.critical ? "text-red-500" : "text-indigo-400"
                        }`}
                      >
                        {item.critical ? "⚠️" : "✓"}
                      </span>
                      <span
                        className={
                          item.critical
                            ? "text-slate-800 font-medium"
                            : "text-slate-700"
                        }
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-100 pt-2">
                  💡 {phase.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 相続放棄の判断基準フロー */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            相続放棄・限定承認の判断基準フロー
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="space-y-3">
              {[
                {
                  step: "Step 1",
                  q: "プラスの財産（預貯金・不動産・有価証券）とマイナスの財産（借金・保証債務）を全て調査する",
                  color: "indigo",
                },
                {
                  step: "Step 2",
                  q: "プラス財産 > マイナス財産 → 単純承認（通常の相続）がおすすめ",
                  color: "green",
                  result: true,
                },
                {
                  step: "Step 3",
                  q: "プラス財産 < マイナス財産 → 相続放棄を検討（3ヶ月以内に家庭裁判所へ）",
                  color: "red",
                  result: true,
                },
                {
                  step: "Step 4",
                  q: "財産が不明・借金の全容がわからない → 限定承認を検討（相続人全員が共同申述）",
                  color: "amber",
                  result: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 border ${
                    item.color === "green"
                      ? "bg-green-50 border-green-200"
                      : item.color === "red"
                      ? "bg-red-50 border-red-200"
                      : item.color === "amber"
                      ? "bg-amber-50 border-amber-200"
                      : "bg-indigo-50 border-indigo-200"
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                        item.color === "green"
                          ? "bg-green-200 text-green-800"
                          : item.color === "red"
                          ? "bg-red-200 text-red-800"
                          : item.color === "amber"
                          ? "bg-amber-200 text-amber-800"
                          : "bg-indigo-200 text-indigo-800"
                      }`}
                    >
                      {item.step}
                    </span>
                    <p className="text-sm text-slate-800">{item.q}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              ※ 隠れた借金・連帯保証などが後から発覚するケースがあります。不明点は必ず専門家に相談を。
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-indigo-900 mb-6 border-l-4 border-amber-400 pl-4">
            よくある質問（FAQ）
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "相続税の申告が必要かどうかわかりません",
                a: "基礎控除額は「3,000万円 + 600万円 × 法定相続人数」です。遺産総額がこの金額以下であれば申告不要です。法定相続人が2人なら4,200万円、3人なら4,800万円が目安です。",
              },
              {
                q: "相続放棄はいつまでに手続きが必要ですか？",
                a: "「相続開始を知った日から3ヶ月以内」に家庭裁判所に申述が必要です。この期限を過ぎると相続放棄ができません。借金が多い場合は速やかに弁護士・司法書士に相談してください。",
              },
              {
                q: "相続登記はいつまでに必要ですか？",
                a: "2024年4月から相続登記が義務化されました。相続開始を知った日から3年以内に法務局への登記申請が必要です。正当な理由なく怠ると10万円以下の過料が科せられます。",
              },
              {
                q: "相続手続きは全て自分でできますか？",
                a: "基本的な手続きは自分で行えますが、不動産が多い・相続人間でもめている・借金がある場合は専門家への依頼を強くお勧めします。弁護士ドットコムや税理士ドットコムで初回無料相談が可能です。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <div className="bg-indigo-50 px-5 py-3">
                  <p className="font-bold text-indigo-900 text-sm">
                    Q. {item.q}
                  </p>
                </div>
                <div className="px-5 py-3">
                  <p className="text-sm text-slate-700">A. {item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-indigo-900 rounded-2xl p-8 text-center text-white mb-10">
          <h2 className="text-xl font-black mb-2">
            AIで相続手続きを確認する
          </h2>
          <p className="text-indigo-200 text-sm mb-6">
            相続税の試算・手続き期限カレンダー・チェックリストをAIが無料でサポート。
            状況を入力するだけで次にやるべきことがわかります。
          </p>
          <Link
            href="/tool"
            className="inline-block bg-amber-400 text-indigo-900 font-black px-8 py-3 rounded-xl hover:bg-amber-300 transition-colors"
          >
            無料でAI相続ツールを使う →
          </Link>
        </div>

        {/* 関連コラム */}
        <div>
          <h3 className="font-bold text-slate-700 mb-4">📚 関連コラム</h3>
          <div className="space-y-3">
            {[
              {
                href: "/blog/sozoku-timeline",
                title: "相続手続きのタイムライン｜期限一覧と優先順位",
              },
              {
                href: "/blog/sozoku-zei-keisan",
                title: "相続税の計算方法をわかりやすく解説",
              },
              {
                href: "/blog/sozoku-hoki-tetsuzuki",
                title: "相続放棄の手続き完全ガイド",
              },
              {
                href: "/blog/isan-bunkatsu-kyogisho",
                title: "遺産分割協議書の書き方・テンプレート",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block bg-white rounded-xl p-4 border border-slate-200 hover:border-indigo-300 text-sm text-indigo-700 hover:underline"
              >
                {item.title} →
              </Link>
            ))}
          </div>
        </div>
      </article>

      <footer className="bg-indigo-900 text-indigo-200 text-xs text-center py-6 mt-8">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/legal" className="hover:text-white">
            特定商取引法
          </Link>
          <Link href="/privacy" className="hover:text-white">
            プライバシーポリシー
          </Link>
        </div>
        <p>
          © 2025 相続AI.
          本コラムは情報提供を目的としており、法律相談ではありません。
        </p>
      </footer>
    </div>
  );
}
