# CLAUDE.md — CCAFup Project Rules

## 프로젝트
- 이름: CCAFup (카프업)
- CCA-F 시험 준비 비공식 정보 허브
- 도메인: ccafup.kr

## 문서 참조
- 기능: docs/01_마스터목차.md
- 디자인: docs/02_디자인시스템.md
- 테마: docs/03_테마시스템.md
- 기술: docs/04_기술스택.md
- Phase: docs/05_Phase분리.md

## 코딩 컨벤션
- 파일명: kebab-case.tsx / Export: PascalCase
- 한 파일 한 컴포넌트
- hex 하드코딩 금지 → CSS 변수 또는 Tailwind 클래스
- 커밋: conventional commits (feat/fix/chore/docs)

## DB 접근
- 유저 대면: Supabase Client SDK (@supabase/ssr)
- 관리자/Cron: Prisma (service_role)
- RLS: supabase/migrations/ 별도 SQL

## 인증
- Server Actions에서 getUser() 필수
- 비로그인 허용: 정적 콘텐츠 (domains, scenarios, exam info)
- 로그인 필수: quiz, dashboard, community write

## MDX 콘텐츠
- 경로: content/{locale}/{category}/{slug}.mdx

## 테마
- Option A: Stone + Indigo
- 모든 색상은 CSS 변수로 정의 (03_테마시스템.md)
- bg-stone-100 대신 bg-raised 사용 (자동 다크모드 스위칭)
- Tailwind v3.4 + darkMode: "class"

## Phase 1 (MVP) 범위
- 정적 콘텐츠 중심 (MDX)
- DB: subscribers 테이블만
- Auth: 이메일 구독만 (OAuth는 Phase 2)
- Coming Soon: 퀴즈, 대시보드, 커뮤니티
