'use client'

import { useState } from 'react'

interface Note {
  id: string
  title: string
  type: string
}

export default function NotionPreviewClient({ initialNotes }: { initialNotes: Note[] }) {
  const [activeTab, setActiveTab] = useState('ALL')

  const filtered = initialNotes.filter(note =>
    activeTab === 'ALL' ? true : note.type === activeTab
  )

  return (
    <>
      {filtered.map(note => (
        <div key={note.id}>{note.title}</div>
      ))}
    </>
  )
}
