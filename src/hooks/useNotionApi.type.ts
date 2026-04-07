
export interface NotionMultiSelect {
  id: string
  name: string
  color: string
}

export interface NotionProperty {
  tool: string
  files: any
  title: any
  id: string
  type: string
  multi_select?: NotionMultiSelect[]
  url?: string
}

export interface NotionPage {
  file: any
  id: string
  properties: Record<string, NotionProperty>
}

export interface NotionResponse {
  results: NotionPage[]
}


export const PROJECT_SUB_TYPES = ['UI/UX', 'Design', 'Logo', 'Frontend', 'Etc'] as const

export type ProjectSubType = typeof PROJECT_SUB_TYPES[number]