import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import ResultsPage from "./pages/Results";
import Layout from "./pages/Layout";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results/:resultId" element={<ResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
