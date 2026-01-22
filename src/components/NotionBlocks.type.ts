
export interface RichText {
  type: 'text'
  text: {
    content: string
    link: { url: string } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    underline: boolean
    strikethrough: boolean
    code: boolean
    color: string
  }
  plain_text: string
}

export interface ParagraphBlockData {
  rich_text: RichText[]
}

export interface HeadingBlockData {
  rich_text: RichText[]
}

export interface ListItemBlockData {
  rich_text: RichText[]
}

export interface ToDoBlockData {
  rich_text: RichText[]
  checked: boolean
}

export type BlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'to_do'  
  | 'toggle'
  | 'image'
  | 'video'
  | 'table'
  | 'code'
  | 'callout'
  | 'quote'
  | 'divider'
  | 'unknown'

export interface Block {
  id: string
  type: BlockType
  has_children: boolean
  children?: Block[]
}

export interface TextBlockProps<T> {
  Block?: Block
  BlockType: BlockType
  Blockdata: T
}

export interface ToggleBlockData {
  rich_text: RichText[]
}
export interface FileObject {
  url: string
}

export interface ImageBlockData {
  caption: RichText[]
  file: FileObject
}
export interface VideoBlockData {
  file: FileObject
}
export interface TableBlockData {
  table_width: number
  has_column_header: boolean
  has_row_header: boolean
}
export interface CodeBlockData {
  rich_text: RichText[]
  language: string
}
export interface CalloutBlockData {
  rich_text: RichText[]
  icon: {
    emoji: string
  }
}
export interface QuoteBlockData {
  rich_text: RichText[]
}
export type EmptyBlockData = Record<string, never>