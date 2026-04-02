import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | 相続AI",
  description:
    "相続AIの利用規約です。AIによる情報提供サービスのご利用条件・免責事項・禁止事項等を定めています。",
};

export default function TermsPage() {
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
          利用規約
        </h1>
        <p className="text-slate-500 text-sm mb-8">Terms of Service</p>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-bold text-white mb-2 text-base">
              第1条（適用）
            </h2>
            <p>
              本規約は、合同会社ポッコリ（以下「当社」）が提供する相続AI（以下「本サービス」）の利用条件を定めるものです。
              本サービスをご利用になることで、ユーザーは本規約に同意したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white mb-2 text-base">
              第2条（サービス内容）
            </h2>
            <p>
              本サービスは、Claude（Anthropic社）等のAIを活用した相続・遺産分割に関する情報提供サービスです。
              無料プランおよびプレミアムプラン（¥1,980/月・税込）をご用意しています。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第3条（AIサービスの性質・免責）
            </h2>
            <div
              className="rounded-xl p-4 mb-3"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <p className="text-red-300 font-semibold mb-2">
                【重要】法的助言ではありません
              </p>
              <p className="text-slate-300">
                本サービスが提供する情報・回答・シミュレーション結果・遺産分割協議書の雛形等は、
                <strong className="text-white">
                  弁護士・税理士・司法書士等の資格者による法律・税務・財務上の専門的アドバイスではありません。
                </strong>
                AIが生成した内容には誤りが含まれる可能性があります。
              </p>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>
                相続税の申告・納付、相続放棄、遺産分割協議等の重要な法的手続きは、必ず弁護士・税理士・司法書士等の専門家にご相談ください。
              </li>
              <li>
                本サービスの利用によって生じた損害（専門家への相談なく手続きを進めた結果生じた損害を含む）について、当社は一切の責任を負いません。
              </li>
              <li>
                AIの回答は学習データのカットオフ以降の法改正（相続登記義務化 2024年4月施行等）を正確に反映しない場合があります。最新情報は法務省・国税庁の公式サイトでご確認ください。
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-white mb-2 text-base">
              第4条（禁止事項）
            </h2>
            <p className="mb-2">ユーザーは以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為またはそれを助長する行為</li>
              <li>
                本サービスのAPIやサーバーへの過剰なリクエスト・スクレイピング・自動化ツールによる大量アクセス
              </li>
              <li>AIが生成した出力をそのまま法的書類として使用する行為</li>
              <li>
                他のユーザーまたは第三者の権利・利益・プライバシーを侵害する行為
              </li>
              <li>当社または第三者への誹謗中傷・名誉毀損</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-white mb-2 text-base">
              第5条（知的財産権）
            </h2>
            <p>
              本サービスのデザイン・コード・テキスト等の知的財産権は当社または正当な権利者に帰属します。
              AIが生成した回答・雛形のご利用は個人の参考目的に限ります。商用目的での無断転載・二次利用はお断りします。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white mb-2 text-base">
              第6条（有料プランと解約）
            </h2>
            <p>
              プレミアムプランは月額¥1,980（税込）で、申込時に即時決済が行われます。
              以降は毎月同日に自動更新されます。マイページよりいつでも解約可能で、
              解約後は次回更新日まで引き続きご利用いただけます。
              デジタルコンテンツの性質上、決済完了後の返金は原則承っておりません。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white mb-2 text-base">
              第7条（サービスの変更・停止）
            </h2>
            <p>
              当社は、必要に応じて本サービスの内容を変更・追加・停止することができます。
              重要な変更は事前にサービス上でお知らせするよう努めますが、
              緊急の場合はその限りではありません。
              サービス停止等によってユーザーに損害が生じた場合でも、当社は責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white mb-2 text-base">
              第8条（規約の変更）
            </h2>
            <p>
              当社は、法令改正・サービス変更等の必要に応じて本規約を変更することができます。
              変更後の規約は本サービス上に掲示した時点から効力を生じます。
              重要な変更については、登録メールアドレスへの通知またはサービス上での告知を行います。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white mb-2 text-base">
              第9条（準拠法・管轄）
            </h2>
            <p>
              本規約は日本法に準拠します。本サービスに関する紛争については、
              名古屋地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>
        </div>

        <p className="text-xs text-slate-500 mt-10 pt-4 border-t border-white/5">
          制定日：2024年1月1日 ／ 最終更新日：2025年4月1日 ／ 合同会社ポッコリ
        </p>
      </div>
    </div>
  );
}
