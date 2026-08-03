import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT token to every request if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("studentos_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle expired/invalid tokens globally
// 401 = expired or invalid signature, 422 = malformed/corrupted token (Flask-JWT-Extended)
// Skip this for /login and /register — a 401 there means wrong credentials,
// not an expired session, and should be shown as a normal form error instead.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isAuthEndpoint =
      requestUrl.includes("/login") || requestUrl.includes("/register");

    if ((status === 401 || status === 422) && !isAuthEndpoint) {
      localStorage.removeItem("studentos_token");
      window.location.href = "/login?expired=1";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;