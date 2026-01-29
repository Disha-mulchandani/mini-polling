import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch active polls from backend
    fetch("http://localhost:5000/api/polls")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => setPolls(data))
      .catch(err => {
        console.error("FETCH ERROR 👉", err);
        alert("Error fetching polls. Make sure backend is running on port 5000");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Active Polls
      </Typography>

      {polls.length === 0 && <Typography>No polls available.</Typography>}

      {polls.map(poll => (
        <Card key={poll.id} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h6">{poll.question}</Typography>
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => navigate(`/poll/${poll.id}`)}
            >
              View Poll
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default PollList;
