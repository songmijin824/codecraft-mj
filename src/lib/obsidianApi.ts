import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_OBSIDIAN_API_ORIGIN
const apiKey = process.env.NEXT_PUBLIC_OBSIDIAN_API_KEY

export const obsidianApi = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    accept: `application/json`
  },
  timeout: 5000,
});

export const obsidianApi_detail = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    accept: `application/vnd.olrapi.note+json`
  },
  timeout: 5000,
});
