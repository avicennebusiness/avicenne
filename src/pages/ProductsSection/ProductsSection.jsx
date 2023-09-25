import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productCard";
import "./ProductsSection.css";
import ProductDialog from "../../components/ProductDialog";
import { motion, AnimatePresence } from "framer-motion";
import { fetchData } from "../../firebase/firebase-functions";

const ProductsSection = () => {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchData();
      setCategories(response.categoriesArray);
      setBestSellers(response.sortedBestSellers);
      setFiltered(response.sortedBestSellers.slice(0, 6));
    };

    fetchCategories();
  }, []);
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleOpenDialog = (product) => {
    setOpenDialog((cur) => !cur);
    setSelectedProduct(product);
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
        <div className="filter-container flex flex-col justify-start items-start sm:flex-row flex-wrap gap-2 px-12 sm:justify-center sm:items-center">
          <button
            className={activeCat == 0 ? "active" : ""}
            onClick={() => {
              setFiltered(bestSellers.slice(0, 6));
              setActiveCat(0);
            }}
          >
            Best Sellers
          </button>
          {categories.map((categorie, index) => {
            return (
              <button
                key={categorie.name}
                className={activeCat == index + 1 ? "active" : ""}
                onClick={() => {
                  setFiltered(
                    categories
                      .filter((cat) => cat.name === categorie.name)[0]
                      .products.slice(0, 6)
                  );
                  setActiveCat(index + 1);
                }}
              >
                {categorie.name}
              </button>
            );
          })}
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
                  <ProductCard
                    key={product.name}
                    product={product}
                    handleOpenDialog={handleOpenDialog}
                  />
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

      <ProductDialog
        selectedProduct={selectedProduct}
        openDialog={openDialog}
        handleOpenDialog={handleOpenDialog}
      />
    </motion.div>
  );
};

export default ProductsSection;
