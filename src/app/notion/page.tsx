'use client'
import { useNotionApi } from '@/hooks/useNotionApi'
import Link from 'next/link'

export default function NotionPreview() {
  const { notes, error, loading } = useNotionApi()

  if (loading) return <p>로딩 중...</p>
  if (error) return <p>{error}</p>
return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-3">📄 Notion 데이터</h2>

      {notes.length === 0 ? (
        <p>데이터가 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition"
            >
                <Link
                  href={`/notion/${note.id}`}
                  className="text-blue-600 hover:underline"
                >
                {note.properties?.title?.title?.[0]?.plain_text ?? '제목 없음'}
              </Link>
              <p className="font-semibold">
                {note.properties?.type?.multi_select?.[0]?.name ?? '태그'}
                {note.properties?.type?.multi_select?.[0]?.color ?? '컬러'}
              </p>
              <p className="font-semibold">
                <img src={note.properties?.file?.files?.[0]?.file.url ?? '이미지'} alt={note.properties?.file?.files?.[0]?.name ?? '이미지'} />
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}