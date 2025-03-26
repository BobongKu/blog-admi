import { createClient } from '@supabase/supabase-js';

// 환경 변수 로드
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// 환경 변수 확인
if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL 환경 변수가 설정되지 않았습니다.');
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY 환경 변수가 설정되지 않았습니다.');
}

// 읽기 전용 클라이언트 (익명 키 사용)
export const supabaseReadOnly = createClient(supabaseUrl, supabaseAnonKey);

// 관리자 클라이언트 (서비스 키 사용)
export const supabaseAdmin = createClient(
  supabaseUrl, 
  supabaseServiceKey || supabaseAnonKey
);

// 기본 클라이언트
export const supabase = supabaseAdmin;

// 게시물 가져오기
export async function getPosts() {
  const { data, error } = await supabaseReadOnly
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error.message);
  }

  return data || [];
}

// 게시물 상세 정보 가져오기 (ID로)
export async function getPostById(id: number) {
  const { data, error } = await supabaseReadOnly
    .from('posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching post by id:', error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('게시물을 찾을 수 없습니다.');
  }

  return data;
}

// 게시물 상세 정보 가져오기 (슬러그로)
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabaseReadOnly
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error fetching post by slug:', error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('게시물을 찾을 수 없습니다.');
  }

  return data;
}

// 게시물 생성 (관리자 권한 필요)
export async function createPost(post: any) {
  // 필수 필드 확인
  if (!post.title) {
    throw new Error('제목은 필수입니다.');
  }
  
  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert({ 
      ...post, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select();

  if (error) {
    console.error('Error creating post:', error);
    throw new Error(`게시물 생성 오류: ${error.message}`);
  }

  return data ? data[0] : null;
}

// 게시물 업데이트 (관리자 권한 필요)
export async function updatePost(id: number, post: any) {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .update({
      ...post,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating post:', error);
    throw new Error(`게시물 업데이트 오류: ${error.message}`);
  }

  return data ? data[0] : null;
}

// 게시물 삭제 (관리자 권한 필요)
export async function deletePost(id: number) {
  const { error } = await supabaseAdmin
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    throw new Error(`게시물 삭제 오류: ${error.message}`);
  }

  return true;
}
