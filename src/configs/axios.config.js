import axios from "axios";
import store from "../store";
import { clearAuth } from "../store/slice/auth";

const unauthorizedCode = [401];

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

export const axiosInstance = axios.create({
  timeout: 60000,
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken;

    if (!accessToken) {
      const { auth } = store.getState();
      accessToken = auth.token;
    }

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    config.headers["x-api-key"] = "9f8e2a3b-7c4d-4e9a-b1c0-6d5f8e7a9b2c";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // If the request explicitly opts out of redirect handling, skip automatic redirect.
    const isAuthPage = window.location.pathname.includes("/register") || window.location.pathname.includes("/login");
    // Prefer a non-header config flag `skipRedirect` (not sent over the wire) to avoid CORS preflight.
    // Fallback to header for backward compatibility.
    const skipRedirect = error.config?.skipRedirect || error.config?.headers?.["x-skip-redirect"] || isAuthPage;

    if (response && unauthorizedCode.includes(response.status) && !skipRedirect) {
      store.dispatch(clearAuth());
      location.replace("/dashboard");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
