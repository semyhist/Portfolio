import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnaSayfa from "./pages/Home";
import Projeler from "./pages/Projects";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [dil, setDil] = useState("tr");
  // const [tema, setTema] = useState("dark");
  // const [kullaniciVerisi, setKullaniciVerisi] = useState(null);
  // useEffect(() => {
  //   localStorage.setItem('dil', dil);
  // }, [dil]);
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<AnaSayfa dil={dil} setDil={setDil} />} />
          <Route path="/projects" element={<Projeler dil={dil} />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
export default App;
