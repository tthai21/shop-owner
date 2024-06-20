import { getToken } from "@/helper/getToken";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://big-umbrella-c5c3450b8837.herokuapp.com/",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.set("Content-Type", "application/json");
  config.headers.set("X-StoreID", process.env.NEXT_PUBLIC_STORE_ID);
  return config;
});

export const axiosWithToken = axios.create({
  baseURL: "https://big-umbrella-c5c3450b8837.herokuapp.com/",
});

axiosWithToken.interceptors.request.use((config) => {
  config.headers.set("Content-Type", "application/json");
  config.headers.set("X-StoreID", process.env.NEXT_PUBLIC_STORE_ID);
  config.headers["Authorization"] = `Bearer ${getToken()}`;
  return config;
});
