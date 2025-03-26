/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // 브라우저에서 사용 가능한 환경 변수
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // 보안상 문제가 있을 수 있으므로 주의해서 사용
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
};

module.exports = nextConfig;
