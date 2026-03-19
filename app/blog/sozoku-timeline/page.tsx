import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "相続手続きのタイムライン｜期限一覧と優先順位【2025年版】｜相続AI",
  description: "相続開始から10ヶ月の相続税申告まで、見落としがちな手続きの期限と優先順位を一覧で解説。相続放棄（3ヶ月）・準確定申告（4ヶ月）・相続税申告（10ヶ月）の流れをわかりやすく説明。",
  keywords: "相続 手続き 流れ,相続 タイムライン,相続 期限 一覧,相続 何から始める,相続税申告 期限",
};

const TIMELINE = [
  { period: "7日以内", tasks: ["死亡届の提出（市区町村役所）", "火葬許可証の取得"], priority: "high", note: "死亡届は死亡診断書と一緒に提出" },
  { period: "14日以内", tasks: ["年金受給停止の手続き", "健康保険証の返却", "世帯主変更届（必要な場合）"], priority: "high", note: "放置すると不正受給になる場合も" },
  { period: "3ヶ月以内", tasks: ["相続放棄・限定承認の検討と申述", "遺言書の有無の確認・検認"], priority: "critical", note: "この期限を過ぎると単純承認とみなされる" },
  { period: "4ヶ月以内", tasks: ["準確定申告（被相続人の所得税申告）"], priority: "high", note: "当年1月1日〜死亡日までの所得がある場合" },
  { period: "10ヶ月以内", tasks: ["相続税申告・納付", "遺産分割協議の完了", "相続登記（不動産名義変更）"], priority: "high", note: "2024年4月から相続登記が義務化（3年以内）" },
  { period: "1年以内", tasks: ["遺留分侵害額の請求（侵害を知った日から1年）"], priority: "medium", note: "遺言で相続分が少ない場合に検討" },
  { period: "随時", tasks: ["預貯金口座の解約・名義変更", "証券口座の名義変更", "自動車の名義変更", "各種サービスの解約"], priority: "low", note: "特に期限はないが早めに対応を" },
];

export default function SozokuTimelinePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">⚖️ 相続AI</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/blog" className="hover:text-amber-300 transition-colors">コラム</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/blog" className="hover:text-indigo-600">コラム</Link>
          <span>›</span>
          <span>相続手続きのタイムライン</span>
        </div>

        <div className="mb-6">
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">手続き</span>
          <span className="text-slate-400 text-xs ml-3">📖 約4分で読めます</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-indigo-900 mb-4 leading-tight">
          相続手続きのタイムライン<br />｜期限一覧と優先順位
        </h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          相続手続きには様々な期限があります。見落としてしまうと相続放棄ができなくなったり、加算税が課せられることも。手続きの全体像を把握しましょう。
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">期限別 相続手続き一覧</h2>
          <div className="space-y-4">
            {TIMELINE.map((item) => (
              <div key={item.period} className={`bg-white rounded-xl border-2 p-5 shadow-sm ${
                item.priority === "critical" ? "border-red-400" :
                item.priority === "high" ? "border-amber-300" :
                item.priority === "medium" ? "border-blue-300" :
                "border-slate-200"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-sm font-black px-3 py-1 rounded-full ${
                    item.priority === "critical" ? "bg-red-100 text-red-700" :
                    item.priority === "high" ? "bg-amber-100 text-amber-700" :
                    item.priority === "medium" ? "bg-blue-100 text-blue-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {item.period}
                  </div>
                  {item.priority === "critical" && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">⚠️ 最重要</span>}
                </div>
                <ul className="space-y-1 mb-2">
                  {item.tasks.map(task => (
                    <li key={task} className="text-sm text-slate-700 flex gap-2">
                      <span className="text-indigo-500 shrink-0">✓</span>{task}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400">💡 {item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">まず何から始めるべきか</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: "Week 1", title: "緊急手続きを完了", tasks: ["死亡届・火葬許可", "金融機関への連絡（口座凍結防止）"] },
              { step: "Month 1", title: "財産と借金を把握", tasks: ["通帳・不動産・借金の調査", "相続放棄するか判断開始"] },
              { step: "Month 3", title: "相続放棄の判断期限", tasks: ["家庭裁判所への申述（放棄する場合）", "遺言書の確認と検認"] },
            ].map(item => (
              <div key={item.step} className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <div className="text-xs font-bold text-indigo-500 mb-1">{item.step}</div>
                <p className="font-bold text-indigo-900 text-sm mb-2">{item.title}</p>
                <ul className="space-y-1">
                  {item.tasks.map(t => <li key={t} className="text-xs text-slate-600">• {t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-indigo-900 rounded-2xl p-8 text-center text-white mt-10">
          <h2 className="text-xl font-black mb-2">AIで相続タイムラインを自動生成</h2>
          <p className="text-indigo-200 text-sm mb-6">相続開始日を入力すると、あなたの手続き期限カレンダーを無料で生成します。</p>
          <Link href="/tool" className="inline-block bg-amber-400 text-indigo-900 font-black px-8 py-3 rounded-xl hover:bg-amber-300 transition-colors">
            無料でタイムラインを確認する →
          </Link>
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-slate-700 mb-4">📚 関連コラム</h3>
          <div className="space-y-3">
            {[
              { href: "/blog/sozoku-zei-keisan", title: "相続税の計算方法をわかりやすく解説" },
              { href: "/blog/sozoku-hoki-tetsuzuki", title: "相続放棄の手続き完全ガイド" },
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
