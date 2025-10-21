// 📂 src/hooks/useNotionDetail.ts
import { useEffect, useState } from 'react'
import axios from 'axios'

export function useNotionDetail(pageId?: string) {
  const [page, setPage] = useState<any>(null)
  const [blocks, setBlocks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!pageId) return

    const fetchDetail = async () => {
      try {
        // 1️⃣ 루트 페이지 + 블록들 불러오기
        const res = await axios.get(`/api/notion/${pageId}`)
        setPage(res.data.page)

        // 2️⃣ 루트 블록 목록 가져오기
        const rootBlocks = res.data.blocks?.results ?? []

        // 3️⃣ 각 블록의 children 재귀적으로 가져오기
        const fullBlocks = await Promise.all(
          rootBlocks.map(async (block: any) => {
            if (block.has_children) {
              const children = await fetchBlockChildren(block.id)
              return { ...block, children }
            }
            return block
          })
        )

        setBlocks(fullBlocks)
      } catch (err: any) {
        console.error(err)
        setError(err.response?.data?.message ?? '🚨 Notion 상세 데이터를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [pageId])

  return { page, blocks, loading, error }
}


// 📦 재귀적으로 하위 블록 불러오기
async function fetchBlockChildren(blockId: string): Promise<any[]> {
  try {
    // 자식 블록만 가져오는 API로 호출해야 함
    const res = await axios.get(`/api/notion/${blockId}/children`)
    const blocks = res.data.results ?? []

    // 각 블록의 children을 재귀적으로 불러오기
    const fullBlocks = await Promise.all(
      blocks.map(async (block: any) => {
        if (block.has_children) {
          const children = await fetchBlockChildren(block.id)
          return { ...block, children }
        }
        return block
      })
    )

    return fullBlocks
  } catch (err: any) {
    console.error('❌ fetchBlockChildren error:', err.response?.data || err)
    return []
  }
}
