import axios from "axios";

// Backend URL — must match your Express server
const BASE_URL = "http://localhost:5000";

export default {
  get: (url) => axios.get(`${BASE_URL}${url}`),
  post: (url, data) => axios.post(`${BASE_URL}${url}`, data),
  patch: (url, data) => axios.patch(`${BASE_URL}${url}`, data),
};
