"use client";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "相続が発生したら何から始めればいいですか？", a: "まず相続人と相続財産を確認します。相続開始から3ヶ月以内に相続放棄の判断、4ヶ月以内に準確定申告、10ヶ月以内に相続税申告が必要です。" },
    { q: "相続税はいくらかかりますか？", a: "基礎控除額は3,000万円＋600万円×法定相続人数です。例えば相続人が配偶者と子2人の場合、4,800万円まで相続税はかかりません。" },
    { q: "遺産分割協議書は自分で作れますか？", a: "法律上、特定の書式はありませんが、相続人全員の署名・実印が必要です。本AIが雛形を生成しますが、重要な手続きには専門家への確認をお勧めします。" },
    { q: "相続放棄はいつまでにすればいいですか？", a: "相続開始を知った日から3ヶ月以内に家庭裁判所への申述が必要です。" },
    { q: "無料で使えますか？", a: "シミュレーター・タイムライン・相続放棄判定は無料です。AIによる詳細な遺産分割協議書雛形生成はプレミアムプラン（¥980/月）でご利用いただけます。" },
  ];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-lg">⚖️ 相続AI</div>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/legal" className="hover:text-amber-300 transition-colors">特商法</Link>
        </div>
      </nav>
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-400 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full mb-4">無料シミュレーター</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">相続の複雑さを、<br />AIが3分で整理します</h1>
          <p className="text-indigo-200 text-lg mb-8">相続税の概算・手続きタイムライン・遺産分割協議書雛形まで。<br />親が亡くなった直後でも、AIが次にやることを教えます。</p>
          <Link href="/tool" className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">無料で相続シミュレーションする →</Link>
          <p className="text-indigo-300 text-sm mt-4">登録不要・3分で完了・無料</p>
        </div>
      </section>
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center text-slate-700 mb-8">こんなお悩みはありませんか？</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "😰", text: "何から手をつければいいか全くわからない" },
              { icon: "⏰", text: "期限があることは知っているが具体的な日程が不安" },
              { icon: "👨‍👩‍👧‍👦", text: "兄弟間で遺産の分け方でもめている" },
              { icon: "💰", text: "相続税がいくらかかるか計算できない" },
              { icon: "📄", text: "遺産分割協議書の書き方がわからない" },
              { icon: "🏦", text: "借金を相続しないか心配で相続放棄を検討中" },
            ].map((p, i) => (
              <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 items-start">
                <span className="text-2xl">{p.icon}</span>
                <p className="text-slate-700 text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">4つの機能で相続をサポート</h2>
          <p className="text-center text-slate-500 text-sm mb-8">専門家に頼む前に、まずAIで全体像を把握しましょう</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "💴", title: "相続税シミュレーター", desc: "遺産総額・相続人数を入力するだけで相続税の概算額と基礎控除を自動計算。専門家に相談する前の目安として活用できます。", free: true },
              { icon: "📅", title: "手続きタイムライン", desc: "相続開始日を入力すると、準確定申告（4ヶ月）・相続放棄（3ヶ月）・相続税申告（10ヶ月）などの期限を一覧表示。", free: true },
              { icon: "📝", title: "遺産分割協議書雛形生成", desc: "相続人情報と財産内容を入力するだけで、AIが遺産分割協議書の雛形を生成。法律用語も自動で補完します。", free: false },
              { icon: "⚖️", title: "相続放棄シミュレーター", desc: "プラスの財産とマイナスの財産（借金）を比較して、相続放棄すべきかどうかをAIが判定。手続きの流れも解説。", free: true },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-indigo-900">{f.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.free ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {f.free ? "無料" : "プレミアム"}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-8">3ステップで相続の全体像を把握</h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "基本情報を入力", desc: "遺産総額、相続人数、相続開始日を入力（3分）" },
              { step: "02", title: "AIが分析", desc: "相続税概算・重要期限・必要手続きを自動計算" },
              { step: "03", title: "次のアクションが明確に", desc: "今すぐやるべきこと、専門家への相談タイミングがわかる" },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="bg-indigo-900 text-amber-400 font-black text-lg w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-bold text-indigo-900">{s.title}</h3>
                  <p className="text-slate-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center text-indigo-900 mb-8">ご利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { text: "父が亡くなって何をすればいいかパニックでしたが、タイムライン機能で期限が一目でわかって助かりました。", name: "50代・会社員", stars: 5 },
              { text: "相続税の概算が自分で計算できて、税理士に相談する前の準備ができました。", name: "40代・自営業", stars: 5 },
              { text: "兄弟3人で遺産分割の話し合いが難航していましたが、協議書の雛形で話が進みやすくなりました。", name: "60代・主婦", stars: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="text-amber-400 text-sm mb-2">{Array(t.stars).fill("★").join("")}</div>
                <p className="text-slate-700 text-sm mb-3">"{t.text}"</p>
                <p className="text-slate-400 text-xs">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-bold text-center text-slate-700 mb-6">より複雑な相続は専門家へ</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.zeiri4.com/" target="_blank" rel="noopener noreferrer" className="block bg-blue-50 border border-blue-200 rounded-xl p-5 hover:bg-blue-100 transition-colors">
              <div className="font-bold text-blue-800 mb-1">💼 税理士ドットコム</div>
              <p className="text-sm text-blue-700">相続税申告は税理士へ。全国の税理士を無料で比較・相談できます。</p>
              <div className="mt-2 text-xs text-blue-500">無料相談はこちら →</div>
            </a>
            <a href="https://www.bengo4.com/inheritance/" target="_blank" rel="noopener noreferrer" className="block bg-green-50 border border-green-200 rounded-xl p-5 hover:bg-green-100 transition-colors">
              <div className="font-bold text-green-800 mb-1">⚖️ 弁護士ドットコム（相続）</div>
              <p className="text-sm text-green-700">遺産分割争い・相続放棄の手続きは弁護士へ。初回無料相談あり。</p>
              <div className="mt-2 text-xs text-green-500">無料相談はこちら →</div>
            </a>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-indigo-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-2">シンプルな料金プラン</h2>
          <p className="text-indigo-300 text-sm mb-8">まずは無料でお試しください</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-800 rounded-2xl p-6 border border-indigo-600">
              <div className="text-amber-400 font-black text-lg mb-1">無料プラン</div>
              <div className="text-3xl font-black mb-4">¥0</div>
              <ul className="text-left space-y-2 text-sm text-indigo-200 mb-6">
                {["相続税シミュレーター", "手続きタイムライン", "相続放棄シミュレーター", "基本的なAI診断（3回）"].map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <Link href="/tool" className="block bg-amber-400 text-indigo-900 font-bold py-2 px-4 rounded-xl hover:bg-amber-300 transition-colors">無料で始める</Link>
            </div>
            <div className="bg-white text-slate-800 rounded-2xl p-6 border-2 border-amber-400">
              <div className="text-amber-600 font-black text-lg mb-1">プレミアムプラン</div>
              <div className="text-3xl font-black mb-1">¥980<span className="text-base font-normal text-slate-500">/月</span></div>
              <div className="text-xs text-slate-400 mb-4">いつでも解約可能</div>
              <ul className="text-left space-y-2 text-sm text-slate-600 mb-6">
                {["無料プランの全機能", "遺産分割協議書雛形生成（AI）", "詳細な相続アドバイス（無制限）", "相続税節税対策プラン"].map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <Link href="/tool" className="block bg-indigo-900 text-white font-bold py-2 px-4 rounded-xl hover:bg-indigo-800 transition-colors">プレミアムで始める</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-8">よくある質問</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 font-medium text-slate-800 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-indigo-500 text-lg ml-2">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-600 text-sm border-t border-slate-100 pt-3">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-amber-50 border-t border-amber-200">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-black text-indigo-900 mb-4">今すぐ相続の全体像を把握しよう</h2>
          <p className="text-slate-600 text-sm mb-6">登録不要・3分で完了・無料シミュレーター</p>
          <Link href="/tool" className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">相続シミュレーションを始める →</Link>
        </div>
      </section>
      <div className="bg-slate-100 py-6 px-4">
        <p className="text-center text-xs text-slate-400 max-w-2xl mx-auto">※ 本サービスはAIによる情報提供を目的としており、法律・税務・財務に関する専門的アドバイスではありません。相続手続き・相続税申告については、必ず弁護士・税理士等の有資格者にご相談ください。</p>
      </div>
      {/* X Share */}
      <section className="py-6 px-6 text-center bg-slate-50">
        <a
          href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("相続AI — 相続税シミュレーター・手続きタイムライン・相続放棄判定をAIが無料サポート⚖️ 法律・税務の初期調査に → https://soukoku-ai.vercel.app #相続 #相続税 #相続放棄")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Xでシェアする
        </a>
      </section>
      <footer className="bg-indigo-900 text-indigo-300 py-8 px-4 text-sm">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-between gap-4">
          <div><div className="text-white font-bold mb-1">⚖️ 相続AI</div><p className="text-xs">運営: ポッコリラボ</p></div>
          <div className="flex gap-6 text-xs">
            <Link href="/legal" className="hover:text-white transition-colors">特定商取引法</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <Link href="/tool" className="hover:text-white transition-colors">ツール</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
