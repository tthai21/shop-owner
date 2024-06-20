import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://big-umbrella-c5c3450b8837.herokuapp.com/",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.set("Content-Type", "application/json");
  config.headers.set("X-StoreID", process.env.NEXT_PUBLIC_STORE_ID);
  return config;
});

export default axiosInstance;
