'use client';
import { useState } from 'react';

export default function InheritanceSample() {
  const [showSample, setShowSample] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowSample(!showSample)}
        className="text-blue-600 text-sm font-medium hover:underline"
      >
        {showSample ? '▲ サンプルを閉じる' : '▼ AIが生成する遺産分割協議書のサンプルを見る'}
      </button>

      {showSample && (
        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500">サンプル（子2人・不動産1件・預金あり）</span>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">AIドラフト</span>
          </div>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
{`遺産分割協議書

被相続人 山田太郎（1950年3月15日生、2026年1月10日死亡）
の遺産について、相続人全員で協議した結果、
以下のとおり分割することを合意する。

第1条（不動産）
東京都世田谷区○○町1丁目2番3号
宅地 150.00㎡及び同所家屋番号3番
木造2階建 床面積 95.80㎡
→ 相続人 山田花子（配偶者）が相続する

第2条（預貯金）
三菱UFJ銀行 渋谷支店 普通預金 口座1234567
残高 1,200万円
→ 山田花子 600万円、山田一郎（長男）600万円

...（続きはAIで自動生成）

━━━━━━━━━━━━━━━━━━
⚠️ AIドラフトは参考例です。法的効力には専門家の確認を推奨します
━━━━━━━━━━━━━━━━━━`}
          </pre>
          <a href="/tool" className="mt-3 block bg-blue-600 text-white text-center font-bold px-4 py-2 rounded-lg text-sm">
            全文をAIで無料生成する →
          </a>
        </div>
      )}
    </div>
  );
}
