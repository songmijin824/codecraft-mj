'use client'
import { useObsidianNotes } from '@/hooks/useObsidianNotes'

export default function Home() {
  const { notes, error, loading } = useObsidianNotes()

  if (loading) return <div>⏳ 로딩 중...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      {notes.map((note) => (
        <div key={note.file}>
          <h2>{note.file}</h2>
          <pre>{note.content}</pre>
        </div>
      ))}
    </div>
  )
}

