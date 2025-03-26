import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '블로그 관리자',
  description: 'Next.js와 Tiptap을 사용한 블로그 관리 시스템',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning data-theme="light">
      <body className="bg-gray-50">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
          <div className="drawer-content flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-10">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="navbar h-16">
                  <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                  </div> 
                  <div className="flex-1 px-2">
                    <Link href="/" className="text-xl font-bold text-indigo-600">
                      블로그 관리자
                    </Link>
                  </div>
                  <div className="flex-none hidden lg:block">
                    <ul className="menu menu-horizontal gap-1">
                      <li>
                        <Link href="/" className="font-medium px-4 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors">
                          대시보드
                        </Link>
                      </li>
                      <li>
                        <Link href="/edit" className="font-medium px-4 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors">
                          새 글 작성
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </header>
            <main className="min-h-[calc(100vh-64px)] flex-1">
              {children}
            </main>
          </div> 
          <div className="drawer-side">
            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 min-h-full bg-white shadow-lg">
              <li className="mb-4">
                <Link href="/" className="text-xl font-bold text-indigo-600">
                  블로그 관리자
                </Link>
              </li>
              <li>
                <Link href="/" className="font-medium">대시보드</Link>
              </li>
              <li>
                <Link href="/edit" className="font-medium">새 글 작성</Link>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
