import axios from 'axios';

const NOTION_BASE = 'https://api.notion.com/v1/databases';

const clientSecret = process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET;

export const notionApi = axios.create({
  baseURL: NOTION_BASE,
  headers: {
    Authorization: `Bearer ${clientSecret}`,
    'Notion-Version': '2025-09-03',
    'Content-Type': `application/json`
  },
  timeout: 5000,
});
