// 📂 src/app/notion/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useNotionDetail } from '@/hooks/useNotionDetail'
import { notionBlocksToMarkdown } from '@/utils/notionToMarkdown'
import ReactMarkdown from 'react-markdown'

export default function NotionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { page, blocks, loading, error } = useNotionDetail(id)



  if (loading) return <p>로딩 중...</p>
  if (error) return <p>{error}</p>
  if (!page) return <p>데이터 없음</p>

  const title = page.properties?.title?.title?.[0]?.plain_text ?? '제목 없음'
  const markdown = notionBlocksToMarkdown(blocks)

  return (
    <article className="p-6 prose max-w-none">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </article>
  )
}
