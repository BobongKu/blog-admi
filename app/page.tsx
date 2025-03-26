import Link from 'next/link';
import { getPosts } from '@/lib/supabase';
import DeleteButton from '@/components/posts/DeleteButton';

export const revalidate = 0;

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">블로그 관리</h1>
          <Link
            href="/edit"
            className="btn btn-primary text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            새 게시물
          </Link>
        </div>
        <p className="text-gray-500 text-sm">
          블로그 게시물을 관리하고 새로운 글을 작성할 수 있습니다.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="text-xs bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-left">제목</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-left">슬러그</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-left">작성일</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-left">태그</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-left">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length > 0 ? (
                posts.map((post: any) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-medium text-gray-800">{post.title}</td>
                    <td className="px-4 py-4 text-xs text-gray-500 font-mono">{post.slug}</td>
                    <td className="px-4 py-4 text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags && post.tags.map((tag: string, index: number) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/edit?id=${post.id}`}
                          className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                        >
                          수정
                        </Link>
                        <DeleteButton id={post.id} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    <p className="mb-2 text-lg font-medium">게시물이 없습니다</p>
                    <p className="text-sm">첫 번째 블로그 게시물을 지금 작성해 보세요.</p>
                    <Link
                      href="/edit"
                      className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      새 게시물 작성
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
