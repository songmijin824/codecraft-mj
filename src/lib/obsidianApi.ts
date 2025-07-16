import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_OBSIDIAN_BASE_URL
const apiKey = process.env.OBSIDIAN_API_KEY

export const obsidianApi = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/vnd.olrapi.note+json',
  },
  timeout: 5000,
});
