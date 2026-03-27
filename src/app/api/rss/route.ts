import { Feed } from "feed";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ccafup.kr";

export async function GET() {
  const feed = new Feed({
    title: "CCAFup — CCA-F 시험 준비 허브",
    description: "CCA-F(Claude Certified Architect - Foundations) 시험 준비를 위한 비공식 커뮤니티 정보 허브",
    id: SITE_URL,
    link: SITE_URL,
    language: "ko",
    copyright: `© ${new Date().getFullYear()} CCAFup. All rights reserved.`,
    feedLinks: {
      rss2: `${SITE_URL}/api/rss`,
    },
  });

  const pages = [
    { title: "Agentic Architecture & Orchestration", path: "/ko/domains/agentic-architecture", desc: "에이전트 아키텍처 설계, 오케스트레이션 패턴 (27%)" },
    { title: "Claude Code Configuration & Workflows", path: "/ko/domains/claude-code", desc: "CLAUDE.md, 슬래시 커맨드, CI/CD (20%)" },
    { title: "Prompt Engineering & Structured Output", path: "/ko/domains/prompt-engineering", desc: "JSON 스키마, few-shot, 검증 루프 (20%)" },
    { title: "Tool Design & MCP Integration", path: "/ko/domains/tool-design-mcp", desc: "MCP 서버, 툴 경계, 에러 핸들링 (18%)" },
    { title: "Context Management & Reliability", path: "/ko/domains/context-management", desc: "컨텍스트 유지, 핸드오프, 신뢰도 (15%)" },
    { title: "Customer Support Resolution Agent", path: "/ko/scenarios/customer-support-agent", desc: "고객 문의 자동 분류 및 해결" },
    { title: "Code Generation with Claude Code", path: "/ko/scenarios/code-generation", desc: "Claude Code 자동 코드 생성" },
    { title: "Multi-Agent Research System", path: "/ko/scenarios/multi-agent-research", desc: "멀티 에이전트 리서치 시스템" },
    { title: "시험 개요", path: "/ko/exam/overview", desc: "CCA-F 시험 구조와 핵심 정보" },
    { title: "시험 정보", path: "/ko/exam/info", desc: "형식, 비용, 등록, 합격 기준" },
    { title: "준비 가이드", path: "/ko/prep/roadmap", desc: "12주 로드맵, 코스 목록" },
    { title: "치트시트", path: "/ko/prep/cheatsheet", desc: "도메인별 요약, 직전 복습" },
  ];

  for (const page of pages) {
    feed.addItem({
      title: page.title,
      id: `${SITE_URL}${page.path}`,
      link: `${SITE_URL}${page.path}`,
      description: page.desc,
      date: new Date(),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
