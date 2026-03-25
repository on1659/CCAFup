# 역할별 전문 스킬셋

`meeting-team` 커맨드 실행 시 각 팀원 에이전트에 자동 주입되는 역할별 도메인 지식 파일.

## 파일 목록

| 파일 | 역할 | 팀원 | 주요 내용 |
|------|------|------|---------|
| `skill-pd.md` | 프로젝트 디렉터 | 지민 | Go/No-Go 기준, Phase 범위, 리스크 매트릭스, 스코프 크립 |
| `skill-planner-research.md` | 기획자 (콘텐츠 전략) | 현우 | CCA-F 콘텐츠, 학습 경로, MDX 구조, 도메인 분류 |
| `skill-planner-strategy.md` | 기획자 (성장 전략) | 소연 | SEO, 전환 퍼널, KPI, 경쟁 포지셔닝 |
| `skill-backend.md` | 개발자 (백엔드) | 태준 | Supabase, Prisma, Server Actions, RLS, DB 스키마 |
| `skill-frontend.md` | 개발자 (프론트엔드) | 미래 | Next.js App Router, MDX, Tailwind, next-intl |
| `skill-qa.md` | QA | 윤서 | 빌드 검증, Lighthouse, 접근성, 크로스브라우저 |
| `skill-ui.md` | UI 디자이너 | 다은 | Stone+Indigo 테마, CSS 변수, 다크모드, 컴포넌트 |
| `skill-ux.md` | UX 디자이너 | 승호 | 학습 UX, 수험생 여정, WCAG, 정보구조 |

## 작동 원리

```
meeting-team 실행
  │
  ├── profiles.md 로드 (이름, 성격, 말투)
  ├── skill-*.md 로드 (역할별 프레임워크)
  │
  └── 각 에이전트 = 프로필 + 스킬 주입
        → 페르소나로 말하면서
        → 전문 체크리스트로 분석
```

## 스킬 파일 수정 방법

각 스킬 파일을 직접 수정하면 다음 회의부터 적용됩니다.

추가할 수 있는 내용:
- 역할별 특수 프레임워크
- 프로젝트 특화 체크리스트
- CCA-F 도메인 지식
- 이전 회의에서 나온 결정 사항 (컨텍스트)
