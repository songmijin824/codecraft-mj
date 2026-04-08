
export default async function NotionDetailPage({
  params,
}: {
  params: { id: string }
}) {

  const NOTION_TOKEN = process.env.NOTION_CLIENT_SECRET
  const DATABASE_ID = process.env.NOTION_DB_ID!

  const fetchProject = async () => {
    try {
    // fetch 주소 -> 생성한 폴더의 이름 
      const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        headers: {
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
          Authorization: `Bearer ${NOTION_TOKEN}`,
        },
      });
      if (response) {
        const data = await response.json();
        console.log('Fetched project data:', data);
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };
  await fetchProject();
return (
    <div>
      <h1>Notion Detail Page - {params.id}</h1>
    </div>
  );
}   