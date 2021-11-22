import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Share } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share" element={<Navigate to="/" replace />} />
        <Route path="/share/:id" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
