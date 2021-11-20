import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Generated } from "./Generated";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="generated" element={<Generated />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
