// 📂 src/app/api/notion/[id]/route.ts
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const NOTION_TOKEN = process.env.NOTION_CLIENT_SECRET

  if (!NOTION_TOKEN) {
    return NextResponse.json(
      { error: true, message: '❌ NOTION_TOKEN 누락' },
      { status: 500 }
    )
  }

  try {
    // ① 페이지 정보
    const pageRes = await axios.get(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
    })

    // ② 블록(본문) 정보
    const blockRes = await axios.get(`https://api.notion.com/v1/blocks/${id}/children`, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
    })

    return NextResponse.json({
      page: pageRes.data,
      blocks: blockRes.data.results,
    })
  } catch (err: any) {
    console.error('❌ Notion API Error:', err.response?.data || err)
    return NextResponse.json(
      { error: true, message: 'Notion 상세 요청 실패', detail: err.response?.data },
      { status: 500 }
    )
  }
}
