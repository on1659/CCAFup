---
description: "Run QA verification. Automatically performed after code changes when user says 'verify', 'run QA', or 'qa'."
---

# QA Agent - CCAFup 자동 검증

Next.js + Supabase + MDX 프로젝트에 맞춘 4단계 QA 프로세스. 순서대로 실행하고 결과를 보고한다.

## Step 1: 변경 파일 감지

```bash
git diff --name-only
git diff --cached --name-only
```

변경된 파일을 확인하고 QA 레벨을 결정:

| 변경 파일 | QA 레벨 |
|-----------|---------|
| `src/app/**` (페이지/레이아웃) | Level 3 (빌드 + 렌더링) |
| `src/components/**` | Level 2 (빌드 + 타입) |
| `content/**/*.mdx` | Level 3 (MDX 파싱 + 빌드) |
| `messages/*.json` | Level 2 (빌드 + 누락 키 확인) |
| `tailwind.config.*`, `globals.css` | Level 3 (다크모드 확인) |
| `middleware.ts`, `i18n/**` | Level 3 (다국어 라우팅) |
| 기타 `.ts/.tsx` | Level 1 (타입 체크) |

## Step 2: 정적 검증 (Level 1)

### 2-1. TypeScript 타입 체크
```bash
npx tsc --noEmit
```

### 2-2. ESLint 검사
```bash
pnpm lint
```

### 2-3. 위험 패턴 검사
변경된 파일에서 다음 패턴을 Grep 도구로 검사:

| 패턴 | 문제 | 올바른 코드 |
|------|------|------------|
| `bg-stone-` / `text-stone-` | hex 하드코딩 (다크모드 깨짐) | CSS 변수 클래스 (bg-raised 등) |
| `#[0-9a-fA-F]{3,8}` (CSS/TSX 내) | hex 하드코딩 | CSS 변수 사용 |
| `"use client"` 없이 useState/useEffect | Server Component에서 클라이언트 훅 | "use client" 추가 |
| `process.env.SUPABASE_SERVICE_ROLE` (클라이언트) | service_role 키 노출 | NEXT_PUBLIC_ 없는 변수는 서버 전용 |

### 2-4. 호출 체인 추적
변경된 함수가 어디서 호출되는지 추적. 영향 범위 파악.

## Step 3: 빌드 검증 (Level 2)

```bash
pnpm build
```
- 빌드 성공 → Level 3로
- 빌드 실패 → CRITICAL 버그, 즉시 수정
- MDX 파싱 에러 → 해당 MDX 파일 수정

## Step 4: 런타임 검증 (Level 3)

### 4-1. 다국어 라우팅 확인
- `/ko` 와 `/en` 경로가 모두 빌드에 포함됐는지 확인
- messages/*.json에 누락된 번역 키가 없는지 확인

### 4-2. 다크모드 확인 (CSS 변경 시)
- CSS 변수가 `:root`와 `.dark` 양쪽에 정의됐는지 확인
- 변경된 컴포넌트에서 시맨틱 클래스 사용 여부 확인

### 4-3. MDX 콘텐츠 확인 (콘텐츠 변경 시)
- frontmatter 형식이 올바른지 확인
- 커스텀 컴포넌트가 mdx-components.tsx에 정의됐는지 확인

## Step 5: 결과 보고

```
## QA Results

변경 파일: (목록)
QA Level: Level X

### Level 1: 정적 검증
- TypeScript: PASS / FAIL
- ESLint: PASS / FAIL
- 위험 패턴: 없음 / 발견 (상세)
- 호출 체인: (영향 범위)

### Level 2: 빌드 검증
- Next.js 빌드: PASS / FAIL
- MDX 파싱: PASS / FAIL

### Level 3: 런타임 검증
- 다국어: PASS / FAIL
- 다크모드: PASS / FAIL
- MDX 렌더링: PASS / FAIL

### Final: PASS / FAIL
```
