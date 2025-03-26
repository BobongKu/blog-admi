'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { createPost, updatePost, getPostById } from '@/lib/supabase';
import slugify from 'slugify';
import Link from 'next/link';

// 클라이언트 사이드에서만 TiptapEditor를 불러옴
const TiptapEditor = dynamic(
  () => import('@/components/TiptapEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
          <span className="mt-3 text-sm text-gray-600">에디터 로딩 중...</span>
        </div>
      </div>
    )
  }
);

export default function EditPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const post = await getPostById(parseInt(postId));
        
        setTitle(post.title);
        setDescription(post.description || '');
        setContent(post.content || '');
        setTagsInput(post.tags ? post.tags.join(', ') : '');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    setDebugInfo(null);

    try {
      const slug = slugify(title, { lower: true, strict: true });
      const tags = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
        
      const postData = {
        title,
        slug,
        description,
        content,
        tags
      };
      
      // 디버그 정보
      setDebugInfo(`요청 데이터: ${JSON.stringify(postData)}`);

      if (postId) {
        // 기존 게시물 수정
        await updatePost(parseInt(postId), postData);
      } else {
        // 새 게시물 생성
        await createPost(postData);
      }

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || '게시물을 저장하는 중 오류가 발생했습니다.');
      setDebugInfo(`오류 정보: ${JSON.stringify(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center p-10">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <span className="mt-4 text-gray-600">게시물을 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 상단 툴바 - 고정 */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center h-16">
            <div className="flex-none mr-4">
              <Link href="/" className="btn btn-circle btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </Link>
            </div>
            
            <div className="flex-1 flex items-center gap-4">
              <div className="w-1/3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="제목"
                  className="input input-bordered w-full focus:border-indigo-500 bg-white"
                />
              </div>
              
              <div className="w-1/3">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="짧은 설명"
                  className="input input-bordered w-full focus:border-indigo-500 bg-white"
                />
              </div>
              
              <div className="w-1/3">
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="태그 (쉼표로 구분)"
                  className="input input-bordered w-full focus:border-indigo-500 bg-white"
                />
              </div>
            </div>
            
            <div className="flex-none ml-4">
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="btn btn-primary flex items-center justify-center gap-1"
              >
                {isSaving ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    저장 중
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    저장
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 에러 메시지 */}
      {error && (
        <div className="container mx-auto px-6 py-4 max-w-6xl">
          <div className="alert alert-error text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {/* 디버그 정보 (개발 용도) */}
      {debugInfo && (
        <div className="container mx-auto px-6 py-2 max-w-6xl">
          <div className="alert alert-info text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-mono">{debugInfo}</span>
          </div>
        </div>
      )}
      
      {/* 메인 에디터 영역 - 스크롤바 통일 */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-center py-8">
          <div className="w-full max-w-3xl bg-white shadow-soft rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              {title || '제목 없음'}
            </h1>
            <div className="prose max-w-none">
              <TiptapEditor content={content} onChange={setContent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
