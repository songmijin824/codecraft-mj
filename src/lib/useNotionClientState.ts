'use client'

import { useState } from 'react'
import { NotionPage } from './useNotionApi.type'

export function useNotionClientState(initialNotes: NotionPage[]) {
  const [notes, setNotes] = useState(initialNotes)

  return { notes, setNotes }
}