import React, { useState, useEffect, Fragment } from "react";
import { Grid } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../components/productCard";
import "./ProductsSection.css";

import { motion, AnimatePresence } from "framer-motion";
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyDz8ImWVqIxTrw8SMQmPDEzvix6O5pfmEs",
  authDomain: "avicenne-2f52b.firebaseapp.com",
  databaseURL: "https://avicenne-2f52b-default-rtdb.firebaseio.com",
  projectId: "avicenne-2f52b",
  storageBucket: "avicenne-2f52b.appspot.com",
  messagingSenderId: "928490117933",
  appId: "1:928490117933:web:32c1eb4a46332bcb86d1a4",
  measurementId: "G-25CRWWZQF1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const ProductsSection = () => {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const categoriesRef = ref(database, "Categories");

    const fetchCategories = () => {
      onValue(
        categoriesRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const categoriesArray = Object.entries(data).map(
              ([categoryName, products]) => ({
                name: categoryName,
                products: Object.entries(products).map(
                  ([productName, product]) => ({
                    name: productName,
                    ...product,
                  })
                ),
              })
            );
            console.log(categoriesArray);
            setCategories(categoriesArray);

            const allProducts = categoriesArray.flatMap(
              (category) => category.products
            );
            const sortedBestSellers = [...allProducts].sort(
              (a, b) => b.price - a.price
            );
            setBestSellers(sortedBestSellers);
            setFiltered(sortedBestSellers.slice(0, 6));
          }
        },
        (error) => {
          console.error("Error fetching categories:", error);
        }
      );
    };

    fetchCategories();
  }, []);
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Grid
        container
        display="flex"
        flexDirection="column"
        gap="50px"
        justifyContent="center"
        alignItems="center"
        padding={{ xs: "25px", sm: "25px", lg: "75px" }}
      >
        <div className="filter-container flex flex-wrap gap-2">
          <button
            className={activeCat == 0 ? "active" : ""}
            onClick={() => {
              setFiltered(bestSellers.slice(0, 6));
              setActiveCat(0);
            }}
          >
            Best Sellers
          </button>
          <button
            className={activeCat == 1 ? "active" : ""}
            onClick={() => {
              setFiltered(
                categories
                  .filter((cat) => cat.name === "Miels")[0]
                  .products.slice(0, 6)
              );
              setActiveCat(1);
            }}
          >
            Honey
          </button>
          <button
            className={activeCat == 2 ? "active" : ""}
            onClick={() => {
              setFiltered(
                categories
                  .filter((cat) => cat.name === "Crèmes")[0]
                  .products.slice(0, 6)
              );
              setActiveCat(2);
            }}
          >
            Crèmes
          </button>
          <button
            className={activeCat == 3 ? "active" : ""}
            onClick={() => {
              setFiltered(
                categories
                  .filter((cat) => cat.name === "Huiles essentielles")[0]
                  .products.slice(0, 6)
              );
              setActiveCat(3);
            }}
          >
            Huiles essentielles
          </button>
          <button
            className={activeCat == 4 ? "active" : ""}
            onClick={() => {
              setFiltered(
                categories
                  .filter((cat) => cat.name === "Huiles végétales")[0]
                  .products.slice(0, 6)
              );
              setActiveCat(4);
            }}
          >
            Huiles végétales
          </button>
          <button
            className={activeCat == 5 ? "active" : ""}
            onClick={() => {
              setFiltered(
                categories
                  .filter((cat) => cat.name === "Hydrolats")[0]
                  .products.slice(0, 6)
              );
              setActiveCat(5);
            }}
          >
            Hydrolats
          </button>
          <button
            className={activeCat == 6 ? "active" : ""}
            onClick={() => {
              setFiltered(
                categories
                  .filter((cat) => cat.name === "Produits de la suche")[0]
                  .products.slice(0, 6)
              );
              setActiveCat(6);
            }}
          >
            Produits de la suche
          </button>
        </div>
        <AnimatePresence>
          <Grid
            container
            display="flex"
            flexDirection="column"
            gap="25px"
            justifyContent="center"
            alignItems="center"
          >
            <div className="products-grid">
              {filtered.map((product) => (
                <motion.div
                  key={product.name}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="h-full w-full max-w-[26rem]"
                >
                  <ProductCard key={product.name} product={product} />
                </motion.div>
              ))}
            </div>
            <Link
              style={{
                color: "#D78C12",
                borderBottom: "2px dashed #D78C12",
                textDecoration: "none",
              }}
              to="/avicenne/products"
            >
              View All
            </Link>
          </Grid>
        </AnimatePresence>
      </Grid>
    </motion.div>
  );
};

export default ProductsSection;
