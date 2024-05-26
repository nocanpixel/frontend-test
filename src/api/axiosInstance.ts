import axios from "axios";
import { Cookie } from "../utils/tools";

const _BASE_URL = import.meta.env.VITE_API_BASE_URL;
const cookie = new Cookie();
const axiosInstance = axios.create({
  baseURL: _BASE_URL,
  timeout: 10_000,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (cookie.auth() === 0) {
        throw new Error("Not session found.")
    }
    return response;
  },
  (error) => {
    cookie.removeUser();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.clear();

export default axiosInstance;
