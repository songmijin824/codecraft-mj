import { NextResponse } from 'next/server'

const ORIGIN = process.env.OBSIDIAN_API_ORIGIN!

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // 플러그인마다 엔드포인트가 다를 수 있어 가장 흔한 형태 먼저 시도
    const candidates = [
      '/vault?recursive=true',
      '/vault',
      '/vault/',
    ]

    let files: string[] | null = null
    let last: { status?: number; data?: any; tried?: string } | null = null

    for (const path of candidates) {
      const url = new URL(path.replace(/^\/+/, ''), ORIGIN.endsWith('/') ? ORIGIN : ORIGIN + '/').toString()
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json().catch(() => null)
        const arr = Array.isArray(data?.files) ? data.files :
                    Array.isArray(data)         ? data :
                    Array.isArray(data?.data)   ? data.data : null
        if (arr) {
          files = arr.map(String)
          break
        }
      } else {
        last = { status: res.status, data: await res.text(), tried: url }
      }
    }

    if (!files) {
      return NextResponse.json(
        { error: true, message: 'Upstream returned no file list', detail: last },
        { status: 502 }
      )
    }

    return NextResponse.json({ files }, { status: 200 })
  } catch (e: any) {
    console.error('[api/vault/list] fatal:', e)
    return NextResponse.json(
      { error: true, message: e?.message ?? 'Server error' },
      { status: 500 }
    )
  }
}
