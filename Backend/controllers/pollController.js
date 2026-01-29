const db = require("../services/jsonService"); // Make sure jsonService exists

// Get all active polls
exports.getPolls = async (req, res) => {
  try {
    const response = await db.get("/polls?isActive=true");
    res.json(response.data);
  } catch (error) {
    console.error("Error in getPolls:", error);
    res.status(500).json({ message: "Failed to fetch polls" });
  }
};

// Get poll details by ID
exports.getPollById = async (req, res) => {
  try {
    const pollId = req.params.id;

    const pollRes = await db.get(`/polls/${pollId}`);
    const optionsRes = await db.get(`/options?pollId=${pollId}`);

    res.json({
      ...pollRes.data,
      options: optionsRes.data
    });
  } catch (error) {
    console.error("Error in getPollById:", error);
    res.status(404).json({ message: "Poll not found" });
  }
};

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: "Invalid poll data" });
    }

    const pollRes = await db.post("/polls", {
      question,
      isActive: true,
      createdAt: new Date().toISOString()
    });

    for (let option of options) {
      await db.post("/options", {
        pollId: pollRes.data.id,
        text: option,
        votes: 0
      });
    }

    res.status(201).json({ message: "Poll created successfully" });
  } catch (error) {
    console.error("Error in createPoll:", error);
    res.status(500).json({ message: "Failed to create poll" });
  }
};

// Vote on a poll
exports.vote = async (req, res) => {
  try {
    const { optionId } = req.body;

    if (!optionId) {
      return res.status(400).json({ message: "Option ID is required" });
    }

    const optionRes = await db.get(`/options/${optionId}`);

    await db.patch(`/options/${optionId}`, {
      votes: optionRes.data.votes + 1
    });

    res.json({ message: "Vote submitted successfully" });
  } catch (error) {
    console.error("Error in vote:", error);
    res.status(500).json({ message: "Failed to vote" });
  }
};

// Get poll results
exports.getResults = async (req, res) => {
  try {
    const pollId = req.params.id;
    const optionsRes = await db.get(`/options?pollId=${pollId}`);
    res.json(optionsRes.data);
  } catch (error) {
    console.error("Error in getResults:", error);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
