const express = require("express");
const router = express.Router();
const pollController = require("../controllers/pollController");

// Get all active polls
router.get("/", pollController.getPolls);

// Get poll details
router.get("/:id", pollController.getPollById);

// Create poll
router.post("/create", pollController.createPoll);

// Vote on poll
router.post("/vote", pollController.vote);

// Get poll results
router.get("/:id/results", pollController.getResults);

module.exports = router;
