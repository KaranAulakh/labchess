// src/services/apiService.js
import axios from "axios";

// Vercel has a Enviornment variable called VUE_APP_API_BASE_URL that is set to the API base URL
const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercept the response to handle errors and API formatting
api.interceptors.response.use(
  (response) => {
    return {
      success: true,
      data: response.data,
      errorMsg: "",
    };
  },
  (error) => {
    return {
      success: false,
      data: {},
      errorMsg: error,
    };
  }
);

// Handle Get Calls from the api
const apiServiceGET = (path) => {
  return api.get(path);
};

// Handle Post Calls from the api
const apiServicePOST = (path, data = {}) => {
  return api.post(path, data);
};

export { apiServiceGET, apiServicePOST };
