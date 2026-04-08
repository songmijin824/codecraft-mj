
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { NotionPage, ProjectSubType, PROJECT_SUB_TYPES } from './useNotionApi.type'

export function useNotionApi(params?: Record<string, string | boolean>) {
  const [notes, setNotes] = useState<NotionPage[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      try {
        const res = await axios.get<NotionPage[]>('/api/notion', { params })
        setNotes(res.data)
        // console.log('✅ Notion API Response:', res.data);
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



// 해당type[0] 포함시 분류 배출   
export function useNotionProjectNotes(tag: string) {
  const { notes, loading, error } = useNotionApi()

  const projectNotes = useMemo(() => {
    return notes.filter(page =>
      Object.values(page.properties).some(prop =>
        prop.type === 'multi_select' &&
        prop.multi_select?.some(item => item.name === tag)
      )
    )
  }, [notes, tag])

  // console.log('Filtered Project Notes:', projectNotes);
  return {
    projectNotes,
    loading,
    error,
  }
}


// 해당type[0] 포함시 type[1] 으로 분류 배출   


export function useNotionProjectNotesTabs(tag: string) {
  const { notes, loading, error } = useNotionApi()

  const result = useMemo(() => {
    const grouped: Record<ProjectSubType, typeof notes> = {
      'UIUX': [],
      Design: [],
      Logo: [],
      Frontend: [],
      Etc: [],
    }

    notes.forEach(page => {
      const multiSelectProp = Object.values(page.properties).find(
        prop => prop.id === 'rJw%5D' 
      )

      if (!multiSelectProp?.multi_select) return

      // PROJECT 포함 여부
      const hasProject = multiSelectProp.multi_select.some(
        t => t.name === tag
      )
      // console.log('Page Multi-Selects:', multiSelectProp.multi_select);
      if (!hasProject) return

      // PROJECT 제외한 서브 타입
      const subType = multiSelectProp.multi_select.find(
        t => t.name !== tag
      )?.name as ProjectSubType | undefined

      // 🚨 화이트리스트에 없는 타입은 버림
      if (!subType || !PROJECT_SUB_TYPES.includes(subType)) return

      grouped[subType].push(page)
    })

    return {
      tabs: PROJECT_SUB_TYPES,
      groupedNotes: grouped,
    }
  }, [notes, tag])

  return {
    tabs: result.tabs,
    groupedNotes: result.groupedNotes,
    loading,
    error,
  }
}