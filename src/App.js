import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnaSayfa from "./pages/Home";
import Projeler from "./pages/Projects";

function App() {
  const [dil, setDil] = useState("tr");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnaSayfa dil={dil} setDil={setDil} />} />
        <Route path="/projects" element={<Projeler dil={dil} />} />
      </Routes>
    </Router>
  );
}

export default App;
