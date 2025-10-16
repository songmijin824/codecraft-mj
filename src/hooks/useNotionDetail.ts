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
        const res = await axios.get(`/api/notion/${pageId}`)
        setPage(res.data.page)
        setBlocks(res.data.blocks)
      } catch (err) {
        console.error(err)
        setError('🚨 Notion 상세 데이터를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [pageId])

  return { page, blocks, loading, error }
}
