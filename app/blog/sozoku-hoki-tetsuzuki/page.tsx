import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "相続放棄の手続き完全ガイド｜期限・必要書類・費用【2025年版】｜相続AI",
  description: "相続放棄は相続開始を知った日から3ヶ月以内に家庭裁判所へ申述が必要です。手続きの流れ・必要書類・費用・注意点を詳しく解説。",
  keywords: "相続放棄 手続き,相続放棄 期限,相続放棄 必要書類,相続放棄 やり方,相続放棄 費用",
};

export default function SozokuHokiPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">相続AI</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/blog" className="hover:text-amber-300 transition-colors">コラム</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/blog" className="hover:text-indigo-600">コラム</Link>
          <span>›</span>
          <span>相続放棄の手続き</span>
        </div>

        <div className="mb-6">
          <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">相続放棄</span>
          <span className="text-slate-400 text-xs ml-3">約6分で読めます</span>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex gap-3">
          <span className="shrink-0">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </span>
          <div>
            <p className="font-bold text-red-800 text-sm">重要: 相続放棄の期限は3ヶ月</p>
            <p className="text-xs text-red-600">「相続の開始があったことを知った日」から3ヶ月以内に家庭裁判所への申述が必要です。この期限を過ぎると原則として相続放棄できません。</p>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-indigo-900 mb-4 leading-tight">
          相続放棄の手続き完全ガイド<br />｜期限・必要書類・費用
        </h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          被相続人（亡くなった方）に借金がある場合や、相続が複雑な場合に選択される「相続放棄」。一度申述が受理されると撤回できないため、慎重な判断が必要です。
        </p>

        <div className="bg-indigo-50 rounded-xl p-5 mb-8 border border-indigo-100">
          <h2 className="font-bold text-indigo-900 mb-3">この記事でわかること</h2>
          <ol className="space-y-1 text-sm text-indigo-700">
            <li>1. 相続放棄をすべきかの判断基準</li>
            <li>2. 手続きの流れ（5ステップ）</li>
            <li>3. 必要書類一覧</li>
            <li>4. 費用の目安</li>
            <li>5. 相続放棄の注意点・よくある失敗</li>
          </ol>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            1. 相続放棄をすべきかの判断基準
          </h2>
          <p className="text-slate-600 mb-4">相続放棄は「プラスの財産よりマイナスの財産（借金・保証債務など）が多い場合」に有効な選択肢です。</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-bold text-red-700 mb-2">放棄を検討すべきケース</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• 借金・ローンが財産を上回る</li>
                <li>• 連帯保証人になっていた</li>
                <li>• 財産の内容が把握できない</li>
                <li>• 相続をめぐるトラブルに巻き込まれたくない</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-bold text-green-700 mb-2">放棄しない方が良いケース</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• 自宅など重要な財産を引き継ぐ必要がある</li>
                <li>• 生命保険の受取人になっている（放棄しても受け取れる）</li>
                <li>• 財産がプラスになる見込みがある</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            2. 手続きの流れ（5ステップ）
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "相続放棄するか決断する（期限: 3ヶ月以内）", desc: "プラス・マイナスの財産を調査して判断。借金の額が不明な場合は「限定承認」も選択肢。" },
              { step: "2", title: "管轄の家庭裁判所を確認する", desc: "被相続人の最後の住所地を管轄する家庭裁判所に申述。裁判所の管轄は最高裁判所のサイトで確認できます。" },
              { step: "3", title: "必要書類を収集する", desc: "申述書・被相続人の戸籍謄本等・相続人自身の戸籍謄本を準備。戸籍の収集に1〜2週間かかる場合あり。" },
              { step: "4", title: "家庭裁判所へ申述書を提出する", desc: "郵送または持参で提出。収入印紙800円と連絡用郵便切手が必要。" },
              { step: "5", title: "照会書への回答・受理", desc: "裁判所から照会書が届く（約1〜2週間後）。回答後、相続放棄申述受理通知書が届いたら完了。" },
            ].map(item => (
              <div key={item.step} className="flex gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="bg-indigo-600 text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-bold text-slate-800 mb-1">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            3. 必要書類一覧
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-900 text-white">
                  <th className="p-3 text-left">書類</th>
                  <th className="p-3 text-left">入手先</th>
                  <th className="p-3 text-right">費用目安</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["相続放棄申述書（申述人が成人の場合）", "裁判所HPからDL・窓口", "無料"],
                  ["被相続人の死亡の記載のある戸籍謄本", "市区町村役所", "750円/通"],
                  ["申述人（放棄する人）の戸籍謄本", "市区町村役所", "750円/通"],
                  ["収入印紙", "郵便局・コンビニ", "800円"],
                  ["連絡用郵便切手", "郵便局", "約200〜500円"],
                ].map(([doc, where, cost], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200">{doc}</td>
                    <td className="p-3 border border-slate-200 text-slate-500">{where}</td>
                    <td className="p-3 border border-slate-200 text-right">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-2">※被相続人と相続人の関係によって必要書類が増える場合があります。詳細は管轄の家庭裁判所にご確認ください。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            4. 費用の目安
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="space-y-2 text-sm">
              {[
                ["申述書の収入印紙（1人あたり）", "800円"],
                ["戸籍謄本等の取得費用", "2,000〜5,000円程度"],
                ["郵便切手", "200〜500円程度"],
                ["司法書士に依頼する場合", "3〜5万円程度"],
                ["弁護士に依頼する場合", "5〜10万円程度"],
              ].map(([item, cost]) => (
                <div key={item} className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">{item}</span>
                  <span className="font-bold text-indigo-700">{cost}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            5. よくある失敗と注意点
          </h2>
          <div className="space-y-4">
            {[
              { title: "財産を一部でも使ってしまった", desc: "遺産の預金引き出しや不動産の処分をすると「単純承認」とみなされ、相続放棄できなくなる可能性があります。" },
              { title: "3ヶ月の期限を過ぎてしまった", desc: "特別な事情（借金の存在を知らなかった等）がある場合、裁判所に期限伸長の申請が可能です。ただし認められない場合もあります。" },
              { title: "次順位の相続人に連絡しなかった", desc: "相続放棄すると次順位の相続人（被相続人の親や兄弟など）が相続人になります。事前に連絡しておくのが礼儀です。" },
            ].map(item => (
              <div key={item.title} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-bold text-amber-800 mb-1">注意: {item.title}</p>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-indigo-900 rounded-2xl p-8 text-center text-white mt-10">
          <h2 className="text-xl font-black mb-2">AIで相続放棄をシミュレーション</h2>
          <p className="text-indigo-200 text-sm mb-6">プラス・マイナスの財産を入力すると、相続放棄すべきか無料で判定します。</p>
          <Link href="/tool" className="inline-block bg-amber-400 text-indigo-900 font-black px-8 py-3 rounded-xl hover:bg-amber-300 transition-colors">
            無料で相続放棄を判定する →
          </Link>
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-slate-700 mb-4">関連コラム</h3>
          <div className="space-y-3">
            {[
              { href: "/blog/sozoku-zei-keisan", title: "相続税の計算方法をわかりやすく解説" },
              { href: "/blog/sozoku-timeline", title: "相続手続きのタイムライン｜期限一覧" },
              { href: "/blog/isan-bunkatsu-kyogisho", title: "遺産分割協議書の書き方・テンプレート" },
            ].map(item => (
              <Link key={item.href} href={item.href} className="block bg-white rounded-xl p-4 border border-slate-200 hover:border-indigo-300 text-sm text-indigo-700 hover:underline">
                {item.title} →
              </Link>
            ))}
          </div>
        </div>
      </article>

      <footer className="bg-indigo-900 text-indigo-200 text-xs text-center py-6 mt-8">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/legal" className="hover:text-white">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
        </div>
        <p>© 2025 相続AI. 本コラムは情報提供を目的としており、法律相談ではありません。</p>
      </footer>
    </div>
  );
}
