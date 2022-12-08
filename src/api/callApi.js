import axios from "axios";
// export const URL = 'https://monarca-api-production.up.railway.app';
const URL = 'http://localhost:8000';

export const callApi = axios.create({
  baseURL: URL,
});