import { useEffect, useState } from 'react'
import axios from 'axios'

export function useObsidianNotes() {
  const [notes, setNotes] = useState<{ file: string; content: string }[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // 1. 파일 리스트 요청
        const listRes = await axios.get('/api/note')
        const files: string[] = listRes.data.files

        // 2. .md 파일만 필터링
        const mdFiles = files.filter((f) => f.endsWith('.md'));
        // 3. 개별 파일 요청 (병렬)
        const results = await Promise.all(
          mdFiles.map(async (file) => {
            try {
              const res = await axios.get(`/api/note/${file}`)
              console.log(res.data);
              return { file, content: res.data.content }
            } catch {
              return { file, content: '⚠️ 불러오기 실패' }
            }
          })
        )

        // 4. 결과 저장
        setNotes(results)
      } catch (err) {
        setError('🚨 파일 리스트 불러오기 실패')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return { notes, error, loading }
}

