import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button, CircularProgress } from "@mui/material";

const PollDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/polls/${id}`)
      .then(res => res.json())
      .then(data => setPoll(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVote = async (optionId) => {
    try {
      await fetch("http://localhost:5000/api/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId })
      });
      setVoted(true);

      // Refresh poll data to show updated votes
      const res = await fetch(`http://localhost:5000/api/polls/${id}`);
      const data = await res.json();
      setPoll(data);

      alert("Vote submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit vote");
    }
  };

  if (loading) return <Container sx={{ mt: 5 }}><CircularProgress /></Container>;
  if (!poll) return <Typography>Poll not found</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>{poll.question}</Typography>

      {poll.options.map(option => (
        <Card key={option.id} sx={{ my: 2 }}>
          <CardContent>
            <Typography>{option.text} {voted && `- ${option.votes} votes`}</Typography>
            {!voted && (
              <Button variant="contained" onClick={() => handleVote(option.id)}>Vote</Button>
            )}
          </CardContent>
        </Card>
      ))}

      {voted && (
        <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>Back to Polls</Button>
      )}
    </Container>
  );
};

export default PollDetails;
