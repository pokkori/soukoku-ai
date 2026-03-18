export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-black text-indigo-900 mb-6">利用規約</h1>
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section>
            <h2 className="font-bold text-slate-800 mb-2">第1条（適用）</h2>
            <p>本規約は、ポッコリラボ（以下「当社」）が提供する相続AI（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、本サービスをご利用ください。</p>
          </section>
          <section>
            <h2 className="font-bold text-slate-800 mb-2">第2条（サービス内容）</h2>
            <p>本サービスは、AIを活用した相続・遺産分割に関する情報提供サービスです。本サービスが提供する情報は参考目的のものであり、法律・税務・財務に関する専門的なアドバイスではありません。具体的な手続きについては、弁護士・税理士等の専門家にご相談ください。</p>
          </section>
          <section>
            <h2 className="font-bold text-slate-800 mb-2">第3条（禁止事項）</h2>
            <p>ユーザーは以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>本サービスのサーバーまたはネットワークへの妨害行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーまたは第三者の権利・利益を侵害する行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold text-slate-800 mb-2">第4条（免責事項）</h2>
            <p>当社は、本サービスが提供する情報の正確性・完全性・最新性を保証しません。本サービスの利用によって生じた損害について、当社は一切の責任を負いません。</p>
          </section>
          <section>
            <h2 className="font-bold text-slate-800 mb-2">第5条（サービスの変更・停止）</h2>
            <p>当社は、ユーザーへの事前通知なく、本サービスの内容を変更または停止することができます。</p>
          </section>
          <section>
            <h2 className="font-bold text-slate-800 mb-2">第6条（規約の変更）</h2>
            <p>当社は、必要に応じて本規約を変更することができます。変更後の規約は本サービス上に掲示した時点から効力を生じます。</p>
          </section>
          <section>
            <h2 className="font-bold text-slate-800 mb-2">第7条（準拠法・管轄）</h2>
            <p>本規約は日本法に準拠し、本サービスに関する紛争については名古屋地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </section>
          <p className="text-xs text-slate-400 pt-4 border-t">制定日：2024年1月1日　ポッコリラボ</p>
        </div>
      </div>
    </div>
  );
}
