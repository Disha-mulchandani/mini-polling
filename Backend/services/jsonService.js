const axios = require("axios");

const db = axios.create({
  baseURL: "http://localhost:3001"  // <-- must match your JSON server port
});

module.exports = db;
