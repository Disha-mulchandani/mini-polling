import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index) => options.length > 2 && setOptions(options.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (!question.trim() || options.some(opt => !opt.trim())) return alert("Fill question and all options");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/polls/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options })
      });
      const data = await res.json();
      alert(data.message || "Poll created successfully");
      setQuestion(""); setOptions(["",""]);
    } catch {
      alert("Failed to create poll. Check backend.");
    } finally { setLoading(false); }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Create Poll</Typography>
      <TextField fullWidth label="Question" value={question} onChange={e => setQuestion(e.target.value)} sx={{ mb: 2 }} />
      {options.map((opt, i) => (
        <Box key={i} sx={{ display: "flex", mb: 2 }}>
          <TextField fullWidth label={`Option ${i+1}`} value={opt} onChange={e => handleOptionChange(i, e.target.value)} />
          {options.length > 2 && <Button color="error" onClick={() => removeOption(i)}>Remove</Button>}
        </Box>
      ))}
      <Button onClick={addOption} sx={{ mb: 2 }}>Add Option</Button><br/>
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>{loading ? "Creating..." : "Create Poll"}</Button>
    </Container>
  );
};

export default CreatePoll;
