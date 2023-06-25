import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import NavBar from "./pages/NavBar/NavBar";
const RootRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/avicenne" element={<HomePage />} />
        <Route exact path="/avicenne/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
