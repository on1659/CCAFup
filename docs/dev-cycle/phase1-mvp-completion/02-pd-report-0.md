# PD 보고서: Phase 1 MVP 완성 (사이클 #0)

╔══════════════════════════════════════════╗
║  개발 사이클: Phase 1 MVP 완성            ║
║  현재 단계: PD 보고서                     ║
║  반복: 0/3                               ║
╚══════════════════════════════════════════╝

## Go/No-Go 판단

**조건부 Go.**
- 뼈대(17개 페이지, 라우팅, 테마, 다국어, 레이아웃)는 완성. 빌드 성공 상태.
- Must 4개(MDX 파이프라인, SEO, 이메일 구독, 배포)에 집중하면 일정 내 완료 가능.
- Cmd+K 검색은 Phase 1.5로 명시적 분리. OG 이미지는 정적으로 시작.

## 작업 분해 (WBS)

| # | 담당 | 작업 | 예상 공수 | 선행 작업 | 우선순위 |
|---|------|-----|---------|---------|---------|
| 1 | FE(미래) | MDX 파이프라인 구축 (next-mdx-remote/rsc + gray-matter + rehype 플러그인) | 3h | 없음 | P0 |
| 2 | FE(미래) | MDX 커스텀 컴포넌트 (mdx-components.tsx + Callout/Tip/Warning) | 2h | #1 | P0 |
| 3 | FE(미래) | domains/[slug] MDX 동적 로드 + useTranslations 버그 수정 | 2h | #1 | P0 |
| 4 | FE(미래) | scenarios/[slug] MDX 동적 로드 | 1.5h | #1 | P0 |
| 5 | FE(미래) | ToC 컴포넌트 (heading 추출 + IntersectionObserver) | 2h | #1 | P1 |
| 6 | BE(태준) | Supabase 셋업 + subscribers 테이블 + RLS + .env.example | 2h | 없음 | P0 |
| 7 | BE(태준) | lib/supabase/server.ts + client.ts (Phase 2 대비 구조) | 1h | #6 | P0 |
| 8 | BE(태준) | 이메일 구독 Server Action (upsert 패턴) | 1h | #7 | P0 |
| 9 | FE(미래) | subscribe-form.tsx 컴포넌트 (상태머신 + 토스트) | 2h | #8 | P1 |
| 10 | BE(태준) | sitemap.ts + robots.ts | 1h | #1(MDX 목록) | P0 |
| 11 | BE(태준) | RSS 피드 (/api/rss/route.ts) | 1h | #1 | P2 |
| 12 | FE(미래) | error.tsx + not-found.tsx + loading.tsx | 1h | 없음 | P1 |
| 13 | 콘텐츠 | MDX 콘텐츠 작성: 시험정보 5개 (overview, info, partner, day-guide, faq) | 4h | #1 | P0 |
| 14 | 콘텐츠 | MDX 콘텐츠 작성: 도메인 5개 | 5h | #1 | P0 |
| 15 | 콘텐츠 | MDX 콘텐츠 작성: 시나리오 6개 | 5h | #1 | P1 |
| 16 | 콘텐츠 | 용어사전 glossary.json (50+ 용어) | 3h | 없음 | P1 |
| 17 | 콘텐츠 | 준비가이드/치트시트/리소스 MDX | 3h | #1 | P1 |
| 18 | UI(다은) | MDX prose 스타일 (@tailwindcss/typography + CSS 변수 오버라이드) | 4h | #1 | P0 |
| 19 | UI(다은) | ContentCard 공통 컴포넌트 + 홈 CTA Button 리팩터링 | 3h | 없음 | P1 |
| 20 | 전략(소연) | 페이지별 SEO 메타 정의 + JSON-LD 스키마 | 3h | 콘텐츠 목록 | P1 |
| 21 | 인프라 | Railway 스테이징 배포 + 환경변수 | 2h | #6, #7 | P0 |

## 개발 범위 확정

### 이번 사이클 포함
- MDX 파이프라인 구축 + 커스텀 컴포넌트
- MDX 콘텐츠 작성 (시험정보 5개 + 도메인 5개 + 시나리오 6개 + 기타)
- Supabase subscribers 테이블 + 이메일 구독 Server Action + subscribe-form
- SEO 기본 (sitemap.ts, robots.ts, generateMetadata 보강)
- 기존 버그 수정 (useTranslations Server Component, notFound 처리)
- error.tsx / not-found.tsx / loading.tsx
- ToC 컴포넌트
- Railway 스테이징 배포

### 제외 (Phase 1.5 또는 다음 사이클)
- Cmd+K 검색 (cmdk + fuse.js) — 콘텐츠 충분히 쌓인 후
- 동적 OG 이미지 (satori + resvg) — 한글 폰트 이슈, 정적 OG로 시작
- PostHog / Sentry / GA4 — 스크립트 삽입 수준, 배포 후 추가 가능
- RSS 피드 — nice to have
- shiki 코드 하이라이팅 — 기본 `<pre>` 스타일로 시작
- Prisma 스키마 — Phase 1은 Supabase Client SDK만
- 프로덕션 도메인 연결 — 스테이징 우선

## 리스크 매트릭스

| 리스크 | 확률 | 영향 | 대응 전략 |
|--------|------|------|---------|
| MDX 콘텐츠 볼륨 부족 (40개 MDX 필요) | 높 | 높 | 최소 런칭 기준 정의: 도메인 5개+시험정보 3개 = 8개로 MVP |
| useTranslations Server Component 버그 | 확정 | 높 | 즉시 수정 (getTranslations로 교체) |
| Supabase subscribers 스팸 (Rate limit 없음) | 중 | 중 | Phase 1은 이메일 형식 검증 + upsert로 방어. Redis는 Phase 2 |
| 다국어 전환 시 경로 미보존 | 확정 | 중 | GNB 언어 토글에 usePathname 반영 |
| GNB 드롭다운 키보드 접근 불가 | 확정 | 중 | focus-within 기반으로 개선 |

## 예상 사용 시나리오

### 개발 전 (As-Is)
CCA-F 수험생이 "CCA-F 시험"을 검색하면 영문 공식 사이트만 나옴. 한국어 정보는 블로그 포스트 몇 개가 전부. 체계적인 도메인별 학습 자료 없음. 시험 정보(형식, 비용, 등록 방법)를 파편적으로 수집해야 함.

### 개발 후 (To-Be)
검색으로 ccafup.kr 랜딩 → 시험 개요에서 CCA-F 전체 구조 파악 → 5개 도메인별 상세 콘텐츠 학습 → 시나리오 기반 실전 연습 → 이메일 구독으로 업데이트 알림 수신. 한국어로 체계적인 학습 경로 제공.
