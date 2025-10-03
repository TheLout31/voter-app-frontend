import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://vote-now-backend.vercel.app";
// const API_URL = "http://localhost:3000"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle expired tokens
// api.interceptors.response.use(
//   (response) => response, // pass through success
//   async (error) => {
//     const originalRequest = error.config;

//     // If token expired (401) and we haven't retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) {
//           console.error("No refresh token found. User must log in again.");
//           // Optional: redirect to login

//           return Promise.reject(error);
//         }

//         // Call refresh token endpoint
//         const res = await axios.post(`${API_URL}/auth/refresh`, {
//           refreshToken,
//         });

//         const newAccessToken = res.data.accessToken;
//         localStorage.setItem("accessToken", newAccessToken);

//         // Update header and retry original request
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
