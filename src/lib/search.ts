import Fuse from "fuse.js";

export interface SearchItem {
  title: string;
  description: string;
  category: string;
  href: string;
}

const searchData: SearchItem[] = [
  // Exam
  { title: "시험 개요", description: "CCA-F 시험 구조와 핵심 정보", category: "exam", href: "/exam/overview" },
  { title: "시험 정보", description: "형식, 비용, 등록, 합격 기준", category: "exam", href: "/exam/info" },
  { title: "파트너 네트워크 가이드", description: "Claude Partner Network 가입 절차", category: "exam", href: "/exam/partner" },
  { title: "시험 당일 가이드", description: "ProctorFree 환경 세팅, 주의사항", category: "exam", href: "/exam/day-guide" },
  { title: "FAQ", description: "자주 묻는 질문과 답변", category: "exam", href: "/exam/faq" },

  // Domains
  { title: "Agentic Architecture & Orchestration", description: "멀티에이전트, 태스크 분해, hub-and-spoke (27%)", category: "domains", href: "/domains/agentic-architecture" },
  { title: "Claude Code Configuration & Workflows", description: "CLAUDE.md, 슬래시 커맨드, CI/CD (20%)", category: "domains", href: "/domains/claude-code" },
  { title: "Prompt Engineering & Structured Output", description: "JSON 스키마, few-shot, 검증 루프 (20%)", category: "domains", href: "/domains/prompt-engineering" },
  { title: "Tool Design & MCP Integration", description: "MCP 서버, 툴 경계, 에러 핸들링 (18%)", category: "domains", href: "/domains/tool-design-mcp" },
  { title: "Context Management & Reliability", description: "컨텍스트 유지, 핸드오프, 신뢰도 (15%)", category: "domains", href: "/domains/context-management" },

  // Scenarios
  { title: "Customer Support Resolution Agent", description: "고객 문의 자동 분류 및 해결 에이전트", category: "scenarios", href: "/scenarios/customer-support-agent" },
  { title: "Code Generation with Claude Code", description: "Claude Code 자동 코드 생성", category: "scenarios", href: "/scenarios/code-generation" },
  { title: "Multi-Agent Research System", description: "멀티 에이전트 리서치 시스템", category: "scenarios", href: "/scenarios/multi-agent-research" },
  { title: "Developer Productivity with Claude", description: "개발자 생산성 향상", category: "scenarios", href: "/scenarios/developer-productivity" },
  { title: "Claude Code for CI/CD", description: "CI/CD 파이프라인 자동화", category: "scenarios", href: "/scenarios/cicd" },
  { title: "Structured Data Extraction", description: "구조화된 데이터 추출", category: "scenarios", href: "/scenarios/data-extraction" },

  // Prep
  { title: "준비 가이드", description: "12주 로드맵, 코스 목록, 학습 전략", category: "prep", href: "/prep/roadmap" },
  { title: "치트시트", description: "도메인별 요약, 시험 직전 복습", category: "prep", href: "/prep/cheatsheet" },
  { title: "용어 사전", description: "시험 핵심 용어 한영 대조", category: "prep", href: "/glossary" },
  { title: "리소스 & 링크", description: "공식 문서, 추천 강의, 커뮤니티 자료", category: "prep", href: "/resources" },
];

const fuse = new Fuse(searchData, {
  keys: ["title", "description"],
  threshold: 0.4,
  includeScore: true,
});

export function search(query: string): SearchItem[] {
  if (!query.trim()) return [];
  return fuse.search(query).map((r) => r.item);
}

export function getSearchData(): SearchItem[] {
  return searchData;
}
