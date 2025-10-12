'use client'
import { useNotionApi } from '@/hooks/useNotionApi'

export default function NotionPreview() {
  const { notes, error, loading } = useNotionApi()

  if (loading) return <p>로딩 중...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-3">📄 Notion Database Info</h2>
      <pre className="p-3 rounded-lg text-sm overflow-auto">
        {JSON.stringify(notes, null, 2)}
      </pre>
    </div>
  )
}
