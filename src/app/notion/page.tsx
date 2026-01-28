import NotionPreviewClient from '@/components/NotionPreviewClient'
import { mapNotionPageToNote } from '@/lib/mapNotionPageToNote'
import { fetchNotionPages } from '@/lib/useNotionApi'

export const runtime = 'nodejs'
export const revalidate = 600

export default async function NotionPreview() {
  const pages = await fetchNotionPages('')

  const notes = pages.map(mapNotionPageToNote)

  return <NotionPreviewClient initialNotes={notes} />
}