const axios = require("axios");
const BASE_URL = "http://localhost:3001"; // JSON Server port

exports.get = (url) => axios.get(`${BASE_URL}${url}`);
exports.post = (url, data) => axios.post(`${BASE_URL}${url}`, data);
exports.patch = (url, data) => axios.patch(`${BASE_URL}${url}`, data);
