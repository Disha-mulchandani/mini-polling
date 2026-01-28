const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('List of polls');
});

module.exports = router;
