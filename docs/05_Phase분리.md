# 🚀 CCAFup — Phase 분리 & MVP 정의

> **문서 버전:** v1.0 | **작성일:** 2026.03.24
>
> 목차 v7.4의 17개 섹션을 3 Phase로 분리. 각 Phase의 범위, 목표, 예상 기간을 정의한다.

---

## 원칙

1. **Phase 1(MVP)은 "이번 주말에 배포 가능한" 범위** — 정적 콘텐츠 + 퀴즈 핵심만
2. **로그인 없이 가치를 느낄 수 있어야 한다** — Phase 1의 80%는 비로그인으로 접근 가능
3. **Phase 1에서 검증할 것: "사람들이 이 사이트에 오는가?"** — 트래픽과 SEO 유입 검증
4. **Phase 2에서 검증할 것: "사람들이 돌아오는가?"** — 리텐션, 퀴즈 재방문율
5. **Phase 3에서 검증할 것: "커뮤니티가 자생하는가?"** — UGC, 기여, 바이럴

---

## Phase 개요

```
Phase 1 (MVP)          Phase 2 (Growth)        Phase 3 (Community)
2주                    4주                      4주
─────────────          ─────────────            ─────────────
정적 정보 허브          인터랙티브 학습           커뮤니티 & 자동화
SEO 유입 검증           리텐션 검증              자생 검증
비로그인 중심           로그인 도입              풀 기능
```

---

## Phase 1: MVP (2주)

> **목표:** "CCA-F 준비하는 사람이 구글에서 검색해서 들어와서, 유용한 정보를 얻고, 북마크한다."
>
> **핵심 지표:** 일일 방문자 수, 검색 유입률, 평균 체류 시간

### 포함 (빌드)

| # | 섹션 | 범위 | 비고 |
|---|------|------|------|
| 1 | **홈 (랜딩)** | 핵심 수치 대시보드, 이메일 구독 CTA | 오늘의 문제/Signal 위젯은 Phase 2 |
| 2 | **시험 개요** | 전체 (Claude 소개, CCA-F 정의, 로드맵, 자격증 비교) | MDX 정적 |
| 3 | **시험 정보** | 전체 (형식, 비용, 결제, 등록, 결과) | MDX 정적 |
| 4 | **파트너 네트워크 가이드** | 가입 절차, 이메일 템플릿, 도입 제안 템플릿 | 자가진단 위젯은 Phase 2 |
| 5 | **시험 당일 가이드** | 전체 (ProctorFree 체크리스트, 시간 관리, 기술 문제) | MDX 정적 |
| 6 | **FAQ** | 전체 (시험, 파트너, 한국 특화) | MDX 정적 |
| 7 | **도메인 상세** | 5개 도메인 핵심 개념 + 출제 포인트 | 안티패턴 유저 기여는 Phase 3 |
| 8 | **시나리오 분석** | 6개 시나리오 워크스루 + 도메인 매핑 | MDX 정적 |
| 9 | **용어 사전** | 한영 대조 A-Z, 도메인 필터 | 위키 편집/북마크는 Phase 2 |
| 10 | **준비 가이드** | 12주/2주 로드맵, 코스 목록, 외부 자료 | 진단 퀴즈 연동/Developer Assets는 Phase 2 |
| 11 | **치트시트** | 도메인별 웹 페이지 + PDF 다운로드 | 정적 |
| 17 | **리소스 & 링크** | 공식 링크, 추천 강의, MCP 서버 목록 | Affiliate 포함 |

### 포함 (인프라)

| 항목 | 범위 |
|------|------|
| Next.js App Router | 초기 세팅, 라우팅 트리 |
| Tailwind + shadcn/ui | 디자인 시스템 적용, 테마 (Option A) |
| next-themes | 다크모드 |
| next-intl | 한/영 전환 (UI 번역 + MDX 폴더 분리) |
| MDX + next-mdx-remote | 학습 콘텐츠 렌더링 |
| Shiki | 코드 하이라이팅 |
| Fuse.js + cmdk | 통합 검색 (Cmd+K) |
| Railway 배포 | CI/CD |
| sitemap.ts | SEO |
| Schema.org JSON-LD | FAQPage, Course schema |
| satori + resvg | 동적 OG 이미지 |
| feed (npm) | RSS |
| Resend | 이메일 구독 수집만 (뉴스레터 발송은 Phase 2) |
| Supabase | 프로젝트 생성 + subscribers 테이블만 |
| PostHog | 기본 이벤트 추적 |
| Sentry | 에러 모니터링 |
| GA4 | 검색 유입 추적 |
| 면책 조항 | GNB/푸터 |
| 개인정보처리방침/이용약관 | 정적 페이지 |

### 제외 (Coming Soon 표시)

| 항목 | 이유 |
|------|------|
| 모의시험/퀴즈 | DB + Auth 필요, Phase 2 |
| 오늘의 문제 | Cron + DB 필요, Phase 2 |
| 내 대시보드 | Auth 필요, Phase 2 |
| 커뮤니티 | Auth + DB + 모더레이션, Phase 3 |
| Daily Signal | Cron + LLM 파이프라인, Phase 2 |
| 뉴스 & 업데이트 | Cron, Phase 2 |
| 진단 퀴즈 | DB, Phase 2 |
| 학습 트래커 | Auth + DB, Phase 2 |
| 나도 출제하기 | Auth + DB + 관리자 도구, Phase 3 |
| 프록터링 모드 | 복잡한 UI, Phase 2 후반 |
| PWA | Phase 3 |
| 10-1 로컬 실습 가이드 | 콘텐츠 작성 시간, Phase 1 후반 또는 Phase 2 초반 |

### Phase 1 폴더 구조

```
ccafup/
├── app/
│   ├── [locale]/                    # next-intl locale 라우팅
│   │   ├── layout.tsx               # GNB + Footer + Theme
│   │   ├── page.tsx                 # 홈 (랜딩)
│   │   ├── exam/
│   │   │   ├── overview/page.tsx    # 시험 개요 (2번)
│   │   │   ├── info/page.tsx        # 시험 정보 (3번)
│   │   │   ├── partner/page.tsx     # 파트너 가이드 (4번)
│   │   │   ├── day-guide/page.tsx   # 시험 당일 (5번)
│   │   │   └── faq/page.tsx         # FAQ (6번)
│   │   ├── domains/
│   │   │   ├── page.tsx             # 도메인 목록
│   │   │   └── [slug]/page.tsx      # 도메인 상세 (7번) — SSG
│   │   ├── scenarios/
│   │   │   ├── page.tsx             # 시나리오 목록
│   │   │   └── [slug]/page.tsx      # 시나리오 상세 (8번) — SSG
│   │   ├── glossary/page.tsx        # 용어 사전 (9번)
│   │   ├── prep/
│   │   │   ├── roadmap/page.tsx     # 준비 가이드 (10번)
│   │   │   └── cheatsheet/page.tsx  # 치트시트 (11번)
│   │   ├── resources/page.tsx       # 리소스 & 링크 (17번)
│   │   ├── privacy/page.tsx         # 개인정보처리방침
│   │   └── terms/page.tsx           # 이용약관
│   ├── api/
│   │   ├── subscribe/route.ts       # 이메일 구독 API
│   │   ├── og/[...slug]/route.tsx   # 동적 OG 이미지
│   │   └── rss/route.ts             # RSS 피드
│   ├── sitemap.ts                   # 사이트맵
│   └── robots.ts                    # robots.txt
├── components/
│   ├── ui/                          # shadcn/ui
│   ├── layout/
│   │   ├── gnb.tsx                  # GNB
│   │   ├── footer.tsx               # Footer
│   │   ├── sidebar.tsx              # Docs 사이드바
│   │   └── toc.tsx                  # 우측 TOC
│   ├── metric-card.tsx
│   ├── subscribe-form.tsx
│   ├── copy-block.tsx
│   ├── feedback-widget.tsx
│   └── share-button.tsx
├── content/
│   ├── ko/
│   │   ├── domains/
│   │   │   ├── agentic.mdx
│   │   │   ├── claude-code.mdx
│   │   │   ├── prompt-engineering.mdx
│   │   │   ├── mcp.mdx
│   │   │   └── context.mdx
│   │   ├── scenarios/
│   │   │   ├── customer-support.mdx
│   │   │   ├── code-generation.mdx
│   │   │   ├── multi-agent-research.mdx
│   │   │   ├── developer-productivity.mdx
│   │   │   ├── cicd.mdx
│   │   │   └── data-extraction.mdx
│   │   ├── exam/
│   │   │   ├── overview.mdx
│   │   │   ├── info.mdx
│   │   │   ├── partner.mdx
│   │   │   ├── day-guide.mdx
│   │   │   └── faq.mdx
│   │   ├── prep/
│   │   │   ├── roadmap.mdx
│   │   │   └── cheatsheet.mdx
│   │   └── glossary.json
│   └── en/
│       └── (동일 구조)
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # 브라우저 클라이언트
│   │   └── server.ts                # 서버 클라이언트
│   ├── mdx.ts                       # MDX 로더
│   ├── search.ts                    # Fuse.js 인덱스
│   └── og.ts                        # OG 이미지 생성
├── messages/
│   ├── ko.json                      # UI 번역 (next-intl)
│   └── en.json
├── public/
│   ├── pdf/                         # 치트시트, 도입 템플릿 PDF
│   └── fonts/                       # Pretendard 서브셋
├── prisma/
│   └── schema.prisma                # (Phase 1에서는 subscribers만)
├── supabase/
│   └── migrations/                  # RLS SQL
├── styles/
│   └── globals.css                  # CSS 변수 (테마 Option A)
├── CLAUDE.md                        # Claude Code 프로젝트 룰
├── tailwind.config.ts
├── next.config.js
├── .env.example
└── package.json
```

### Phase 1 체크리스트

- [ ] Next.js 프로젝트 초기화 (pnpm create next-app)
- [ ] Tailwind + shadcn/ui 세팅
- [ ] 테마 시스템 (Option A) CSS 변수 적용
- [ ] next-themes 다크모드
- [ ] next-intl 한/영 세팅
- [ ] GNB + Footer + Docs Layout + Dashboard Layout
- [ ] MDX 로더 + 콘텐츠 작성 (5개 도메인, 6개 시나리오)
- [ ] 용어 사전 (JSON + Fuse.js 필터)
- [ ] Cmd+K 검색
- [ ] 시험 정보 / 파트너 가이드 / FAQ 페이지
- [ ] 치트시트 (웹 + PDF)
- [ ] 준비 가이드 / 리소스 페이지
- [ ] OG 이미지 동적 생성
- [ ] sitemap.ts + robots.ts
- [ ] Schema.org JSON-LD (FAQPage, Course)
- [ ] RSS 피드
- [ ] 이메일 구독 폼 + Supabase subscribers 테이블
- [ ] 면책 조항 + 개인정보처리방침 + 이용약관
- [ ] PostHog + Sentry + GA4 초기화
- [ ] Railway 배포
- [ ] Google Search Console 등록
- [ ] Coming Soon 페이지 (퀴즈, 대시보드, 커뮤니티)

---

## Phase 2: Growth (4주)

> **목표:** "돌아온 유저가 퀴즈를 풀고, 점수를 확인하고, 매일 다시 온다."
>
> **핵심 지표:** 회원가입률, 퀴즈 응시 횟수, 일일 재방문율, 오늘의 문제 참여율

### 포함 (빌드)

| # | 섹션 | 범위 |
|---|------|------|
| 1 | **홈 확장** | 오늘의 문제 위젯, Daily Signal 카드, 진단 퀴즈 CTA |
| 4 | **파트너 가이드 확장** | 응시 자격 자가진단 위젯, 학습 시작 CTA |
| 9 | **용어 사전 확장** | 북마크 기능 |
| 10 | **준비 가이드 확장** | 진단 퀴즈 연동 맞춤 로드맵, Developer Assets (CLAUDE.md 템플릿) |
| 10-1 | **로컬 실습 가이드** | 독립 URL 페이지 |
| 12 | **모의시험 & 퀴즈** | 도메인/시나리오/난이도 필터, 일반 연습 모드, 오답노트, 점수 추이 |
| 12 | **오늘의 문제** | Daily Challenge + 스트릭 |
| 12 | **프록터링 모드** | 전체화면, Mark for Review, 타이머 |
| 13 | **내 대시보드** | D-day, 진행률, 점수, 스트릭, 북마크/오답노트 모아보기 |
| 16 | **Daily Signal** | 자동 수집 피드 + 신뢰도 뱃지 |

### 포함 (인프라)

| 항목 | 범위 |
|------|------|
| Supabase Auth | Google + GitHub OAuth |
| Supabase DB 전체 | 모든 테이블 생성, RLS 적용 |
| Prisma | 스키마, 마이그레이션, Seed (초기 60문항) |
| Railway Cron | 통합 엔트리포인트 (Daily Signal + 오늘의 문제) |
| Claude API | Haiku (Signal 요약) + Sonnet (문제 생성) |
| Upstash Redis | Rate limiting |
| Resend | 뉴스레터 발송 (오늘의 문제, Weekly Digest) |
| 이메일 unsubscribe | Route Handler 구현 |
| Vitest | 핵심 로직 단위 테스트 |

### 제외 (Phase 3)

| 항목 | 이유 |
|------|------|
| 커뮤니티 (후기, Q&A, 스터디) | UGC + 모더레이션 복잡도 |
| 나도 출제하기 | 관리자 승인 파이프라인 |
| 안티패턴 유저 기여 | 관리자 도구 |
| 용어 사전 위키 편집 | 관리자 승인 필요 |
| 난이도 투표 | 커뮤니티 기능과 묶임 |
| 백분위 벤치마킹 | 유저 50명 이상 필요 |
| PWA | 오프라인 캐싱 |
| 소셜 공유 | Phase 2 후반 또는 Phase 3 |
| Weekly Digest 이메일 | Phase 2 후반 |
| 시험 가이드 PDF diff | Phase 2 후반 |

---

## Phase 3: Community (4주)

> **목표:** "유저가 콘텐츠를 만들고, 공유하고, 커뮤니티가 자생한다."
>
> **핵심 지표:** UGC 생성량, 커뮤니티 글 수, 스터디 그룹 생성 수, SNS 공유 수

### 포함 (빌드)

| # | 섹션 | 범위 |
|---|------|------|
| 7 | **도메인 확장** | 안티패턴 유저 기여 + 제안 폼 |
| 9 | **용어 사전 확장** | 위키 방식 수정/추가 제안 |
| 12 | **모의시험 확장** | 나도 출제하기 (AI 초안 + 관리자 승인), 백분위 벤치마킹 |
| 14 | **합격 후 활용** | LinkedIn 배지, 이력서, 커리어 임팩트 |
| 15 | **커뮤니티** | 후기, Q&A, 스터디 모집, Discord 연동, 난이도 투표, 언어 태그, 모더레이션 |
| 16 | **뉴스 확장** | Weekly Digest, PDF diff 뷰어 |
| - | **소셜 공유** | 오늘의 문제 결과, 스트릭, 합격후기 SNS 공유 |
| - | **PWA** | @serwist/next 오프라인 캐싱 |

### 포함 (인프라)

| 항목 | 범위 |
|------|------|
| community_posts, comments, post_votes | 커뮤니티 DB |
| contributions | 유저 기여 관리 |
| difficulty_votes | 난이도 투표 |
| 관리자 대시보드 | 기여 승인/거절, 스팸 관리 |
| Playwright | E2E 테스트 (프록터링 모드 등) |
| DB 백업 | pg_dump Cron |
| API 비용 모니터링 | api_usage_logs |

---

## Phase별 기술 스택 활성화

| 기술 | Phase 1 | Phase 2 | Phase 3 |
|------|---------|---------|---------|
| Next.js 15 | ✅ | ✅ | ✅ |
| Tailwind v3.4 + shadcn/ui | ✅ | ✅ | ✅ |
| next-themes | ✅ | ✅ | ✅ |
| next-intl | ✅ | ✅ | ✅ |
| MDX + next-mdx-remote | ✅ | ✅ | ✅ |
| Shiki | ✅ | ✅ | ✅ |
| Fuse.js + cmdk | ✅ | ✅ | ✅ |
| satori + resvg | ✅ | ✅ | ✅ |
| sitemap + RSS | ✅ | ✅ | ✅ |
| Schema.org JSON-LD | ✅ | ✅ | ✅ |
| PostHog + Sentry | ✅ | ✅ | ✅ |
| Railway | ✅ | ✅ | ✅ |
| Supabase Auth | 🔸 구독만 | ✅ | ✅ |
| Supabase DB (전체) | 🔸 subscribers만 | ✅ | ✅ |
| Prisma | 🔸 최소 | ✅ | ✅ |
| Railway Cron | ❌ | ✅ | ✅ |
| Claude API | ❌ | ✅ | ✅ |
| Upstash Redis | ❌ | ✅ | ✅ |
| Resend 발송 | ❌ | ✅ | ✅ |
| Supabase Storage | ❌ | ❌ | ✅ |
| Cloudflare R2 | ❌ | ❌ | ✅ |
| Vitest | ❌ | ✅ | ✅ |
| Playwright | ❌ | ❌ | ✅ |
| @serwist/next (PWA) | ❌ | ❌ | ✅ |

---

## Phase 1 MVP 예상 일정

| 일 | 작업 |
|----|------|
| Day 1 | 프로젝트 초기화, Tailwind + shadcn + 테마 + next-intl + next-themes 세팅 |
| Day 2 | GNB + Footer + Docs Layout + Dashboard Layout 구현 |
| Day 3 | MDX 로더 + 도메인 상세 5개 콘텐츠 작성 |
| Day 4 | 시나리오 분석 6개 콘텐츠 + 용어 사전 |
| Day 5 | 시험 정보 / 파트너 가이드 / FAQ / 시험 당일 가이드 |
| Day 6 | 치트시트 + 준비 가이드 + 리소스 |
| Day 7 | 홈 랜딩 페이지 + 구독 폼 |
| Day 8 | Cmd+K 검색 + OG 이미지 + sitemap + RSS |
| Day 9 | 다크모드 QA + 모바일 반응형 QA |
| Day 10 | SEO (Schema.org, meta tags) + 법적 페이지 |
| Day 11 | PostHog + Sentry + GA4 + Coming Soon 페이지 |
| Day 12 | Railway 배포 + 도메인 연결 + Google Search Console |
| Day 13 | 최종 QA + 버그 수정 |
| Day 14 | **런칭** 🚀 + radarlog.kr에 런칭 블로그 글 |

---

## 성공 기준

| Phase | 지표 | 목표 |
|-------|------|------|
| Phase 1 (2주 후) | 일일 방문자 | 50명 이상 |
| Phase 1 (2주 후) | Google 검색 유입 | 일 20건 이상 |
| Phase 1 (2주 후) | 이메일 구독자 | 30명 이상 |
| Phase 2 (6주 후) | 회원가입자 | 200명 이상 |
| Phase 2 (6주 후) | 퀴즈 일일 응시 | 50회 이상 |
| Phase 2 (6주 후) | 오늘의 문제 참여율 | 등록 유저의 30% |
| Phase 3 (10주 후) | 커뮤니티 글 | 주 10건 이상 |
| Phase 3 (10주 후) | 유저 기여 문제 | 월 20문항 이상 |
| Phase 3 (10주 후) | SNS 공유 | 주 20건 이상 |

---

**v1.0 — Phase 분리 확정. 다음 단계: Phase 1 빌드 시작**
