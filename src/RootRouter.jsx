import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/avicenne" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
