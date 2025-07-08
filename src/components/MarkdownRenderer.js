// src/components/MarkdownRenderer.js
'use client';

import dynamic from 'next/dynamic';

// Client-side only import of the markdown preview component
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then(mod => mod.default),
  { ssr: false }
);

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <MarkdownPreview source={content} />
    </div>
  );
}
