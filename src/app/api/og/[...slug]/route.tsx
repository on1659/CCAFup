import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const slug = pathname.replace("/api/og/", "").replace(/\/$/, "");

  const titles: Record<string, string> = {
    "exam/overview": "시험 개요",
    "exam/info": "시험 정보",
    "exam/partner": "파트너 네트워크 가이드",
    "exam/day-guide": "시험 당일 가이드",
    "exam/faq": "FAQ",
    "domains": "도메인 목록",
    "scenarios": "시나리오 목록",
    "glossary": "용어 사전",
    "prep/roadmap": "준비 가이드",
    "prep/cheatsheet": "치트시트",
    "resources": "리소스 & 링크",
  };

  const title = titles[slug] || "CCAFup";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#FAFAF9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#4F46E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <span style={{ fontSize: "36px", fontWeight: 700, color: "#1C1917" }}>
            CCAFup
          </span>
          <span
            style={{
              background: "#EEF2FF",
              color: "#3730A3",
              padding: "4px 12px",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Unofficial
          </span>
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#1C1917",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#78716C",
            marginTop: "16px",
          }}
        >
          CCA-F 시험 준비 허브
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
