// controllers/pollController.js
const fs = require("fs");
const path = require("path");

// Path to db.json
const dbPath = path.join(__dirname, "../db.json");

// Helper: read db.json
const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

// Helper: write db.json
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
};

// Get all active polls
exports.getPolls = (req, res) => {
  try {
    const db = readDB();
    const activePolls = db.polls.filter((p) => p.isActive);
    res.json(activePolls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch polls" });
  }
};

// Get poll details
exports.getPollById = (req, res) => {
  try {
    const db = readDB();
    const pollId = req.params.id;
    const poll = db.polls.find((p) => p.id.toString() === pollId);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const options = db.options.filter((o) => o.pollId.toString() === pollId);
    res.json({ ...poll, options });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch poll" });
  }
};

// Create a poll (Admin)
exports.createPoll = (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: "Invalid poll data" });
    }

    const db = readDB();
    const newPollId = db.polls.length
    ? Math.max(...db.polls.map((p) => parseInt(p.id))) + 1
    : 1;
    const newPoll = {
      id: newPollId,
      question,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    db.polls.push(newPoll);

    // Add options with new IDs
    const newOptions = options.map((text, idx) => ({
      id: db.options.length ? Math.max(...db.options.map((o) => parseInt(o.id))) + idx + 1 : idx + 1,
      pollId: newPollId,
      text,
      votes: 0,
    }));

    db.options.push(...newOptions);

    writeDB(db);

    res.json({ message: "Poll created successfully", poll: newPoll, options: newOptions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create poll" });
  }
};

// Vote on a poll
exports.vote = (req, res) => {
  try {
    const { optionId } = req.body;
    if (!optionId) return res.status(400).json({ message: "Option ID is required" });

    const db = readDB();
    const option = db.options.find((o) => o.id.toString() === optionId.toString());
    if (!option) return res.status(404).json({ message: "Option not found" });

    option.votes += 1;
    writeDB(db);

    res.json({ message: "Vote submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit vote" });
  }
};

// Get poll results
exports.getResults = (req, res) => {
  try {
    const db = readDB();
    const pollId = req.params.id;
    const options = db.options.filter((o) => o.pollId.toString() === pollId);

    if (!options.length) return res.status(404).json({ message: "No results found" });

    res.json(options);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
