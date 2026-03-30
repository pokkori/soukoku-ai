export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-black text-indigo-900 mb-6">プライバシーポリシー</h1>
        <div className="space-y-6 text-sm text-slate-700">
          <section>
            <h2 className="font-bold text-indigo-900 mb-2">1. 収集する情報</h2>
            <p>本サービスでは、利用状況の分析のため、Cookieによる利用回数情報を収集します。プレミアム登録時にはメールアドレスを任意で提供いただけます。</p>
          </section>
          <section>
            <h2 className="font-bold text-indigo-900 mb-2">2. 利用目的</h2>
            <p>収集した情報は、サービスの改善およびお知らせの送信にのみ使用します。第三者への提供はいたしません。</p>
          </section>
          <section>
            <h2 className="font-bold text-indigo-900 mb-2">3. Cookieについて</h2>
            <p>本サービスはCookieを使用して利用回数を管理しています。ブラウザの設定でCookieを無効にできますが、一部機能が利用できなくなる場合があります。</p>
          </section>
          <section>
            <h2 className="font-bold text-indigo-900 mb-2">4. 安全管理</h2>
            <p>カード情報はPAY.JPによるセキュアな処理が行われ、当社のサーバーには保存されません。</p>
          </section>
          <section>
            <h2 className="font-bold text-indigo-900 mb-2">5. 外部送信規律に基づく情報送信</h2>
            <p className="mb-2">本サービスでは、電気通信事業法の外部送信規律に基づき、以下の外部サービスにデータを送信しています。</p>
            <table className="w-full text-left border-collapse text-xs text-slate-600">
              <thead><tr className="border-b"><th className="py-2 pr-2">送信先</th><th className="py-2 pr-2">目的</th><th className="py-2">送信される情報</th></tr></thead>
              <tbody>
                <tr className="border-b"><td className="py-2 pr-2">Anthropic（Claude API）</td><td className="py-2 pr-2">AI回答の生成</td><td className="py-2">ユーザーの入力テキスト</td></tr>
                <tr className="border-b"><td className="py-2 pr-2">PAY.JP（PAY株式会社）</td><td className="py-2 pr-2">決済処理</td><td className="py-2">決済に必要な情報</td></tr>
                <tr><td className="py-2 pr-2">Vercel Inc.</td><td className="py-2 pr-2">ホスティング・アクセス解析</td><td className="py-2">ページビュー・デバイス情報</td></tr>
              </tbody>
            </table>
          </section>
          <section>
            <h2 className="font-bold text-indigo-900 mb-2">6. お問い合わせ</h2>
            <p>X: @levona_design までお問い合わせください。</p>
          </section>
        </div>
      </div>
    </div>
  );
}
