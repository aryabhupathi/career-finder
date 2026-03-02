import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import ResultsPage from "./pages/Results";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/results/:resultId" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
