import { NextResponse } from 'next/server'
import axios from 'axios'

const NOTION_TOKEN = process.env.NOTION_CLIENT_SECRET

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const headers = {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
  }

  try {
    const pageRes = await axios.get(`https://api.notion.com/v1/pages/${id}`, { headers })
    const blockRes = await axios.get(`https://api.notion.com/v1/blocks/${id}/children`, { headers })

    return NextResponse.json({
      page: pageRes.data,
      blocks: blockRes.data,
    })
  } catch (err: any) {
    console.error(err.response?.data || err)
    return NextResponse.json({ error: 'Failed to fetch Notion data' }, { status: 500 })
  }
}
