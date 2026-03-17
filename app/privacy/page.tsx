export default function PrivacyPage() {
  const sections = [
    ["収集する情報", "本サービスでは、利用状況の分析のため、Cookieによる利用回数情報を収集します。プレミアム登録時にはメールアドレスを任意で提供いただけます。"],
    ["利用目的", "収集した情報は、サービスの改善およびお知らせの送信にのみ使用します。第三者への提供はいたしません。"],
    ["Cookieについて", "本サービスはCookieを使用して利用回数を管理しています。ブラウザの設定でCookieを無効にできますが、一部機能が利用できなくなる場合があります。"],
    ["安全管理", "カード情報はPAY.JPによるセキュアな処理が行われ、当社のサーバーには保存されません。"],
    ["お問い合わせ", "X: @levona_design までお問い合わせください。"],
  ];
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-black text-indigo-900 mb-6">プライバシーポリシー</h1>
        <div className="space-y-6 text-sm text-slate-700">
          {sections.map(([title, body], i) => (
            <section key={i}>
              <h2 className="font-bold text-indigo-900 mb-2">{i + 1}. {title}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
