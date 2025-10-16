
import { useEffect, useState } from 'react'
import axios from 'axios'

export function useNotionApi(params?: Record<string, string | boolean>) {
  const [notes, setNotes] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/api/notion', { params })
        setNotes(res.data)
        console.log('✅ Notion API Response:', res.data)
      } catch (err) {
        console.error(err)
        setError('🚨 Notion 데이터를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [JSON.stringify(params)]) // 파라미터 변경 시 재요청

  return { notes, error, loading }
}
