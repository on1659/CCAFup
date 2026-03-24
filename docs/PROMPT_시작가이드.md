# CCAFup Phase 1 빌드 시작 프롬프트

## 사전 준비

```bash
# 1. 프로젝트 폴더로 이동
cd D:\Work\vibe\CCAFup

# 2. Next.js 프로젝트 생성
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm

# 3. docs/ 폴더에 7개 문서 복사
# 00_마스터인덱스.md ~ 06_반복검증스킬.md

# 4. Claude Code 실행
claude
```

## 첫 프롬프트 (복사해서 사용)

```
@docs/00_마스터인덱스.md @docs/01_마스터목차.md @docs/02_디자인시스템.md @docs/03_테마시스템.md @docs/04_기술스택.md @docs/05_Phase분리.md 

CCAFup 프로젝트를 시작한다. 위 문서들이 전체 기획/설계 문서다.

지금부터 Phase 1(MVP) 범위만 빌드한다. 05_Phase분리.md의 "Phase 1" 섹션을 기준으로 한다.

## 진행 순서

1. CLAUDE.md를 프로젝트 루트에 생성 (00_마스터인덱스.md의 CLAUDE.md 섹션 참조)
2. 03_테마시스템.md 기반으로 globals.css에 CSS 변수 적용
3. 03_테마시스템.md 기반으로 tailwind.config.ts 설정
4. shadcn/ui 초기화 + 필요 컴포넌트 설치
5. next-themes 다크모드 세팅
6. next-intl 한/영 세팅
7. 05_Phase분리.md의 폴더 구조대로 app/ 라우팅 트리 생성
8. GNB + Footer + Docs Layout + Dashboard Layout 구현
9. 이후 페이지별 순차 구현

## 규칙
- Phase 1 범위 외 기능은 만들지 않는다 (Coming Soon 페이지로 대체)
- 색상은 반드시 CSS 변수 또는 Tailwind 클래스로 참조 (hex 하드코딩 금지)
- 02_디자인시스템.md의 컴포넌트 스펙을 따른다
- 파일명 kebab-case.tsx, export PascalCase

1단계(CLAUDE.md 생성)부터 시작해줘.
```
