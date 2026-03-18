import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "相続AI | 相続税シミュレーター・手続きタイムライン・相続放棄判定を無料で";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #312e81 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 16 }}>⚖️</div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#c7d2fe", marginBottom: 16, textAlign: "center" }}>
          相続AI
        </div>
        <div style={{ fontSize: 28, color: "#e0e7ff", textAlign: "center", maxWidth: 900 }}>
          相続税シミュレーター・手続きタイムライン・相続放棄判定を無料で
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
          {["相続税シミュレート", "手続きタイムライン", "相続放棄判定"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                background: "rgba(199,210,254,0.15)",
                border: "1px solid rgba(199,210,254,0.5)",
                borderRadius: 24,
                fontSize: 18,
                color: "#c7d2fe",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 32,
            padding: "12px 36px",
            background: "#4f46e5",
            borderRadius: 40,
            fontSize: 22,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          無料で試す → ¥980/月〜
        </div>
      </div>
    ),
    { ...size }
  );
}
