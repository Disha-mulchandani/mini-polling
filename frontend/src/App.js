import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PollList from "./pages/PollList";
import PollDetails from "./pages/PollDetails";
import PollResults from "./pages/PollResults";
import CreatePoll from "./pages/CreatePoll";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PollList />} />
        <Route path="/poll/:id" element={<PollDetails />} />
        <Route path="/results/:id" element={<PollResults />} />
        <Route path="/create" element={<CreatePoll />} />
      </Routes>
    </Router>
  );
}

export default App;
