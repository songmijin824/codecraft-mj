import { useEffect, useState } from 'react'
import { obsidianApi, obsidianApi_detail } from '@/lib/obsidianApi'

export function useObsidianNotes() {
  const [notes, setNotes] = useState<{ file: string; content: string }[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()

    const fetchNotes = async () => {
      try {
        // 1) 파일 리스트: 이제는 /api 경유
        const listRes = await obsidianApi.get('/vault/')
        const files: string[] = Array.isArray(listRes.data?.files) ? listRes.data.files : []

        // 3) 병렬로 파일 내용 가져오기 (개별 실패는 표시만)
        const settled = await Promise.allSettled(
          files.map(async (file) => {
            const url = `/vault/${file}`
            const res = await obsidianApi_detail.get(url)
            return res ;
          })
        )

        const results = settled.map((s, idx) => {
          if (s.status === 'fulfilled') {
            // s.value is AxiosResponse
            return {
              file: files[idx],
              content: s.value.data?.content ?? ''
            }
          } else {
            return {
              file: files[idx],
              content: '⚠️ 불러오기 실패'
            }
          }
        })

        setNotes(results)
      } catch (err: any) {
        // 서버에서 구조화된 에러가 오면 message를 표시
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          '파일 리스트 불러오기 실패'
        setError(`🚨 ${msg}`)
        console.log('[useObsidianNotes] error:', err?.toJSON?.() ?? err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
    return () => ctrl.abort()
  }, [])

  return { notes, error, loading }
}
