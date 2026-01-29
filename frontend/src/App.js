import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PollList from "./pages/pollList";
import PollResults from "./pages/PollResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PollList />} />
        <Route path="/poll/:id" element={<PollResults />} />
      </Routes>
    </Router>
  );
}

export default App;
