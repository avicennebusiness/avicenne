import React from "react";
import HeroSection from "./../HeroSection/HeroSection";
import NavBar from "./../NavBar/NavBar";
import Footer from "../Footer/Footer";
import ProductsSection from "../ProductsSection/ProductsSection";
const HomePage = () => {
  return (
    <div
      className="HomePage"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
      <HeroSection />
      <ProductsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
