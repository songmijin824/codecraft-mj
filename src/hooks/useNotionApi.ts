// 📂 src/hooks/useNotionApi.ts
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export function useNotionApi() {
  const [notes, setNotes] = useState<any>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/notion')
        setNotes(res.data)
      } catch (err: any) {
        console.error(err)
        setError('🚨 Notion 데이터를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return { notes, error, loading }
}
