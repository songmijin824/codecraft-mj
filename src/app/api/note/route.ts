import { NextResponse } from 'next/server'
import { obsidianApi } from '@/lib/obsidianApi'

export async function GET() {
  try {
    const res = await obsidianApi.get('/vault/')
    const allFiles: string[] = res.data?.files ?? []

    const mdFiles = allFiles.filter((f) => f.endsWith('.md'))
    return NextResponse.json({ files: mdFiles })
  } catch (err) {
    console.error('파일 리스트 실패:', err)
    return NextResponse.json({ error: '파일 리스트 실패' }, { status: 500 })
  }
}