import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async () => {
    const filteredOptions = options.filter(o => o.trim() !== "");
    if (!question || filteredOptions.length < 2) {
      alert("Add a question and at least 2 options");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/polls/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options: filteredOptions })
      });
      alert("Poll created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create poll");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Create Poll</Typography>
      <TextField
        label="Poll Question"
        fullWidth
        sx={{ mt: 2 }}
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      {options.map((opt, i) => (
        <TextField
          key={i}
          label={`Option ${i + 1}`}
          fullWidth
          sx={{ mt: 1 }}
          value={opt}
          onChange={e => handleOptionChange(i, e.target.value)}
        />
      ))}
      <Button sx={{ mt: 2 }} onClick={addOption}>Add Option</Button>
      <Button sx={{ mt: 2, ml: 2 }} variant="contained" onClick={handleSubmit}>
        Create Poll
      </Button>
    </Container>
  );
};

export default CreatePoll;
