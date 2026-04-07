'use client'

import { ProjectCard } from '@/components/ProjectCard'
import {  useNotionProjectNotesTabs } from '@/hooks/useNotionApi'
import Link from 'next/link'
import { useState } from 'react'

export default function NotionPreview() {

  const { tabs, groupedNotes, loading, error } = useNotionProjectNotesTabs('PROJECT')
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || '')

  if (loading) return <p>로딩 중...</p>
  if (error) return <p>{error}</p>

  console.log('Notion Notes:', groupedNotes, activeTab);
return (
    <div className="p-4">
      <h2 className="font-bold text-[60px] mb-3">📄 Notion 데이터</h2>
      <Link
        href={`/notion`}
        className="text-blue-600 hover:underline"
      >노션페이지 바로가기 
      </Link>
      <br />
      {tabs?.map(tab => (
        <button key={tab} className='px-2 py-1' onClick={() => setActiveTab(tab)}>{tab}</button>
      ))}
      <div className="flex flex-wrap my-4">
        {activeTab && groupedNotes[activeTab as keyof typeof groupedNotes].map(page => (
          <ProjectCard key={page.id} page={page} />
        ))}
      </div>
    </div>
  )
}