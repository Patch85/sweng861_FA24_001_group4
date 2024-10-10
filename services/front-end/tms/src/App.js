// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Talent from "./components/talent";
import Projects from "./components/projects";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes to render components based on the URL path */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/talent" element={<Talent />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
