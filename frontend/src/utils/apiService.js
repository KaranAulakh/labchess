// src/services/apiService.js
import axios from "axios";

// Detect API base URL based on environment
const hostname = window.location.hostname;
const API_BASE_URL = (hostname === 'localhost' || hostname === '127.0.0.1')
  ? 'http://localhost:5001'
  : 'https://labchess.up.railway.app';

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
