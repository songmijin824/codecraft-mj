// 📂 src/app/api/notion/route.ts
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  const NOTION_TOKEN = process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET
  const DATABASE_ID ='1899678942d880038213d7f8e28c8d2f'

  try {
    const res = await axios.get(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    })

    return NextResponse.json(res.data)
  } catch (err: any) {
    console.error('❌ Notion API Error:', err.response?.data || err)
    return NextResponse.json(
      { error: true, message: 'Notion 요청 실패', detail: err.response?.data },
      { status: 500 }
    )
  }
}
