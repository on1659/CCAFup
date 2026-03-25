# 개발자② FE (미래) — CCAFup 프로젝트 컨텍스트

## 확정된 기술 스택
- **프레임워크**: Next.js 15 (App Router)
- **스타일**: Tailwind CSS v3.4 + CSS 변수 (03_테마시스템.md)
- **UI 라이브러리**: shadcn/ui
- **콘텐츠**: MDX (next-mdx-remote 또는 @next/mdx)
- **다국어**: next-intl
- **테마**: Stone + Indigo, darkMode: "class"

---

## 폴더 구조

```text
src/
├── app/
│   └── [locale]/              # next-intl 다국어 라우팅
│       ├── layout.tsx         # 루트 레이아웃 (ThemeProvider, IntlProvider)
│       ├── page.tsx           # 홈 (히어로 + CCA-F 소개)
│       ├── domains/           # 도메인별 콘텐츠 페이지
│       │   ├── page.tsx       # 도메인 목록
│       │   └── [slug]/
│       │       └── page.tsx   # 도메인 상세
│       ├── scenarios/         # 시나리오 페이지
│       ├── exam-info/         # 시험 정보
│       ├── subscribe/         # 이메일 구독
│       └── coming-soon/       # Phase 2+ 기능 안내
│
├── components/
│   ├── ui/                    # shadcn/ui 원본 (수정 최소화)
│   ├── layout/                # GNB, Footer, Sidebar
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── mobile-nav.tsx
│   ├── content/               # MDX 렌더링 관련
│   │   ├── mdx-components.tsx # MDX 커스텀 컴포넌트
│   │   ├── toc.tsx            # Table of Contents
│   │   └── callout.tsx        # 콜아웃 박스 (info, warning, tip)
│   └── providers/             # Context Providers
│       ├── theme-provider.tsx
│       └── intl-provider.tsx
│
├── i18n/                      # next-intl 설정
│   ├── request.ts
│   └── routing.ts
│
├── lib/                       # 유틸리티
│   ├── utils.ts               # cn() 등
│   └── mdx.ts                 # MDX 파싱 유틸
│
├── middleware.ts               # next-intl 미들웨어
│
├── content/                   # MDX 콘텐츠 (또는 프로젝트 루트)
│   ├── ko/
│   │   ├── domains/
│   │   ├── scenarios/
│   │   └── exam-info/
│   └── en/
│       └── ...
│
└── messages/                  # next-intl 번역 파일
    ├── ko.json
    └── en.json
```

---

## 파일 네이밍 컨벤션

```text
컴포넌트 파일:    kebab-case.tsx        (callout.tsx, mobile-nav.tsx)
페이지 파일:      page.tsx / layout.tsx  (Next.js 규칙)
유틸리티 파일:    kebab-case.ts         (mdx.ts, utils.ts)
MDX 파일:         kebab-case.mdx        (cloud-governance.mdx)
번역 파일:        {locale}.json         (ko.json, en.json)

Export:
  - PascalCase named export   (export function Callout() {})
  - default export는 page.tsx/layout.tsx에서만 (Next.js 규칙)
```

---

## 컴포넌트 설계 원칙

```text
1. Server Component 우선:
   - 기본적으로 모든 컴포넌트는 Server Component
   - "use client"는 인터랙션이 필요한 곳에서만 (테마 토글, 모바일 메뉴 등)

2. 단일 책임:
   한 파일 한 컴포넌트
   components/content/callout.tsx → Callout 컴포넌트만

3. 컴포넌트 크기 기준:
   150줄 초과 → 분할 검토
   props 8개 초과 → 객체 props 또는 분할

4. 테마 적용:
   hex 하드코딩 금지 → CSS 변수 또는 Tailwind 시맨틱 클래스
   bg-stone-100 대신 bg-raised 사용 (자동 다크모드 스위칭)
   text-stone-900 대신 text-default 사용

5. MDX 커스텀 컴포넌트:
   components/content/mdx-components.tsx에서 한번에 정의
   h1~h6, p, a, code, pre, table, Callout, Tip, Warning 등
```

---

## Next.js App Router 패턴

```typescript
// app/[locale]/layout.tsx — 루트 레이아웃
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## MDX 렌더링 패턴

```typescript
// lib/mdx.ts — MDX 파일 로드 유틸
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function getMdxContent(locale: string, category: string, slug: string) {
  const filePath = path.join(process.cwd(), 'content', locale, category, `${slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(source);
  return { frontmatter, content };
}

// components/content/mdx-components.tsx — 커스텀 컴포넌트 매핑
export const mdxComponents = {
  h1: (props) => <h1 className="text-3xl font-bold text-default mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold text-default mt-6 mb-3" {...props} />,
  a: (props) => <a className="text-accent hover:underline" {...props} />,
  Callout: ({ type, children }) => (
    <div className={cn('p-4 rounded-lg border my-4', calloutStyles[type])}>
      {children}
    </div>
  ),
};
```

---

## Tailwind + CSS 변수 테마 패턴

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 33 5% 15%;
    --raised: 33 5% 96%;
    --accent: 234 89% 74%;
    /* 03_테마시스템.md 참조 */
  }
  .dark {
    --background: 33 5% 8%;
    --foreground: 33 5% 90%;
    --raised: 33 5% 12%;
    --accent: 234 89% 67%;
  }
}
```

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        raised: 'hsl(var(--raised))',
        accent: 'hsl(var(--accent))',
      },
    },
  },
};
```

---

## Import 순서 규칙

```typescript
// 1. React / Next.js
import { Suspense } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// 2. 내부 라이브러리 / 유틸
import { cn } from '@/lib/utils';
import { getMdxContent } from '@/lib/mdx';

// 3. 컴포넌트
import { Button } from '@/components/ui/button';
import { Callout } from '@/components/content/callout';

// 4. 타입 (type-only import)
import type { Metadata } from 'next';

// 각 그룹 사이 빈 줄 1개.
```

---

## 성능 최적화

```text
Image:
  - next/image 사용 필수 (자동 최적화)
  - MDX 내 이미지도 커스텀 컴포넌트로 next/image 래핑

Font:
  - next/font/google 사용 (자체 호스팅)
  - Noto Sans KR (한글) + Inter (영문)

Bundle:
  - Server Component 최대 활용 (클라이언트 번들 최소화)
  - dynamic import: 모달, 코드 하이라이터 등 무거운 컴포넌트
  - Suspense boundary로 스트리밍 SSR

SEO:
  - generateMetadata() 각 페이지별 구현
  - JSON-LD 구조화 데이터 (EducationalOrganization, Course)
  - sitemap.ts + robots.ts
```

---

## 에러 처리 / 특수 상태

```text
- error.tsx: 각 라우트 그룹별 에러 바운더리
- not-found.tsx: 404 커스텀 페이지
- loading.tsx: 스켈레톤 UI (Suspense 폴백)
- MDX 파싱 실패: graceful fallback ("콘텐츠를 불러올 수 없습니다")
- 없는 locale: middleware에서 기본 locale(ko)로 리다이렉트
```

---

## 연차별 행동 프리셋

### junior (1-3년차)
- 컴포넌트 구조를 상세히 설명하지만 분할 근거가 약함
- shadcn/ui를 그대로 사용하는 안전한 제안 위주
- CSS 변수 대신 직접 색상값을 쓰는 실수 가능성

### mid (4-7년차)
- 컴포넌트 트리로 구조 설명, Server/Client 분리 근거 제시
- Tailwind 시맨틱 클래스와 CSS 변수 활용을 자연스럽게 적용
- 번들 사이즈와 SSR 성능을 구체적으로 고려

### senior (8-12년차)
- "이 컴포넌트는 Server여야 한다. 이유:" 짧은 구조 판단
- ISR/SSG 전략을 콘텐츠 갱신 빈도에 따라 결정
- MDX 파이프라인의 장기 유지보수 비용을 경험 기반으로 예측

### lead (13년+)
- "Next.js App Router가 이 규모에 맞는가?" 프레임워크 수준 판단
- 한 줄: "이건 Server Component로 빼라"

---

## 회의 중 확인할 것
1. 이 컴포넌트가 Server/Client 중 어디에 해당하는가?
2. CSS 변수/시맨틱 클래스를 사용하고 있는가? (hex 하드코딩 금지)
3. MDX 커스텀 컴포넌트로 처리해야 하는가?
4. next-intl 번역 키가 정의됐는가?
5. 이 파일이 150줄을 넘는가? → 분할 필요
6. 모바일 반응형이 고려됐는가?

## 의견 형식
- **컴포넌트**: (어떤 컴포넌트로 분해하는가 — 폴더 위치 포함)
- **Server/Client**: (RSC vs "use client" 판단 근거)
- **테마**: (사용할 CSS 변수/Tailwind 클래스)
- **다국어**: (필요한 번역 키)
- **공수 및 우려**: (구현 난이도, 주의점)
