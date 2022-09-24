import axios from "axios";
import { getEnv } from "../helpers";

const { VITE_BACKEND_URL } = getEnv();

export const api = axios.create({
  baseURL: VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-access-token": localStorage.getItem("token"),
  };

  return config;
});
