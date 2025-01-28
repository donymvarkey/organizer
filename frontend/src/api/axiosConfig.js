import axios from "axios";
import { getItemFromLocalStorage } from "./LocalStorage";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:3456/api", // Replace with your API base URL
  timeout: 10000, // Request timeout
});

// Request interceptor to add the Bearer token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItemFromLocalStorage("access_token"); // Retrieve the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized error
          console.error("Unauthorized access - possibly invalid token");
          break;
        case 403:
          // Handle forbidden error
          console.error("Access forbidden - you do not have permission");
          break;
        case 500:
          // Handle internal server error
          console.error("Internal server error");
          break;
        default:
          console.error(`Error: ${error.response.status}`);
      }
    } else if (error.request) {
      // Handle no response from server
      console.error("No response received from server");
    } else {
      // Handle other errors
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
