-- posts 테이블이 없으면 생성
CREATE TABLE IF NOT EXISTS public.posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 행 수준 보안(Row Level Security) 활성화
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 기존 정책 제거 (필요한 경우)
DROP POLICY IF EXISTS "Allow read access for all users" ON public.posts;
DROP POLICY IF EXISTS "Allow full access for authenticated users" ON public.posts;
DROP POLICY IF EXISTS "Allow full access for service role" ON public.posts;

-- 모든 사용자에게 읽기 권한 부여
CREATE POLICY "Allow read access for all users" 
  ON public.posts 
  FOR SELECT 
  USING (true);

-- 서비스 롤과 인증된 사용자에게 전체 쓰기 권한 부여
CREATE POLICY "Allow full access for authenticated users" 
  ON public.posts 
  FOR ALL 
  USING (auth.role() IN ('authenticated', 'service_role'));
