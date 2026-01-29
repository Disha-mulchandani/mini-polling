// PollList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await fetch("http://localhost:5000/polls");
        const data = await res.json();
        setPolls(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPolls();
  }, []);

  if (!polls.length) return <p>No polls found.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Active Polls</h2>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id} style={{ marginBottom: "10px" }}>
            <strong>{poll.title}</strong> <br />
            <Link to={`/poll/${poll.id}`}>View Results</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollList;
