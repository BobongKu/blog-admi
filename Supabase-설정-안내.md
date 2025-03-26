# Supabase 설정 안내

블로그 관리 프로젝트의 Supabase 데이터베이스 설정을 위한 간단한 가이드입니다.

## 1. 환경 변수 설정

`.env.local` 파일에 다음 환경 변수가 올바르게 설정되어 있는지 확인하세요:

```
NEXT_PUBLIC_SUPABASE_URL=https://rgrawxsjoffprylgtluh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncmF3eHNqb2ZmcHJ5bGd0bHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NjQ1MDEsImV4cCI6MjA1ODU0MDUwMX0.jsHpbv_dtz_Tgu_MoKN7pzArhSVI5rib8LrX3M6Mnt8
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncmF3eHNqb2ZmcHJ5bGd0bHVoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjk2NDUwMSwiZXhwIjoyMDU4NTQwNTAxfQ.fVYfV5nxUorbsSEEJ916YAwiLq5WjEmTjijnolgylwM
```

## 2. Supabase 데이터베이스 설정

Supabase 대시보드에서 SQL 에디터를 사용하여 데이터베이스를 설정하세요:

1. [Supabase 대시보드](https://app.supabase.com)에 로그인
2. 프로젝트 `rgrawxsjoffprylgtluh` 선택
3. 왼쪽 메뉴에서 "SQL Editor" 선택
4. "New Query" 버튼 클릭
5. `supabase-migration.sql` 파일의 내용을 복사하여 붙여넣기
6. "Run" 버튼 클릭

## 3. 프로젝트 실행

설정이 완료되면 다음 명령어로 프로젝트를 실행하세요:

```bash
npm run dev
```

## 4. 문제 해결

오류가 발생하면 다음 사항을 확인하세요:

1. 환경 변수가 올바르게 설정되어 있는지 확인
2. Supabase 대시보드에서 posts 테이블이 생성되었는지 확인
3. RLS 정책이 제대로 설정되었는지 확인

## 데이터베이스 구조

**posts 테이블**
- id: SERIAL PRIMARY KEY
- title: TEXT NOT NULL
- slug: TEXT NOT NULL UNIQUE
- description: TEXT
- content: TEXT
- tags: TEXT[]
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
