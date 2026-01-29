import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PollResults() {
  const { id } = useParams();
  const pollId = Number(id); // ✅ convert string param to number
  const [poll, setPoll] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPoll() {
      try {
        // fetch poll by ID
        const pollRes = await fetch(`http://localhost:5000/polls/${pollId}`);
        if (!pollRes.ok) throw new Error("Poll not found");
        const pollData = await pollRes.json();
        setPoll(pollData);

        // fetch options for this poll
        const optionsRes = await fetch(`http://localhost:5000/options?pollId=${pollId}`);
        if (!optionsRes.ok) throw new Error("Options not found");
        const optionsData = await optionsRes.json();
        setOptions(optionsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPoll();
  }, [pollId]);

  if (loading) return <p>Loading poll...</p>;
  if (!poll) return <p>Poll not found.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>{poll.question}</h2>
      <ul>
        {options.map((opt) => (
          <li key={opt.id}>
            {opt.text} - {opt.votes} votes
          </li>
        ))}
      </ul>
      <Link to="/">
        <button style={{ marginTop: "20px" }}>Back to Polls</button>
      </Link>
    </div>
  );
}

export default PollResults;
