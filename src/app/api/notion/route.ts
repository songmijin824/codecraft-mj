

// 보안 + 유지보수 + 통신제어 3가지 이유로 서버에서 Notion API를 호출하고, 클라이언트는 이 API를 호출
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  const NOTION_TOKEN = process.env.NOTION_CLIENT_SECRET
  const DATABASE_ID ='28e9678942d8805db782c5e7034396b4'

  if (!NOTION_TOKEN) {
    return NextResponse.json(
      { error: true, message: '❌ NOTION_TOKEN 누락' },
      { status: 500 }
    )
  }
  const body = {
    sorts: [{ timestamp: 'created_time', direction: 'ascending' }]
  }
  try {
    const res = await axios.post(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      body, // body 그대로 전달 가능 (filter, sorts 등)
    {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
       'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    })

    return NextResponse.json(res.data.results)
  } catch (err: any) {
    console.error('❌ Notion API Error:', err.response?.data || err)
    console.log('NOTION_TOKEN', NOTION_TOKEN)
    return NextResponse.json(
      { error: true, message: 'Notion 요청 실패', detail: err.response?.data },
      { status: 500 }
    )
  }
}

