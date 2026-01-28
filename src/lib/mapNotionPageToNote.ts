export function mapNotionPageToNote(page: any) {
  return {
    id: page.id,
    type: page.properties.Type.select?.name,
    title: page.properties.Name.title[0]?.plain_text,
  }
}