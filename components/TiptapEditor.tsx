'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@syfxlin/tiptap-starter-kit';
import { useState, useEffect } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // 훅은 항상 최상위 레벨에서 호출
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'outline-none focus:outline-none min-h-[500px] prose-lg',
      },
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-[500px]">로딩 중...</div>;
  }

  return (
    <EditorContent editor={editor} className="w-full focus:outline-none" />
  );
};

export default TiptapEditor;
