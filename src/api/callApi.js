import axios from "axios";
export const URL = 'https://monarca-api-production.up.railway.app';
//const URL = null;

export const callApi = axios.create({
  baseURL: URL ? URL : 'http://localhost:8000',
});