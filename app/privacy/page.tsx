import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 相続AI",
  description:
    "相続AIのプライバシーポリシーです。個人情報の収集・利用・管理方法、Cookie・外部サービスへのデータ送信について説明しています。",
};

export default function PrivacyPage() {
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
          プライバシーポリシー
        </h1>
        <p className="text-slate-500 text-sm mb-8">Privacy Policy</p>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第1条（事業者情報）
            </h2>
            <p>
              合同会社ポッコリ（以下「当社」）は、相続AI（以下「本サービス」）において、
              利用者の個人情報を適切に取り扱うため、個人情報保護法その他関連法令を遵守します。
            </p>
            <p className="mt-2">
              お問い合わせ窓口：
              <a
                href="mailto:levonadesign@gmail.com"
                className="text-violet-400 hover:underline"
              >
                levonadesign@gmail.com
              </a>
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第2条（取得する情報と利用目的）
            </h2>
            <div className="overflow-x-auto">
              <table
                className="w-full text-xs border-collapse"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <th className="py-2 px-3 text-left text-slate-300 font-semibold">
                      情報の種類
                    </th>
                    <th className="py-2 px-3 text-left text-slate-300 font-semibold">
                      利用目的
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "メールアドレス（プレミアム登録時）",
                      "決済・認証・お知らせの送信",
                    ],
                    [
                      "AIへの入力テキスト（相続情報等）",
                      "AI回答の生成（Anthropic Claude APIへ送信後、当社サーバーには保存しません）",
                    ],
                    [
                      "アクセスログ・ページビュー情報",
                      "サービス改善・不正利用防止",
                    ],
                    [
                      "Cookie・ローカルストレージ",
                      "利用回数管理・ログイン状態の維持",
                    ],
                    [
                      "デバイス情報・ブラウザ情報",
                      "サービス品質向上・障害解析",
                    ],
                  ].map(([type, purpose], i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <td className="py-2 px-3 text-slate-300">{type}</td>
                      <td className="py-2 px-3 text-slate-400">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第3条（第三者提供の制限）
            </h2>
            <p>
              当社は、以下の場合を除き、取得した個人情報を第三者に提供しません。
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>ご本人の同意がある場合</li>
              <li>
                法令に基づき開示が必要な場合（裁判所・行政機関等からの要請）
              </li>
              <li>
                人の生命・身体・財産の保護のために必要であり、ご本人の同意を得ることが困難な場合
              </li>
              <li>
                業務委託先（下記「外部サービスへの情報送信」参照）への委託に伴う提供
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第4条（Cookieの利用）
            </h2>
            <p>
              本サービスはCookieおよびローカルストレージを使用します。これらは利用回数のカウント・ログイン状態の保持・サービス改善のために利用します。
              ブラウザの設定によりCookieを無効にすることが可能ですが、その場合、一部機能（利用制限の管理等）が正常に動作しない場合があります。
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第5条（外部サービスへの情報送信）
            </h2>
            <p className="mb-3">
              電気通信事業法第27条の12に基づく外部送信規律として、以下の外部サービスへデータを送信しています。
            </p>
            <div className="overflow-x-auto">
              <table
                className="w-full text-xs border-collapse"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <th className="py-2 px-3 text-left text-slate-300 font-semibold">
                      送信先
                    </th>
                    <th className="py-2 px-3 text-left text-slate-300 font-semibold">
                      目的
                    </th>
                    <th className="py-2 px-3 text-left text-slate-300 font-semibold">
                      送信される情報
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Anthropic, Inc.（Claude API）",
                      "AI回答の生成",
                      "ユーザーの入力テキスト（相続情報等）。API利用契約によりAnthropicはデータをモデル学習に使用しません。",
                    ],
                    [
                      "PAY株式会社（PAY.JP）",
                      "クレジットカード決済処理",
                      "決済に必要な情報。カード番号は当社サーバーを経由しません。",
                    ],
                    [
                      "Vercel Inc.",
                      "ホスティング・Vercel Analytics（アクセス解析）",
                      "ページビュー・デバイス種別・リファラー（IPアドレスは保持しないプライバシー準拠の計測）",
                    ],
                    [
                      "Google LLC（Google AdSense）",
                      "広告配信",
                      "Cookie・閲覧履歴・デバイス情報。Googleのプライバシーポリシーに従って処理されます。",
                    ],
                  ].map(([dest, purpose, info], i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <td className="py-2 px-3 text-slate-300 font-medium">
                        {dest}
                      </td>
                      <td className="py-2 px-3 text-slate-400">{purpose}</td>
                      <td className="py-2 px-3 text-slate-400">{info}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第6条（個人情報の安全管理）
            </h2>
            <p>
              当社は個人情報の漏洩・滅失・毀損を防ぐため、適切な技術的・組織的安全管理措置を講じます。
              クレジットカード情報はPAY.JPのセキュアな仕組みにより処理され、当社のサーバーには保存されません。
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第7条（保有個人データの開示・訂正・削除等）
            </h2>
            <p>
              ご本人から保有個人データの開示・訂正・追加・削除・利用停止・第三者提供停止のご請求があった場合、
              個人情報保護法の定めに従い、遅滞なく対応いたします。
              ご請求はお問い合わせ窓口（levonadesign@gmail.com）までメールにてご連絡ください。
              本人確認のうえ、法令の定める期間内に回答いたします。
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第8条（未成年者の利用）
            </h2>
            <p>
              本サービスは16歳以上を対象としています。16歳未満の方が有料サービスを利用する場合は、
              保護者の同意を得てください。
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第9条（海外からのアクセスについて）
            </h2>
            <p>
              本サービスは日本語サービスであり、主に日本国内の方を対象としています。
              EU/EEA域内からのアクセスは想定しておりませんが、万一そのようなアクセスがあった場合も、
              本ポリシーに従い適切に情報を取り扱います。
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第10条（プライバシーポリシーの変更）
            </h2>
            <p>
              本ポリシーの内容は、法令改正・サービス変更等に伴い変更することがあります。
              重要な変更がある場合は本サービス上でお知らせします。
              変更後のポリシーはサービス上での掲示をもって効力を生じます。
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-bold text-white mb-3 text-base">
              第11条（苦情申出先）
            </h2>
            <p>
              個人情報の取り扱いに関するご不満・ご意見は、まず当社お問い合わせ窓口（levonadesign@gmail.com）にご連絡ください。
              解決しない場合は、個人情報保護委員会（
              <a
                href="https://www.ppc.go.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline"
              >
                https://www.ppc.go.jp/
              </a>
              ）にご申告いただけます。
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
