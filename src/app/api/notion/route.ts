// 보안 + 유지보수 + 통신제어 목적:
// 서버에서 Notion API 호출 → 클라이언트는 이 API만 호출

import { fetchNotionPages } from '@/lib/useNotionApi'
import { NextResponse } from 'next/server'
export async function GET() {
  const data = await fetchNotionPages({
    sorts: [{ timestamp: 'created_time', direction: 'ascending' }],
  })

  return NextResponse.json(data.results)
}