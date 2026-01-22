
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
}

export interface NotionPage {
  file: any
  id: string
  properties: Record<string, NotionProperty>
}

export interface NotionResponse {
  results: NotionPage[]
}


export const PROJECT_SUB_TYPES = ['PUBLISHING', 'WEBDESIGN', 'LOGO', 'FRONTEND', 'ETC'] as const

export type ProjectSubType = typeof PROJECT_SUB_TYPES[number]