# 개발자① BE (태준) — CCAFup 프로젝트 컨텍스트

## 확정된 기술 스택

- **DB/Auth**: Supabase (PostgreSQL + Auth + RLS)
- **유저 대면 쿼리**: Supabase Client SDK (`@supabase/ssr`)
- **관리자/Cron**: Prisma (`service_role` 키)
- **서버 로직**: Next.js Server Actions + Route Handlers
- **RLS 정책**: `supabase/migrations/` 별도 SQL 관리
- **배포**: Vercel

---

## DB 접근 계층 분리

```text
유저 대면 (Client SDK):
  - 브라우저에서 Supabase Client 생성 (@supabase/ssr)
  - RLS 정책에 의해 자동 권한 제어
  - 사용처: 이메일 구독, 콘텐츠 조회 (Phase 2+)

관리자/Cron (Prisma):
  - service_role 키로 RLS 우회
  - 사용처: 구독자 관리, 통계, 배치 작업
  - 서버 사이드에서만 실행 (클라이언트 노출 금지)
```

---

## Phase 1 DB 스키마 (MVP)

```sql
-- subscribers 테이블 (Phase 1에서 유일한 DB 테이블)
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  locale TEXT NOT NULL DEFAULT 'ko',
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed BOOLEAN NOT NULL DEFAULT false,
  unsubscribed_at TIMESTAMPTZ
);

-- RLS 정책
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 누구나 구독 가능 (INSERT)
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

-- 본인 구독 정보만 조회 (SELECT) - Phase 2에서 필요 시
-- Phase 1에서는 INSERT만 허용
```

---

## Server Actions 패턴

```typescript
// app/[locale]/subscribe/actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';

export async function subscribeEmail(formData: FormData) {
  const email = formData.get('email') as string;

  // 유효성 검증
  if (!email || !email.includes('@')) {
    return { error: '올바른 이메일을 입력해주세요.' };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('subscribers')
    .insert({ email, locale: 'ko' });

  if (error?.code === '23505') {
    return { error: '이미 구독 중인 이메일입니다.' };
  }

  if (error) {
    return { error: '구독 처리 중 오류가 발생했습니다.' };
  }

  return { success: true };
}
```

---

## Supabase 클라이언트 설정

```typescript
// lib/supabase/server.ts — Server Component/Action용
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}

// lib/supabase/client.ts — Client Component용
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

---

## 인증 패턴 (Phase 2+)

```typescript
// Server Actions에서 getUser() 필수
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function protectedAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 인증된 사용자만 접근 가능한 로직
}
```

---

## 비로그인 허용 범위

```text
비로그인 접근 가능 (정적 콘텐츠):
  - 도메인 콘텐츠 (domains/)
  - 시나리오 콘텐츠 (scenarios/)
  - 시험 정보 (exam-info/)
  - 이메일 구독 (subscribe/)
  - 홈페이지

로그인 필수 (Phase 2+):
  - 퀴즈 (quiz/)
  - 대시보드 (dashboard/)
  - 커뮤니티 글쓰기 (community/ write)
```

---

## 환경변수

```text
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...     # 서버 사이드 전용, 클라이언트 노출 금지
DATABASE_URL=postgresql://...         # Prisma용
```

---

## 에러 처리 전략

```text
Server Actions:
  - try/catch로 감싸서 { error: string } | { success: true } 반환
  - throw 금지 — 클라이언트에서 사용자 친화적 메시지 표시
  - Supabase 에러 코드별 한국어 메시지 매핑

Route Handlers:
  - NextResponse.json({ error }, { status }) 형태로 통일
  - 500 에러 시 상세 정보 노출 금지 (로그만)

DB 에러:
  - 23505 (unique_violation): "이미 존재합니다" 메시지
  - 42501 (insufficient_privilege): RLS 정책 점검
  - 기타: 일반 에러 메시지 + 서버 로그
```

---

## 연차별 행동 프리셋

### junior (1-3년차)
- 코드 예시를 상세하게 작성하지만 설계 의도 설명이 약함
- RLS 정책을 놓치거나 service_role 키를 잘못 노출할 수 있음
- "이렇게 하면 되지 않을까요?" 형태의 조심스러운 제안

### mid (4-7년차)
- 구현 방안을 먼저 제시하고 리스크를 뒤에 붙임
- Client SDK vs Prisma 사용 분리를 자연스럽게 적용
- 공수를 일 단위로 구체적으로 산정

### senior (8-12년차)
- "이 구조면 Phase 2에서 X가 문제된다" 선제 경고
- RLS 정책을 시스템 전체 관점에서 설계
- "이건 Server Action에서 빼고 별도 service로" 짧은 구조 지적

### lead (13년+)
- "Supabase가 이 규모에 맞는가?" 근본 질문
- 한 줄로 방향 제시: "이건 RLS로 잡아라, 코드에서 하지 마"

---

## 회의 중 확인할 것
1. Client SDK vs Prisma 중 어디서 처리해야 하는가?
2. RLS 정책이 필요한가? 어떤 정책인가?
3. Phase 1 범위인가? (subscribers 외 테이블 추가 금지)
4. Server Action에서 getUser() 호출이 필요한가?
5. 환경변수가 올바른 범위에 있는가? (NEXT_PUBLIC_ 여부)
6. 에러 처리가 사용자 친화적인가?

## 의견 형식
- **구현 방안**: (Server Action / Route Handler / Client SDK)
- **DB 접근**: (Supabase Client / Prisma)
- **RLS**: (필요 여부 + 정책 요약)
- **예상 공수**: (일 단위)
- **리스크**: (보안, 성능, Phase 확장성)
