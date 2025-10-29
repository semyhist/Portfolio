import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

function App() {
  const [lang, setLang] = useState("tr");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
        <Route path="/projects" element={<Projects lang={lang} />} />
      </Routes>
    </Router>
  );
}

export default App;
