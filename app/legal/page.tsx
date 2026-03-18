export default function LegalPage() {
  const rows = [
    ["販売業者名", "ポッコリラボ"],
    ["所在地", "〒475-0077 愛知県半田市元山町"],
    ["連絡先", "X: @levona_design"],
    ["販売価格", "プレミアムプラン: ¥980/月（税込み）"],
    ["支払方法", "クレジットカード（オンライン決済サービス経由）"],
    ["商品の引渡し", "決済完了後、即度利用可能"],
    ["返品・解約", "サービスの性質上、返品は受け付けておりません。プレミアムプランはいつでも解約可能です。"],
    ["特記事項", "本サービスはAIによる情報提供であり、法律・税務・財務に関する専門的アドバイスではありません。"],
  ];
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-black text-indigo-900 mb-6">特定商取引法に基づく表示</h1>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {rows.map(([key, val], i) => (
              <tr key={i} className="border-t border-slate-200">
                <td className="py-3 pr-4 font-medium text-slate-700 w-1/3 align-top">{key}</td>
                <td className="py-3 text-slate-600">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
