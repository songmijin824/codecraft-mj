'use client'

import Link from 'next/link'

export default function NotionPreview() {

return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-3">📄 Notion 데이터</h2>
      <Link
        href={`/notion`}
        className="text-blue-600 hover:underline"
      >노션페이지 바로가기 
      </Link>
    </div>
  )
}