## 🏁 [Phase 1 MVP 완성] — 팀 회의 결과 (사이클 #0)

### 팀원별 의견

**지민 (PD)** — 조건부 Go. Must 4개(MDX 파이프라인, SEO, 이메일 구독, 배포)에 올인하고, Cmd+K 검색은 Phase 1.5로 미룰 것을 제안. OG 이미지도 정적으로 시작. MDX 파이프라인이 Day 4까지 완성되어야 콘텐츠 작업이 병렬화됨.

**현우 (기획)** — MDX 콘텐츠가 0개인 상태가 가장 큰 문제. 사용자 시나리오 기반 콘텐츠 우선순위 제안: 시험개요→도메인5개→시나리오6개→기타. frontmatter 스키마 표준화 필요. 최소 15~20개 MDX 파일 x 2언어 = 40개 필요.

**소연 (전략)** — KPI 연결 기준 우선순위: MDX콘텐츠→SEO→이메일구독→RSS→Cmd+K→모니터링. Naver Search Advisor 등록 필수. 구독 폼에 value proposition 강화 필요. subscribers 테이블에 source 컬럼 추가 제안.

**태준 (백엔드)** — 백엔드 공수 ~10h로 가벼운 편. Supabase SSR 클라이언트 패턴을 Phase 2 Auth 대비해 3파일 구조로 스캐폴딩. subscribers RLS는 INSERT만. upsert 패턴으로 중복 구독 처리. Rate limiting 없는 상태 우려.

**미래 (프론트엔드)** — MDX 파이프라인이 유일한 블로커. `next-mdx-remote/rsc` 일택. 전체 FE 공수 ~24.5h(3~4일). Cmd+K는 dynamic import로 번들 격리 필수. 콘텐츠 소스 레이어 추상화 여부 결정 필요.

**윤서 (QA)** — CRITICAL: `domains/[slug]`에서 useTranslations() (클라이언트 훅)을 Server Component에서 호출하는 버그 발견. 없는 slug에 notFound() 미호출. GNB 드롭다운 키보드 접근 불가. 다국어 전환 시 경로 미보존.

**다은 (UI)** — 테마 시스템 기반은 탄탄. 홈 CTA가 Button 컴포넌트 미사용(인라인 스타일). MDX prose 스타일과 base 스타일 충돌 가능성. `@tailwindcss/typography` 기반 + CSS 변수 오버라이드 제안. ContentCard 공통 컴포넌트 분리 필요.

**승호 (UX)** — 읽기 경험(ToC, 브레드크럼, 이전/다음)이 최우선. 모바일 ToC 접이식 + 스크롤 진행률 바 제안. 구독 폼 상태 머신(idle→submitting→success/error/duplicate) 정의. GNB 드롭다운 focus-within 기반 접근성 개선 필요.

---

### 주요 합의점

1. **MDX 파이프라인이 최우선 블로커** — 8명 전원 동의. 이것이 완료되어야 콘텐츠, SEO, 검색, QA 모두 진행 가능
2. **Cmd+K 검색은 Phase 1.5로 미룸** — PD, 전략, 백엔드, QA 동의. 콘텐츠 적을 때 효과 제한적
3. **OG 이미지는 정적으로 시작** — PD, 백엔드 동의. satori 한글 폰트 이슈 회피
4. **subscribers 테이블에 source 컬럼 추가** — 전략 제안, 전환 출처 추적용
5. **Server Component에서 useTranslations 버그 즉시 수정** — QA 발견, 전원 동의
6. **`next-mdx-remote/rsc` 선택** — 프론트엔드 제안, locale별 동적 slug 로드에 최적

---

### 주요 충돌 지점

1. **shiki 코드 하이라이팅 Phase 1 포함 여부** — 지민(PD)은 미루자, 미래(FE)는 MDX 파이프라인과 함께 설정하는 게 효율적이라고 봄. CCA-F 콘텐츠 특성상 코드 블록이 많지 않으므로 기본 스타일링으로 시작 후 추가 가능.
2. **MDX vs 하드코딩 전환 범위** — 모든 페이지를 MDX로 전환할지, 시험정보/FAQ 등은 하드코딩 유지할지. 미래(FE)는 점진적 전환 제안.
3. **모니터링(PostHog/Sentry/GA4) 시점** — PD는 Could로 분류, 전략은 GA4 + Search Console을 배포 당일 필수로 봄.

---

### 역할별 작업 항목 정리

| 담당자 | 역할 | 핵심 작업 | 선행 작업 |
|--------|------|---------|---------|
| 지민 | PD | 우선순위 확정, 일정표, Railway 인프라, 스모크 테스트 체크리스트 | 없음 |
| 현우 | 기획 | frontmatter 스키마, 콘텐츠 템플릿, 용어사전 초안, 이벤트 트래킹 맵 | MDX 파이프라인 |
| 소연 | 전략 | SEO 메타 정의서, 구독 CTA 가이드, KPI 대시보드, 런칭 체크리스트 | 콘텐츠 목록 확정 |
| 태준 | 백엔드 | Supabase 셋업, subscribers 테이블+RLS, Server Action, sitemap/robots, MDX 로더 | 없음 |
| 미래 | 프론트엔드 | MDX 파이프라인, mdx-components, [slug] 동적 로드, ToC, subscribe-form | 콘텐츠 샘플 1개 |
| 윤서 | QA | Tier 0 게이트, MDX 렌더링 테스트, 다국어/다크모드 테스트, 접근성 점검 | MDX 파이프라인 |
| 다은 | UI | MDX prose 스타일, Callout/Tip/Warning, ContentCard, 홈 히어로 개선 | MDX 파이프라인 |
| 승호 | UX | 읽기 경험 와이어프레임, Cmd+K 명세, 구독 상태머신, 404/에러 명세 | MDX 파이프라인 |

---

### 서로에게 던진 질문들

- **지민→미래**: shiki 코드 하이라이팅 Phase 1에 필요한가? 기본 `<pre>` 스타일링으로 가면 반나절 절약 가능
- **현우→개발팀**: MDX 커스텀 컴포넌트(Callout, ExamTip, DomainTag) 지원 범위?
- **소연→개발팀**: Cmd+K를 Phase 1에서 빼도 SEO/내부 링킹과 의존성 없는지?
- **태준→미래**: subscribe 폼을 Server Action 직접 호출 vs fetch `/api/subscribe`?
- **미래→태준**: MDX 콘텐츠를 Phase 2에서 CMS/DB로 옮길 계획? 데이터 소스 추상화 필요?
- **윤서→미래**: `domains/[slug]`의 useTranslations() Server Component 사용이 의도인지 실수인지?
- **다은→미래**: ToC 스크롤 스파이를 IntersectionObserver vs scroll event?
- **승호→미래**: 검색 인덱스를 빌드타임 정적 JSON vs 런타임 Fuse.js?

---

### 기술 의존성

```
[MDX 파이프라인] ──블로킹──→ [콘텐츠 작성]
                ──블로킹──→ [ToC 컴포넌트]
                ──블로킹──→ [MDX prose 스타일]
                ──블로킹──→ [sitemap (MDX 목록 필요)]
                ──블로킹──→ [검색 인덱스]
                ──블로킹──→ [QA Tier 1 테스트]

[Supabase 셋업] ──블로킹──→ [subscribe Server Action]
                ──블로킹──→ [subscribe-form 컴포넌트]

[콘텐츠 작성]   ──블로킹──→ [SEO JSON-LD]
                ──블로킹──→ [RSS 피드]
                ──블로킹──→ [OG 이미지]

[Railway 배포]  ──독립──→ (스테이징은 Day 4에 미리 가능)
```

**최대 병목: MDX 파이프라인 → 콘텐츠 작성 → SEO 완성 경로 (critical path)**
