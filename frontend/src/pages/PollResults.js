import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";

const PollResults = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/polls/${id}/results`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(() => alert("Failed to fetch results"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Poll Results</Typography>
      {results.map(opt => (
        <Card key={opt.id} sx={{ my: 2 }}>
          <CardContent>
            <Typography>{opt.text}: {opt.votes} votes</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default PollResults;

