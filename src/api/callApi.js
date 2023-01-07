import axios from "axios";
export const URL = process.env.REACT_APP_MONARCA_HOST;
// const URL = 'http://localhost:8000';

export const callApi = axios.create({
  baseURL: URL,
});