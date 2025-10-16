import axios from 'axios';

const NOTION_BASE = 'https://api.notion.com/v1/databases';

const clientSecret = process.env.NOTION_CLIENT_SECRET;

export const notionApi = axios.create({
  baseURL: NOTION_BASE,
  headers: {
    Authorization: `Bearer ${clientSecret}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': `application/json`
  },
  timeout: 5000,
});
