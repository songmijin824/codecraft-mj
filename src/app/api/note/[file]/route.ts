// src/app/api/note/[file]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { obsidianApi } from '@/lib/obsidianApi'

export async function GET(
  req: NextRequest,
  { params }: { params: { file: string } }
) {
  const file = decodeURIComponent(params.file) // 한글, 공백 등 안전 처리

  try {
    const res = await obsidianApi.get(`/vault/${file}`, {
      headers: {
        Accept: 'application/vnd.olrapi.note+json',
      },
    })

    return NextResponse.json(res.data)
  } catch (err) {
    console.error('📛 API 에러:', err)
    return NextResponse.json(
      { error: '파일 요청 실패', file },
      { status: 500 }
    )
  }
}
