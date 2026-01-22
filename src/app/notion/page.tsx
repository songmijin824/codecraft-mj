'use client'
import { ProjectCard } from '@/components/ProjectCard'
import { useNotionApi, useNotionProjectNotes, useNotionProjectNotesTabs } from '@/hooks/useNotionApi'
import Link from 'next/link'
import { useState } from 'react'

export default function NotionPreview() {

  const { projectNotes, loading,  error, } = useNotionProjectNotes('test')

  if (loading) return <p>로딩 중...</p>
  if (error) return <p>{error}</p>

return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-3">📄 Notion 데이터</h2>
      <Link
        href={`/notion`}
        className="text-blue-600 hover:underline"
      >노션페이지 바로가기 
      </Link>
      <br />
      {projectNotes.map(page => (
        <ProjectCard key={page.id} page={page} />
      ))}
    </div>
  )
}