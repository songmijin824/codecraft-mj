
type Block = {
  id: string
  type: string
  [key: string]: any
}

export function notionBlocksToMarkdown(blocks: Block[]): string {
  return blocks
    .map((block) => {
      const { type } = block
      const value = block[type]

      if (!value) return ''

      switch (type) {
        case 'paragraph':
          return value.rich_text.map((t: any) => t.plain_text).join('') + '\n'

        case 'heading_1':
          return '# ' + value.rich_text.map((t: any) => t.plain_text).join('') + '\n'

        case 'heading_2':
          return '## ' + value.rich_text.map((t: any) => t.plain_text).join('') + '\n'

        case 'heading_3':
          return '### ' + value.rich_text.map((t: any) => t.plain_text).join('') + '\n'

        case 'bulleted_list_item':
          return '- ' + value.rich_text.map((t: any) => t.plain_text).join('')

        case 'numbered_list_item':
          return '1. ' + value.rich_text.map((t: any) => t.plain_text).join('')

        case 'quote':
          return '> ' + value.rich_text.map((t: any) => t.plain_text).join('')

        case 'code':
          const lang = value.language || ''
          const content = value.rich_text.map((t: any) => t.plain_text).join('')
          return `\`\`\`${lang}\n${content}\n\`\`\``

        case 'image':
          const url = value.type === 'external' ? value.external.url : value.file.url
          return `![이미지](${url})`

        default:
          return `<!-- Unsupported block type: ${type} -->`
      } 
    })
    .join('\n')
}
